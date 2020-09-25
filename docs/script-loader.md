## How to load Google Analytics script

**By default nothing is needed: the plugin does everything for you!**

However, in some cases, you might want to avoid auto-loading the analytics.js script because:
- maybe the framework you're using already does it for you
- you really can't remove it from your project
- other issue that I can't come up with

So for all those cases it is possible to let the plugin detect if an analytics script has been added already in your html

```js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  checkDuplicatedScript: true
})
```

or just disable the script loader

```js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  disableScriptLoader: true
})
```

### Bootstrap later
It is possible to setup the entire plugin options, but to bootstrap it later on whenever the user decide too. This could also be useful for any GDPR proof projects.

```js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  bootstrap: false
})
```

Later on you can simply import and call the boostrap function

```js
import { bootstrap, hasScript } from '@/vendor/vue-analytics.js'

if (!hasScript()){
  bootstrap()
}
```

### Important
It is not possible for the plugin to remove the initial trackers, because it needs them to create all methods for the multi-tracking feature.
**If you can't remove initial trackers, don't use this plugin: the outcome could be unpredictable.**
