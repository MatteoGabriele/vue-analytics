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
    pageviewTemplate (route) {
      return {
        page: route.path,
        title: document.title,
        location: window.location.href
      }
    }
  }
})
```

It is also possible to add custom data structure for each route, using the meta object

```js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import VueRouter from 'vue-router'

const router = new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/',
      component: {...},
      meta: {
        analytics: {
          pageviewTemplate (route) {
            return {
              title: 'This is my custom title',
              path: route.path,
              location: 'www.mydomain.com'
            }
          }
        }
      }
    }
  ]
}) 

```
important: the route pageviewTemplate has always priority over the global one.


## Avoid trasnforming route query object into querystring
It is possible to avoid route query to be sent as querystring using the `transformQueryString` property

```js
Vue.use(VueAnalytics, {
  router,
  autoTracking: {
    transformQueryString: false
  }
})
```

## Remove vue-router base option
When a base path is added to the VueRouter instance, the path is merged to the actual router path during the automatic tracking: however it is still possible to remove this behaviour modifying the `prependBase` property in the configuration object

```js
Vue.use(VueAnalytics, {
  router,
  autoTracking: {
    prependBase: false
  }
})
```

