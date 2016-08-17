import {Env} from 'env';
import {IThread} from 'ithread';
import {Util} from 'util';


/**
 * Global cross-thread event-manager.
 */
export class EventManager {
	private static handlers: {[event: string] : Function[]}	= {};
	private static threadEventPrefix: string	= 'threadEventPrefix';
	private static untriggeredEvents: string	= 'untriggeredEvents';

	/** Ignore this (used by EventManager and Thread for cross-thread event stuff). */
	public static mainThreadEvents: string	= 'mainThreadEvents';

	/** List of all active threads. */
	public static threads: IThread[]	= [];

	/**
	 * Sends command to the main thread.
	 * @param method Fully qualified method name (e.g. "Cyph.EventManager.callMainThread").
	 * @param args
	 */
	public static callMainThread (method: string, args: any[] = []) : void {
		if (Env.isMainThread) {
			const methodSplit: string[]	= method.split('.');
			const methodName: string	= methodSplit.slice(-1)[0];

			/* Validate command against namespace whitelist, then execute */
			if (['Cyph', 'ui'].indexOf(methodSplit[0]) > -1) {
				const methodObject: any	= methodSplit.
					slice(0, -1).
					reduce((o: any, k: string) : any => o[k], self)
				;

				methodObject[methodName].apply(methodObject, args);
			}
			else {
				throw new Error(
					method +
					' not in whitelist. (args: ' +
					JSON.stringify(args) +
					')'
				);
			}
		}
		else {
			EventManager.trigger(EventManager.mainThreadEvents, {method, args});
		}
	}

	/**
	 * Removes handler from event.
	 * @param event
	 * @param handler
	 */
	public static off (event: string, handler?: Function) : void {
		EventManager.handlers[event]	=
			handler ?
				(EventManager.handlers[event] || []).filter(f => f !== handler) :
				undefined
		;
	}

	/**
	 * Attaches handler to event.
	 * @param event
	 * @param handler
	 */
	public static on (event: string, handler: Function) : void {
		EventManager.handlers[event]	= EventManager.handlers[event] || [];
		EventManager.handlers[event].push(handler);
	}

	/**
	 * Attaches handler to event and removes after first execution.
	 * @param event
	 * @param handler
	 */
	public static one (event: string, handler: Function) : void {
		let f: Function;
		f	= data => {
			EventManager.off(event, f);
			handler(data);
		};

		EventManager.on(event, f);
	}

	/**
	 * Triggers event.
	 * @param event
	 * @param data
	 * @param shouldTrigger Ignore this (used internally for cross-thread events).
	 */
	public static trigger (
		event: string,
		data?: any,
		shouldTrigger: boolean = Env.isMainThread
	) : void {
		if (!shouldTrigger) {
			EventManager.trigger(EventManager.untriggeredEvents, {event, data}, true);
		}
		else {
			for (let handler of (EventManager.handlers[event] || [])) {
				try {
					handler(data);
				}
				catch (err) {
					setTimeout(() => { throw err }, 0);
				}
			}

			if (Env.isMainThread) {
				for (let thread of EventManager.threads) {
					try {
						thread.postMessage({event, data, isThreadEvent: true});
					}
					catch (_) {}
				}
			}
		}
	}

	private static _	= (() => {
		if (Env.isMainThread) {
			EventManager.on(
				EventManager.mainThreadEvents,
				(o: { method: string; args: any[]; }) =>
					EventManager.callMainThread(o.method, o.args)
			);
		}
		else {
			self.onmessage	= (e: MessageEvent) => {
				const data: any	= e.data || {};

				if (data instanceof Array) {
					data.forEach((arg: any, i: number) => {
						if (arg && arg.callbackId) {
							data[i]	= (...args) => EventManager.trigger(
								EventManager.threadEventPrefix + arg.callbackId,
								args
							);
						}
					});
				}

				if (data.isThreadEvent) {
					EventManager.trigger(data.event, data.data, true);
				}
				else if (onthreadmessage) {
					onthreadmessage(e);
				}
			};

			EventManager.on(
				EventManager.untriggeredEvents,
				(o: { event: string; data: any; }) => {
					if (o.data instanceof Array) {
						o.data.forEach((arg: any, i: number) => {
							if (typeof arg === 'function') {
								const callbackId: string	= Util.generateGuid();

								o.data[i]	= {callbackId};

								EventManager.on(
									EventManager.threadEventPrefix + callbackId,
									args => arg.apply(null, args)
								);
							}
						});
					}

					self.postMessage({event: o.event, data: o.data, isThreadEvent: true}, undefined);
				}
			);
		}
	})();
}
