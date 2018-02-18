## Analytics ready!

In the option object of the plugin there's a callback function available that fires when analytics.js or analytics\_debug.js is loaded

always remember that the debug version is more heavy than the production one and might take more to load

```js
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  beforeFirstHit () {
    // this is right after the tracker and before every other hit to Google Analytics
  },
  ready () {
    // here Google Analytics is ready to track!
  }
})
```

It is also possible to use the `onScriptLoaded` method, which returns a promise.

```js
import VueAnalytics, { onAnalyticsReady } from 'vue-analytics'

Vue.use(VueAnalytics, { ... })

const App = new Vue({ ... })

onAnalyticsReady().then(() => {
  App.$mount('#app')
})
```
