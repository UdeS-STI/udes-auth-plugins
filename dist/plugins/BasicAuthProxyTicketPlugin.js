'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AuthPluginInterface2 = require('./AuthHandler');

var _AuthPluginInterface3 = _interopRequireDefault(_AuthPluginInterface2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 */
var BasicAuthProxyTicketPlugin = function (_AuthPluginInterface) {
  _inherits(BasicAuthProxyTicketPlugin, _AuthPluginInterface);

  function BasicAuthProxyTicketPlugin() {
    _classCallCheck(this, BasicAuthProxyTicketPlugin);

    return _possibleConstructorReturn(this, (BasicAuthProxyTicketPlugin.__proto__ || Object.getPrototypeOf(BasicAuthProxyTicketPlugin)).apply(this, arguments));
  }

  _createClass(BasicAuthProxyTicketPlugin, [{
    key: 'authenticate',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(session, options, retry) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.t0 = session.cas.pt;

                if (_context.t0) {
                  _context.next = 6;
                  break;
                }

                _context.next = 5;
                return session.getProxyTicket(!retry);

              case 5:
                _context.t0 = _context.sent;

              case 6:
                session.cas.pt = _context.t0;
                _context.next = 11;
                break;

              case 9:
                _context.prev = 9;
                _context.t1 = _context['catch'](0);

              case 11:
                return _context.abrupt('return', _extends({}, options, {
                  auth: {
                    user: session.cas.user,
                    pass: session.cas.pt
                  }
                }));

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));

      function authenticate(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return authenticate;
    }()
  }]);

  return BasicAuthProxyTicketPlugin;
}(_AuthPluginInterface3.default);

exports.default = BasicAuthProxyTicketPlugin;