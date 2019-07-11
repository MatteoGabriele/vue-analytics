## Event tracking

Event tracking can be achieved in different ways, following Google specifications

passing parameters in this exact order

```js
this.$ga.event('category', 'action', 'label', 123)
```

an object literal is also possible. Sometimes with slow internet connection, it's important to add a callback function to be called after the event has been sent.

```js
this.$ga.event({
  eventCategory: 'category',
  eventAction: 'action',
  eventLabel: 'label',
  eventValue: 123,
  hitCallback: () => {},
  hitCallbackFail: () => {}
})
```

Google Analytics docs: [event tracking](https://developers.google.com/analytics/devguides/collection/analyticsjs/events)

## 



