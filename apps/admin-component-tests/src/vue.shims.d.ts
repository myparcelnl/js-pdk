/* eslint-disable import/consistent-type-specifier-style,@typescript-eslint/no-explicit-any,@typescript-eslint/ban-types,@typescript-eslint/naming-convention,no-underscore-dangle */

import type {DOMWrapper} from '@vue/test-utils';

declare module '*.vue' {
  import type {DefineComponent} from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare const __VUE_PROD_DEVTOOLS__: boolean;

declare module '@vue/test-utils' {
  export class VueWrapper {
    public findByTestId<K extends keyof HTMLElementTagNameMap>(
      selector: string | string[],
    ): DOMWrapper<HTMLElementTagNameMap[K]>;

    public findByTestId<K extends keyof SVGElementTagNameMap>(
      selector: string | string[],
    ): DOMWrapper<SVGElementTagNameMap[K]>;

    public findByTestId<T extends Element | Node = Node>(selector: string | string[]): DOMWrapper<T>;
  }
}
