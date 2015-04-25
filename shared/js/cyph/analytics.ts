module Cyph {
	export class Analytics {
		public static main	= new Analytics;


		private analFrame: HTMLIFrameElement;
		private analFrameIsReady: boolean;

		public baseEventSubmit (method: string, ...args: any[]) : void {
			this.baseEventSubmitHelper(method, args);
		}

		public baseEventSubmitHelper (method: string, args: any[]) : void {
			if (!Env.isMainThread) {
				Thread.callMainThread('Cyph.Analytics.main.baseEventSubmitHelper', [method, args]);
			}

			else if (this.analFrameIsReady) {
				args.unshift(method);

				this.analFrame.contentWindow.postMessage(
					{args: JSON.stringify(args)},
					'*'
				);
			}

			/* Do nothing if explicitly set to false */
			else if (this.analFrameIsReady !== false) {
				setTimeout(() =>
					this.baseEventSubmitHelper(method, args)
				, 50);
			}
		}

		public send (...args: any[]) : void {
			this.baseEventSubmit('send', args);
		}

		public set (...args: any[]) : void {
			this.baseEventSubmit('set', args);
		}

		public constructor (appName: string = Env.host, appVersion: string = 'Web') {
			if (Env.isOnion) {
				this.analFrameIsReady	= false;
			}
			else if (Env.isMainThread) {
				this.analFrame	= document.createElement('iframe');

				this.analFrame.src	=
					Env.baseUrl +
					'anal/' +
					appName +
					location.pathname +
					location.search +
					(
						document.referrer &&
						!/https:\/\/www.cyph.[a-z]+\//.test(document.referrer) ?
							(
								(location.search ? '&' : '?') +
								'ref=' +
								encodeURIComponent(document.referrer)
							) :
							''
					)
				;

				this.analFrame.style.display	= 'none';

				document.body.appendChild(this.analFrame);

				$(() =>
					$(this.analFrame).load(() =>
						setTimeout(() => {
							this.analFrameIsReady	= true;
							this.set({appName, appVersion});
						}, 250)
					)
				);
			}
		}
	}
}
