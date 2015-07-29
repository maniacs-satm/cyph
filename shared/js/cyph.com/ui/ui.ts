module Cyph.com {
	export module UI {
		/**
		 * Controls the entire cyph.com UI.
		 */
		export class UI {
			private static testimonialActiveClass: string	= 'active';


			private testimonialNumber: number	= 0;

			/** UI state/view. */
			public state: States		= States.home;

			/** Podcast promo page state/view. */
			public podcast: Podcasts	= Podcasts.none;

			/** Cyph demo animation. */
			public cyphDemo: CyphDemo;

			/** Signup form to be displayed throughout the site. */
			public signupForm: Cyph.UI.ISignupForm;

			private incrementTestimonial () : void {
				Elements.testimonialLogos.
					add(Elements.testimonialQuotes).
					removeClass(UI.testimonialActiveClass)
				;

				Elements.testimonialLogos.eq(this.testimonialNumber).
					add(Elements.testimonialQuotes.eq(this.testimonialNumber)).
					addClass(UI.testimonialActiveClass)
				;

				if (++this.testimonialNumber >= Elements.testimonialLogos.length) {
					this.testimonialNumber	= 0;
				}
			}

			private onUrlStateChange (urlState: string) : void {
				const state: States		= States[urlState];
				const podcast: Podcasts	= Podcasts[urlState];

				if (podcast !== undefined) {
					this.openPodcastPage(podcast);
				}
				else if (state !== undefined) {
					this.changeState(state);
				}
				else if (urlState === '') {
					this.changeState(States.home);
				}
				else if (urlState === Cyph.UrlState.states.notFound) {
					this.changeState(States.error);
				}
				else {
					Cyph.UrlState.set(Cyph.UrlState.states.notFound);
					return;
				}

				Cyph.UrlState.set(urlState, true, true);
			}

			private scroll (
				position: number,
				delayFactor: number = 0.75
			) : void {
				const delay: number	=
					delayFactor *
					Math.abs(Cyph.UI.Elements.document.scrollTop() - position)
				;

				Cyph.UI.Elements.html.add(Cyph.UI.Elements.body).animate({
					scrollTop: position
				}, delay);
			}

			/**
			 * Changes UI state.
			 * @param state
			 */
			public changeState (state: States) : void {
				this.state	= state;
				this.controller.update();
			}

			/**
			 * Opens the podcast promo page with the indicated state.
			 * @param podcast
			 */
			public openPodcastPage (podcast: Podcasts) : void {
				this.podcast	= podcast;
				this.changeState(States.podcast);

				Elements.heroText.hide();
				Elements.podcastLogo.attr('src', '/img/' + Podcasts[this.podcast] + '.png');
				setTimeout(() => Elements.heroText.show(), 1);
			}

			/**
			 * Scrolls down and bounces in hero text.
			 */
			public scrollHeroText () : void {
				Elements.heroText.removeClass('bounceInDown').addClass('bounceOutRight');

				setTimeout(() => {
					this.scroll(Cyph.UI.Elements.window.height(), 1.1);

					setTimeout(() => {
						Elements.heroText.removeClass('bounceOutRight').addClass('bounceInDown');
					}, 250);
				}, 250);
			}

			/**
			 * @param controller
			 */
			public constructor (
				private controller: Cyph.IController,
				dialogManager: Cyph.UI.IDialogManager,
				mobileMenu: Cyph.UI.ISidebar
			) {
				this.signupForm	= new Cyph.UI.SignupForm(this.controller);
				this.cyphDemo	= new CyphDemo(this.controller, dialogManager, mobileMenu);

				Cyph.UrlState.onchange(urlState => this.onUrlStateChange(urlState));
				Cyph.UrlState.set(Cyph.UrlState.get(), true, false, false);


				const wowDelay: string			= 'data-wow-delay';
				const platformWowDelay: string	= Cyph.Env.platformString + '-' + wowDelay;

				$('[' + platformWowDelay + ']').each((i: number, elem: HTMLElement) => {
					const $this: JQuery	= $(elem);
					$this.attr(wowDelay, $this.attr(platformWowDelay));
				});

				const platformClass: string	= Cyph.Env.platformString + '-class-';

				$('[class*="' + platformClass + '"]').each((i: number, elem: HTMLElement) => {
					const $this: JQuery	= $(elem);
					$this.attr(
						'class',
						$this.attr('class').replace(new RegExp(platformClass, 'g'), '')
					);
				});

				if (!Cyph.Env.isMobile) {
					new self['WOW']({live: false}).init();
				}


				/* Disable background video on mobile */

				if (Cyph.Env.isMobile) {
					const $mobilePoster: JQuery	= $('<img />');
					$mobilePoster.attr('src', Elements.backgroundVideo.attr('mobile-poster'));

					Elements.backgroundVideo.replaceWith($mobilePoster).remove();
					Elements.backgroundVideo	= $mobilePoster;
				}
				else {
					Elements.backgroundVideo['appear']().
						on('appear', () => Elements.backgroundVideo[0]['play']()).
						on('disappear', () => Elements.backgroundVideo[0]['pause']())
					;
				}

				
				/* Testimonial slideshow */

				this.incrementTestimonial();
				setInterval(() => this.incrementTestimonial(), 10000);


				/* Header / new cyph button animation */

				if (!Cyph.Env.isMobile) {
					setInterval(() => {
						Elements.bouncingDownArrow.removeClass('bounce');

						setTimeout(() => {
							Elements.bouncingDownArrow.addClass('bounce');
						}, 100);
					}, 2500);
				}


				/* Avoid full page reloads */

				$('a[href^="/"]').click(e => {
					e.preventDefault();

					const href: string		= $(e.currentTarget).attr('href');
					let scrollDelay: number	= 500;

					if (href !== locationData.pathname) {
						scrollDelay	= 0;

						Cyph.UrlState.set(href);
					}

					setTimeout(() => this.scroll(0), scrollDelay);
				});


				Cyph.UI.Elements.html.addClass('load-complete');
			}
		}
	}
}
