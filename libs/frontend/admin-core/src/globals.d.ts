import {type PdkAdmin} from './pdk';

declare global {
  interface Window {
    MyParcelPdkAdminRenderer: {
      render: (view: string, selector: string) => Promise<void>;
      flush: () => Promise<void>;
    };
    MyParcelPdkAdmin: PdkAdmin;
  }
}
