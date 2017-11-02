import AuthHandler from './lib/AuthHandler'

/**
 *
 */
export default class BasicAuthPlugin extends AuthHandler {
  async authenticate (session, options) {
    return {
      ...options,
      auth: {
        user: session.cas.user,
        pass: session.cas.pass,
      },
    }
  }
}
