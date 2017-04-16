[![npm version](https://badge.fury.io/js/vue-analytics.svg)](https://badge.fury.io/js/vue-analytics) [![npm](https://img.shields.io/npm/dt/vue-analytics.svg)](https://www.npmjs.com/package/vue-analytics)


# vue-analytics
Vue plugin for Google Analytics.

## Requirements
Vue ^2.0.0

## User guide
- [Installation](#installation)
- [Usage](#usage)
- [Page tracking](#page-tracking)
  - [Enable page auto tracking](#enable-page-auto-tracking)
  - [Ignore routes](#ignore-routes)
- [Event tracking]()
- [Time tracking]()
- [Exception tracking]()
  - [Enable/disable exception auto tracking]() 
- [Require]()
- [Set]()
- [User explorer report]()
- [Track multiple accounts]()
- [Script load callback]()
- [Custom actions]()
- [Debug]()
- [Install Google Analytics plugins]()
- [Issues or feature requests]()

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

## Page tracking

Page tracking is the most used feature of Google Analytics and you can try different way of doing it

The standard way is just passing the current page path

```js
this.$ga.page('/')
```

or passing a more complex object

```js
this.$ga.page({
  page: '/',
  title: 'Home page',
  location: window.location.href
})
```

or you can even directly pass the VueRouter instance scoped in your component and the plugin will automatically detect which one is the current route name, path and location

```js
this.$ga.page(this.$router)
```


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

#### Ignore routes

To disable auto tracking for specific routes, you need to pass an array of names of routes to the plugin options

```js
Vue.use(VueAnalytics, {
  router,
  ignoreRoutes: ['home', 'contacts']
})
```

# Issues and features requests
Please drop an issue, if you find something that doesn't work, or a feature request at https://github.com/MatteoGabriele/vue-analytics/issues

Follow me on twitter [@matteo_gabriele](https://twitter.com/matteo_gabriele)
