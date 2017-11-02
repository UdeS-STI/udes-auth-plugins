'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AuthHandler2 = require('./lib/AuthHandler');

var _AuthHandler3 = _interopRequireDefault(_AuthHandler2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Authentication using a user/pass in basic auth format.
 * @class
 */
var BasicAuthPlugin = function (_AuthHandler) {
  _inherits(BasicAuthPlugin, _AuthHandler);

  function BasicAuthPlugin() {
    _classCallCheck(this, BasicAuthPlugin);

    return _possibleConstructorReturn(this, (BasicAuthPlugin.__proto__ || Object.getPrototypeOf(BasicAuthPlugin)).apply(this, arguments));
  }

  _createClass(BasicAuthPlugin, [{
    key: 'authenticate',

    /**
     * Append auth info to HTTP options.
     * @param {Object} session - Session variables.
     * @param {Object} options - HTTP options.
     * @returns {Object} HTTP options with appended auth info.
     */
    value: function authenticate(session, options) {
      return _extends({}, options, {
        auth: {
          user: session.cas.user,
          pass: session.cas.pass
        }
      });
    }
  }]);

  return BasicAuthPlugin;
}(_AuthHandler3.default);

exports.default = BasicAuthPlugin;