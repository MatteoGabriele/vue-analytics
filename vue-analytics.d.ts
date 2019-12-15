
declare module 'vue-analytics' {
  import _Vue, { PluginFunction } from 'vue';
  import VueRouter, { Route } from 'vue-router';

  interface eventFn {
    (category: string, action?: string, label?: string, value?: number): void;
    (options: {
      eventCategory: string,
      eventAction?: string,
      eventLabel?: string,
      eventValue?: number
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
  
  interface EcommerceItem {
    id: string;
    name: string;
    sku?: string;
    category?: string;
    price?: string;
    quantity?: number;
  }

  interface EcommerceTransaction {
    id: string;
    affiliation?: string;
    revenue?: string;
    shipping?: string;
    tax?: string;
  }

  interface EcommerceImpressionBase {
    list?: string;
    brand?: string;
    category?: string;
    variant?: string;
    position?: number;
    price?: string;
  }

  interface EcommerceImpressionWithId extends EcommerceImpressionBase {
    id: string;
  }

  interface EcommerceImpressionWithName extends EcommerceImpressionBase {
    name: string;
  }

  type EcommerceImpression = EcommerceImpressionWithId | EcommerceImpressionWithName;

  interface EcommerceProductBase {
    brand?: string;
    category?: string;
    variant?: string;
    price?: string;
    quantity?: number;
    coupon?: string;
    position?: number;
  }

  interface EcommerceProductWithId extends EcommerceProductBase {
    id: string;
  }

  interface EcommerceProductWithName extends EcommerceProductBase {
    name: string;
  }

  type EcommerceProduct = EcommerceImpressionWithId | EcommerceImpressionWithName;

  type EcommerceAction = 
    | 'click' 
    | 'detail' 
    | 'add' 
    | 'remove' 
    | 'checkout'
    | 'checkout_option'
    | 'purchase'
    | 'refund'
    | 'promo_click'

  interface EcommerceActionData {
    id?: string;
    affiliation?: string;
    revenue?: number;
    tax?: number;
    shipping?: number;
    coupon?: string;
    list?: string;
    step?: number;
    option?: string;
  }

  interface EcommercePromoBase {
    creative?: string;
    position?: string;
  }

  interface EcommercePromoWithId extends EcommercePromoBase {
    id: string;
  }

  interface EcommercePromoWithName extends EcommercePromoBase {
    name: string;
  }

  type EcommercePromo = EcommercePromoWithId | EcommercePromoWithName;

  interface Ecommerce {
    addItem(item: EcommerceItem): void;
    addTransaction(transaction: EcommerceTransaction): void;
    addProduct(product: EcommerceProduct): void;
    addImpression(impression: EcommerceImpression): void;
    setAction(action: EcommerceAction, data: EcommerceActionData): void;
    addPromo(product: EcommercePromo): void;
    send(): void;
  }

  interface screenviewFn {
    (screen: string) :void;
    (option: {
      screenName: string;
      [otherProperties: string]: any;
    }): void;
  }

  interface requireFn {
    (pluginName: string, options?: any): void
  }

  interface exceptionFn {
    (exception: Error | string): void;
  }

  interface queryFn {
    (...args: any[]): any;
  }

  interface analyticsMiddlewareFn {
    <T>(store: Store<T>): void;
  }

  interface onAnalyticsReadyFn {
    (): Promise<void>;
  }
  
  export interface InstallOptions {
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
  }

  export default class VueAnalytics {
    static install(Vue: typeof _Vue, options: InstallOptions): void;
    analyticsMiddleware: any;
    onAnalyticsReady: () => Promise<void>;
    event: eventFn;
    ecommerce: Ecommerce;
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
