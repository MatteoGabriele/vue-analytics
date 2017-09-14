## Debug

Implements Google Analaytics debug library.

**Please remember that it is for debug only. The file size of analytics\_debug.js is way larger than analytics.js**

```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  debug: {
    enabled: true,
    trace: false,
    sendHitTask: true
  }
})
```

Google Analytics docs: [debugging](https://developers.google.com/analytics/devguides/collection/analyticsjs/debugging)
