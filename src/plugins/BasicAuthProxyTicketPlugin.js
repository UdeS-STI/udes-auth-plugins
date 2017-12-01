import { AuthHandler } from 'udes-node-orchestrator'

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
      if (isFirstAttempt) {
        session.cas.pt = session.cas.pt || await session.getProxyTicket(session.targetService)
      } else {
        session.cas.pt = await session.getProxyTicket(session.targetService, true)
      }
    } catch (err) {}

    return {
      ...options,
      auth: {
        user: session.cas.user,
        pass: session.cas.pt,
      },
    }
  }
}
