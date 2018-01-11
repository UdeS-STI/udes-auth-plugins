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
    const cas = session.cas || {};
    const pass = options.pass || cas.pass
    const user = options.user || cas.user

    delete options.pass
    delete options.user

    const newOptions  = {
      ...options,
      headers: {
        ...(options.headers || {}),
      },
    }

    if (user && pass) {
      newOptions.headers.Authorization = `Basic ${Utils.base64Encode(`${user}:${pass}`)}`
    }

    return newOptions
  }
}
