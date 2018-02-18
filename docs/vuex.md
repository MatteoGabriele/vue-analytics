## Vuex and Google Analytics

Google Analytics it is now supported also using the Vuex store, by installing the `analyticsMiddleware` plugin

### Install

```js
// store.js
import Vuex from 'vuex'
import Vue from 'vue'
import { analyticsMiddleware } from 'vue-analytics'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  plugins: [
    analyticsMiddleware
  ]
})

export default store
```

```js
// main.js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import store from './store.js'

Vue.use(VueAnalytics, {
  id: 'UA-1234-5'
})

new Vue({
  ...
})
```

### Usage

In the action, when sending a payload, we need to specify a `meta` object with an `analytics` property that will help us send all the data we need to the trackers

Example of a store action

```js
const store = Vuex.Store({
  state: {
    counter: 0
  },
  actions: {
    increase ({ commit }) {
      commit('increaseCounter', {
        // Here some extra parameters to pass to the mutation
        amount: 1,

        // The meta tag will be read by the plugin and fire
        // the corresponding events
        meta: {
          analytics: [
            ['event', {
              eventCategory: 'counter',
              eventAction: 'increase',
              eventLabel: 'counter experiment',
              eventValue: 1
            }]
          ]
        }

      })
    }
  }
})
```

The way we can construct the track method is just by creating an array and the first argument will be one of the methods available in `vue-analytics` API

* event
* exception
* page
* query
* require
* set
* social
* time
* untracked
* ecommerce
* commands

the second parameter will be our data as usual constructed in a normal call, so if in a component we will have

```js
export default {
  name: 'MyComponent',
  methods: {
    clickMe () {
      this.$ga.event({
        eventCategory: 'counter',
        eventAction: 'increase',
        eventLabel: 'counter experiment',
        eventValue: 1
      })
    }
  }
}
```

or

```js
export default {
  name: 'MyComponent',
  methods: {
    clickMe () {
      this.$ga.event('counter', 'increase', 'counter experiment', 1)
    }
  }
}
```

then in our Vuex action we will write

```js
commit('increaseCounter', {
  meta: {
    analytics: [
      ['event', {
        eventCategory: 'counter',
        eventAction: 'increase',
        eventLabel: 'counter experiment',
        eventValue: 1
      }]
    ]
  }
})
```

or

```js
commit('increaseCounter', {
  meta: {
    analytics: [
      ['event', 'counter', 'increase', 'counter experiment', 1]
    ]
  }
})
```

### Multiple events

The `analytics` property inside the `meta` object is an array, so it is possible to fire multiple events with one action

```js
commit('someAction', {
  meta: {
    analytics: [
      ['event', 'counter', 'increase', 'counter experiment', 1],
      ['page', '/about'],
      ['set', 'userId', 12345]
    ]
  }
})
```
