import {Component} from 'vue';
import {MountingOptions} from '@vue/test-utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PartialComponentTest = <O = any>(
  component: Omit<Component, 'props'>,
  options?: MountingOptions<O>,
  ...args: unknown[]
) => void;