import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {CyphertextService} from '../services/cyphertext.service';
import {EnvService} from '../services/env.service';
import {SessionService} from '../services/session.service';
import {StringsService} from '../services/strings.service';


/**
 * Angular component for chat cyphertext UI.
 */
@Component({
	selector: 'cyph-chat-cyphertext',
	templateUrl: '../../../templates/chat-cyphertext.html'
})
export class ChatCyphertextComponent implements OnInit {
	/** @inheritDoc */
	public ngOnInit () : void {
		if (!this.envService.isWeb) {
			/* TODO: HANDLE NATIVE */
			return;
		}

		/* Close cyphertext on esc */
		$(window).keyup(e => {
			if (e.keyCode === 27) {
				this.cyphertextService.hide();
			}
		});
	}

	constructor (
		/** @ignore */
		private readonly envService: EnvService,

		/** @see CyphertextService */
		public readonly cyphertextService: CyphertextService,

		/** @see SessionService */
		public readonly sessionService: SessionService,

		/** @see StringsService */
		public readonly stringsService: StringsService
	) {}
}
