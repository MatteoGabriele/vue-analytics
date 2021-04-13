> :warning: Sorry but vue-analytics is not longer maintained. I would suggest you to switch to [vue-gtag](https://github.com/MatteoGabriele/vue-gtag). With love, the guy who made the package.

<p align="center">
  <img width="180" src="http://i.imgur.com/whvHAT6.png">
  <br>
  <br>
  <a href="https://npm.im/vue-analytics">
    <img src="https://badgen.net/npm/v/vue-analytics">
  </a>
  <a href="https://npm.im/vue-analytics">
    <img src="https://badgen.net/npm/dm/vue-analytics">
  </a>
  <a href="https://travis-ci.org/MatteoGabriele/vue-analytics">
    <img src="https://badgen.net/travis/MatteoGabriele/vue-analytics/master">
  </a>
  <a href="https://bundlephobia.com/result?p=vue-analytics">
    <img src="https://badgen.net/bundlephobia/minzip/vue-analytics">
  </a>
</p>

# vue-analytics

Vue plugin for Google Analytics

## Why should I use it?

The plugin isn't just a wrapper of the Google Analytics API, but provides a solution to issues that most of the time you don't want to deal with or you not even know you have to deal with.

For example:

* Automatic Google Analytics script loading
* Automatic page tracking
* Event batching
* Opt-out from Google Analytics with promise support
* Multiple domain ID tracking system
* Vuex support
* E-commerce API
* Vue error exception tracking system
* Debugging API

## Does this library support GA4?
Nope! GA4 is only supported by the new gtag.js library which you can find in the `vue-gtag` package. 
This package only uses analytics.js which doesn't provide that feature.

## Requirements

Vue ^2.0.0

## Articles

[Google Analytics, GDPR and Vuejs](https://medium.com/@matteo_gabriele/google-analytics-gdpr-and-vuejs-e1bd6affd2b4)

[Vuejs and Google Analytics](https://medium.com/@matteo_gabriele/vuejs-and-google-analytics-689a07e00116)

[Tips & tricks for vue-analytics](https://medium.com/@matteo_gabriele/tips-tricks-for-vue-analytics-87a9d2838915)

## Install

```bash
npm install vue-analytics
```

## User guide

* [Get started](/docs/installation.md)
* [How to load Google Analytics](/docs/script-loader.md)
* [Page tracking](/docs/page-tracking.md)
* [Event tracking](/docs/event-tracking.md)
* [Screen tracking](/docs/screen-tracking.md)
* [Event batches](/docs/batch.md)
* [v-ga](/docs/v-ga.md)
* [Cross-domain tracking](/docs/cross-domain-tracking.md)
* [User timings](/docs/user-timings.md#user-timings)
* [Exception tracking](/docs/exception-tracking.md)
* [Require](/docs/require.md)
* [Set](/docs/set.md)
* [Social interactions](/docs/social-interactions.md)
* [Fields](/docs/fields.md)
* [On Analytics script ready](/docs/when-google-analytics-is-loaded.md)
* [Custom methods](/docs/custom-methods.md)
* [E-commerce](/docs/ecommerce.md)
* [Untracked hits](/docs/untracked-hits.md)
* [Vuex](/docs/vuex.md)
* [Turn off during development](/docs/turn-off-development.md)
* [Console logs](/docs/console-logs.md)
* [Opt-out from Google Analytics](/docs/opt-out.md)
* [Custom analytics.js URL](/docs/custom-analytics.md)
* [Debug](/docs/debug.md)

# Issues and features requests

Please drop an issue, if you find something that doesn't work, or a feature request at [https://github.com/MatteoGabriele/vue-analytics/issues](https://github.com/MatteoGabriele/vue-analytics/issues)

Follow me on twitter [@matteo\_gabriele](https://twitter.com/matteo_gabriele)
