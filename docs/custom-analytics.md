## Custom analytics.js URL

Due to country restrictions, in specific cases is necessary to add a custom URL to load the analytics.js file.

It is possible to use the `customResourceURL` prop in the plugin options

```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  customResourceURL: 'http://your-custom-url/analytics.js'
})
```

By adding the `customResourceURL` you won't be able to switch between debug and production file, so you need to do it manually, depending on which file you want to use.