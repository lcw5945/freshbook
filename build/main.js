require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(21);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Created by Cray on 2017/5/25.
                                                                                                                                                                                                                                                                               */


var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    /**
     * 验证是否登录
     * @returns {*}
     */
    checkLogin: function checkLogin(ctx) {
        var status = null;
        if (ctx.session.userInfo && ctx.session.userInfo.userId) {
            status = true;
        } else {
            status = false;
            ctx.body = { code: 401, data: null, msg: '未登陆' };
        }
        return status;
    },

    /**
     * 查询参数验证
     * @param req
     * @param res
     * @returns {*}
     */
    queryValidate: function queryValidate(ctx) {
        var query = ctx.query;
        if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) !== 'object') {
            return null;
        }
        // query = Object.keys(query).length > 0 ? query : null

        return _lodash2.default.omit(query, ['token']);
    },


    /**
     * 提交参数验证
     * @param req
     * @param res
     * @returns {*}
     */
    bodyValidate: function bodyValidate(ctx) {
        var body = ctx.request.body;
        if ((typeof body === 'undefined' ? 'undefined' : _typeof(body)) !== 'object') {
            return null;
        }
        return _lodash2.default.omit(body, ['token']);
    },


    /**
     * token 验证
     * @param req
     * @param res
     * @returns {*}
     */
    tokenValidate: function tokenValidate(ctx) {
        var body = ctx.body;
        var query = ctx.query;
        if ((typeof body === 'undefined' ? 'undefined' : _typeof(body)) !== 'object' || (typeof query === 'undefined' ? 'undefined' : _typeof(query)) !== 'object') {
            return null;
        }

        if (query.hasOwnProperty('token')) {
            return query;
        }

        return body;
    }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _category = __webpack_require__(28);

var _category2 = _interopRequireDefault(_category);

var _comment = __webpack_require__(29);

var _comment2 = _interopRequireDefault(_comment);

var _books = __webpack_require__(30);

var _books2 = _interopRequireDefault(_books);

var _user = __webpack_require__(31);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    category: _category2.default,
    books: _books2.default,
    user: _user2.default,
    comment: _comment2.default
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _wraper = __webpack_require__(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    /**
     * 抓取数据
     * @param {*} model
     */
    fetch: function fetch(model) {
        var sortType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'update_time';
        var conditions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        return new Promise(function (resolve, reject) {
            model.fetch(function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            }, sortType, conditions);
        });
    },

    /**
     * 分页获取数据
     */
    fetchPage: function fetchPage(model, skip, limit, sortType, conditions) {
        return new Promise(function (resolve, reject) {
            model.fetchPage(parseInt(skip), parseInt(limit), function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            }, sortType, conditions);
        });
    },


    /**
     * 分页获取数据 关联查询
     */
    refFetchPage: function refFetchPage(model, skip, limit, sortType, conditions) {
        return new Promise(function (resolve, reject) {
            model.refFetchPage(parseInt(skip), parseInt(limit), function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            }, sortType, conditions);
        });
    },


    /**
     * 查找多个
     * @param {*} model
     * @param {*} conditions
     */
    find: function find(model, conditions) {
        return new Promise(function (resolve, reject) {
            model.findInfo(conditions, function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    },


    /**
     * 查找一个
     * @param {*} model
     * @param {*} id
     */
    findById: function findById(model, id) {
        return new Promise(function (resolve, reject) {
            model.findById(id, function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    },

    /**
     * 查找一个 关联查询
     * @param {*} model
     * @param {*} id
     */
    refFindById: function refFindById(model, id) {
        return new Promise(function (resolve, reject) {
            model.refFindById(id, function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    },


    /**
     * 查询多个id数据
     * @param {*} model
     * @param {*} ids
     */
    findByMulId: function findByMulId(model, ids) {
        return new Promise(function (resolve, reject) {
            model.findByMulId(ids, function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    },


    /**
     * 数量查询
     * @param {*} model
     * @param {*} conditions
     */
    count: function count(model, conditions) {
        return new Promise(function (resolve, reject) {
            model.count(conditions, function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    },


    /**
     * 创建文档
     * @param {*} model
     * @param {*} doc
     */
    create: function create(model, doc) {
        //封装参数
        doc = (0, _wraper.wraper)(model, doc);
        return new Promise(function (resolve, reject) {
            model.createInfo(doc, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },


    /**
     * 更新
     * @param {*} model
     * @param {*} id
     * @param {*} params
     */
    update: function update(model, id, params) {
        return new Promise(function (resolve, reject) {
            model.updateInfo(id, params, function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    },

    /**
     * 更新
     * @param {*} model
     * @param {*} id
     * @param {*} params
     */
    updateBase: function updateBase(model) {
        var conditions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var update = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        return new Promise(function (resolve, reject) {
            model.update(conditions, update, options, function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    },


    /**
     * 删除by id
     * @param {*} model
     * @param {*} id
     */
    remove: function remove(model, id) {
        return new Promise(function (resolve, reject) {
            model.removeInfo(id, function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.booksCtrl = undefined;

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(4);

var _index2 = _interopRequireDefault(_index);

var _entity = __webpack_require__(6);

var _entity2 = _interopRequireDefault(_entity);

var _child_process = __webpack_require__(33);

var _mongoose = __webpack_require__(5);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BookControl = function () {
    function BookControl() {
        _classCallCheck(this, BookControl);
    }

    /**
     * 获得所有发布的内容
     */


    _createClass(BookControl, [{
        key: 'bookList',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(conditions, skip, limit) {
                var sort, res, arr, doc, i, item, comment;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                sort = 'post_time', res = null, arr = [];

                                // 发现

                                if (conditions.type) {
                                    sort = 'update_time';
                                    delete conditions.type;
                                }

                                _context.next = 4;
                                return _entity2.default.refFetchPage(_index2.default.books, parseInt(skip), parseInt(limit), sort, _extends({
                                    post: 1
                                }, conditions)).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'query error'
                                    };
                                });

                            case 4:
                                doc = _context.sent;
                                i = 0;

                            case 6:
                                if (!(i < doc.length)) {
                                    _context.next = 16;
                                    break;
                                }

                                item = doc[i]._doc, comment = '';

                                if (!item.commentid) {
                                    _context.next = 12;
                                    break;
                                }

                                _context.next = 11;
                                return _entity2.default.findById(_index2.default.comment, item.commentid).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'query error'
                                    };
                                });

                            case 11:
                                comment = _context.sent;

                            case 12:
                                if (comment.comments) item['commentLength'] = comment.comments.length;

                            case 13:
                                i++;
                                _context.next = 6;
                                break;

                            case 16:

                                // 解析数据
                                if (!res) {
                                    res = {
                                        code: 200,
                                        data: doc,
                                        msg: ''
                                    };
                                }

                                //返回数据
                                return _context.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 18:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function bookList(_x, _x2, _x3) {
                return _ref.apply(this, arguments);
            }

            return bookList;
        }()

        /**
         * 获得图书详情
         */

    }, {
        key: 'bookDetail',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(bookid) {
                var res, doc, item, comment, category;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                res = null;
                                _context2.next = 3;
                                return _entity2.default.refFindById(_index2.default.books, bookid).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'query error'
                                    };
                                });

                            case 3:
                                doc = _context2.sent;

                                if (!doc) {
                                    _context2.next = 16;
                                    break;
                                }

                                item = doc._doc, comment = '', category = '';

                                if (!item.commentid) {
                                    _context2.next = 10;
                                    break;
                                }

                                _context2.next = 9;
                                return _entity2.default.findById(_index2.default.comment, item.commentid).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'query error'
                                    };
                                });

                            case 9:
                                comment = _context2.sent;

                            case 10:
                                if (!item.categoryid) {
                                    _context2.next = 14;
                                    break;
                                }

                                _context2.next = 13;
                                return _entity2.default.findById(_index2.default.category, item.categoryid).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'query error'
                                    };
                                });

                            case 13:
                                category = _context2.sent;

                            case 14:
                                if (comment.comments) item['comment'] = comment.comments;
                                if (category.name) item['category'] = category.name;

                            case 16:
                                // 解析数据
                                if (!res) {
                                    res = {
                                        code: 200,
                                        data: doc,
                                        msg: ''
                                    };
                                }

                                //返回数据
                                return _context2.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 18:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function bookDetail(_x4) {
                return _ref2.apply(this, arguments);
            }

            return bookDetail;
        }()

        /**
         * 添加star
         */

    }, {
        key: 'updateStar',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(userid, bookid, star) {
                var res, userData, bookData, bookDataStar, userDataStar;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                //参数验证
                                star = star === 1 ? 1 : 0;

                                res = null;
                                _context3.next = 4;
                                return _entity2.default.findById(_index2.default.user, userid).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'user query error'
                                    };
                                });

                            case 4:
                                userData = _context3.sent;
                                _context3.next = 7;
                                return _entity2.default.refFindById(_index2.default.books, bookid).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'book query error'
                                    };
                                });

                            case 7:
                                bookData = _context3.sent;

                                if (res) {
                                    _context3.next = 22;
                                    break;
                                }

                                if (!(bookData && bookData.userid._id == userid)) {
                                    _context3.next = 13;
                                    break;
                                }

                                res = {
                                    code: 500,
                                    data: null,
                                    msg: '不能收藏自己的文章'
                                };
                                _context3.next = 22;
                                break;

                            case 13:
                                bookDataStar = void 0;
                                userDataStar = userData.star;

                                if (bookData) {
                                    bookDataStar = bookData.star;
                                }

                                if (star == 1) {
                                    if (!_lodash2.default.some(bookDataStar, { userid: userid })) {
                                        bookDataStar.push({
                                            userid: userid,
                                            headimgurl: userData.headimgurl,
                                            nickname: userData.nickname
                                        });
                                    }
                                    if (!_lodash2.default.some(userDataStar, { bookid: bookid })) {
                                        userDataStar.push(bookData);
                                    }
                                } else {
                                    if (bookDataStar) {
                                        _lodash2.default.remove(bookDataStar, function (item) {
                                            return item.userid == userid;
                                        });
                                        _lodash2.default.remove(userDataStar, function (item) {
                                            return item._id == bookid;
                                        });
                                    } else {
                                        _lodash2.default.remove(userDataStar, function (item) {
                                            return item._id == bookid;
                                        });
                                    }
                                }

                                //成功返回数据
                                res = {
                                    code: 200,
                                    data: null,
                                    msg: 'update success'
                                    //开始更新如果出错设置返回出错数据
                                };_context3.next = 20;
                                return _entity2.default.update(_index2.default.books, bookid, {
                                    star: bookDataStar,
                                    update_time: Date.now()
                                }).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'update fail'
                                    };
                                });

                            case 20:
                                _context3.next = 22;
                                return _entity2.default.update(_index2.default.user, userid, {
                                    star: userDataStar
                                }).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'update fail'
                                    };
                                });

                            case 22:
                                return _context3.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 23:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function updateStar(_x5, _x6, _x7) {
                return _ref3.apply(this, arguments);
            }

            return updateStar;
        }()

        /**
         * 更新图书
         * title
         * html
         * markdown
         */

    }, {
        key: 'updateBook',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(bookid, params) {
                var res, doc, upData;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                res = null, doc = null, upData = _lodash2.default.pick(params, ['title', 'html', 'markdown', 'categoryid', 'userid', 'cover']);

                                if (!upData.categoryid) upData.categoryid = '000000000000000000000000';
                                upData.update_time = Date.now();

                                if (!bookid) {
                                    _context4.next = 10;
                                    break;
                                }

                                _context4.next = 6;
                                return _entity2.default.update(_index2.default.books, bookid, upData).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'query error'
                                    };
                                });

                            case 6:
                                doc = _context4.sent;

                                res = res || {
                                    code: 200,
                                    data: doc,
                                    msg: '更新成功'
                                };
                                _context4.next = 15;
                                break;

                            case 10:
                                upData['post'] = 0;
                                _context4.next = 13;
                                return _entity2.default.create(_index2.default.books, upData).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'query error'
                                    };
                                });

                            case 13:
                                doc = _context4.sent;

                                res = res || {
                                    code: 200,
                                    data: doc,
                                    msg: '添加成功'
                                };

                            case 15:
                                return _context4.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 16:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function updateBook(_x8, _x9) {
                return _ref4.apply(this, arguments);
            }

            return updateBook;
        }()

        /**
         * 删除book
         */

    }, {
        key: 'deleteBook',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(bookid, userInfo) {
                var res, canDeleteFlag, bookData;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                res = null, canDeleteFlag = false;


                                if (userInfo && userInfo.authority > 0) {
                                    // 权限 0 普通用户 1 管理员 2 超级管理员
                                    canDeleteFlag = true;
                                }

                                if (canDeleteFlag) {
                                    _context5.next = 7;
                                    break;
                                }

                                _context5.next = 5;
                                return _entity2.default.findById(_index2.default.books, bookid).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'book query error'
                                    };
                                });

                            case 5:
                                bookData = _context5.sent;


                                if (bookData.userid == userInfo.userId) {
                                    // 作者 可删除
                                    canDeleteFlag = true;
                                } else {
                                    res = {
                                        code: 403,
                                        data: {},
                                        msg: '没有权限删除'
                                    };
                                }

                            case 7:
                                if (!canDeleteFlag) {
                                    _context5.next = 10;
                                    break;
                                }

                                _context5.next = 10;
                                return _entity2.default.remove(_index2.default.books, bookid).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'delete error'
                                    };
                                });

                            case 10:

                                if (!res) {
                                    res = {
                                        code: 200,
                                        data: {},
                                        msg: 'del success'
                                    };
                                }

                                return _context5.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 12:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function deleteBook(_x10, _x11) {
                return _ref5.apply(this, arguments);
            }

            return deleteBook;
        }()

        /**
         * 根据分组得到book的数量
         * title
         * cateGoryId
         */

    }, {
        key: 'countCategoryBook',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(conditions) {
                var res, categorys, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, obj, doc;

                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                res = null;

                                conditions.post = 1;

                                _context6.next = 4;
                                return _entity2.default.fetch(_index2.default.category).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'categorys query error'
                                    };
                                });

                            case 4:
                                categorys = _context6.sent;

                                if (res) {
                                    _context6.next = 35;
                                    break;
                                }

                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context6.prev = 9;
                                _iterator = categorys[Symbol.iterator]();

                            case 11:
                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                    _context6.next = 21;
                                    break;
                                }

                                obj = _step.value;

                                conditions.categoryid = obj._id;
                                _context6.next = 16;
                                return _entity2.default.count(_index2.default.books, conditions).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'books query error'
                                    };
                                });

                            case 16:
                                doc = _context6.sent;

                                obj._doc['count'] = doc;

                            case 18:
                                _iteratorNormalCompletion = true;
                                _context6.next = 11;
                                break;

                            case 21:
                                _context6.next = 27;
                                break;

                            case 23:
                                _context6.prev = 23;
                                _context6.t0 = _context6['catch'](9);
                                _didIteratorError = true;
                                _iteratorError = _context6.t0;

                            case 27:
                                _context6.prev = 27;
                                _context6.prev = 28;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 30:
                                _context6.prev = 30;

                                if (!_didIteratorError) {
                                    _context6.next = 33;
                                    break;
                                }

                                throw _iteratorError;

                            case 33:
                                return _context6.finish(30);

                            case 34:
                                return _context6.finish(27);

                            case 35:
                                // 解析数据
                                if (!res) {
                                    res = {
                                        code: 200,
                                        data: categorys,
                                        msg: ''
                                    };
                                }

                                //返回数据
                                return _context6.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 37:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[9, 23, 27, 35], [28,, 30, 34]]);
            }));

            function countCategoryBook(_x12) {
                return _ref6.apply(this, arguments);
            }

            return countCategoryBook;
        }()

        /**
         * 个人主页已发布或者草稿
         * */

    }, {
        key: 'userBookList',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(skip, limit) {
                var conditions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                var res, doc, postCount, i, item, category;
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                res = null, doc = [];

                                skip = parseInt(skip);
                                limit = parseInt(limit);
                                _context7.next = 5;
                                return _entity2.default.count(_index2.default.books, conditions).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'books query error'
                                    };
                                });

                            case 5:
                                postCount = _context7.sent;

                                if (!postCount) {
                                    _context7.next = 26;
                                    break;
                                }

                                if (postCount <= skip) {
                                    skip = skip - limit;
                                }
                                _context7.next = 10;
                                return _entity2.default.refFetchPage(_index2.default.books, skip, limit, 'update_time', conditions).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'query error'
                                    };
                                });

                            case 10:
                                doc = _context7.sent;

                                if (!(!res && doc.length > 0)) {
                                    _context7.next = 26;
                                    break;
                                }

                                i = 0;

                            case 13:
                                if (!(i < doc.length)) {
                                    _context7.next = 26;
                                    break;
                                }

                                item = doc[i]._doc, category = {};

                                if (!item.categoryid) {
                                    _context7.next = 23;
                                    break;
                                }

                                _context7.next = 18;
                                return _entity2.default.findById(_index2.default.category, item.categoryid).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'query error'
                                    };
                                });

                            case 18:
                                _context7.t0 = _context7.sent;

                                if (_context7.t0) {
                                    _context7.next = 21;
                                    break;
                                }

                                _context7.t0 = {};

                            case 21:
                                category = _context7.t0;

                                if (category.name) {
                                    item['category'] = category.name;
                                }

                            case 23:
                                i++;
                                _context7.next = 13;
                                break;

                            case 26:

                                if (!res) {
                                    res = {
                                        code: 200,
                                        data: { list: doc, total: postCount },
                                        msg: ''
                                    };
                                }

                                //返回数据
                                return _context7.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 28:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function userBookList(_x13, _x14) {
                return _ref7.apply(this, arguments);
            }

            return userBookList;
        }()

        /**
         * 个人主页已发布，草稿，收藏总数
         * */

    }, {
        key: 'countUserBook',
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
                var conditions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var res, postCount, unPostCount, userData;
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                res = null;
                                _context8.next = 3;
                                return _entity2.default.count(_index2.default.books, Object.assign(conditions, { post: 1 })).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'books query error'
                                    };
                                });

                            case 3:
                                postCount = _context8.sent;
                                _context8.next = 6;
                                return _entity2.default.count(_index2.default.books, Object.assign(conditions, { post: 0 })).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'books query error'
                                    };
                                });

                            case 6:
                                unPostCount = _context8.sent;
                                _context8.next = 9;
                                return _entity2.default.findById(_index2.default.user, conditions.userid).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'query error'
                                    };
                                });

                            case 9:
                                userData = _context8.sent;


                                if (!res) {
                                    res = {
                                        code: 200,
                                        data: {
                                            postCount: postCount,
                                            unPostCount: unPostCount,
                                            starCount: userData.star.length
                                        },
                                        msg: ''
                                    };
                                }

                                //返回数据
                                return _context8.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 12:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function countUserBook() {
                return _ref8.apply(this, arguments);
            }

            return countUserBook;
        }()
    }]);

    return BookControl;
}();

exports.default = BookControl;
var booksCtrl = exports.booksCtrl = new BookControl();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Cray on 2017/3/23.
 */

exports.default = {
    fetch: function fetch(cb) {
        var sortType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'update_time';
        var conditions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        return this.find(conditions).sort(_defineProperty({}, sortType, 'desc')).exec(cb);
    },
    fetchPage: function fetchPage(skip, limit, cb) {
        var sortType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'update_time';
        var conditions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

        return this.find(conditions).skip(skip).limit(limit).sort(_defineProperty({}, sortType, 'desc')).exec(cb);
    },
    findById: function findById(id, cb) {
        return this.findOne({ _id: id }).exec(cb);
    },
    counts: function counts(conditions, cb) {
        return this.count(conditions).exec(cb);
    },
    findByMulId: function findByMulId(ids, cb) {
        return this.find({ _id: { '$in': ids } }).exec(cb);
    },

    findInfo: function findInfo(conditions, cb) {
        return this.find(conditions).exec(cb);
    },
    createInfo: function createInfo(doc, cb) {
        return this.create(doc, cb);
    },
    updateInfo: function updateInfo(id, doc, cb) {
        var conditions = { _id: id };
        var options = {};
        var update = { $set: doc };
        return this.update(conditions, update, options, cb);
    },
    removeInfo: function removeInfo(id, cb) {
        var conditions = { _id: id };
        return this.remove(conditions, cb);
    }
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("koa-session2");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var web = {
    nuxt: {
        host: "127.0.0.1",
        port: 9018
    },
    secret: 'hefan'
};

exports = module.exports = web;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.categoryControl = undefined;

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _models = __webpack_require__(4);

var _models2 = _interopRequireDefault(_models);

var _entity = __webpack_require__(6);

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CategoryControl = function () {
    function CategoryControl() {
        _classCallCheck(this, CategoryControl);
    }

    _createClass(CategoryControl, [{
        key: 'categoryList',


        /**
         * 获得分类列表
         */
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var res, doc;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                res = null;
                                _context.next = 3;
                                return _entity2.default.fetch(_models2.default.category).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'query error'
                                    };
                                });

                            case 3:
                                doc = _context.sent;


                                // 解析数据
                                if (doc) {
                                    res = {
                                        code: 200,
                                        data: doc,
                                        msg: ''
                                    };
                                }

                                //返回数据
                                return _context.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function categoryList() {
                return _ref.apply(this, arguments);
            }

            return categoryList;
        }()

        /**
         * 获得类别
         * @param {*} categoryid 
         */

    }, {
        key: 'categoryDetail',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(categoryid) {
                var res, doc;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                res = null;
                                _context2.next = 3;
                                return _entity2.default.findById(_models2.default.category, categoryid).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'query error'
                                    };
                                });

                            case 3:
                                doc = _context2.sent;

                                // 解析数据
                                if (doc) {
                                    res = {
                                        code: 200,
                                        data: doc,
                                        msg: ''
                                    };
                                }

                                //返回数据
                                return _context2.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function categoryDetail(_x) {
                return _ref2.apply(this, arguments);
            }

            return categoryDetail;
        }()

        /**
         * 文章总数加1
         * @param {*} categoryid 
         */

    }, {
        key: 'updateTotal',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(categoryid) {
                var res, doc;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                res = null;
                                _context3.next = 3;
                                return _entity2.default.findById(_models2.default.category, categoryid).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'query error'
                                    };
                                });

                            case 3:
                                doc = _context3.sent;

                                if (!doc) {
                                    _context3.next = 8;
                                    break;
                                }

                                res = {
                                    code: 200,
                                    data: {},
                                    msg: ''
                                };

                                _context3.next = 8;
                                return _entity2.default.update(_models2.default.category, categoryid, {
                                    total: doc.total + 1
                                }).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'update fail'
                                    };
                                });

                            case 8:
                                return _context3.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 9:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function updateTotal(_x2) {
                return _ref3.apply(this, arguments);
            }

            return updateTotal;
        }()
    }]);

    return CategoryControl;
}();

exports.default = CategoryControl;
var categoryControl = exports.categoryControl = new CategoryControl();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _koa = __webpack_require__(14);

var _koa2 = _interopRequireDefault(_koa);

var _koaSession = __webpack_require__(9);

var _koaSession2 = _interopRequireDefault(_koaSession);

var _koaRouter = __webpack_require__(2);

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaCompress = __webpack_require__(15);

var _koaCompress2 = _interopRequireDefault(_koaCompress);

var _koaCors = __webpack_require__(16);

var _koaCors2 = _interopRequireDefault(_koaCors);

var _koaBodyparser = __webpack_require__(17);

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _boom = __webpack_require__(18);

var _boom2 = _interopRequireDefault(_boom);

var _nuxt = __webpack_require__(19);

var _store = __webpack_require__(20);

var _store2 = _interopRequireDefault(_store);

__webpack_require__(23);

var _web = __webpack_require__(10);

var _web2 = _interopRequireDefault(_web);

var _v = __webpack_require__(26);

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();
var host = _web2.default.nuxt.host;
var port = _web2.default.nuxt.port;

app.use((0, _koaBodyparser2.default)({
    formLimit: '50mb',
    jsonLimit: '50mb'
}));
app.use((0, _koaCors2.default)());
app.use((0, _koaSession2.default)({
    key: "hefan_freshbook",
    maxAge: 24 * 60 * 60 * 1000
    // store: new Store()  //redis
}));

app.use((0, _koaCompress2.default)({
    filter: function filter(content_type) {
        return (/js|css/i.test(content_type)
        );
    },
    threshold: 2048,
    flush: __webpack_require__(47).Z_SYNC_FLUSH
}));

app.use(_v2.default.routes());
app.use(_v2.default.allowedMethods({
    throw: true,
    notImplemented: function notImplemented() {
        return new _boom2.default.notImplemented();
    },
    methodNotAllowed: function methodNotAllowed() {
        return new _boom2.default.methodNotAllowed();
    }
}));

// Import and Set Nuxt.js options
var config = __webpack_require__(48);
config.dev = !("development" === 'production');

//set nuxt env
config.env.NODE_ENV = "development";
console.log('Nuxt env: ' + config.env.NODE_ENV);
// Instantiate nuxt.js
var nuxt = new _nuxt.Nuxt(config);

// Build in development
if (config.dev) {
    var builder = new _nuxt.Builder(nuxt);
    builder.build().catch(function (e) {
        console.error(e); // eslint-disable-line no-console
        process.exit(1);
    });
}

app.use(function (ctx) {
    ctx.status = 200; // koa defaults to 404 when it sees that status is unset
    ctx.req.session = ctx.session;
    return new Promise(function (resolve, reject) {
        ctx.res.on('close', resolve);
        ctx.res.on('finish', resolve);
        nuxt.render(ctx.req, ctx.res, function (promise) {
            // nuxt.render passes a rejected promise into callback on error.
            promise.then(resolve).catch(reject);
        });
    });
});

app.listen(port);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console
console.log('Server node env' + " : " + "development");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("koa-compress");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("koa-cors");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("boom");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ioredis = __webpack_require__(22);

var _ioredis2 = _interopRequireDefault(_ioredis);

var _koaSession = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RedisStore = function (_Store) {
    _inherits(RedisStore, _Store);

    function RedisStore() {
        _classCallCheck(this, RedisStore);

        var _this = _possibleConstructorReturn(this, (RedisStore.__proto__ || Object.getPrototypeOf(RedisStore)).call(this));

        _this.redis = new _ioredis2.default();
        return _this;
    }

    _createClass(RedisStore, [{
        key: "get",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(sid, ctx) {
                var data;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.redis.get("SESSION:" + sid);

                            case 2:
                                data = _context.sent;
                                return _context.abrupt("return", JSON.parse(data));

                            case 4:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function get(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return get;
        }()
    }, {
        key: "set",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(session) {
                var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                    _ref3$sid = _ref3.sid,
                    sid = _ref3$sid === undefined ? this.getID(24) : _ref3$sid,
                    _ref3$maxAge = _ref3.maxAge,
                    maxAge = _ref3$maxAge === undefined ? 1000000 : _ref3$maxAge;

                var ctx = arguments[2];
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return this.redis.set("SESSION:" + sid, JSON.stringify(session), 'EX', maxAge / 1000);

                            case 3:
                                _context2.next = 7;
                                break;

                            case 5:
                                _context2.prev = 5;
                                _context2.t0 = _context2["catch"](0);

                            case 7:
                                return _context2.abrupt("return", sid);

                            case 8:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 5]]);
            }));

            function set(_x3) {
                return _ref2.apply(this, arguments);
            }

            return set;
        }()
    }, {
        key: "destroy",
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(sid, ctx) {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.redis.del("SESSION:" + sid);

                            case 2:
                                return _context3.abrupt("return", _context3.sent);

                            case 3:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function destroy(_x5, _x6) {
                return _ref4.apply(this, arguments);
            }

            return destroy;
        }()
    }]);

    return RedisStore;
}(_koaSession.Store);

exports.default = RedisStore;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("ioredis");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _web = __webpack_require__(24);

var _web2 = _interopRequireDefault(_web);

var _debug = __webpack_require__(25);

var _debug2 = _interopRequireDefault(_debug);

var _mongoose = __webpack_require__(5);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DB =  true ? _web2.default.db.DB_DEV : process.env.NODE_ENV == 'testing' ? _web2.default.db.DB_TEST : _web2.default.db.DB_PRO;

_mongoose2.default.set('debug', "development" == "development" || "development" == 'testing');

_mongoose2.default.Promise = global.Promise;

var url = DB.url,
    options = DB.options;

var setting = Object.assign({}, { useMongoClient: true }, options);
// console.log(url)


_mongoose2.default.connect(url, setting).then(function () {
    _debug2.default.log('Mongoose connection open to: ' + DB.url);
}, function (err) {
    _debug2.default.log('Mongoose connection error: ' + err);
});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    db: {
        //mongodb 配置
        DB_DEV: {
            url: 'mongodb://admin:hefantv.123@47.93.89.11:28017/freshbook-dev',
            options: {}
        },
        DB_TEST: {
            url: 'mongodb://admin:hefantv.123@47.93.89.11:28017/freshbook-test',
            options: {}
        },
        DB_PRO: {
            url: 'mongodb://admin:hefantv.123@47.93.89.11:28017/freshbook',
            options: {}
        }
    }
};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = __webpack_require__(11);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _params = __webpack_require__(3);

var _params2 = _interopRequireDefault(_params);

var _koaRouter = __webpack_require__(2);

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _books = __webpack_require__(27);

var _books2 = _interopRequireDefault(_books);

var _category = __webpack_require__(34);

var _category2 = _interopRequireDefault(_category);

var _draft = __webpack_require__(35);

var _draft2 = _interopRequireDefault(_draft);

var _post = __webpack_require__(37);

var _post2 = _interopRequireDefault(_post);

var _user = __webpack_require__(39);

var _user2 = _interopRequireDefault(_user);

var _comment = __webpack_require__(44);

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default({ prefix: '/v1' });

/**
 * token登录验证
 */
// router.use(authorize)

router.use(_books2.default.routes(), _books2.default.allowedMethods());
router.use(_category2.default.routes(), _category2.default.allowedMethods());
router.use(_draft2.default.routes(), _draft2.default.allowedMethods());
router.use(_post2.default.routes(), _post2.default.allowedMethods());
router.use(_user2.default.routes(), _user2.default.allowedMethods());
router.use(_comment2.default.routes(), _comment2.default.allowedMethods());

function authorize(ctx, next) {
  // console.log( ctx )
  if (ctx.method === 'OPTIONS') {
    ctx.body = {};
    return;
  }

  var params = null;
  if (_params2.default.tokenValidate(ctx)) {
    params = _params2.default.tokenValidate(req, res);
  } else {
    ctx.body = {
      data: {},
      code: '208',
      msg: 'token不存在'
    };
    return;
  }

  if (ctx.path === '/login') {} else {
    if (!params.token) {
      ctx.body = {
        data: {},
        code: '209',
        msg: 'token不存在'
      };
      return;
    }

    var token = params.token;
    var decoded = null;

    try {
      decoded = _jsonwebtoken2.default.verify(token, constant.secret);
    } catch (err) {
      ctx.body = {
        data: {},
        code: '210',
        msg: 'token 已过期'
      };
      return;
    }
  }
  next();
}

exports.default = router;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _koaRouter = __webpack_require__(2);

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _params = __webpack_require__(3);

var _params2 = _interopRequireDefault(_params);

var _books = __webpack_require__(7);

var _category = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import koaBody from 'koa-body'


var router = new _koaRouter2.default();

/**
 * 获得book列表
 */
router.get("/bookList", function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
        var _Params$queryValidate, title, categoryid, type, limit, skip, conditions, reg, bookData;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _Params$queryValidate = _params2.default.queryValidate(ctx), title = _Params$queryValidate.title, categoryid = _Params$queryValidate.categoryid, type = _Params$queryValidate.type, limit = _Params$queryValidate.limit, skip = _Params$queryValidate.skip;
                        conditions = {};

                        limit = parseInt(limit);
                        skip = parseInt(skip);

                        if (!(_lodash2.default.isInteger(limit) && _lodash2.default.isInteger(skip))) {
                            _context.next = 14;
                            break;
                        }

                        if (title) {
                            reg = new RegExp(title, 'i'); //不区分大小写

                            conditions['title'] = { $regex: reg };
                        }
                        if (categoryid) {
                            conditions['categoryid'] = categoryid;
                        }
                        if (type) {
                            conditions['type'] = type;
                        }
                        _context.next = 10;
                        return _books.booksCtrl.bookList(conditions, skip, limit);

                    case 10:
                        bookData = _context.sent;

                        ctx.body = bookData;
                        _context.next = 15;
                        break;

                    case 14:
                        ctx.body = {
                            code: 400,
                            data: {},
                            msg: "查询参数错误"
                        };

                    case 15:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

/**
 * 根据分组获得book的count
 */
router.get("/countCategoryBook", function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {
        var _Params$queryValidate2, title, conditions, reg, categorys;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _Params$queryValidate2 = _params2.default.queryValidate(ctx), title = _Params$queryValidate2.title;
                        conditions = {};

                        if (title) {
                            reg = new RegExp(title, 'i'); //不区分大小写

                            conditions.title = { $regex: reg };
                        }

                        _context2.next = 5;
                        return _books.booksCtrl.countCategoryBook(conditions);

                    case 5:
                        categorys = _context2.sent;

                        ctx.body = categorys;

                    case 7:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());

/**
 * 获得文章详情
 */
router.get('/bookDetail', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx, next) {
        var _Params$queryValidate3, bookid, bookData;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _Params$queryValidate3 = _params2.default.queryValidate(ctx), bookid = _Params$queryValidate3.bookid;
                        _context3.next = 3;
                        return _books.booksCtrl.bookDetail(bookid);

                    case 3:
                        bookData = _context3.sent;

                        ctx.body = bookData;

                    case 5:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());

/**
 * star or unstar
 */
router.get('/updateStar', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(ctx, next) {
        var _Params$queryValidate4, bookid, star, userid, bookData;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _Params$queryValidate4 = _params2.default.queryValidate(ctx), bookid = _Params$queryValidate4.bookid, star = _Params$queryValidate4.star;

                        if (!(_lodash2.default.isUndefined(bookid) || _lodash2.default.isUndefined(star))) {
                            _context4.next = 5;
                            break;
                        }

                        ctx.body = {
                            code: 400,
                            msg: "查询参数错误"
                        };
                        _context4.next = 10;
                        break;

                    case 5:
                        userid = ctx.session.userInfo.userId || 1111;
                        _context4.next = 8;
                        return _books.booksCtrl.updateStar(userid, bookid, parseInt(star));

                    case 8:
                        bookData = _context4.sent;

                        ctx.body = bookData;

                    case 10:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}());

/**
 * 删除文章0
 *
 *
 */
router.post('/deleteBook', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(ctx, next) {
        var _Params$bodyValidate, params, bookid, user, data;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _Params$bodyValidate = _params2.default.bodyValidate(ctx), params = _Params$bodyValidate.params;
                        bookid = params.bookid;
                        user = ctx.session.userInfo;
                        data = {
                            code: 401,
                            data: {},
                            msg: 'bookid is empty'
                        };

                        if (_lodash2.default.isUndefined(bookid)) {
                            _context5.next = 8;
                            break;
                        }

                        _context5.next = 7;
                        return _books.booksCtrl.deleteBook(bookid, user);

                    case 7:
                        data = _context5.sent;

                    case 8:
                        ctx.body = data;

                    case 9:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}());

/**
 * 个人主页已发布或者草稿
 * */
router.get("/userBookList", function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(ctx, next) {
        var _Params$queryValidate5, limit, skip, conditions, bookData;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _Params$queryValidate5 = _params2.default.queryValidate(ctx), limit = _Params$queryValidate5.limit, skip = _Params$queryValidate5.skip, conditions = _Params$queryValidate5.conditions;


                        limit = parseInt(limit);
                        skip = parseInt(skip);
                        conditions = JSON.parse(conditions);

                        if (!(_lodash2.default.isInteger(limit) && _lodash2.default.isInteger(skip))) {
                            _context6.next = 11;
                            break;
                        }

                        _context6.next = 7;
                        return _books.booksCtrl.userBookList(skip, limit, conditions);

                    case 7:
                        bookData = _context6.sent;

                        ctx.body = bookData;
                        _context6.next = 12;
                        break;

                    case 11:
                        ctx.body = {
                            code: 400,
                            data: {},
                            msg: "查询参数错误"
                        };

                    case 12:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function (_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}());
/**
 * 个人主页已发布，草稿，收藏总数
 * */
router.get("/countUserBook", function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(ctx, next) {
        var _Params$queryValidate6, conditions, bookData;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _Params$queryValidate6 = _params2.default.queryValidate(ctx), conditions = _Params$queryValidate6.conditions;

                        conditions = JSON.parse(conditions);

                        if (!conditions) {
                            _context7.next = 9;
                            break;
                        }

                        _context7.next = 5;
                        return _books.booksCtrl.countUserBook(conditions);

                    case 5:
                        bookData = _context7.sent;

                        ctx.body = bookData;
                        _context7.next = 10;
                        break;

                    case 9:
                        ctx.body = {
                            code: 400,
                            data: {},
                            msg: "查询参数错误"
                        };

                    case 10:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    }));

    return function (_x13, _x14) {
        return _ref7.apply(this, arguments);
    };
}());

exports.default = router;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _baseModel = __webpack_require__(8);

var _baseModel2 = _interopRequireDefault(_baseModel);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _mongoose = __webpack_require__(5);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CategorySchema = new _mongoose2.default.Schema({
    name: String,
    title: String,
    update_time: String,
    iconcolor: String,
    total: Number
}, { versionKey: false }); /**
                            * Created by Cray on 2017/7/3.
                            */


CategorySchema.statics = _lodash2.default.merge(_baseModel2.default, {});

exports.default = _mongoose2.default.model('category', CategorySchema, 'categorys');

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseModel = __webpack_require__(8);

var _baseModel2 = _interopRequireDefault(_baseModel);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _mongoose = __webpack_require__(5);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommentSchema = new _mongoose2.default.Schema({
  comments: [],
  update_time: String
}, { versionKey: false }); /**
                            * Created by Cray on 2017/7/3.
                            */


CommentSchema.statics = _lodash2.default.merge(_baseModel2.default, {});

exports.default = _mongoose2.default.model('comment', CommentSchema, 'comments');

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _baseModel = __webpack_require__(8);

var _baseModel2 = _interopRequireDefault(_baseModel);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _mongoose = __webpack_require__(5);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * Created by Cray on 2017/7/3.
                                                                                                                                                                                                                   */


var BookSchema = new _mongoose2.default.Schema({
    title: String,
    cover: String,
    html: String,
    markdown: String,
    // categoryid: String,
    categoryid: { type: _mongoose2.default.Schema.ObjectId, ref: 'category' },
    commentid: String,
    post: Number,
    update_time: String,
    post_time: String,
    star: Array,
    userid: { type: _mongoose2.default.Schema.ObjectId, ref: 'user' }
}, { versionKey: false });

BookSchema.statics = _lodash2.default.merge(_baseModel2.default, {
    fetchPage: function fetchPage(skip, limit, cb) {
        var sortType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'post_time';
        var conditions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

        return this.find(conditions).skip(skip).limit(limit).sort(_defineProperty({}, sortType, 'desc')).exec(cb);
    },
    refFetchPage: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(skip, limit, cb) {
            var sortType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'post_time';
            var conditions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.abrupt('return', this.find(conditions).populate([{
                                path: 'userid',
                                select: { _id: 1, username: 1, nickname: 1, headimgurl: 1, authority: 1 //user的字段
                                } }, {
                                path: 'categoryid'
                            }]).skip(skip).limit(limit).sort(_defineProperty({}, sortType, 'desc')).exec(cb));

                        case 1:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function refFetchPage(_x3, _x4, _x5) {
            return _ref.apply(this, arguments);
        }

        return refFetchPage;
    }(),
    refFindById: function refFindById(id, callback) {
        return this.findOne({ _id: id }).populate([{
            path: 'userid',
            select: { _id: 1, username: 1, nickname: 1, headimgurl: 1, authority: 1 }
        }, {
            path: 'categoryid'
        }]).exec(callback);
    }
});

exports.default = _mongoose2.default.model('book', BookSchema, 'books');

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _baseModel = __webpack_require__(8);

var _baseModel2 = _interopRequireDefault(_baseModel);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _mongoose = __webpack_require__(5);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose2.default.Schema({
    username: String,
    nickname: String,
    headimgurl: String,
    authority: Number,
    reg_time: String,
    update_time: String,
    login_time: String,
    star: Array,
    weixin: Object,
    qq: Object
}, { versionKey: false });

UserSchema.statics = _lodash2.default.merge(_baseModel2.default, {
    findByUsrName: function findByUsrName(userName, cb) {
        return this.findOne({ userName: userName }).exec(cb);
    },

    updateByOpts: function updateByOpts(conditions, doc, cb) {
        var options = {};
        var update = { $set: doc };
        return this.update(conditions, update, options, cb);
    },
    login: function login(user, cb) {
        return this.findOne(user).exec(cb);
    }
});

exports.default = _mongoose2.default.model('user', UserSchema, 'users');

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.wraper = undefined;

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _models = __webpack_require__(4);

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Cray on 2017/8/17.
 */
var wraper = exports.wraper = function wraper(model, params) {
    if (model === _models2.default.books) {
        params = _lodash2.default.pick(params, ['title', 'cover', 'html', 'userid', 'markdown', 'categoryid', 'commentid', 'post', 'update_time', 'post_time', 'star']);
        return Object.assign({}, {
            title: "",
            cover: "",
            html: "",
            userid: "",
            markdown: "",
            categoryid: "",
            commentid: "",
            post: "",
            update_time: Date.now(),
            post_time: "",
            star: []
        }, params);
    }

    if (model === _models2.default.category) {
        params = _lodash2.default.pick(params, ['name', 'title', 'update_time', 'total', 'iconcolor']);
        return Object.assign({}, {
            name: "",
            title: "",
            iconcolor: "",
            update_time: Date.now(),
            total: 0
        }, params);
    }

    if (model === _models2.default.comment) {
        params = _lodash2.default.pick(params, ['comments', 'update_time']);
        return Object.assign({}, {
            comments: [],
            update_time: Date.now()
        }, params);
    }

    if (model === _models2.default.user) {
        params = _lodash2.default.pick(params, ['username', 'nickname', 'headimgurl', 'authority', 'reg_time', 'login_time', 'update_time', 'star', 'weixin', 'qq']);
        return Object.assign({}, {
            username: "",
            nickname: "",
            headimgurl: "",
            authority: 0,
            reg_time: "",
            login_time: "",
            update_time: "",
            star: [],
            weixin: {},
            qq: {}
        }, params);
    }
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _koaRouter = __webpack_require__(2);

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _category = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = new _koaRouter2.default();

/**
 * 获得分类列表
 */
router.get("/categoryList", function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
    var data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _category.categoryControl.categoryList();

          case 2:
            data = _context.sent;

            ctx.body = data;

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

exports.default = router;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _koaRouter = __webpack_require__(2);

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _params = __webpack_require__(3);

var _params2 = _interopRequireDefault(_params);

var _draft = __webpack_require__(36);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = new _koaRouter2.default();

/**
 * 获得草稿列表
 */
router.get("/draftList", function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
        var userid, draftData;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        userid = ctx.session.userid || 1111;
                        _context.next = 3;
                        return _draft.draftCtrl.draftList(userid);

                    case 3:
                        draftData = _context.sent;


                        ctx.body = draftData;

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

/**
 * 获得草稿
 */
router.get('/getDraft', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {
        var _Params$queryValidate, bookid, draftData;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _Params$queryValidate = _params2.default.queryValidate(ctx), bookid = _Params$queryValidate.bookid;
                        _context2.next = 3;
                        return _draft.draftCtrl.bookDetail(bookid);

                    case 3:
                        draftData = _context2.sent;


                        ctx.body = draftData;

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());

/**
 * 更新草稿
 */
router.post('/updateDraft', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx, next) {
        var params, bookid, user, draftData;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        if (_params2.default.checkLogin(ctx)) {
                            _context3.next = 2;
                            break;
                        }

                        return _context3.abrupt('return');

                    case 2:
                        params = _params2.default.bodyValidate(ctx);
                        bookid = params.bookid;

                        if (!params.userid) {
                            user = ctx.session.userInfo || {};

                            params.userid = user.userId || '';
                        }
                        _context3.next = 7;
                        return _draft.draftCtrl.updateBook(bookid, params);

                    case 7:
                        draftData = _context3.sent;

                        ctx.body = draftData;

                    case 9:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());

exports.default = router;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.draftCtrl = undefined;

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _models = __webpack_require__(4);

var _models2 = _interopRequireDefault(_models);

var _entity = __webpack_require__(6);

var _entity2 = _interopRequireDefault(_entity);

var _books = __webpack_require__(7);

var _books2 = _interopRequireDefault(_books);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DraftControl = function (_BookControl) {
    _inherits(DraftControl, _BookControl);

    function DraftControl() {
        _classCallCheck(this, DraftControl);

        return _possibleConstructorReturn(this, (DraftControl.__proto__ || Object.getPrototypeOf(DraftControl)).call(this));
    }
    /**
     * 获得草稿列表
     */


    _createClass(DraftControl, [{
        key: 'draftList',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(userid) {
                var conditions, res, doc;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                conditions = {
                                    userid: userid,
                                    post: 0
                                };
                                res = null;
                                _context.next = 4;
                                return _entity2.default.fetch(_models2.default.books, 'update_time', conditions).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'query error'
                                    };
                                });

                            case 4:
                                doc = _context.sent;

                                // 解析数据
                                if (!res) {
                                    res = {
                                        code: 200,
                                        data: doc,
                                        msg: ''
                                    };
                                }

                                //返回数据
                                return _context.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function draftList(_x) {
                return _ref.apply(this, arguments);
            }

            return draftList;
        }()
    }]);

    return DraftControl;
}(_books2.default);

exports.default = DraftControl;
var draftCtrl = exports.draftCtrl = new DraftControl();

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _koaRouter = __webpack_require__(2);

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _params = __webpack_require__(3);

var _params2 = _interopRequireDefault(_params);

var _post = __webpack_require__(38);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = new _koaRouter2.default();

/**
 * 获得发布文章列表
 */
router.get("/postList", function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
        var userid, postData;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        userid = ctx.session.userid || 1111;
                        _context.next = 3;
                        return _post.postCtrl.postList(userid);

                    case 3:
                        postData = _context.sent;


                        ctx.body = postData;

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

/**
 * 获得发布文章
 */
router.get('/getPost', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {
        var userid, postData;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        userid = ctx.session.userid || 1111;
                        _context2.next = 3;
                        return _post.postCtrl.bookDetail(userid);

                    case 3:
                        postData = _context2.sent;


                        ctx.body = postData;

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());

/**
 * 更新发布文章
 */
router.post('/updatePost', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx, next) {
        var params, bookid, postData;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        if (_params2.default.checkLogin(ctx)) {
                            _context3.next = 2;
                            break;
                        }

                        return _context3.abrupt('return');

                    case 2:
                        params = _params2.default.bodyValidate(ctx);
                        bookid = params.bookid;
                        _context3.next = 6;
                        return _post.postCtrl.updateBook(bookid, params);

                    case 6:
                        postData = _context3.sent;

                        ctx.body = postData;

                    case 8:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());

/**
 * 发布文章
 */
router.post('/publisBook', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(ctx, next) {
        var params, bookid, user, postData;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        if (_params2.default.checkLogin(ctx)) {
                            _context4.next = 2;
                            break;
                        }

                        return _context4.abrupt('return');

                    case 2:
                        params = _params2.default.bodyValidate(ctx);
                        bookid = params.bookid;

                        if (!params.userid) {
                            user = ctx.session.userInfo || {};

                            params.userid = user.userId || '';
                        }
                        _context4.next = 7;
                        return _post.postCtrl.publisBook(bookid, params);

                    case 7:
                        postData = _context4.sent;


                        ctx.body = postData;

                    case 9:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}());

exports.default = router;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.postCtrl = undefined;

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _models = __webpack_require__(4);

var _models2 = _interopRequireDefault(_models);

var _entity = __webpack_require__(6);

var _entity2 = _interopRequireDefault(_entity);

var _books = __webpack_require__(7);

var _books2 = _interopRequireDefault(_books);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PostControl = function (_BookControl) {
    _inherits(PostControl, _BookControl);

    function PostControl() {
        _classCallCheck(this, PostControl);

        return _possibleConstructorReturn(this, (PostControl.__proto__ || Object.getPrototypeOf(PostControl)).call(this));
    }

    /**
     * 获得发布文章列表
     */


    _createClass(PostControl, [{
        key: 'postList',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(userid) {
                var conditions, res, doc;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                conditions = {
                                    userid: userid,
                                    post: 1
                                };
                                res = null;
                                _context.next = 4;
                                return _entity2.default.fetch(_models2.default.books, 'update_time', conditions).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'query error'
                                    };
                                });

                            case 4:
                                doc = _context.sent;

                                // 解析数据
                                if (!res) {
                                    res = {
                                        code: 200,
                                        data: doc,
                                        msg: ''
                                    };
                                }

                                //返回数据
                                return _context.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function postList(_x) {
                return _ref.apply(this, arguments);
            }

            return postList;
        }()

        /**
         *
         * @param {*} bookid
         */

    }, {
        key: 'publisBook',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(bookid, params) {
                var upData, res, doc;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                upData = _lodash2.default.pick(params, ['title', 'html', 'markdown', 'categoryid', 'userid', 'cover']);

                                Object.assign(upData, {
                                    post: '1',
                                    post_time: Date.now()
                                });
                                res = null;
                                _context2.next = 5;
                                return _entity2.default.update(_models2.default.books, bookid, upData).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'query error'
                                    };
                                });

                            case 5:
                                doc = _context2.sent;


                                res = res || {
                                    code: 200,
                                    data: doc,
                                    msg: 'ok'

                                    //返回数据
                                };return _context2.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 8:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function publisBook(_x2, _x3) {
                return _ref2.apply(this, arguments);
            }

            return publisBook;
        }()
    }]);

    return PostControl;
}(_books2.default);

exports.default = PostControl;
var postCtrl = exports.postCtrl = new PostControl();

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _koaRouter = __webpack_require__(2);

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _params = __webpack_require__(3);

var _params2 = _interopRequireDefault(_params);

var _user = __webpack_require__(40);

var _index = __webpack_require__(43);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = new _koaRouter2.default();

router.get("/login", function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
        var _Params$queryValidate, code, data;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _Params$queryValidate = _params2.default.queryValidate(ctx), code = _Params$queryValidate.code;
                        _context.next = 3;
                        return _user.userCtrl.login(code, _index.WX_INFO.appid, _index.WX_INFO.secret);

                    case 3:
                        data = _context.sent;

                        if (data) {
                            ctx.session.userInfo = data;
                            ctx.req.session = ctx.session.userInfo;
                            ctx.request.session = ctx.session.userInfo;
                            ctx.cookies.set('hefan_freshbook', ctx.cookies.get('hefan_freshbook'), {
                                maxAge: 24 * 60 * 60 * 1000
                            });
                            ctx.body = {
                                code: 200,
                                data: data,
                                msg: '登录成功！'
                            };
                        } else {
                            ctx.body = {
                                code: 200,
                                data: [],
                                msg: '登录失败，请重新扫码！'
                            };
                        }

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());
router.get("/logout", function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (ctx.session && ctx.session.userInfo) {
                            ctx.session.userInfo = null;
                            ctx.req.session = ctx.session.userInfo;
                            ctx.request.session = ctx.session.userInfo;
                        }
                        ctx.body = {
                            code: 200,
                            data: [],
                            msg: '退出成功！'
                        };

                    case 2:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());
router.get("/checkLogin", function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx, next) {
        var loginState;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        loginState = false;

                        if (ctx.session && ctx.session.userInfo) {
                            loginState = true;
                        }
                        ctx.body = {
                            code: 200,
                            data: loginState,
                            msg: '登陆状态查询成功！'
                        };

                    case 3:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());
router.get("/getUser", function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(ctx, next) {
        var _Params$queryValidate2, userid, limit, skip, userData;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _Params$queryValidate2 = _params2.default.queryValidate(ctx), userid = _Params$queryValidate2.userid, limit = _Params$queryValidate2.limit, skip = _Params$queryValidate2.skip;

                        limit = parseInt(limit);
                        skip = parseInt(skip);

                        if (!userid) {
                            _context4.next = 12;
                            break;
                        }

                        _context4.next = 6;
                        return _user.userCtrl.getUser(userid);

                    case 6:
                        userData = _context4.sent;

                        userData.data._doc.starLen = userData.data.star.length;
                        if (_lodash2.default.isInteger(limit) && _lodash2.default.isInteger(skip) && limit > 0 && userData.data.star.length > skip) {
                            skip = skip >= 0 ? skip : 0;

                            userData.data.star = userData.data.star.splice(skip, limit);
                        }
                        ctx.body = userData;

                        _context4.next = 13;
                        break;

                    case 12:
                        ctx.body = {
                            code: 400,
                            data: {},
                            msg: "查询参数错误"
                        };

                    case 13:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}()

// ctx.body = {
//     result: true,
//     data: ['hubo', 'xygo', 'xxy', 'pangong']
// }
);

router.post('/updateUser', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(ctx, next) {
        var _Params$bodyValidate, userid, params, data;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _Params$bodyValidate = _params2.default.bodyValidate(ctx), userid = _Params$bodyValidate.userid, params = _Params$bodyValidate.params;

                        if (!userid) {
                            _context5.next = 8;
                            break;
                        }

                        _context5.next = 4;
                        return _user.userCtrl.updateUser(userid, params);

                    case 4:
                        data = _context5.sent;

                        ctx.body = data;
                        _context5.next = 9;
                        break;

                    case 8:
                        ctx.body = {
                            code: 400,
                            data: {},
                            msg: "更新失败"
                        };

                    case 9:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}());

router.get('/getAllUser', function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(ctx, next) {
        var _Params$queryValidate3, limit, skip, data;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _Params$queryValidate3 = _params2.default.queryValidate(ctx), limit = _Params$queryValidate3.limit, skip = _Params$queryValidate3.skip;

                        limit = parseInt(limit);
                        skip = parseInt(skip);

                        if (!(_lodash2.default.isInteger(limit) && _lodash2.default.isInteger(skip) && limit > 0)) {
                            _context6.next = 10;
                            break;
                        }

                        _context6.next = 6;
                        return _user.userCtrl.getAllUser(limit, skip);

                    case 6:
                        data = _context6.sent;

                        ctx.body = data;
                        _context6.next = 11;
                        break;

                    case 10:
                        ctx.body = {
                            code: 400,
                            data: {},
                            msg: "查询参数错误"
                        };

                    case 11:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function (_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}());

router.post('/updateUserAuth', function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(ctx, next) {
        var _Params$bodyValidate2, userid, params, data;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _Params$bodyValidate2 = _params2.default.bodyValidate(ctx), userid = _Params$bodyValidate2.userid, params = _Params$bodyValidate2.params;

                        if (!userid) {
                            _context7.next = 8;
                            break;
                        }

                        _context7.next = 4;
                        return _user.userCtrl.updateUserAuth(userid, params);

                    case 4:
                        data = _context7.sent;

                        ctx.body = data;
                        _context7.next = 9;
                        break;

                    case 8:
                        ctx.body = {
                            code: 400,
                            data: {},
                            msg: "更新失败"
                        };

                    case 9:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    }));

    return function (_x13, _x14) {
        return _ref7.apply(this, arguments);
    };
}());

exports.default = router;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userCtrl = undefined;

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _models = __webpack_require__(4);

var _models2 = _interopRequireDefault(_models);

var _entity = __webpack_require__(6);

var _entity2 = _interopRequireDefault(_entity);

var _axios = __webpack_require__(41);

var _axios2 = _interopRequireDefault(_axios);

var _jsonwebtoken = __webpack_require__(11);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _adminType = __webpack_require__(42);

var _adminType2 = _interopRequireDefault(_adminType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserControl = function () {
    function UserControl() {
        _classCallCheck(this, UserControl);
    }

    /**
     * 获得用户
     */


    _createClass(UserControl, [{
        key: 'getUser',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(userid) {
                var res, doc;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                res = null;
                                _context.next = 3;
                                return _entity2.default.findById(_models2.default.user, userid).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'query error'
                                    };
                                });

                            case 3:
                                doc = _context.sent;

                                // 解析数据
                                if (doc) {
                                    res = {
                                        code: 200,
                                        data: doc,
                                        msg: ''
                                    };
                                }

                                //返回数据
                                return _context.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getUser(_x) {
                return _ref.apply(this, arguments);
            }

            return getUser;
        }()

        /**
         * 获得多用户
         * ids: array
         */

    }, {
        key: 'getUsers',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ids) {
                var res, doc;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                res = null;
                                _context2.next = 3;
                                return _entity2.default.findByMulId(_models2.default.user, ids).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'query error'
                                    };
                                });

                            case 3:
                                doc = _context2.sent;

                                // 解析数据
                                if (doc) {
                                    res = {
                                        code: 200,
                                        data: doc,
                                        msg: ''
                                    };
                                }

                                //返回数据
                                return _context2.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getUsers(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getUsers;
        }()

        /**
         * 登录
         */

    }, {
        key: 'login',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(code, appid, secret) {
                var res, requstValue, userInfoData, userInfo, getUserData, updateUserData, getUserInfo, createUserData, jwtData, token;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                res = null;
                                _context3.next = 3;
                                return _axios2.default.get('https://api.weixin.qq.com/sns/oauth2/access_token', {
                                    params: {
                                        appid: appid,
                                        secret: secret,
                                        code: code,
                                        grant_type: 'authorization_code'
                                    }
                                });

                            case 3:
                                requstValue = _context3.sent;
                                userInfoData = null, userInfo = null;

                                if (!requstValue.data.access_token) {
                                    _context3.next = 38;
                                    break;
                                }

                                _context3.next = 8;
                                return _axios2.default.get('https://api.weixin.qq.com/sns/userinfo', {
                                    params: {
                                        access_token: requstValue.data.access_token,
                                        openid: requstValue.data.openid
                                    }
                                });

                            case 8:
                                userInfoData = _context3.sent;

                                userInfo = _lodash2.default.assign({}, userInfoData.data);
                                userInfo.username = userInfo.openid;
                                userInfo.weixin = userInfoData.data;
                                _context3.next = 14;
                                return _entity2.default.find(_models2.default.user, { username: userInfo.username }).catch(function (err) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: err
                                    };
                                });

                            case 14:
                                getUserData = _context3.sent;

                                if (!(getUserData.length && getUserData[0]._id)) {
                                    _context3.next = 28;
                                    break;
                                }

                                userInfo.update_time = Date.now();
                                userInfo.login_time = Date.now();
                                _context3.next = 20;
                                return _entity2.default.update(_models2.default.user, userInfo).catch(function (err) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: err
                                    };
                                });

                            case 20:
                                updateUserData = _context3.sent;
                                _context3.next = 23;
                                return _entity2.default.findById(_models2.default.user, getUserData[0]._id).catch(function (err) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: err
                                    };
                                });

                            case 23:
                                getUserInfo = _context3.sent;

                                userInfo = getUserInfo;
                                userInfo._doc.userId = getUserInfo._id;

                                _context3.next = 35;
                                break;

                            case 28:
                                if (userInfo.openid == _adminType2.default.superAdmin.openid) {
                                    userInfo.authority = _adminType2.default.superAdmin.code;
                                }
                                userInfo.reg_time = Date.now();
                                _context3.next = 32;
                                return _entity2.default.create(_models2.default.user, userInfo).catch(function (err) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: err
                                    };
                                });

                            case 32:
                                createUserData = _context3.sent;

                                userInfo = createUserData;
                                userInfo._doc.userId = createUserData._id;

                            case 35:
                                jwtData = {
                                    username: userInfo.username
                                };
                                token = _jsonwebtoken2.default.sign({
                                    // exp: Math.floor(Date.now() / 1000) + (5*60*60),
                                    data: jwtData
                                }, 'hefan', { expiresIn: '720h' }); //, {expiresIn: '5h'}

                                userInfo.token = token;

                            case 38:
                                return _context3.abrupt('return', userInfo);

                            case 39:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function login(_x3, _x4, _x5) {
                return _ref3.apply(this, arguments);
            }

            return login;
        }()

        /**
         * 修改个人资料
         * */

    }, {
        key: 'updateUser',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(userid, params) {
                var res, doc, updateData;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                res = null, doc = null, updateData = _lodash2.default.pick(params, ['nickname', 'headimgurl']);

                                if (!userid) {
                                    _context4.next = 6;
                                    break;
                                }

                                _context4.next = 4;
                                return _entity2.default.update(_models2.default.user, userid, updateData).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'update error'
                                    };
                                });

                            case 4:
                                doc = _context4.sent;


                                res = res || {
                                    code: 200,
                                    data: doc,
                                    msg: '更新成功'
                                };

                            case 6:
                                return _context4.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 7:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function updateUser(_x6, _x7) {
                return _ref4.apply(this, arguments);
            }

            return updateUser;
        }()
        /**
            * 分页获取全部用户
            * */

    }, {
        key: 'getAllUser',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(limit, skip) {
                var res, doc, count, data;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                res = null;
                                _context5.next = 3;
                                return _entity2.default.fetchPage(_models2.default.user, skip, limit, 'update_time', {}).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'query error'
                                    };
                                });

                            case 3:
                                doc = _context5.sent;
                                _context5.next = 6;
                                return _entity2.default.count(_models2.default.user).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'query error'
                                    };
                                });

                            case 6:
                                count = _context5.sent;
                                data = {
                                    tableList: doc,
                                    count: count
                                    // 解析数据
                                };
                                if (doc && count) {
                                    res = {
                                        code: 200,
                                        data: data,
                                        msg: ''
                                    };
                                }

                                //返回数据
                                return _context5.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 10:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function getAllUser(_x8, _x9) {
                return _ref5.apply(this, arguments);
            }

            return getAllUser;
        }()

        /**
         * 修改权限
         * */

    }, {
        key: 'updateUserAuth',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(userid, params) {
                var res, doc, updateData;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                res = null, doc = null, updateData = _lodash2.default.pick(params, ['authority']);

                                if (!userid) {
                                    _context6.next = 6;
                                    break;
                                }

                                _context6.next = 4;
                                return _entity2.default.update(_models2.default.user, userid, updateData).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'update error'
                                    };
                                });

                            case 4:
                                doc = _context6.sent;


                                res = res || {
                                    code: 200,
                                    data: doc,
                                    msg: '更新成功'
                                };

                            case 6:
                                return _context6.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 7:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function updateUserAuth(_x10, _x11) {
                return _ref6.apply(this, arguments);
            }

            return updateUserAuth;
        }()
    }]);

    return UserControl;
}();

exports.default = UserControl;
var userCtrl = exports.userCtrl = new UserControl();

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    superAdmin: {
        code: 2, //超级管理员
        openid: 'o8H21wl6iG6huPmK56i2_k_v0GnI'
    },
    admins: {
        code: 1, //管理员
        openidList: ['o8H21wsnq_Qfyb2nCBy4_CvGelYE']
    }

};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var WX_INFO = exports.WX_INFO =  false ? {
    appid: 'wx6598c9857934da6f', //待定
    secret: '7a6efb06382a9b7bbed17902b09b7f6a' //待定
} :  false ? {
    appid: 'wxddc0ea24b6040522', //待定
    secret: '57f7b753de0ffba0977b4c12831161d8' //待定
} : {
    appid: 'wxf57d0ac7f1af8364',
    secret: 'b8516d216e62f724a68b7ed5e068b0de'
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _koaRouter = __webpack_require__(2);

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _params = __webpack_require__(3);

var _params2 = _interopRequireDefault(_params);

var _comment = __webpack_require__(45);

var _books = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = new _koaRouter2.default();

/**
 * 得到评论
 */
router.get('/comments', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
    var _Params$queryValidate, id, data;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _Params$queryValidate = _params2.default.queryValidate(ctx), id = _Params$queryValidate.id;
            _context.next = 3;
            return _comment.commentCtrl.comments(id);

          case 3:
            data = _context.sent;

            ctx.body = data;

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

/**
 * 添加评论
 */
router.post('/addComment', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {
    var params, userInfo, data;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            params = _params2.default.bodyValidate(ctx);
            userInfo = ctx.session.userInfo;
            _context2.next = 4;
            return _comment.commentCtrl.addComment(params, userInfo);

          case 4:
            data = _context2.sent;


            ctx.body = data;

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

/**
 * 回复评论
 */
router.post('/replayComment', function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx, next) {
    var params, userInfo, data;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            params = _params2.default.bodyValidate(ctx);
            userInfo = ctx.session.userInfo;
            _context3.next = 4;
            return _comment.commentCtrl.replayComment(params, userInfo);

          case 4:
            data = _context3.sent;

            ctx.body = data;

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

exports.default = router;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.commentCtrl = undefined;

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _ulid = __webpack_require__(46);

var _models = __webpack_require__(4);

var _models2 = _interopRequireDefault(_models);

var _params = __webpack_require__(3);

var _params2 = _interopRequireDefault(_params);

var _entity = __webpack_require__(6);

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CommentControl = function () {
    function CommentControl() {
        _classCallCheck(this, CommentControl);
    }

    _createClass(CommentControl, [{
        key: 'comments',


        /**
        * 查询评论
        * */
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(commentid) {
                var res, doc;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                res = null;
                                _context.next = 3;
                                return _entity2.default.findById(_models2.default.comment, commentid).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'query error'
                                    };
                                });

                            case 3:
                                doc = _context.sent;


                                // 解析数据
                                if (!res) {
                                    res = {
                                        code: 200,
                                        data: doc,
                                        msg: ''
                                    };
                                }

                                //返回数据
                                return _context.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function comments(_x) {
                return _ref.apply(this, arguments);
            }

            return comments;
        }()

        /**
         * 添加评论
         */

    }, {
        key: 'addComment',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(params, userInfo) {
                var doc, res, content, bookid, commentid, time, commentData, newDoc;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                doc = void 0, res = void 0;
                                content = params.content, bookid = params.bookid, commentid = params.commentid;
                                time = Date.now().toString();
                                commentData = {
                                    userid: userInfo.userId,
                                    headimgurl: userInfo.headimgurl,
                                    nickname: userInfo.nickname,
                                    content: content,
                                    create_time: time,
                                    key: time
                                };

                                if (!commentid) {
                                    _context2.next = 11;
                                    break;
                                }

                                _context2.next = 7;
                                return _entity2.default.updateBase(_models2.default.comment, { "_id": commentid }, { '$push': { 'comments': commentData } }).catch(function (e) {
                                    res = { code: 500, data: null, msg: 'update comment error' };
                                });

                            case 7:
                                _context2.next = 9;
                                return _entity2.default.update(_models2.default.books, bookid, { 'update_time': Date.now() }).catch(function (e) {
                                    res = { code: 500, data: null, msg: 'book update_time fail' };
                                });

                            case 9:
                                _context2.next = 18;
                                break;

                            case 11:
                                //评论文档
                                newDoc = {
                                    update_time: time,
                                    comments: [commentData]
                                    //创建新的评论
                                };
                                _context2.next = 14;
                                return _entity2.default.create(_models2.default.comment, newDoc).catch(function (e) {
                                    res = { code: 500, data: null, msg: 'create comment error' };
                                });

                            case 14:
                                doc = _context2.sent;


                                commentid = doc._id;

                                //更新book的评论id update_time
                                _context2.next = 18;
                                return _entity2.default.update(_models2.default.books, bookid, { 'commentid': commentid, 'update_time': Date.now() }).catch(function (e) {
                                    res = { code: 500, data: null, msg: 'book comment update error' };
                                });

                            case 18:

                                res = res || {
                                    code: 200,
                                    data: {
                                        commentid: commentid,
                                        key: commentData.key
                                    },
                                    msg: ''
                                    //返回数据
                                };return _context2.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 20:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function addComment(_x2, _x3) {
                return _ref2.apply(this, arguments);
            }

            return addComment;
        }()

        /**
         * 修改评论
         */

    }, {
        key: 'replayComment',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(params, userInfo) {
                var doc, res, comments, key, commentid, content, touser, time, commentData, commentDoc;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                doc = void 0, res = void 0, comments = void 0;
                                key = params.key, commentid = params.commentid, content = params.content, touser = params.touser;
                                time = Date.now().toString();
                                commentData = {
                                    userid: userInfo.userId,
                                    headimgurl: userInfo.headimgurl,
                                    nickname: userInfo.nickname,
                                    content: content,
                                    create_time: time,
                                    key: time
                                };

                                if (touser) {
                                    commentData.touser = touser;
                                }

                                _context3.next = 7;
                                return _entity2.default.findById(_models2.default.comment, commentid).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'comment query error'
                                    };
                                });

                            case 7:
                                commentDoc = _context3.sent;


                                comments = commentDoc.comments;
                                comments && comments.map(function (obj, index) {
                                    if (obj.key == key) {
                                        if (obj.childcomments) {
                                            obj.childcomments.push(commentData);
                                        } else {
                                            obj.childcomments = [commentData];
                                        }
                                    }
                                });

                                doc = _entity2.default.update(_models2.default.comment, commentid, { 'comments': comments }).catch(function (e) {
                                    res = {
                                        code: 500,
                                        data: null,
                                        msg: 'update replay comment error'
                                    };
                                });
                                res = res || {
                                    code: 200,
                                    data: doc,
                                    msg: ''
                                    //返回数据
                                };return _context3.abrupt('return', new Promise(function (resolve) {
                                    resolve(res);
                                }));

                            case 13:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function replayComment(_x4, _x5) {
                return _ref3.apply(this, arguments);
            }

            return replayComment;
        }()
    }]);

    return CommentControl;
}();

exports.default = CommentControl;
var commentCtrl = exports.commentCtrl = new CommentControl();

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("ulid");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var webpack = __webpack_require__(49);
var webConf = __webpack_require__(10);

module.exports = {
    debug: true,
    /*
     ** Headers of the page
     */
    head: {
        title: 'starter',
        meta: [{ charset: 'utf-8' }, { hid: 'description', name: 'description', content: 'h5 freshbook' }],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
     ** Global CSS
     */
    css: [{ src: 'quill/dist/quill.bubble.css', lang: 'css' }, //
    { src: 'quill/dist/quill.snow.css', lang: 'css' }, //
    { src: 'quill/dist/quill.core.css', lang: 'css' }, //
    { src: '~assets/css/debug.scss', lang: 'scss' }, // 指定 scss 而非 sass
    { src: '~/assets/css/main.scss', lang: 'scss' // 指定 scss 而非 sass
    }],
    /**
     * 环境变量
     */
    env: {
        baseUrl: process.env.BASE_URL || 'http://' + webConf.nuxt.host + ':' + webConf.nuxt.port
    },
    router: {
        middleware: ['visits', 'user-agent', 'check-login']
    },
    /*
     ** Add axios globally
     */
    build: {
        vendor: ['axios', 'qs'],
        plugins: [new webpack.DefinePlugin({
            'process.VERSION': __webpack_require__(50).version,
            __DEV: true
        })],
        /*
         ** Run ESLINT on save
         */
        extend: function extend(config, ctx) {
            if (ctx.isClient) {
                // config.module.rules.push({
                //   enforce: 'pre',
                //   test: /\.(js|vue)$/,
                //   loader: 'eslint-loader',
                //   exclude: /(node_modules)/
                // })
                config.module.rules.push({ test: /iview.src.*?js$/, loader: 'babel-loader' });
                config.watch = true;
            }
        }
    },
    plugins: [{ src: '~plugins/iview', ssr: true }, { src: '~plugins/filters', ssr: false }, { src: '~plugins/mavon-eidor', ssr: false }, { src: '~plugins/infinite-scroll', ssr: false }, { src: '~plugins/vue-html5-editor', ssr: false }],
    loading: '~/components/common/Loading.vue',
    watchers: {
        webpack: {
            aggregateTimeout: 300,
            ignored: /node_modules/,
            poll: 1000
        }
    }
};

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = {"name":"hefan-freshbook","version":"1.0.0","description":"freshbook project","author":"李春伟 <lichunwei@hefantv.com>","private":true,"scripts":{"server":"backpack start","nuxtBuild":"nuxt build","dev":"backpack dev","build":"backpack build","pro":"backpack pro","precommit":"npm run lint","lint":"eslint --ext .js,.vue --ignore-path .gitignore ."},"config":{"nuxt":{"host":"127.0.0.1","port":"9018"}},"dependencies":{"axios":"^0.16.2","babel-preset-es2015":"^6.24.1","babel-preset-stage-0":"^6.24.1","boom":"^7.1.1","brace-expansion":"^1.1.8","cross-env":"^5.0.1","debug":"^3.1.0","hefantv-backpack":"^0.1.6","inflight":"^1.0.6","ioredis":"^3.2.2","iview":"^2.7.3","jsonwebtoken":"^8.1.0","koa":"^2.4.1","koa-bodyparser":"^4.2.0","koa-compress":"^2.0.0","koa-cors":"^0.0.16","koa-router":"^7.3.0","koa-session2":"^2.2.5","lodash":"^4.17.4","mavon-editor":"^2.4.7","moment":"^2.18.1","mongoose":"^4.11.3","node-sass":"^4.7.2","nuxt":"^1.0.0-rc11","opn":"^4.0.2","qa":"^0.0.1","sass-loader":"^6.0.6","source-map-support":"^0.4.15","ulid":"^2.2.3","vue-infinite-scroll":"^2.0.2","vue-markdown":"^2.2.4","vue-quill-editor":"^3.0.4","wrappy":"^1.0.2","ws":"^2.2.3"}}

/***/ })
/******/ ]);
//# sourceMappingURL=main.map