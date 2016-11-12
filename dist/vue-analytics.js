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
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

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

	  if (config.debug) {
	    console.groupCollapsed('[VueAnalytics] Track event category "' + category + '"');
	    console.log('category: ' + category);
	    console.log('action: ' + action);
	    console.log('label: ' + label);
	    console.log('value: ' + value);
	    console.groupEnd();
	  }

	  window.ga('send', 'event', category, action, label, value);
	};

	var page = function page(_page) {
	  var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	  var location = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

	  if (typeof window.ga === 'undefined') {
	    return;
	  }

	  if (config.debug) {
	    console.groupCollapsed('[VueAnalytics] Track page "' + _page + '"');
	    console.log('page: ' + _page);
	    console.log('title: ' + title);
	    console.log('location: ' + location);
	    console.groupEnd();
	  }

	  window.ga('send', 'pageview', { page: _page, title: title, location: location });
	};

	var install = function install(Vue) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var router = options.router,
	      debug = options.debug,
	      excludeRoutes = options.excludeRoutes;


	  config.excludes = excludeRoutes || config.excludes;
	  config.debug = !!debug;

	  Vue.track = Vue.ga = { event: event, page: page };

	  Vue.prototype.$track = Vue.prototype.$ga = { event: event, page: page };

	  if (router) {
	    (function () {
	      var excludes = config.excludes;


	      router.afterEach(function (_ref) {
	        var path = _ref.path,
	            name = _ref.name;

	        if (excludes.length && excludes.indexOf(name) !== -1) {
	          return;
	        }

	        Vue.track.page(path, name, window.location.href);
	      });
	    })();
	  }
	};

	exports.default = { install: install };

/***/ }
/******/ ])
});
;