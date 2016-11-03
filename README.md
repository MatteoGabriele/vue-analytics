# vue-analytics
Vue plugin to handle basic Google Analytics tracking: pages and events.

Here the documentation on how to use Google Analytics [pageview](https://developers.google.com/analytics/devguides/collection/analyticsjs/pages) and [events](https://developers.google.com/analytics/devguides/collection/analyticsjs/events)

## Installation
```js
npm install vue-analytics
```
## Usage
```js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics)

/**
 * Page tracking
 * @param  {String} page
 * @param  {String} title
 * @param  {String} location
 */
Vue.$track.page('/home')

/**
 * Event tracking
 * @param  {String} category
 * @param  {String} action
 * @param  {String} [label='']
 * @param  {Number} [value=0]
 */
Vue.$track.event('share', 'click', 'facebook')

```
### Options
Is possible to pass the router instance inside the options and it will automatically start to track pages on every route changes.
```js
import router from './router'

Vue.use(VueAnalytics, { router })
```

Exclude specific path from being tracked by passing an array of route names.
```js
import router from './router'

Vue.use(VueAnalytics, { router, excludeRoutes: ['home'] })
```

Enable/disable logs. Default value is false.
```js
Vue.use(VueAnalytics, { debug: true })
```
