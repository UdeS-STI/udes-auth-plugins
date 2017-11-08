'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSessionId = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
              return session.getProxyTicket(session.targetService, !retry);

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
                  var _error, sessionId, _error2;

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
                            sessionId = response.headers['x-sessionid'];

                            session.apiSessionIds[session.path] = sessionId;
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