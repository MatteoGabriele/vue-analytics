## Debug

Implements Google Analaytics debug library.

**Please remember that it is for debug only. The file size of analytics\_debug.js is way larger than analytics.js**

Example:

```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  debug: {
    enabled: false, // default value
    trace: false, // default value
    sendHitTask: true // default value
  }
})
```

Google Analytics docs: [debugging](https://developers.google.com/analytics/devguides/collection/analyticsjs/debugging)
