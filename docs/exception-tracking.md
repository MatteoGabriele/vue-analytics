## Exception tracking

Exception tracking allows you to measure the number and type of crashes or errors that occur in your application

is possible to track single exceptions using a try catch

```js
try {
  // some code that might crash
} catch (error) {
  // handle your error here

  // track the error with analytics
  // depending on the error you might want to check
  // if a `message` property exists or not
  const exception = error.message || error
  this.$ga.exception(exception)
}
```

### Enable exception auto tracking

It is also possible to just enable the plugin exception auto tracking and the plugin will do everything for you

```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  autoTracking: {
    exception: true
  }
})
```

**important: the auto tracking script uses Vue.config.errorHandler, if you need to add your handler, do it before installing the plugin or will be overwritten**

### Error logs

When auto-tracking errors logs are automatically logged in the console, if you want to disable them, you can add this property to your configuration

```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  autoTracking: {
    exception: true,
    exceptionLogs: false
  }
})
```


Google Analytics docs: [exceptions](https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions)

