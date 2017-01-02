# vue-analytics
Vue plugin to handle basic Google Analytics tracking: pages and events.

Here the documentation about [pageview](https://developers.google.com/analytics/devguides/collection/analyticsjs/pages) and [events](https://developers.google.com/analytics/devguides/collection/analyticsjs/events)

> you still need to inject the script tag of Google Analytics yourself, you can find it at the bottom of the page

## Installation
```shell
npm install vue-analytics
```
## Usage

```js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics)

/**
 * Page tracking
 * @param  {String} page
 * @param  {String} title
 * @param  {String} location
 */
Vue.track.page('/home')

/**
 * Event tracking
 * @param  {String} category
 * @param  {String} action
 * @param  {String} [label='']
 * @param  {Number} [value=0]
 */
Vue.track.event('share', 'click', 'facebook')

```

### Component usage
Also possible to use it inside a component scope

```js
export default {
  mounted () {
      this.$track.event(...)
    }
}
```

### Google Analytics script
It is possible to load the script tag to enable Googla Analytics using the `loadScript` method and passing the provided ID

```js
import Vue from 'vue'
import VueAnalytics, { loadScript } from 'vue-anaylics'

Vue.use(VueAnalytics)

loadScript('UA-XXX-N')
```

### Naming conventions
For better readability `track` is the name of choice, but to maintain a reference to Google Analytics, also `ga` is passed as an alias so this code will also be valid

```js
import Vue from 'vue'

Vue.ga.event('share', 'click', 'facebook')

```

or

```js
export default {
  mounted () {
      this.$ga.event(...)
    }
}
```

### Options
Is possible to pass the router instance inside the options and it will automatically start to track pages on every route changes.

```js
import router from './router'

Vue.use(VueAnalytics, { router })
```

Exclude specific path from being tracked by passing an array of route names.

```js
import router from './router'

Vue.use(VueAnalytics, { router, excludeRoutes: ['home'] })
```

There is already a [Google Analytics extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) for Chrome that allows you to read what's going on.
This logger will just tell you what type of tracking is fired and which parameters.
Enable/disable logs. Default value is false.

```js
Vue.use(VueAnalytics, { debug: true })
```