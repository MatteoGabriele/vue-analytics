## Untracked hits

Due to different types of connections, loading Google Analytics script and having the application up and running at the same time can be difficult and leading to untracked hits.

VueAnalytics takes care of this eventuality by storing all untracked events and track them later on, but if for some reasons you don't like that, is possible to turn this feature off

```js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
   id: 'UA-XXX-X',
   autotracking: {
     untracked: false
   }
})
```