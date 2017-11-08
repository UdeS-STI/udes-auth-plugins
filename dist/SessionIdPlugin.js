'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AuthHandler2 = require('./lib/AuthHandler');

var _AuthHandler3 = _interopRequireDefault(_AuthHandler2);

var _getSessionId = require('./lib/getSessionId');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Authentication using a session id.
 * @class
 */
var SessionIdPlugin = function (_AuthHandler) {
  _inherits(SessionIdPlugin, _AuthHandler);

  function SessionIdPlugin() {
    _classCallCheck(this, SessionIdPlugin);

    return _possibleConstructorReturn(this, (SessionIdPlugin.__proto__ || Object.getPrototypeOf(SessionIdPlugin)).apply(this, arguments));
  }

  _createClass(SessionIdPlugin, [{
    key: 'authenticate',

    /**
     * Append auth info to HTTP options.
     * @async
     * @param {Object} session - Session variables.
     * @param {Object} options - HTTP options.
     * @returns {Object} HTTP options with appended auth info.
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(session, options) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = _extends;
                _context.t1 = {};
                _context.t2 = options;
                _context.t3 = _extends;
                _context.t4 = {};
                _context.t5 = options.headers || {};
                _context.t6 = session.apiSessionIds[session.path];

                if (_context.t6) {
                  _context.next = 11;
                  break;
                }

                _context.next = 10;
                return (0, _getSessionId.getSessionId)(session);

              case 10:
                _context.t6 = _context.sent;

              case 11:
                _context.t7 = _context.t6;
                _context.t8 = {
                  'x-sessionid': _context.t7
                };
                _context.t9 = (0, _context.t3)(_context.t4, _context.t5, _context.t8);
                _context.t10 = {
                  headers: _context.t9
                };
                return _context.abrupt('return', (0, _context.t0)(_context.t1, _context.t2, _context.t10));

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function authenticate(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return authenticate;
    }()
  }]);

  return SessionIdPlugin;
}(_AuthHandler3.default);

exports.default = SessionIdPlugin;