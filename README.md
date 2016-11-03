# vue-analytics
Vue plugin to handle Google Analytics tracking

## Installation
```js
npm install vue-analytics
```
## Usage
```js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics)
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
