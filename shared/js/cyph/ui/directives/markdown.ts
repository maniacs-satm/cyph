import {Env} from '../../env';


/**
 * Angular directive for rendering Markdown.
 */
export class Markdown {
	/** Module/directive title. */
	public static title: string	= 'cyphMarkdown';

	private static _	= (() => {
		angular.module(Markdown.title, []).directive(Markdown.title, () => ({
			restrict: 'A',
			replace: true,
			link: (scope, element, attrs) => {
				const markdown: any	= new self['markdownit']({
					html: false,
					breaks: true,
					linkify: true,
					typographer: true,
					quotes:
						(
							Env.language === 'ru' ?
								'«»' :
								Env.language === 'de' ?
									'„“' :
									'“”'
						) +
						'‘’'
					,
					highlight: s => self['microlight'].process(s, element.css('color'))
				}).
					disable('image').
					use(self['markdownitSup']).
					use(self['markdownitEmoji'])
				;

				const set	= (val: string) =>
					element.html(
						DOMPurify.sanitize(
							markdown.render(val).

								/* Merge blockquotes like reddit */
								replace(/\<\/blockquote>\n\<blockquote>\n/g, '').

								/* Images */
								replace(
									/!\<a href="(data:image\/(png|jpeg|gif)\;.*?)"><\/a>/g,
									(match, value: string) => {
										const img: HTMLImageElement	= document.createElement('img');
										img.src	= value;
										return img.outerHTML;
									}
								).

								/* Block window.opener in new window */
								replace(
									/\<a href=/g,
									'<a rel="noreferrer" href='
								)
							,
							{
								FORBID_TAGS: ['style'],
								SAFE_FOR_JQUERY: true
							}
						)
					)
				;

				set(scope[Markdown.title] || '');
				scope.$watch(attrs[Markdown.title], set);
			}
		}));
	})();
}
