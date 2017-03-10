(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__(1);\n\n\n//////////////////\n// WEBPACK FOOTER\n// multi main\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///multi_main?");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';Object.defineProperty(exports, \"__esModule\", { value: true });var _config = __webpack_require__(2);\nvar _page = __webpack_require__(6);var _page2 = _interopRequireDefault(_page);\nvar _event = __webpack_require__(7);var _event2 = _interopRequireDefault(_event);\nvar _time = __webpack_require__(8);var _time2 = _interopRequireDefault(_time);\nvar _autoTracking = __webpack_require__(9);var _autoTracking2 = _interopRequireDefault(_autoTracking);\nvar _set = __webpack_require__(5);var _set2 = _interopRequireDefault(_set);\nvar _init = __webpack_require__(10);var _init2 = _interopRequireDefault(_init);\nvar _loadScript = __webpack_require__(4);var _loadScript2 = _interopRequireDefault(_loadScript);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\n/**\n                                                                                                                                                                                                * Vue installer\n                                                                                                                                                                                                * @param  {Vue instance} Vue\n                                                                                                                                                                                                * @param  {Object} [options={}]\n                                                                                                                                                                                                */\nvar install = function install(Vue) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var\n  router = options.router;\n\n  delete options.router;\n  (0, _config.updateConfig)(options);\n\n  (0, _init2.default)(router, options.onAnalyticsReady);\n\n  var features = { trackEvent: _event2.default, trackPage: _page2.default, trackTime: _time2.default, set: _set2.default };\n\n  Vue.prototype.$ga = Vue.$ga = features;\n};exports.default =\n\n{\n  install: install,\n  loadScript: _loadScript2.default,\n  autoTracking: _autoTracking2.default };\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/index.js\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./src/index.js?");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';Object.defineProperty(exports, \"__esModule\", { value: true });exports.updateConfig = undefined;var _utils = __webpack_require__(3);\n\n/**\n                                                                                                                                              * Default configuration\n                                                                                                                                              */\nvar config = {\n  debug: {\n    enabled: false,\n    trace: false,\n    sendHitTask: true },\n\n  autoTracking: true,\n  id: null,\n  userId: null,\n  manual: false,\n  ignoreRoutes: [] };\n\n\n/**\n                       * Returns the new configuation object\n                       * @param  {Object} params\n                       * @return {Object}\n                       */\nvar updateConfig = exports.updateConfig = function updateConfig(params) {\n  // Until v3.0.0 check for `debug` old setup\n  if (typeof params.debug === 'boolean') {\n    var url = 'https://github.com/MatteoGabriele/vue-analytics#debug';\n    (0, _utils.warn)('Please use the new debug setup', url);\n  }\n\n  return (0, _utils.merge)(config, params);\n};exports.default =\n\nconfig;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/config.js\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///./src/config.js?");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';Object.defineProperty(exports, \"__esModule\", { value: true });exports.getName = exports.merge = exports.exists = exports.warn = undefined;var _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj;};var _config = __webpack_require__(2);var _config2 = _interopRequireDefault(_config);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\n/**\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Whining helper\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @param  {String} message\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */\nvar warn = exports.warn = function warn() {for (var _len = arguments.length, message = Array(_len), _key = 0; _key < _len; _key++) {message[_key] = arguments[_key];}\n  /* eslint-disable */\n  console.warn('[VueAnalytics] ' + message.join(' '));\n  /* eslint-enable */\n};\n\n/**\n    * Returns if a string exists in the array of routes\n    * @param  {String} name\n    * @return {Boolean}\n    */\nvar exists = exports.exists = function exists(name) {\n  return !!(_config2.default.ignoreRoutes.length && _config2.default.ignoreRoutes.indexOf(name) !== -1);\n};\n\n/**\n    * Merges two objects\n    * @param  {Object} obj\n    * @param  {Object} src\n    * @return {Object}\n    */\nvar merge = exports.merge = function merge(obj, src) {\n  Object.keys(src).forEach(function (key) {\n    if (obj[key] && _typeof(obj[key]) === 'object') {\n      merge(obj[key], src[key]);\n      return;\n    }\n\n    obj[key] = src[key];\n  });\n\n  return obj;\n};\n\nvar getName = exports.getName = function getName(value) {\n  return value.replace(/-/gi, '');\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/utils.js\n// module id = 3\n// module chunks = 0\n//# sourceURL=webpack:///./src/utils.js?");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';Object.defineProperty(exports, \"__esModule\", { value: true });exports.default =\n\n\n\n\n\nfunction (router, callback) {\n  var options = _config2.default.userId || {};\n  var debugSource = _config2.default.debug.enabled ? '_debug' : '';\n  var source = 'https://www.google-analytics.com/analytics' + debugSource + '.js';\n\n  (0, _loadScript2.default)(source, function (error, script) {\n    if (error) {\n      (0, _utils.warn)('Ops! Could\\'t load the Google Analytics script');\n      return;\n    }\n\n    if (callback && typeof callback === 'function') {\n      callback();\n    }\n\n    if (_config2.default.debug.enabled) {\n      window.ga_debug = {\n        trace: _config2.default.debug.trace };\n\n    }\n\n    [].concat(_config2.default.id).forEach(function (id) {\n      options['name'] = id.replace(/-/g, '');\n      window.ga('create', id, 'auto', options);\n    });\n\n    if (!_config2.default.debug.sendHitTask) {\n      (0, _set2.default)('sendHitTask', null);\n    }\n\n    window.ga('send', 'pageview');\n\n    (0, _autoTracking2.default)(router);\n  });\n};var _config = __webpack_require__(2);var _config2 = _interopRequireDefault(_config);var _utils = __webpack_require__(3);var _set = __webpack_require__(5);var _set2 = _interopRequireDefault(_set);var _autoTracking = __webpack_require__(9);var _autoTracking2 = _interopRequireDefault(_autoTracking);var _loadScript = __webpack_require__(11);var _loadScript2 = _interopRequireDefault(_loadScript);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/loadScript.js\n// module id = 4\n// module chunks = 0\n//# sourceURL=webpack:///./src/loadScript.js?");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';Object.defineProperty(exports, \"__esModule\", { value: true });var _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj;};exports.default =\n\n\nfunction () {for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {data[_key] = arguments[_key];}\n  if (typeof window.ga === 'undefined') {\n    return;\n  }\n\n  if (!data.length) {\n    return;\n  }\n\n  if (_typeof(data[0]) === 'object' && data[0].constructor === Object) {\n    // Use the ga.set with an object literal\n    window.ga('set', data[0]);\n\n    return;\n  }\n\n  if (data.length < 2 || typeof data[0] !== 'string' && typeof data[1] !== 'string') {\n    (0, _utils.warn)('$ga.set needs a field name and a field value, or you can pass an object literal');\n    return;\n  }\n\n  // Use ga.set with field name and field value\n  [].concat(_config2.default.id).forEach(function (id) {\n    window.ga((0, _utils.getName)(id) + '.set', data[0], data[1]);\n  });\n};var _utils = __webpack_require__(3);var _config = __webpack_require__(2);var _config2 = _interopRequireDefault(_config);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/set.js\n// module id = 5\n// module chunks = 0\n//# sourceURL=webpack:///./src/set.js?");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';Object.defineProperty(exports, \"__esModule\", { value: true });exports.default =\n\n\n\n\n\n\n\n\nfunction (page) {var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';var location = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';\n  if (typeof window.ga === 'undefined') {\n    return;\n  }\n\n  [].concat(_config2.default.id).forEach(function (id) {\n    window.ga((0, _utils.getName)(id) + '.send', 'pageview', { page: page, title: title, location: location });\n  });\n};var _utils = __webpack_require__(3);var _config = __webpack_require__(2);var _config2 = _interopRequireDefault(_config);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/track/page.js\n// module id = 6\n// module chunks = 0\n//# sourceURL=webpack:///./src/track/page.js?");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';Object.defineProperty(exports, \"__esModule\", { value: true });exports.default =\n\n\n\n\n\n\n\n\n\nfunction (category, action) {var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;\n  if (typeof window.ga === 'undefined') {\n    return;\n  }\n\n  [].concat(_config2.default.id).forEach(function (id) {\n    window.ga((0, _utils.getName)(id) + '.send', 'event', category, action, label, value);\n  });\n};var _utils = __webpack_require__(3);var _config = __webpack_require__(2);var _config2 = _interopRequireDefault(_config);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/track/event.js\n// module id = 7\n// module chunks = 0\n//# sourceURL=webpack:///./src/track/event.js?");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';Object.defineProperty(exports, \"__esModule\", { value: true });exports.default =\n\n\n\n\n\n\n\n\n\nfunction (category, variable, value) {var label = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';\n  if (typeof window.ga === 'undefined') {\n    return;\n  }\n\n  [].concat(_config2.default.id).forEach(function (id) {\n    window.ga((0, _utils.getName)(id) + '.send', 'timing', category, variable, value, label);\n  });\n};var _config = __webpack_require__(2);var _config2 = _interopRequireDefault(_config);var _utils = __webpack_require__(3);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/track/time.js\n// module id = 8\n// module chunks = 0\n//# sourceURL=webpack:///./src/track/time.js?");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';Object.defineProperty(exports, \"__esModule\", { value: true });exports.default =\n\n\n\n\n\n\n\nfunction (router) {\n  if (_config2.default.manual && !router && _config2.default.autoTracking) {\n    var url = 'https://github.com/MatteoGabriele/vue-analytics#auto-tracking';\n    (0, _utils.warn)('auto-tracking doesn\\'t work without a router instance.', url);\n    return;\n  }\n\n  if (!_config2.default.autoTracking || !router) {\n    return;\n  }\n\n  // Track the first page when the user lands on it\n  var route = router.currentRoute;\n\n  if (!(0, _utils.exists)(route.name)) {\n    (0, _page2.default)(route.path, route.name, window.location.href);\n  }\n\n  // Track all other pages\n  router.afterEach(function (_ref) {var path = _ref.path,name = _ref.name;\n    if ((0, _utils.exists)(name)) {\n      return;\n    }\n\n    (0, _page2.default)(path, name, window.location.href);\n  });\n};var _config = __webpack_require__(2);var _config2 = _interopRequireDefault(_config);var _utils = __webpack_require__(3);var _page = __webpack_require__(6);var _page2 = _interopRequireDefault(_page);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/track/autoTracking.js\n// module id = 9\n// module chunks = 0\n//# sourceURL=webpack:///./src/track/autoTracking.js?");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';Object.defineProperty(exports, \"__esModule\", { value: true });exports.default =\n\n\n\nfunction (router, callback) {\n  if (_config2.default.manual) {\n    return;\n  }\n\n  if (!_config2.default.id || !_config2.default.id.length) {\n    var url = 'https://github.com/MatteoGabriele/vue-analytics#usage';\n    (0, _utils.warn)('Please enter a Google Analaytics tracking ID', url);\n    return;\n  }\n\n  (0, _loadScript2.default)(router, callback);\n};var _config = __webpack_require__(2);var _config2 = _interopRequireDefault(_config);var _utils = __webpack_require__(3);var _loadScript = __webpack_require__(4);var _loadScript2 = _interopRequireDefault(_loadScript);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/init.js\n// module id = 10\n// module chunks = 0\n//# sourceURL=webpack:///./src/init.js?");

/***/ },
/* 11 */
/***/ function(module, exports) {

	eval("\nmodule.exports = function load (src, opts, cb) {\n  var head = document.head || document.getElementsByTagName('head')[0]\n  var script = document.createElement('script')\n\n  if (typeof opts === 'function') {\n    cb = opts\n    opts = {}\n  }\n\n  opts = opts || {}\n  cb = cb || function() {}\n\n  script.type = opts.type || 'text/javascript'\n  script.charset = opts.charset || 'utf8';\n  script.async = 'async' in opts ? !!opts.async : true\n  script.src = src\n\n  if (opts.attrs) {\n    setAttributes(script, opts.attrs)\n  }\n\n  if (opts.text) {\n    script.text = '' + opts.text\n  }\n\n  var onend = 'onload' in script ? stdOnEnd : ieOnEnd\n  onend(script, cb)\n\n  // some good legacy browsers (firefox) fail the 'in' detection above\n  // so as a fallback we always set onload\n  // old IE will ignore this and new IE will set onload\n  if (!script.onload) {\n    stdOnEnd(script, cb);\n  }\n\n  head.appendChild(script)\n}\n\nfunction setAttributes(script, attrs) {\n  for (var attr in attrs) {\n    script.setAttribute(attr, attrs[attr]);\n  }\n}\n\nfunction stdOnEnd (script, cb) {\n  script.onload = function () {\n    this.onerror = this.onload = null\n    cb(null, script)\n  }\n  script.onerror = function () {\n    // this.onload = null here is necessary\n    // because even IE9 works not like others\n    this.onerror = this.onload = null\n    cb(new Error('Failed to load ' + this.src), script)\n  }\n}\n\nfunction ieOnEnd (script, cb) {\n  script.onreadystatechange = function () {\n    if (this.readyState != 'complete' && this.readyState != 'loaded') return\n    this.onreadystatechange = null\n    cb(null, script) // there is no way to catch loading errors in IE8\n  }\n}\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/load-script/index.js\n// module id = 11\n// module chunks = 0\n//# sourceURL=webpack:///./~/load-script/index.js?");

/***/ }
/******/ ])
});
;