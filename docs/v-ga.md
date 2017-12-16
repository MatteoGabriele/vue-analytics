## v-ga

This directive allows us to centralize all track events in one object and share it across the entire application without needs to add extra logic to our component methods

Taking as an example a button that only has to log a name in the console

```html
<template>
    <button @click="logName">Log me</button>
</template>

<script>
   export default {
      name: 'myComponent',
      data () {
         return {
            name: 'John'
         }
      },
      methods: {
         logName () {
            console.log(this.name)
         }
      }
   }
</script>
```

To start tracking the value of `name` we can start by adding a method in the commands object that handles this action

```js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
   id: 'UA-XXX-X',
   commands: {
      trackName (name = 'unknown') {
         this.$ga.track('randomClicks', 'click', 'name', name)
      }
   }
})
```
lets take in mind that every function we write in the `commands` object is also binded to the current component scope, so that we have access to the Vue instance prototype object and eventually to methods, data and computed values of the component itself __(I raccomand to not use any component specific properties to avoid the method to be coupled to a specific component structure)__

then we only need to add the `v-ga` directive to your element and access the method from the `commands` list that now is shared in the `$ga` object

```html
<template>
   <button 
      v-ga="$ga.commands.trackName.bind(this, name)" 
      @click="logName">
	Log me
   </button>
</template>

<script>
   export default {
      name: 'myComponent',
      data () {
         return {
            name: 'John'
         }
      },
      methods: {
         logName () {
            console.log(this.name)
         }
      }
   }
</script>
```

If there's no need to pass any arguments, we could also just pass the name of the method as a string, and the plugin will look it up for us

```html
<template>
   <button v-ga="'trackName'">Click me</button>
</template>

<script>
   export default {
      name: 'myComponent'
   }
</script>
```
