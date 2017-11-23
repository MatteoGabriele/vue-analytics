## Ecommerce

All ecommerce features are built-in in the plugin, so there's no need to require any ecommerce libraries: just enable the ecommerce features from the plugin configuration

```js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  ecommerce: {
    enabled: true
  }
})
```

It is also possible to use the Enhanced Ecommerce library just by change it the configuration like so

```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  ecommerce: {
    enabled: true,
    enhanced: true
  }
})
```

Finally it's possible to pass additional options during the installation of the library

```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  ecommerce: {
    enabled: true,
    options: { ... }
  }
})
```

All the available features are documented in Google Analytics dev guide

- [Ecommerce](https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce)
- [Enhanced Ecommerce](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce)
