## User timings

User timing measurement can be achieved in different ways, following Google specifications

passing parameters in this exact order

```js
this.$ga.time('category', 'variable', 123, 'label')
```

or use an object literal

```js
this.$ga.time({
  timingCategory: 'category',
  timingVar: 'variable',
  timingValue: 123,
  timingLabel: 'label'
})
```

Google Analytics docs: [user timings](https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings)

## 



