/// <reference path="globals.ts" />
/// <reference path="env.ts" />
/// <reference path="../lib/typings/jquery/jquery.d.ts" />


class Analytics {
	private analFrame: HTMLIFrameElement;
	private analFrameIsReady: boolean;

	private baseEventSubmitHelper (method: string, args: any[]) : void {
		if (this.analFrameIsReady) {
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

	private baseEventSubmit (method: string, ...args: any[]) : void {
		this.baseEventSubmitHelper(method, args);
	}

	public constructor (appName: string = Env.host, appVersion: string = 'Web') {
		if (Env.isOnion) {
			this.analFrameIsReady	= false;
		}
		else {
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

	public send (...args: any[]) : void {
		this.baseEventSubmit('send', args);
	}

	public set (...args: any[]) : void {
		this.baseEventSubmit('set', args);
	}
}


var anal: Analytics	= new Analytics;
