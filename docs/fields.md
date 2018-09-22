## Trakcer fields

It is possible to setup initial tracker fields using the `fields` prop

```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  fields: {
    userId: 'xxx'
  }
})
```

It's also possible to add fields per id

```js
Vue.use(VueAnalytics, {
  id: ['UA-12345-1', 'UA-54321-2'],
  //fields for both IDS
  fields: {
    userId: '1',
  },
  customIdFields: {
    'UA-12345-1': {
      clientId: '2'
    },
    'UA-54321-2': {
      clientId: '3'
    }
  }
})
```

**it is also possible to set fields in runtime using the **[**set**](/docs/set.md)** method**
