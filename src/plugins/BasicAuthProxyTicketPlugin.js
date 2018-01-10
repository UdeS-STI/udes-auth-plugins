import { AuthHandler, Utils } from 'udes-node-orchestrator'

/**
 * Authentication using a user/pt in basic auth format.
 * @class
 */
export default class BasicAuthProxyTicketPlugin extends AuthHandler {
  /**
   * Append auth info to HTTP options.
   * @async
   * @param {Object} session - Session variables.
   * @param {Object} options - HTTP options.
   * @param {Boolean} [isFirstAttempt=true] - If false, the Proxy Ticket will be renewed.
   * @returns {Object} HTTP options with appended auth info.
   */
  async authenticate (session, options, isFirstAttempt) {
    try {
      if (!isFirstAttempt || !session.cas.pt) {
        session.cas.pt = await session.getProxyTicket(session.targetService)
      }
    } catch (err) {}

    const { user, pt } = session.cas

    return {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Basic ${Utils.base64Encode(`${user}:${pt}`)}`,
      },
    }
  }
}
