## Cross-domain tracking

To enable cross-domain tracking you need to add your links in the `linkers` array in the configuration object

```js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  linkers: ['example1.com', 'example2.com']
})
```

More information about [cross-domain tracking](https://support.google.com/analytics/answer/1034342?hl=en)



