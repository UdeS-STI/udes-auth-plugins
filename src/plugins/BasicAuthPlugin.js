import { AuthHandler, Utils } from 'udes-node-orchestrator'

/**
 * Authentication using a user/pass in basic auth format.
 * @class
 */
export default class BasicAuthPlugin extends AuthHandler {
  /**
   * Append auth info to HTTP options.
   * @param {Object} session - Session variables.
   * @param {Object} options - HTTP options.
   * @returns {Object} HTTP options with appended auth info.
   */
  authenticate (session, options) {
    const pass = options.pass || session.cas.pass
    const user = options.user || session.cas.user

    delete options.pass
    delete options.user

    return {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Basic ${Utils.base64Encode(`${user}:${pass}`)}`,
      },
    }
  }
}
