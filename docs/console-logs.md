## Console logs

Implements Google Analaytics debug logs in your console.

**Please remember that it is for debug only. The file size of analytics\_debug.js is way larger than analytics.js**

Example:

```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  debug: {
    enabled: true
  }
})
```

Google Analytics docs: [debugging](https://developers.google.com/analytics/devguides/collection/analyticsjs/debugging)
