/*!
 * vue-analytics v3.0.0
 * (c) 2017 Matteo Gabriele
 * Released under the ISC License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('load-script')) :
  typeof define === 'function' && define.amd ? define(['load-script'], factory) :
  (global.VueAnalytics = factory(global.loadScript));
}(this, (function (loadScript) { 'use strict';

loadScript = 'default' in loadScript ? loadScript['default'] : loadScript;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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
 * Returns if a string exists in the array of routes
 * @param  {String} name
 * @return {Boolean}
 */
var exists = function exists(name) {
  return !!(config.ignoreRoutes.length && config.ignoreRoutes.indexOf(name) !== -1);
};

/**
 * Merges two objects
 * @param  {Object} obj
 * @param  {Object} src
 * @return {Object}
 */
var merge = function merge(obj, src) {
  Object.keys(src).forEach(function (key) {
    if (obj[key] && _typeof(obj[key]) === 'object') {
      merge(obj[key], src[key]);
      return;
    }

    obj[key] = src[key];
  });

  return obj;
};

var getName = function getName(value) {
  return value.replace(/-/gi, '');
};

/**
 * Default configuration
 */
var config = {
  debug: {
    enabled: false,
    trace: false,
    sendHitTask: true
  },
  autoTracking: true,
  id: null,
  userId: null,
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

  [].concat(config.id).forEach(function (id) {
    window.ga(getName(id) + '.send', 'pageview', { page: page, title: title, location: location });
  });
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

  [].concat(config.id).forEach(function (id) {
    window.ga(getName(id) + '.send', 'event', category, action, label, value);
  });
};

/**
 * Time tracking
 * @param  {String} category
 * @param  {String} variable
 * @param  {Number} value
 * @param  {String} [label='']
 */
var trackTime = function (category, variable, value) {
  var label = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  if (typeof window.ga === 'undefined') {
    return;
  }

  [].concat(config.id).forEach(function (id) {
    window.ga(getName(id) + '.send', 'timing', category, variable, value, label);
  });
};

var set$1 = function () {
  for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
    data[_key] = arguments[_key];
  }

  if (typeof window.ga === 'undefined') {
    return;
  }

  if (!data.length) {
    return;
  }

  if (_typeof(data[0]) === 'object' && data[0].constructor === Object) {
    // Use the ga.set with an object literal
    window.ga('set', data[0]);

    return;
  }

  if (data.length < 2 || typeof data[0] !== 'string' && typeof data[1] !== 'string') {
    warn('$ga.set needs a field name and a field value, or you can pass an object literal');
    return;
  }

  // Use ga.set with field name and field value
  [].concat(config.id).forEach(function (id) {
    window.ga(getName(id) + '.set', data[0], data[1]);
  });
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

var init = function (router, callback) {
  if (config.manual) {
    return;
  }

  if (!config.id || !config.id.length) {
    var url = 'https://github.com/MatteoGabriele/vue-analytics#usage';
    warn('Please enter a Google Analaytics tracking ID', url);
    return;
  }

  var options = config.userId || {};
  var debugSource = config.debug.enabled ? '_debug' : '';
  var source = 'https://www.google-analytics.com/analytics' + debugSource + '.js';

  loadScript(source, function (error, script) {
    if (error) {
      warn('Ops! Could\'t load the Google Analytics script');
      return;
    }

    if (callback && typeof callback === 'function') {
      callback();
    }

    if (config.debug.enabled) {
      window.ga_debug = {
        trace: config.debug.trace
      };
    }

    [].concat(config.id).forEach(function (id) {
      options['name'] = id.replace(/-/g, '');
      window.ga('create', id, 'auto', options);
    });

    if (!config.debug.sendHitTask) {
      set$1('sendHitTask', null);
    }

    window.ga('send', 'pageview');

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

  var features = { trackEvent: trackEvent, trackPage: trackPage, trackTime: trackTime, set: set$1 };

  Vue.prototype.$ga = Vue.$ga = features;
};

var index = {
  install: install
};

return index;

})));
