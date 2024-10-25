import {type MyParcelPdk} from './types/global.types';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface AdditionalEvents {}

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface AdditionalStores {}

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface AdditionalUtils {}

  interface Window {
    MyParcelPdk: MyParcelPdk;
  }
}

export {};
