## Require

It's possible to use this method to require an Analytics plugin or add your own plugin

example adding [Google Optimize](https://optimize.google.com/optimize/home/#/accounts)

```js
this.$ga.require('GMT-XXXXXXX')
```

or adding a custom plugin

```js
const options = {}
this.$ga.require('pluginName', options)
```

Google Analytics docs: [require](https://developers.google.com/analytics/devguides/collection/analyticsjs/command-queue-reference#require)

