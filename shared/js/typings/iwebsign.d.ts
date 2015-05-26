/**
 * Interaction bridge between WebSign bootstrap and the current package.
 * @interface
 */
interface IWebSign {
	/** Text of current bootstrap payload. */
	bootstrapText: string;

	/** URL of CDN node used to download current package. */
	cdnUrl: string;

	/** Continent of CDN node used to download current package. */
	continent: string;

	/** Indicates whether this is Tor hidden service. */
	isOnion: boolean;

	/** Indicates whether this is the current version of WebSign (Ed25519/SHA256). */
	v3: boolean;

	/** Configuration. */
	config: {
		abortText: string;
		cdnUrlBase: string;
		continentUrl: string;
		defaultContinent: string;
		hashPath: string;
		packagePath: string;
		urlProtocol: string;
		files: string[];
		publicKeys: string[];
	};

	/**
	 * Asynchronously get and set the bootstapText property, then run callback.
	 * @param callback
	 */
	loadBootstrapText (callback: Function) : void;

	/**
	 * Indicates whether an alternative CDN node exists if package download fails.
	 */
	shouldRetry () : boolean;

	/**
	 * Includes bootstrap hashes, package hash, continent, and optionally bootstrap text.
	 * @param shouldIncludeBootstrapText
	 */
	toString (shouldIncludeBootstrapText?: boolean) : string;
}
