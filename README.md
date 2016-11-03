# vue-analytics
Vue plugin to handle basic Google Analytics tracking: pages and events.

Here the documentation about [pageview](https://developers.google.com/analytics/devguides/collection/analyticsjs/pages) and [events](https://developers.google.com/analytics/devguides/collection/analyticsjs/events)

> you still need to inject the script tag of Google Analytics yourself, you can find it at the bottom of the page

## Installation
```js
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
Vue.$track.page('/home')

/**
 * Event tracking
 * @param  {String} category
 * @param  {String} action
 * @param  {String} [label='']
 * @param  {Number} [value=0]
 */
Vue.$track.event('share', 'click', 'facebook')

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

### Google Analytics script tag
Copy/paste this at the bottom of the body tag.
The plugin will start tracking only if the script is loaded.
```html
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-XXXX-1', 'auto');
</script>
```
