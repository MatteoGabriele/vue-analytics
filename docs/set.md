## Set

Sets a single field and value pair or a group of field/value pairs on a tracker object.

```js
this.$ga.set(fieldName, fieldValue)
```

also possible to pass an object literal

```js
this.$ga.set({ fieldName, fieldName })
```

### Set multiple fields before first hit
Adding the `set` property to the configuration object, we can set multiple fields automatically before the first hit

```js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  set: [
    { field: 'fieldname', value: 'fieldvalue' }
  ]
})
```
