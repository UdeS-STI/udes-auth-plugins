'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSessionId = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _AuthPluginInterface2 = require('./AuthHandler');

var _AuthPluginInterface3 = _interopRequireDefault(_AuthPluginInterface2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Obtain session id from API.
 * @private
 * @param {Object} session - Current HTTP session.
 * @param {Boolean} [retry=true] - True to update PT and retry getting session id from API.
 * @returns {Promise} Promise object represents session id.
 */
var getSessionId = exports.getSessionId = function getSessionId(session) {
  var retry = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return new Promise(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
      var pt, options;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              pt = void 0;
              _context2.prev = 1;
              _context2.next = 4;
              return session.getProxyTicket(!retry);

            case 4:
              pt = _context2.sent;
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2['catch'](1);

              reject(_context2.t0);

            case 10:
              options = {
                method: 'GET',
                url: session.apiSessionUrl + '?ticket=' + pt,
                headers: {
                  Accept: 'application/json; charset=utf-8',
                  'Content-Type': 'application/json; charset=utf-8',
                  'x-proxy-ticket': pt
                }
              };


              (0, _request2.default)(options, function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(error, response) {
                  var _error, _JSON$parse, sessionId, _error2;

                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!(error || response.statusCode === 401)) {
                            _context.next = 18;
                            break;
                          }

                          if (!retry) {
                            _context.next = 15;
                            break;
                          }

                          _context.prev = 2;
                          _context.t0 = resolve;
                          _context.next = 6;
                          return getSessionId(session, false);

                        case 6:
                          _context.t1 = _context.sent;
                          (0, _context.t0)(_context.t1);
                          _context.next = 13;
                          break;

                        case 10:
                          _context.prev = 10;
                          _context.t2 = _context['catch'](2);

                          reject(_context.t2);

                        case 13:
                          _context.next = 17;
                          break;

                        case 15:
                          _error = { statusCode: 401, message: 'Invalid proxy ticket' };

                          reject(_error);

                        case 17:
                          return _context.abrupt('return');

                        case 18:

                          try {
                            _JSON$parse = JSON.parse(response.body), sessionId = _JSON$parse.sessionId;

                            session.apiSessionId = sessionId;
                            resolve(sessionId);
                          } catch (err) {
                            _error2 = { statusCode: 500, message: 'Cannot get session id' };

                            reject(_error2);
                          }

                        case 19:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined, [[2, 10]]);
                }));

                return function (_x4, _x5) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 12:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[1, 7]]);
    }));

    return function (_x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
};

/**
 *
 */

var SessionIdPlugin = function (_AuthPluginInterface) {
  _inherits(SessionIdPlugin, _AuthPluginInterface);

  function SessionIdPlugin() {
    _classCallCheck(this, SessionIdPlugin);

    return _possibleConstructorReturn(this, (SessionIdPlugin.__proto__ || Object.getPrototypeOf(SessionIdPlugin)).apply(this, arguments));
  }

  _createClass(SessionIdPlugin, [{
    key: 'authenticate',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(session, options) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = _extends;
                _context3.t1 = {};
                _context3.t2 = options;
                _context3.t3 = _extends;
                _context3.t4 = {};
                _context3.t5 = options.headers || {};
                _context3.t6 = session.apiSessionId;

                if (_context3.t6) {
                  _context3.next = 11;
                  break;
                }

                _context3.next = 10;
                return getSessionId(session);

              case 10:
                _context3.t6 = _context3.sent;

              case 11:
                _context3.t7 = _context3.t6;
                _context3.t8 = {
                  'x-sessionid': _context3.t7
                };
                _context3.t9 = (0, _context3.t3)(_context3.t4, _context3.t5, _context3.t8);
                _context3.t10 = {
                  headers: _context3.t9
                };
                return _context3.abrupt('return', (0, _context3.t0)(_context3.t1, _context3.t2, _context3.t10));

              case 16:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function authenticate(_x6, _x7) {
        return _ref3.apply(this, arguments);
      }

      return authenticate;
    }()
  }]);

  return SessionIdPlugin;
}(_AuthPluginInterface3.default);

exports.default = SessionIdPlugin;