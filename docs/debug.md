## Debug

Implements Google Analytics debug library.

**Please remember that it is for debug only. The file size of analytics\_debug.js is way larger than analytics.js**

```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  debug: {
    enabled: true, // Default is false
    trace: false, // Default is false
    sendHitTask: true // Default is true
  }
})
```

### Tips
* to be able to use the `trace` option, the `enabled` property needs to be set to `true`.
* `sendHitTask` it's a standalone feature that doesn't need the debug script from Google. Enable true/false is not relevant.
* set the `enabled` to `process.env.NODE_ENV !== 'production'` to use the Google Analytics Debug tool in your console.
* set the `sendHitTask` to `process.env.NODE_ENV === 'production'` to stop sending data to your account while developing you application.

Google Analytics docs: [debugging](https://developers.google.com/analytics/devguides/collection/analyticsjs/debugging)
