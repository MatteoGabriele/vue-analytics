## Callbacks

Google Analytics have a `hitCallback` function that will be called after a request has been sent successfully. A function can be passed into `hitCallback`. This is useful when you want to to know when the requests are done.

```js
    sendEvent () {
      return new Promise( (resolve )=>{
        this.$ga.event('category','action','label', 20, {
          "hitCallback": resolve,
        })
      })
    }
```
also with an object literal

```js
    sendEvent () {
      return new Promise( (resolve )=>{
        this.$ga.event({
          "eventCategory" : 'category',
          "eventAction": 'action',
          "eventLabel": 'label',
          "eventValue": 20,
          "hitCallback": resolve,
        })
      })
    }
```

Google analytics reference [hitCallback](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#hitCallback) and guide [Knowing when the hit has been sent
](https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits#knowing_when_the_hit_has_been_sent)
