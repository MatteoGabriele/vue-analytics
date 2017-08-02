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

The most easy way to track your application, is to pass the VueRouter instance to the plugin and let it handle everything for you

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
        page: route.path,
        title: document.title,
        location: window.location.href
      }
    }
  }
})
```

## 



