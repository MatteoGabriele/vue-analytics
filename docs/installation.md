## Get started

Install the package
```bash
npm install vue-analytics
```

Start using it your Vue application
```js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-XXX-X'
})
```
### Important 
A problem in the current release is the time between action fired and script loaded.
In the next release I've introduced the untracked feature that will store event fired before Google script is properly loaded and then re-fired them as soon as window.ga is injected in your application.
To avoid this issue please follow this [instructions](https://github.com/MatteoGabriele/vue-analytics/blob/master/docs/when-google-analytics-is-loaded.md)
