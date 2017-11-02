'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Interface for handling various types of authentication.
 * @interface
 */
var AuthHandler = function AuthHandler() {
  _classCallCheck(this, AuthHandler);

  if (this.constructor.name === 'AuthHandler') {
    throw Error('Cannot instantiate an interface');
  }

  if (!this.authenticate) {
    throw Error('Missing interface method `authenticate`');
  }

  var authFn = this.authenticate;
  this.authenticate = function (session, options) {
    var retry = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    return authFn(session, options, retry);
  };
};

exports.default = AuthHandler;