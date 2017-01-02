/*!
 * vue-analytics v1.3.2
 * (c) 2017 Matteo Gabriele
 * Released under the ISC License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.VueAnalytics = global.VueAnalytics || {})));
}(this, (function (exports) { 'use strict';

/**
 * Configuration
 * @type {Object}
 */
var config = {
  debug: false,
  excludes: []
};

/**
 * Event tracking
 * @param  {String} category
 * @param  {String} action
 * @param  {String} [label='']
 * @param  {Number} [value=0]
 */
var event = function event(category, action) {
  var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  if (typeof window.ga === 'undefined') {
    return;
  }

  if (config.debug) {
    /* eslint-disable */
    console.groupCollapsed('[VueAnalytics] Track event category "' + category + '"');
    console.log('category: ' + category);
    console.log('action: ' + action);
    console.log('label: ' + label);
    console.log('value: ' + value);
    console.groupEnd();
    /* eslint-enable */
  }

  window.ga('send', 'event', category, action, label, value);
};

/**
 * Page tracking
 * @param  {String} page
 * @param  {String} title
 * @param  {String} location
 */
var page = function page(_page) {
  var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var location = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  if (typeof window.ga === 'undefined') {
    return;
  }

  if (config.debug) {
    /* eslint-disable */
    console.groupCollapsed('[VueAnalytics] Track page "' + _page + '"');
    console.log('page: ' + _page);
    console.log('title: ' + title);
    console.log('location: ' + location);
    console.groupEnd();
    /* eslint-enable */
  }

  window.ga('send', 'pageview', { page: _page, title: title, location: location });
};

/**
 * Google Analytics script loader
 * it auto adds Google Analytics script without needs to modify the HTML page.
 * @param  {String} id Google Analytics ID
 * @return {Promise}
 */
var loadScript = function loadScript(id) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    var prior = document.getElementsByTagName('script')[0];

    script.async = 1;

    prior.parentNode.insertBefore(script, prior);

    script.onload = script.onreadystatechange = function (_, isAbort) {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = script.onreadystatechange = null;
        script = undefined;

        if (isAbort) {
          reject({ error: true });
          return;
        }

        window.ga('create', id, 'auto');

        resolve({ success: true, id: id });
      }
    };
    script.src = '//www.google-analytics.com/analytics.js';
  });
};

/**
 * Vue installer
 * @param  {Vue instance} Vue
 * @param  {Object} [options={}]
 */
var install = function install(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var router = options.router,
      debug = options.debug,
      excludeRoutes = options.excludeRoutes;


  config.excludes = excludeRoutes || config.excludes;
  config.debug = !!debug;

  /**
   * Naming conventions
   * Using "track" for semantic purposes
   * Using "ga", as an alias, for a more familiar feeling
   */
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

var index = { install: install };

exports.loadScript = loadScript;
exports['default'] = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));
