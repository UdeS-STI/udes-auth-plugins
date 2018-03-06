import { AuthHandler } from 'udes-node-orchestrator';
import { getSessionId } from '../lib/getSessionId';

/**
 * Authentication using a session id.
 * @class
 */
export default class SessionIdPlugin extends AuthHandler {
  /**
   * Append auth info to HTTP options.
   * @async
   * @param {Object} session - Session variables.
   * @param {Object} options - HTTP options.
   * @returns {Object} HTTP options with appended auth info.
   */
  async authenticate(session, options) {
    return {
      ...options,
      headers: {
        ...(options.headers || {}),
        'x-sessionid': session.apiSessionIds[session.path] || await getSessionId(session),
      },
    };
  }
}
