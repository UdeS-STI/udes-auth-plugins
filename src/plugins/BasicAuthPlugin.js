import { AuthHandler } from 'udes-node-orchestrator'

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
    return {
      ...options,
      auth: {
        user: session.cas.user,
        pass: session.cas.pass,
      },
    }
  }
}
