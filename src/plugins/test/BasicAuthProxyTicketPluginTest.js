/* eslint-env mocha */
import 'babel-polyfill';
import { expect } from 'chai';
import BasicAuthProxyTicketPlugin from '../BasicAuthProxyTicketPlugin';

const options = {};
const session = {
  cas: {
    user: 'user',
    pt: 'pt',
  },
};

const authObject = {
  headers: {
    Authorization: 'Basic dXNlcjpwdA==',
  },
};

describe('lib/BasicAuthProxyTicketPlugin', () => {
  describe('constructor', () => {
    it('should not throw error on instantiation', () => {
      expect(() => new BasicAuthProxyTicketPlugin()).to.not.throw();
    });
  });

  describe('authenticate', () => {
    it('should return correct HTTP options for basic auth', async () => {
      const plugin = new BasicAuthProxyTicketPlugin();
      const authData = await plugin.authenticate(session, options);
      expect(authData).to.be.deep.equal(authObject);
    });
  });
});
