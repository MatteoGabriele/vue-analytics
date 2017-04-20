## Social interactions

You can use social interaction analytics to measure the number of times users click on social buttons embedded in webpages. For example, you might measure a Facebook "Like" or a Twitter "Tweet".

is possible to impletement this feature passing parameters in this exact order

```js
this.$ga.social('Facebook', 'like', 'http://myownpersonaldomain.com')
```

also possible to pass an object literal

```js
this.$ga.social({
  socialNetwork: 'Facebook',
  socialAction: 'like',
  socialTarget: 'http://myownpersonaldomain.com'
})
```

Google Analytics docs: [social interactions](https://developers.google.com/analytics/devguides/collection/analyticsjs/social-interactions)

