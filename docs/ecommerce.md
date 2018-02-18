## E-commerce

All e-commerce features are built-in in the plugin, so there's no need to require any e-commerce libraries: just enable the e-commerce features from the plugin configuration

```js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  ecommerce: {
    enabled: true
  }
})
```

It is also possible to use the Enhanced E-commerce library just by changing the configuration like so

```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  ecommerce: {
    enabled: true,
    enhanced: true
  }
})
```

Finally it's possible to pass additional options during the installation of the library

```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  ecommerce: {
    enabled: true,
    options: { ... }
  }
})
```

### Usage
All e-commerce features are accessable via the `ecommerce` object

- addItem
- addTransaction
- addProduct
- addImpression
- setAction
- addPromo
- send

Remember that not all methods are included in the E-commerce or the Enhanced E-commerce, so please check the relative documentation in the Google Analytics dev guide.

- [E-commerce](https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce)
- [Enhanced E-commerce](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce)


```html
<template>
  <div>
    <button @click="addItem">Add item!</button>
  </div>
</template>

<script>
  export default {
    name: 'myComponent',

    methods: {
      addItem () {
        this.$ga.ecommerce.addItem({
          id: '1234',                     // Transaction ID. Required.
          name: 'Fluffy Pink Bunnies',    // Product name. Required.
          sku: 'DD23444',                 // SKU/code.
          category: 'Party Toys',         // Category or variation.
          price: '11.99',                 // Unit price.
          quantity: '1'                   // Quantity.
        })
      }
    }
  }
</script>
```
