/*!
 * vue-analytics v1.3.4
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
  auto: true,
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
 * Start tracking
 * @param  {Vue} Vue
 * @param  {VueRouter} router
 */
var start = function start(Vue, router) {
  return function () {
    if (router) {
      setTimeout(function () {
        var route = router.currentRoute;

        if (!isTrackable(route.name)) {
          return;
        }

        Vue.track.page(route.path, route.name, window.location.href);
      }, 0);

      router.afterEach(function (_ref) {
        var path = _ref.path,
            name = _ref.name;

        if (!isTrackable(name)) {
          return;
        }

        Vue.track.page(path, name, window.location.href);
      });
    }
  };
};

var isTrackable = function isTrackable(name) {
  return !(config.excludes.length && config.excludes.indexOf(name) !== -1);
};

/**
 * Vue installer
 * @param  {Vue instance} Vue
 * @param  {Object} [options={}]
 */
var install = function install(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var router = options.router;


  config.excludes = options.excludeRoutes || config.excludes;
  config.debug = !!options.debug;
  config.auto = typeof options.auto !== 'undefined' ? options.auto : config.auto;

  /**
   * Naming conventions
   * Using "track" for semantic purposes
   * Using "ga", as an alias, for a more familiar feeling
   */
  Vue.track = Vue.ga = { event: event, page: page };
  Vue.prototype.$track = Vue.prototype.$ga = { event: event, page: page };
  Vue.startTracking = start(Vue, router);

  if (config.auto) {
    Vue.startTracking();
  }
};

var index = { install: install };

exports.loadScript = loadScript;
exports['default'] = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));
