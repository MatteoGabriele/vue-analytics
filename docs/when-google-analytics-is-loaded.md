## Script loaded callback

In the option object of the plugin there's a callback function available that fires when analytics.js or analytics\_debug.js is loaded

always remember that the debug version is more heavy than the production one and might take more to load

```js
Vue.use(VueAnalytics, {
  onReady () {
    // here Google Analaytics is ready to track!
  }
})
```



