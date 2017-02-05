/*!
 * vue-analytics v2.2.0
 * (c) 2017 Matteo Gabriele
 * Released under the ISC License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('lodash.merge')) :
  typeof define === 'function' && define.amd ? define(['lodash.merge'], factory) :
  (global.VueAnalytics = factory(global.merge));
}(this, (function (merge) { 'use strict';

merge = 'default' in merge ? merge['default'] : merge;

/**
 * Default configuration
 */
var config = {
  debug: false,
  autoTracking: true,
  id: null,
  userId: null,
  manual: false,
  ignoreRoutes: []
};

/**
 * Returns the new configuation object
 * @param  {Object} params
 * @return {Object}
 */
var updateConfig = function updateConfig(params) {
  return merge(config, params);
};

/**
 * Page tracking
 * @param  {String} page
 * @param  {String} title
 * @param  {String} location
 */
var trackPage = function (page) {
  var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var location = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  if (typeof window.ga === 'undefined') {
    return;
  }

  if (config.debug) {
    /* eslint-disable */
    console.groupCollapsed('[VueAnalytics] Track page "' + page + '"');
    console.log('page: ' + page);
    console.log('title: ' + title);
    console.log('location: ' + location);
    console.groupEnd();
    /* eslint-enable */
  }

  window.ga('send', 'pageview', { page: page, title: title, location: location });
};

/**
 * Event tracking
 * @param  {String} category
 * @param  {String} action
 * @param  {String} [label='']
 * @param  {Number} [value=0]
 */
var trackEvent = function (category, action) {
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
 * Whining helper
 * @param  {String} message
 */
var warn = function warn() {
  for (var _len = arguments.length, message = Array(_len), _key = 0; _key < _len; _key++) {
    message[_key] = arguments[_key];
  }

  /* eslint-disable */
  console.warn('[VueAnalytics] ' + message.join(' '));
  /* eslint-enable */
};

/**
 * Google Analytics script loader
 * it auto adds Google Analytics script without needs to modify the HTML page.
 * @param  {String} id Google Analytics ID
 * @param  {Object} options
 * @return {Promise}
 */
var loadScript = function loadScript(id) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

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

        window.ga('create', id, 'auto', options);
        window.ga('send', 'pageview');

        resolve({ success: true, id: id });
      }
    };

    script.src = 'https://www.google-analytics.com/analytics.js';
  });
};

/**
 * Returns if a string exists in the array of routes
 * @param  {String} name
 * @return {Boolean}
 */
var exists = function exists(name) {
  return !!(config.ignoreRoutes.length && config.ignoreRoutes.indexOf(name) !== -1);
};

/**
 * Enable route autoTracking page
 * @param  {VueRouter} router
 */
var autoTracking = function (router) {
  if (config.manual && !router && config.autoTracking) {
    var url = 'https://github.com/MatteoGabriele/vue-analytics#auto-tracking';
    warn('auto-tracking doesn\'t work without a router instance.', url);
    return;
  }

  if (!config.autoTracking || !router) {
    return;
  }

  // Track the first page when the user lands on it
  var route = router.currentRoute;

  if (!exists(route.name)) {
    trackPage(route.path, route.name, window.location.href);
  }

  // Track all other pages
  router.afterEach(function (_ref) {
    var path = _ref.path,
        name = _ref.name;

    if (exists(name)) {
      return;
    }

    trackPage(path, name, window.location.href);
  });
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var set$$1 = function () {
  if (typeof window.ga === 'undefined') {
    return;
  }

  for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
    data[_key] = arguments[_key];
  }

  if (!data.length) {
    return;
  }

  if (_typeof(data[0]) === 'object' && data[0].constructor === Object) {
    /* eslint-disable */
    console.groupCollapsed('[VueAnalytics] Set');

    var params = data[0];
    for (var key in params) {
      console.log(key + ': ' + params[key]);
    }

    console.groupEnd();
    /* eslint-enable */

    // Use the ga.set with an object literal
    window.ga('set', params);

    return;
  }

  if (data.length < 2 || typeof data[0] !== 'string' && typeof data[1] !== 'string') {
    warn('$ga.set needs a field name and a field value, or you can pass an object literal');
    return;
  }

  /* eslint-disable */
  console.groupCollapsed('[VueAnalytics] Set');
  console.log('Field name: ' + data[0]);
  console.log('Field value: ' + data[1]);
  console.groupEnd();
  /* eslint-enable */

  // Use ga.set with field name and field value
  window.ga('set', data[0], data[1]);
};

/**
 * With default configurationsm it loads Google Analytics script and start autoTracking
 * @param  {VueRouter} router
 */
var init = function init(router, callback) {
  if (config.manual) {
    return;
  }

  if (!config.id) {
    var url = 'https://github.com/MatteoGabriele/vue-analytics#usage';
    warn('Please enter a Google Analaytics tracking ID', url);
    return;
  }

  var options = {};

  if (config.userId) {
    options.userId = config.userId;
  }

  loadScript(config.id, options).then(function (response) {
    if (response.error) {
      warn('Ops! Could\'t load the Google Analytics script');
      return;
    }

    if (callback && typeof callback === 'function') {
      callback();
    }

    autoTracking(router);
  });
};

/**
 * Vue installer
 * @param  {Vue instance} Vue
 * @param  {Object} [options={}]
 */
var install = function install(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var router = options.router;


  delete options.router;
  updateConfig(options);

  init(router, options.onAnalyticsReady);

  var features = { trackEvent: trackEvent, trackPage: trackPage, set: set$$1 };
  Vue.$ga = features;
  Vue.prototype.$ga = features;
};

var index = {
  install: install,
  loadScript: loadScript,
  autoTracking: autoTracking
};

return index;

})));
