
declare module 'vue-analytics' {
  import _Vue, { PluginFunction } from 'vue';
  import VueRouter, { Route } from 'vue-router';

  interface eventFn {
    (category: string, action?: string, label?: string, value?: number): void;
    (options: {
      eventCategory: string,
      eventAction: string,
      eventLabel: string,
      eventValue: number
    }): void;
  }

  type pageDetails = {
    page: string,
    title: string,
    location: string
  };

  interface pageFn {
    (path: string): void;
    (options: pageDetails): void;
    (route: VueRouter): void;
  }

  interface setFn {
    (fieldName: string, fieldValue: string): void;
    (options: {
      field: string, value: string
    }): void;
  }

  interface socialFn {
    (network: string, action: string, target: string): void;
    (options: {
      socialNetwork: string,
      socialAction: string,
      socialTarget: string
    }): void;
  }

  interface timeFn {
    (category: string, variable: string, value: number, label: string): void;
    (options: {
      timingCategory: string,
      timingVar: string,
      timingValue: number,
      timingLabel: string
    }): void;
  }

  export default class VueAnalytics {
    static install(Vue: typeof _Vue, options: {
      id: string | string[] | (() => string) | (() => Promise<string>) | Promise<string>,
      router?: VueRouter,
      ignoreRoutes?: string[],
      debug?: {
        enabled?: boolean,
        trace?: boolean,
        sendHitTask?: boolean
      },
      batch?: {
        enabled?: boolean,
        amount?: number,
        delay?: number
      },
      linkers?: string[],
      customResourceURL?: string,
      ecommerce?: {
        enabled?: boolean,
        enhanced?: boolean,
        options?: any
      },
      autoTracking?: {
        exception?: boolean,
        exceptionLogs?: boolean,
        screenview?: boolean,
        pageviewOnLoad?: boolean,
        page?: boolean,
        pageviewTemplate?: (route: Route) => pageDetails,
        transformQueryString?: boolean,
        prependBase?: boolean,
        skipSamePath: boolean,
        shouldRouterUpdate: (to: Route, from: Route) => string,
        untracked?: boolean
      },
      fields?: {
        [field: string]: any
      },
      customIdFields?: {
        [id: string]: {
          [field: string]: any
        }
      },
      disabled?: boolean | (() => boolean) | (() => Promise<boolean>) | Promise<boolean>,
      checkDuplicatedScript?: boolean,
      disableScriptLoader?: boolean
      set?: { field: string, value: string }[],
      commands?: any,
      beforeFirstHit?: () => void,
      ready?: () => void
    }): void;
    analyticsMiddleware: any;
    onAnalyticsReady: () => Promise<void>;
    event: eventFn;
    ecommerce: any;
    set: setFn;
    page: pageFn;
    query: any;
    screenview: ((screen: string) => void) | ((option: { screenName: string, [otherProperties: string]: any }) => void);
    time: timeFn;
    require: (pluginName: string, options?: any) => void;
    exception: (exception: Error | string) => void;
    social: socialFn;
    disable: () => void;
    enable: () => void;
  }

  module 'vue/types/options' {
    interface ComponentOptions<V extends _Vue> {
      ga?: VueAnalytics;
    }
  }

  module 'vue/types/vue' {
    interface Vue {
      $ga: VueAnalytics;
    }
  }
}
