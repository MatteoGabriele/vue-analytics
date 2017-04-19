[![npm version](https://badge.fury.io/js/vue-analytics.svg)](https://badge.fury.io/js/vue-analytics) [![npm](https://img.shields.io/npm/dt/vue-analytics.svg)](https://www.npmjs.com/package/vue-analytics)


# vue-analytics
Vue plugin for Google Analytics: **1.60kb** of love :rocket:

## Requirements
Vue ^2.0.0

## User guide
- [Installation](#installation)
- [Usage](#usage)
- [Page tracking](#page-tracking)
  - [Enable page auto tracking](#enable-page-auto-tracking)
  - [Disable pageview hit on page load](#disable-pageview-hit-on-page-load)
  - [Ignore routes](#ignore-routes-on-page-auto-tracking)
  - [Auto track with custom data](#auto-track-with-custom-data)
- [Event tracking](#event-tracking)
- [User timings](#user-timings)
- [Exception tracking](#exception-tracking)
  - [Enable exception auto tracking](#enable-exception-auto-tracking) 
- [Require](#require)
- [Set](#set)
- [Social interactions](#social-interactions)
- [User explorer report](#user-explorer)
- [Track multiple accounts](#track-multiple-accounts)
- [Script loaded callback](#script-loaded-callback)
- [Custom methods](#custom-methods)
- [Debug](#debug)
- [Issues or feature requests](#issues-and-features-requests)

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

**It's possible to use the Analytics library using a Vue instance or accessing it directly in the scope of your component**

## Page tracking

Page tracking is the most important feature of Google Analytics and you can achieve that in 3 different ways

The standard way is just passing the current page path

```js
this.$ga.page('/')
```

passing as an object literal

```js
this.$ga.page({
  page: '/',
  title: 'Home page',
  location: window.location.href
})
```

or you can even pass the VueRouter instance scoped in your component and the plugin will automatically detect the current route name, path and location: just be sure to add the `name` property in your route object 

```js
this.$ga.page(this.$router)
```

Google Analytics docs: [page tracking](https://developers.google.com/analytics/devguides/collection/analyticsjs/pages)


### Enable page auto tracking

The most easy way to track your single page application, is to pass the VueRouter instance to the plugin and let it handle everything for you

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAnalytics from 'vue-analytics'

const router = new VueRouter({
  router: // your routes
})

Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  router
})
```

### Disable pageview hit on page load

Page auto tracking sends a pageview event on page load, but it is possible to disable that 

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAnalytics from 'vue-analytics'

const router = new VueRouter({
  router: // your routes
})

Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  router,
  autoTracking: {
    pageviewOnLoad: false
  }
})
```

### Disable page auto tracking

To disable auto tracking we can just remove the VueRouter instance, but if you need to track only in specific environment or situations, it is also possible to disable page auto tracking like so

```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  router,
  autoTracking: {
    page: false
  }
})
```

### Ignore routes on page auto tracking

To disable auto tracking for specific routes, you need to pass an array of names of routes to the plugin options

```js
Vue.use(VueAnalytics, {
  router,
  ignoreRoutes: ['home', 'contacts']
})
```

### Auto track with custom data

When auto-tracking is possible to pass a function with a custom object shape to use as a tracker.

The `pageViewTemplate` passes the current route as parameter

```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  router,
  autoTracking: {
    pageviewTemplate: function (route) {
      return {
        path: route.path,
        title: document.title,
        location: window.location.href
      }
    }
  }
})
```

## Event tracking

Event tracking can be achieved in different ways, following Google specifications 

passing parameters in this exact order

```js
this.$ga.event('category', 'action', 'label', 123)
```

an object literal is also possible

```js
this.$ga.event({
  eventCategory: 'category',
  eventAction: 'action',
  eventLabel: 'label',
  eventValue: 123
})
```

Google Analytics docs: [event tracking](https://developers.google.com/analytics/devguides/collection/analyticsjs/events)

## User timings

User timing measurement can be achieved in different ways, following Google specifications 

passing parameters in this exact order

```js
this.$ga.time('category', 'variable', 123, 'label')
```

or use an object literal 

```js
this.$ga.time({
  timingCategory: 'category',
  timingVar: 'variable',
  timingValue: 123,
  timingLabel: 'label'
})
```

Google Analytics docs: [user timings](https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings)

## Exception tracking

Exception tracking allows you to measure the number and type of crashes or errors that occur in your application

is possible to track single exceptions using a try catch

```js
try {
  // some code that might crash
} catch (error) {
  // handle your error here
  
  // track the error with analytics
  // depending on the error you might want to check
  // if a `message` property exists or not
  const exception = error.message || error
  this.$ga.exception(exception)
}
```

### Enable exception auto tracking

It is also possible to just enable the plugin exception auto tracking and the plugin will do everything for you

```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  autoTracking: {
    exception: true
  }
})
```

Google Analytics docs: [exceptions](https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions)

## Require

It's possible to use this method to require an Analytics plugin or add your own plugin

example adding [Google Optimize](https://optimize.google.com/optimize/home/#/accounts)

```js
this.$ga.require('GMT-XXXXXXX')
```

or adding a custom plugin 

```js
const options = {}
this.$ga.require('pluginName', options)
```

Google Analytics docs: [require](https://developers.google.com/analytics/devguides/collection/analyticsjs/command-queue-reference#require)

## Set

Sets a single field and value pair or a group of field/value pairs on a tracker object.

```js
this.$ga.set(fieldName, fieldValue)
```

also possible to pass an object literal

```js
this.$ga.set({ fieldName, fieldName })
```

## Social interactions

You can use social interaction analytics to measure the number of times users click on social buttons embedded in webpages. For example, you might measure a Facebook "Like" or a Twitter "Tweet".

is possible to impletement this feature passing parameters in this exact order

```js
this.$ga.social('Facebook', 'like', 'http://myownpersonaldomain.com')
```

also possible to pass an object literal

```js
this.$ga.social({
  socialNetwork: 'Facebook',
  socialAction: 'like',
  socialTarget: 'http://myownpersonaldomain.com'
})
```

Google Analytics docs: [social interactions](https://developers.google.com/analytics/devguides/collection/analyticsjs/social-interactions)

## User explorer

Add the `userId` on first load just passing it in the options object

```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  userId: 'xxx'
})
```

**it is also possible to set the `userId` in runtime using the `set` method**

## Track multiple accounts

It is possible to track multiple accounts at the same time, just passing an array of strings to the `id` property

```js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: ['UA-XXX-A', 'UA-XXX-B']
})
```

## Script loaded callback

In the option object of the plugin there's a callback function available that fires when analytics.js or analytics_debug.js is loaded

always remember that the debug version is more heavy than the production one and might take more to load

```js
Vue.use(VueAnalytics, {
  onReady () {
    // here Google Analaytics is ready to track!
  }
})
```

## Custom methods

Google Analytics has a very big api and sometimes the wrapper might limit you on what you need, so it's still possible to access the plain Analytics api

```js
this.$ga.query(...)
```

if you need more interaction or you want to add specific features, please add an issue on the repo or make a pull request

## Debug

Implements Google Analaytics debug library.

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

Google Analytics docs: [debugging](https://developers.google.com/analytics/devguides/collection/analyticsjs/debugging)

# Issues and features requests
Please drop an issue, if you find something that doesn't work, or a feature request at https://github.com/MatteoGabriele/vue-analytics/issues

Follow me on twitter [@matteo_gabriele](https://twitter.com/matteo_gabriele)
