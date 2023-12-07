import {type Component} from 'vue';
import {type ComponentMountingOptions} from '@vue/test-utils';

export type ComponentTestOptions = {
  $slots: Record<string, unknown>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/ban-types
export type PartialComponentTest<Args extends unknown[] = unknown[]> = <
  T extends ComponentTestOptions = ComponentTestOptions,
>(
  component: Component,
  options?: ComponentMountingOptions<T>,
  ...args: Args
) => void;
