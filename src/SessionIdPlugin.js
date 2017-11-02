import AuthHandler from './lib/AuthHandler'
import { getSessionId } from './lib/getSessionId'

/**
 *
 */
export default class SessionIdPlugin extends AuthHandler {
  async authenticate (session, options) {
    return {
      ...options,
      headers: {
        ...(options.headers || {}),
        'x-sessionid': session.apiSessionId || await getSessionId(session),
      },
    }
  }
}
