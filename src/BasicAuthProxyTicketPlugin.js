import AuthHandler from './lib/AuthHandler'

/**
 *
 */
export default class BasicAuthProxyTicketPlugin extends AuthHandler {
  async authenticate (session, options, retry) {
    try {
      session.cas.pt = session.cas.pt || await session.getProxyTicket(!retry)
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
