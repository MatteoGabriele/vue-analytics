## Opt-out from Google Analytics

It is possible to opt-out from Google Analytics by simply setting the `disabled` property to true.
The `disabled` property accepts also a function, a promise or a function that returns a promise, but it needs to return a boolean.

Take in mind that when using a promise, the plug-in won't start tracking until it's resolved, because the opt-out needs to happen before trackers or queues are initialized.

If you are using more then one domain name, all of them will be disabled from tracking.

**if you need to disable tracking just for development, is better to use the `sendHitTask` property in the `debug` object. Read more [here](/docs/turn-off-development.md)**

```js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

// boolean
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  disabled: true
})

// function
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  disabled: () => {
    return true
  }
})

// promise
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  disabled: Promise.resolve(true)
})

// function that returns a promise
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  disabled: () => {
    return Promise.resolve(true)
  }
})
```

It is also possible to disable tracking from everywhere at any time using the `disable` method.

```js
export default {
  methods: {
    disableTracking () {
      this.$ga.disable()
      // from now on analytics is disabled
    },
    enableTracking () {
      this.$ga.enable()
      // from now on analytics is enabled
    }
  }
}
```

or

```js
Vue.$ga.disable(true)
```