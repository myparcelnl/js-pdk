import {type Component} from 'vue';
import {type ComponentMountingOptions} from '@vue/test-utils';

type Options = {
  $slots: Record<string, unknown>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/ban-types
export type PartialComponentTest = <T extends Options = Options>(
  component: Omit<Component, 'props'>,
  options?: ComponentMountingOptions<T>,
  ...args: unknown[]
) => void;
