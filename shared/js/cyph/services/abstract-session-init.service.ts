import {Injectable} from '@angular/core';


/**
 * Provides ID for initiating new Session.
 */
@Injectable()
export class AbstractSessionInitService {
	/** If set, indicates an initial call type for the session. */
	public readonly callType: 'audio'|'video'|undefined;

	/** ID for initiating new Session. */
	public readonly id: string;

	constructor () {
		throw new Error('Must provide an implementation of AbstractSessionInitService.');
	}
}
