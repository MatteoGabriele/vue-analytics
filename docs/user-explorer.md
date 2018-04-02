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

**it is also possible to set the **`userId`** in runtime using the **[**set**](/docs/set.md)** method**
