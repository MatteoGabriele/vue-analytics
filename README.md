[![npm version](https://badge.fury.io/js/vue-analytics.svg)](https://badge.fury.io/js/vue-analytics) [![npm](https://img.shields.io/npm/dt/vue-analytics.svg)](https://www.npmjs.com/package/vue-analytics)


# vue-analytics
Vue plugin for Google Analytics.

## Requirements
Vue ^2.0.0

## Installation

```shell
npm install vue-analytics
```

## Usage

```js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-XXX-X'
})
```

## Tracking methods

```js
/**
 * Page tracking
 * @param  {String} page
 * @param  {String} title
 * @param  {String} location
 */
Vue.$ga.trackPage('/home', 'Home page', window.location.href)

/**
 * Event tracking
 * @param  {String} category
 * @param  {String} action
 * @param  {String} [label='']
 * @param  {Number} [value=0]
 */
Vue.$ga.trackEvent('share', 'click', 'facebook')

/**
 * Time tracking
 * @param  {String} category
 * @param  {String} variable
 * @param  {Number} value
 * @param  {String} [label='']
 */
Vue.$ga.trackTime('JS Dependencies', 'load', 3549)


/**
 * Updating tracker data
 * @param {any} data
 */
Vue.$ga.set('sendHitTask', null)

/**
 * Use the require method
 * @type {any}
 */
Vue.$ga.require('GTM-XXXXXXX')
```

and also in the component scope itself

```js
export default {
  mounted () {
    this.$ga.trackPage('/home')
  },

  methods: {
    onShareButtonClick () {
      this.$ga.trackEvent('share', 'click', 'facebook')
    }
  }
}
```

Here the documentation about: 

- [pageview](https://developers.google.com/analytics/devguides/collection/analyticsjs/pages)
- [events](https://developers.google.com/analytics/devguides/collection/analyticsjs/events)
- [timings](https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings)
- [set](https://developers.google.com/analytics/devguides/collection/analyticsjs/accessing-trackers)

## Multiple Accounts

It is possible to track sending hints to multiple accounts, just passing an array strings

```js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: ['UA-XXX-X', 'UA-ZZZ-Z']
})

```

## Google Analytics script loaded callback

```js
Vue.use(VueAnalytics, {
  onAnalyticsReady () {
    // here Google Analaytics is ready to track!
  }
})
```

## Custom query
If the feature is not adde yet, but you need to send specific events or values, just use the `query` method and do it manually.

```js
Vue.$ga.query('send', 'event', 'facebook', 'click', 'something')
```

## Auto-tracking
> requires vue-router ^2.0.0

Auto-tracking is enabled by default and it will load the Google Analytics script and start tracking every route change.

To be able to work properly the route object needs to have a `name` and a `path`

```js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/',
      component: {
        template: '<div>home page!</div>'
      }
    },
    {
      name: 'about',
      path: '/about',
      component: {
        template: '<div>about page!</div>'
      }
    }
  ]
})

// your Google Analytcs tracking ID
const id = 'UA-XXX-X'

Vue.use(VueAnalytics, { id, router })

```

**If you only need to track your routes, this is everything you need to do!**

#### Disable auto-tracking

```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  autoTracking: false
})
```

#### Ignore routes

Auto-tracking tracks every route in you router instance, but if needed, it's possible to pass an array of route names that we don't want to track


```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  router: router
  ignoreRoutes: ['home']
})
```

## Set

Sets a single field and value pair or a group of field/value pairs on a tracker object.

Read more about Googla analytics [set](https://developers.google.com/analytics/devguides/collection/analyticsjs/command-queue-reference#set) method

```js
Vue.$ga.set(fieldName, fieldValue)

// also possible to pass an object literal
Vue.$ga.set({ fieldName, fieldName })

```

or in your component scope

```js
export default {
  methods: {
    onClick () {
      this.$ga.set(fieldName, fieldValue)
    }
  }
}
```

## User Explorer report

Add the `userId` on first load just passing it in the options object

```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  userId: 'xxx'
})
```

**it is also possible to set the `userId` in runtime using the `set` method**


## Debug

Implements Google Analaytics debug library.

You can find documentation about `trace` and `sendHitTask` [here](https://developers.google.com/analytics/devguides/collection/analyticsjs/debugging)

**Please remember that it is for debug only. The file size of analytics_debug.js is way larger than analytics.js**


```js
Vue.use(VueAnalytics, {
  debug: {
    enabled: true,
    trace: false,
    sendHitTask: true
  }
})
```

# Issues and features requests
Please drop an issue, if you find something that doesn't work, or a feature request at https://github.com/MatteoGabriele/vue-analytics/issues

Follow me on twitter [@matteo_gabriele](https://twitter.com/matteo_gabriele)
