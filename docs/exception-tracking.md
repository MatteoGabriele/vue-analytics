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

Google Analytics docs: [exceptions](https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions)

