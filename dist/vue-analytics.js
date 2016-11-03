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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(2);

	var config = {
	  debug: false,
	  excludes: []
	};

	var event = function event(category, action) {
	  var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	  var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

	  if (typeof window.ga === 'undefined') {
	    return;
	  }

	  var context = category + '/' + action + '/' + label;

	  if (typeof value !== 'number') {
	    (0, _utils.log)('Event ' + context + ', needs an integer as \'value\'.', 'error', config.debug);
	    return;
	  }

	  (0, _utils.log)('Tracking event ' + context, 'normal', config.debug);
	  window.ga('send', 'event', category, action, label, value);
	};

	var page = function page(_page, title, location) {
	  if (typeof window.ga === 'undefined') {
	    return;
	  }

	  (0, _utils.log)('Tracking pageview ' + _page, 'normal', config.debug);
	  window.ga('send', 'pageview', { page: _page, title: title, location: location });
	};

	var install = function install(Vue) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var router = options.router,
	      debug = options.debug,
	      excludeRoutes = options.excludeRoutes;


	  config.excludes = excludeRoutes || config.excludes;
	  config.debug = !!debug;

	  Vue['$track'] = { event: event, page: page };

	  if (router) {
	    (function () {
	      var excludes = config.excludes;


	      router.afterEach(function (_ref) {
	        var path = _ref.path,
	            name = _ref.name;

	        if (excludes.length && excludes.indexOf(name) !== -1) {
	          return;
	        }

	        Vue.$track.page(path);
	      });
	    })();
	  }
	};

	exports.default = { install: install };

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var log = exports.log = function log(text) {
	  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'normal';
	  var debug = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	  if (!debug) {
	    return;
	  }

	  var general = 'padding: 10px 5px; line-height: 30px;';
	  var normal = general + ' background: #ccc; color: #444444';
	  var success = general + ' background: #219621; color: #ffffff';
	  var error = general + ' background: #b9090b; color: #ffffff';
	  var warning = general + ' background: #f1e05a; color: #333333';

	  var types = { success: success, error: error, normal: normal, warning: warning };

	  console.log('');
	  console.log('%c [VueAnalytics] ' + text + ' ', types[type]);
	  console.log('');
	};

/***/ }
/******/ ])
});
;