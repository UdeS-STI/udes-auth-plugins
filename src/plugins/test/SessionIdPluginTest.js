/* eslint-env mocha */
import 'babel-polyfill';
import { expect } from 'chai';
import SessionIdPlugin from '../SessionIdPlugin';

const options = {};
const session = {
  path: '/path',
  apiSessionIds: {
    '/path': 'session-id',
  },
};

const authObject = {
  headers: {
    'x-sessionid': 'session-id',
  },
};

describe('lib/SessionIdPlugin', () => {
  describe('constructor', () => {
    it('should not throw error on instantiation', () => {
      expect(() => new SessionIdPlugin()).to.not.throw();
    });
  });

  describe('authenticate', () => {
    it('should return correct HTTP options for basic auth', async () => {
      const plugin = new SessionIdPlugin();
      const authData = await plugin.authenticate(session, options);
      expect(authData).to.be.deep.equal(authObject);
    });
  });
});
