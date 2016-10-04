import {IChat} from './ichat';
import {IElements} from './ielements';
import {IScrollManager} from './iscrollmanager';
import {Affiliate} from '../affiliate';
import {IDialogManager} from '../idialogmanager';
import {NanoScroller} from '../nanoscroller';
import {VisibilityWatcher} from '../visibilitywatcher';
import {IController} from '../../icontroller';
import {Util} from '../../util';


export class ScrollManager implements IScrollManager {
	private scrollDownLock: number	= 0;

	private affiliate: Affiliate;

	public unreadMessages: number	= 0;

	private mutationObserverHandler (mutation: MutationRecord) : void {
		const $elem: JQuery	= $(
			mutation.addedNodes.length > 0 ?
				mutation.addedNodes[0] :
				mutation.target
		);

		/* Process read-ness and scrolling */
		if ($elem.is('.message-item.unread')) {
			const currentScrollPosition: number	= this.elements.messageList['scrollPosition']();

			if (
				VisibilityWatcher.isVisible &&
				($elem.height() + 50) > currentScrollPosition)
			{
				this.scrollDown();
				$elem.removeClass('unread');
			}

			setTimeout(() => {
				if (
					(
						!VisibilityWatcher.isVisible ||
						!$elem.is(':appeared')
					) &&
					!$elem.find('*').add($elem.parentsUntil().addBack()).is('.app-message')
				) {
					this.unreadMessages	+= 1;
					this.controller.update();

					const intervalId	= setInterval(() => {
						if (
							VisibilityWatcher.isVisible &&
							(
								$elem.is(':appeared') ||
								$elem.nextAll('.message-item:not(.unread)').length > 0
							)
						) {
							clearInterval(intervalId);

							$elem.removeClass('unread');
							this.unreadMessages	-= 1;
							this.controller.update();

							if ($elem.nextAll().length === 0) {
								this.scrollDown();
							}
						}
					}, 100);
				}
			}, 250);
		}

		/* Process image lightboxes */
		else if ($elem.is('p:not(.processed)')) {
			const $html: JQuery	= $($elem[0].outerHTML);

			$html.find('img:not(.emoji)').each((i: number, elem: HTMLElement) => {
				const $this: JQuery	= $(elem);

				if ($this.parent().prop('tagName').toLowerCase() !== 'a') {
					const $a: JQuery	= $('<a></a>');

					$a.attr('href', $this.attr('src'));

					$this.before($a);
					$this.detach();
					$a.append($this);

					Util.getValue($a, 'magnificPopup', o => {}).call($a, {type: 'image'});
				}
			});

			$html.addClass('processed');

			$elem.replaceWith($html);
		}

		/* Amazon affiliate links */
		this.affiliate.process($elem);
	}

	public scrollDown (shouldScrollCyphertext?: boolean) : void {
		if (this.scrollDownLock < 1) {
			try {
				++this.scrollDownLock;

				(
					shouldScrollCyphertext ?
						this.elements.cyphertext :
						this.elements.messageList
				).each((i: number, elem: HTMLElement) => {
					++this.scrollDownLock;

					$(elem).animate(
						{scrollTop: elem.scrollHeight},
						350,
						() => --this.scrollDownLock
					);
				});

				NanoScroller.update();
			}
			finally {
				--this.scrollDownLock;
			}
		}
	}

	/**
	 * @param controller
	 * @param dialogManager
	 * @param isMobile
	 */
	public constructor (
		private controller: IController,
		dialogManager: IDialogManager,
		private isMobile: boolean,
		private elements: IElements
	) {
		this.affiliate	= new Affiliate(dialogManager);

		if (this.isMobile) {
			this.elements.messageBox.focus(this.scrollDown);
		}

		new MutationObserver(mutations => {
			for (let mutationRecord of mutations) {
				this.mutationObserverHandler(mutationRecord);
			}
		}).observe(this.elements.messageListInner[0], {
			childList: true,
			attributes: false,
			characterData: false,
			subtree: true
		});
	}
}
