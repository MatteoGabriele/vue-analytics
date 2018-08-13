## User explorer

Add the `userId` on first load just passing it in the options object

```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  fields: {
    userId: 'xxx'
  }
})
```

It's also possible to add fields per id, useful for read only fields.

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

**it is also possible to set the **`userId`** in runtime using the **[**set**](/docs/set.md)** method**
