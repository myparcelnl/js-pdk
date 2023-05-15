import {AddressType, InitializeCallback, PdkCheckoutConfigInput} from '../types';
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
    formChange(callback) {
      const form = useConfig().getForm();
      form.addEventListener('change', callback);
    },

    getAddressType(value) {
      return value as AddressType;
    },

    getFormData() {
      const form = useConfig().getForm();
      const formData = new FormData(form);

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
