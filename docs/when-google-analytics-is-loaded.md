## Analytics ready!

In the option object of the plugin there's a callback function available that fires when analytics.js or analytics\_debug.js is loaded

always remember that the debug version is more heavy than the production one and might take more to load

```js
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  onReady () {
    // here Google Analaytics is ready to track!
  }
})
```
It is also possible to use the `onScriptLoaded` method, which returns a promise.
I suggest to use this method and mount the application after the promise is resolved if you don't want to miss anything in your tracking plan.

**Unfortunately if the application starts tracking but the Analytics object is not yet ready, the plugin won't be able to work.**

```js
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, { ... })

const App = new Vue({ ... })

VueAnalytics.onScriptLoaded().then(() => {
  App.$mount('#app')
})
