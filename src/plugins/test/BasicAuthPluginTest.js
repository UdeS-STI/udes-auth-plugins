/* eslint-env mocha */
import 'babel-polyfill'
import { expect } from 'chai'
import BasicAuthPlugin from '../BasicAuthPlugin'

const options = {}
const session = {
  cas: {
    user: 'user',
    pass: 'pass',
  },
}

const authObject = {
  headers: {
    Authorization: 'Basic dXNlcjpwYXNz',
  },
}

describe('lib/BasicAuthPlugin', () => {
  describe('constructor', () => {
    it('should not throw error on instantiation', () => {
      expect(() => new BasicAuthPlugin()).to.not.throw()
    })
  })

  describe('authenticate', () => {
    it('should return correct HTTP options for basic auth', async () => {
      const plugin = new BasicAuthPlugin()
      const authData = await plugin.authenticate(session, options)
      expect(authData).to.be.deep.equal(authObject)
    })

    it('should return correct HTTP options for basic auth when passing custom auth options', async () => {
      const plugin = new BasicAuthPlugin()
      const authData = await plugin.authenticate(session, {
        user: 'newuser',
        pass: 'newpass',
      })
      expect(authData).to.be.deep.equal({
        headers: {
          Authorization: 'Basic bmV3dXNlcjpuZXdwYXNz'
        }
      })
    })
  })
})
