import {IChat} from 'ichat';
import {IElements} from 'ielements';
import {IPhotoManager} from 'iphotomanager';
import {Config} from 'cyph/config';
import {Util} from 'cyph/util';


export class PhotoManager implements IPhotoManager {
	private processImage (image: HTMLImageElement, file: File) : void {
		const canvas: HTMLCanvasElement			= document.createElement('canvas');
		const context: CanvasRenderingContext2D	=
			<CanvasRenderingContext2D> canvas.getContext('2d')
		;

		let widthFactor: number		= Config.photoConfig.maxWidth / image.width;
		let heightFactor: number	= Config.photoConfig.maxWidth / image.height;

		if (widthFactor > 1) {
			widthFactor		= 1;
		}
		if (heightFactor > 1) {
			heightFactor	= 1;
		}

		const factor: number	= Math.min(widthFactor, heightFactor);

		canvas.width	= image.width * factor;
		canvas.height	= image.height * factor;

		context.drawImage(image, 0, 0, canvas.width, canvas.height);

		const hasTransparency: boolean	=
			file.type !== 'image/jpeg' &&
			context.getImageData(0, 0, image.width, image.height).data[3] !== 255
		;

		const encodedImage: string	=
			hasTransparency ?
				canvas.toDataURL() :
				canvas.toDataURL(
					'image/jpeg',
					Math.min(960 / Math.max(canvas.width, canvas.height), 1)
				)
		;

		this.send(encodedImage);
	}

	private send (encodedImage: string) : void {
		this.chat.send('![](' + encodedImage + ')');
	}

	private watchFileInputButtonClick (elem: HTMLElement) : void {
		let isClicked: boolean;

		$(elem).
			click(e => {
				e.stopPropagation();
				e.preventDefault();
			}).
			parent().click(() => {
				if (!isClicked) {
					isClicked	= true;

					Util.triggerClick(elem);

					let finish: Function;

					const intervalId	= setInterval(() => {
						if (Util.getValue(elem, 'files', []).length > 0) {
							finish();
						}
					}, 500);

					finish	= () => {
						clearInterval(intervalId);
						setTimeout(() =>
							isClicked	= false
						, 500);
					};

					setTimeout(finish, 5000);
				}
			})
		;
	}

	public insert (elem: HTMLInputElement) : void {
		if (elem.files.length > 0) {
			const file: File			= elem.files[0];
			const reader: FileReader	= new FileReader();

			reader.onload	= () => {
				if (file.type === 'image/gif') {
					this.send(reader.result);
				}
				else {
					const image: HTMLImageElement	= new Image();
					image.onload	= () => this.processImage(image, file);
					image.src		= reader.result;
				}
			};

			reader.readAsDataURL(file);
			$(elem).val('');
		}
	}

	/**
	 * @param chat
	 */
	public constructor (private chat: IChat, private elements: IElements) {
		this.elements.buttons.each((i: number, parent: HTMLElement) =>
			new MutationObserver(mutations => {
				for (const mutation of mutations) {
					for (let i = 0 ; i < mutation.addedNodes.length ; ++i) {
						const elem: Node	= mutation.addedNodes[i];

						if (
							(elem['tagName'] || '').toLowerCase() === 'input' &&
							elem['type'] === 'file'
						) {
							this.watchFileInputButtonClick(<HTMLElement> elem);
						}
					}
				}
			}).observe(parent, {
				childList: true,
				attributes: false,
				characterData: false,
				subtree: false
			})
		);

		this.elements.buttons.
			find('input[type="file"]').
			each((i: number, elem: HTMLElement) =>
				this.watchFileInputButtonClick(elem)
			)
		;
	}
}
