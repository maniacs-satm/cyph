import {Potassium} from '../potassium';
import {Util} from '../../util';


/**
 * The core Castle protocol logic.
 */
export class Core {
	public static async newKeys (
		potassium: Potassium,
		isAlice: boolean,
		secret: Uint8Array
	) : Promise<{
		incoming: Uint8Array;
		outgoing: Uint8Array;
	}> {
		const alt: Uint8Array	= await potassium.Hash.deriveKey(
			Potassium.concatMemory(
				false,
				secret,
				new Uint8Array([1])
			),
			secret.length
		);

		return isAlice ?
			{incoming: secret, outgoing: alt} :
			{incoming: alt, outgoing: secret}
		;
	}


	private lock: {}	= {};

	private ephemeralKeys: {
		public: Uint8Array;
		private: Uint8Array;
	}	= {
		public: null,
		private: null
	};

	private async ratchet (incomingPublicKey?: Uint8Array) : Promise<Uint8Array> {
		let outgoingPublicKey: Uint8Array;

		/* Part 1: Alice (outgoing) */
		if (this.isAlice && !this.ephemeralKeys.private && !incomingPublicKey) {
			const ephemeralKeyPair		=
				await this.potassium.EphemeralKeyExchange.aliceKeyPair()
			;

			this.ephemeralKeys.private	= ephemeralKeyPair.privateKey;
			outgoingPublicKey			= ephemeralKeyPair.publicKey;
		}

		/* Part 2a: Bob (incoming) */
		else if (!this.isAlice && !this.ephemeralKeys.public && incomingPublicKey) {
			const secretData			=
				await this.potassium.EphemeralKeyExchange.bobSecret(
					incomingPublicKey
				)
			;

			this.ephemeralKeys.public	= secretData.publicKey;

			this.keys.push(await Core.newKeys(
				this.potassium,
				this.isAlice,
				secretData.secret
			));
		}

		/* Part 2b: Bob (outgoing) */
		else if (!this.isAlice && this.ephemeralKeys.public && !incomingPublicKey) {
			outgoingPublicKey			= this.ephemeralKeys.public;
			this.ephemeralKeys.public	= null;
		}

		/* Part 3: Alice (incoming) */
		else if (this.isAlice && this.ephemeralKeys.private && incomingPublicKey) {
			const secret: Uint8Array	=
				await this.potassium.EphemeralKeyExchange.aliceSecret(
					incomingPublicKey,
					this.ephemeralKeys.private
				)
			;

			Potassium.clearMemory(this.ephemeralKeys.private);
			this.ephemeralKeys.private	= null;

			this.keys.push(await Core.newKeys(
				this.potassium,
				this.isAlice,
				secret
			));
		}

		if (outgoingPublicKey) {
			return Potassium.concatMemory(
				true,
				new Uint8Array([1]),
				outgoingPublicKey
			);
		}
		else {
			return new Uint8Array([0]);
		}
	}

	/**
	 * Receive incoming cyphertext.
	 * @param cyphertext Data to be decrypted.
	 * @returns Plaintext.
	 */
	public async decrypt (cyphertext: Uint8Array) : Promise<DataView> {
		return Util.lock(this.lock, async () => {
			const messageId: Uint8Array	= new Uint8Array(cyphertext.buffer, 0, 8);
			const encrypted: Uint8Array	= new Uint8Array(cyphertext.buffer, 8);

			let plaintext: DataView;

			for (let i = this.keys.length - 1 ; i >= 0 ; --i) {
				try {
					const keys	= this.keys[i];

					if (plaintext) {
						this.keys.splice(i, 1);
						Potassium.clearMemory(keys.incoming);
						Potassium.clearMemory(keys.outgoing);
						continue;
					}

					const incomingKey: Uint8Array	= await this.potassium.Hash.deriveKey(
						keys.incoming
					);

					const decrypted: Uint8Array		= await this.potassium.SecretBox.open(
						encrypted,
						incomingKey,
						messageId
					);

					Potassium.clearMemory(keys.incoming);
					keys.incoming	= incomingKey;

					let startIndex: number	= 1;
					if (decrypted[0] === 1) {
						await this.ratchet(new Uint8Array(
							decrypted.buffer,
							startIndex,
							this.potassium.EphemeralKeyExchange.publicKeyBytes
						));

						startIndex += this.potassium.EphemeralKeyExchange.publicKeyBytes;
					}

					plaintext	= new DataView(decrypted.buffer, startIndex);
				}
				catch (_) {}
			}

			if (!plaintext) {
				throw new Error('Invalid cyphertext.');
			}

			return plaintext;
		});
	}

	/**
	 * Encrypt outgoing text.
	 * @param plaintext Data to be encrypted.
	 * @param messageId Used to enforce message ordering.
	 * @returns Cyphertext.
	 */
	public async encrypt (
		plaintext: Uint8Array,
		messageId: Uint8Array
	) : Promise<Uint8Array> {
		return Util.lock(this.lock, async () => {
			this.keys[0].outgoing	= await this.potassium.Hash.deriveKey(
				this.keys[0].outgoing,
				undefined,
				true
			);

			const fullPlaintext: Uint8Array	= Potassium.concatMemory(
				false,
				await this.ratchet(),
				plaintext
			);

			const cyphertext: Uint8Array	= await this.potassium.SecretBox.seal(
				fullPlaintext,
				this.keys[0].outgoing,
				messageId
			);

			Potassium.clearMemory(fullPlaintext);

			return cyphertext;
		});
	}

	/**
	 * @param potassium
	 * @param isAlice
	 * @param keys Initial state of key ratchet.
	 */
	public constructor (
		private potassium: Potassium,
		private isAlice: boolean,
		private keys: {incoming: Uint8Array; outgoing: Uint8Array;}[]
	) {}
}
