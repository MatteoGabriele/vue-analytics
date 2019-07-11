## Vuex and Google Analytics

To be able to use vue-analytics from your Vuex store, just import the methods you need and fire it directly from the store

## First step
Make sure to have your vue-analytics package installed **before** start using it in your store

```js
// main.js
import Vue from 'vue'
import store from './store'
import App from './App'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-xxxx-1'
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
```

## Second step
Start using vue-analytics API in your store

```js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import { event } from 'vue-analytics'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    increase ({ state }) {
      state.counter++
    }
  },
  actions: {
    increase ({state, commit}) {
      return new Promise((resolve,reject) => {
        commit('increase');
        event('user-click', 'increase','counter', state.counter, {
          hitCallback: resolve
        })
      })
    }
  }
})
```
