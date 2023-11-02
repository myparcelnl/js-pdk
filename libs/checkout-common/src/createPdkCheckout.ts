import {useConfig} from './utils';
import {type InitializeCallback, type PdkCheckoutConfigInput} from './types';
import {createConfig, setupGlobals} from './init';

const execute = (callback: InitializeCallback): void => {
  if (window.MyParcelPdk.initialized) {
    callback();
  } else {
    window.MyParcelPdk.initializeCallbacks.push(callback);
  }
};

// noinspection JSUnusedGlobalSymbols
export const createPdkCheckout = (config: PdkCheckoutConfigInput): void => {
  setupGlobals(createConfig(config));

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
