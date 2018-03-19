/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';
import * as Plugins from '../../index';

const {
  BasicAuthPlugin,
  BasicAuthProxyTicketPlugin,
  SessionIdPlugin,
} = Plugins;

describe('index', () => {
  it('should export all plugins correctly', () => {
    expect(Object.keys(Plugins).length).to.be.equal(3);
    expect(BasicAuthPlugin).to.be.not.undefined;
    expect(BasicAuthProxyTicketPlugin).to.be.not.undefined;
    expect(SessionIdPlugin).to.be.not.undefined;
  });
});
