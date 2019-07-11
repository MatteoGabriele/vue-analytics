## Callbacks

Google Analytics have a `hitCallback` function that will be called after a request has been sent successfully. This is useful to turn the requests into promises or at least to know when the requests are done.

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
