import {potassiumUtil} from '../potassium-util';


/**
 * Wrapper for SubtleCrypto key import and export APIs.
 */
export class ImportHelper {
	/** Converts raw byte array into CryptoKey object. */
	public async importRawKey (
		key: Uint8Array,
		algorithm: any,
		purpose: string
	) : Promise<CryptoKey> {
		return crypto.subtle.importKey(
			'raw',
			new Uint8Array(key).buffer,
			algorithm,
			false,
			[purpose]
		);
	}

	/** Converts CryptoKey object into raw byte array. */
	public async exportRawKey (
		cryptoKey: CryptoKey,
		algorithmName: string
	) : Promise<Uint8Array> {
		return (<any> crypto.subtle).exportKey(
			'raw',
			cryptoKey,
			algorithmName
		);
	}

	/** Converts JWK byte array into CryptoKey object. */
	public async importJWK (
		key: Uint8Array,
		algorithm: any,
		purpose: string
	) : Promise<CryptoKey> {
		return crypto.subtle.importKey(
			'jwk',
			JSON.parse(
				potassiumUtil.toString(
					new Uint8Array(key.buffer, key.byteOffset, key.indexOf(0))
				)
			),
			algorithm,
			false,
			[purpose]
		);
	}

	/** Converts CryptoKey object into JWK byte array. */
	public async exportJWK (
		cryptoKey: CryptoKey,
		algorithmName: string
	) : Promise<Uint8Array> {
		return potassiumUtil.fromString(
			JSON.stringify(
				await (<any> crypto.subtle).exportKey(
					'jwk',
					cryptoKey,
					algorithmName
				)
			)
		);
	}

	constructor () {}
}

/** @see ImportHelper */
export const importHelper	= new ImportHelper();
