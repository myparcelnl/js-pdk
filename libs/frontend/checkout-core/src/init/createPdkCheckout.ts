import {InitializeCallback, PdkCheckoutConfigInput} from '../types';
import {setupGlobals} from './setupGlobals';
import {useConfig} from '../config';

const execute = (callback: InitializeCallback): void => {
  if (window.MyParcelPdk.initialized) {
    callback();
  } else {
    window.MyParcelPdk.initializeCallbacks.push(callback);
  }
};

// noinspection JSUnusedGlobalSymbols
export const createPdkCheckout = (config: PdkCheckoutConfigInput): void => {
  setupGlobals({
    onFormChange(callback) {
      const config = useConfig();

      config.getForm().addEventListener('change', callback);
    },
    getFormData() {
      const config = useConfig();
      const formData = new FormData(config.getForm());

      return Object.fromEntries(formData.entries());
    },
    ...config,
    selectors: {
      deliveryOptions: '#myparcel-delivery-options',
      ...config.selectors,
    },
  });

  if (!window.MyParcelPdk.instance) {
    void (async () => {
      const config = useConfig();

      await config.initialize?.();

      window.MyParcelPdk.initialized = true;

      await Promise.all(window.MyParcelPdk.initializeCallbacks.map((callback) => callback()));
    })();

    window.MyParcelPdk.instance = {
      onInitialize: execute,
    };
  }
};
