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
	var event = function event(category, action) {
	  var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	  var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

	  if (!hasGoogleAnalytics()) {
	    return;
	  }

	  window.ga('send', 'event', category, action, label, value);
	};

	var page = function page(path) {
	  if (!hasGoogleAnalytics()) {
	    return;
	  }

	  window.ga('send', 'page-view', path);
	};

	var hasGoogleAnalytics = function hasGoogleAnalytics() {
	  return typeof window.ga !== 'undefined';
	};

	var install = function install(Vue) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var router = options.router;


	  Vue['$track'] = { event: event, page: page };

	  if (router) {
	    router.afterEach(function (_ref) {
	      var path = _ref.path;

	      Vue.$track.page(path);
	    });
	  }
	};

	exports.default = { install: install };

/***/ }
/******/ ])
});
;