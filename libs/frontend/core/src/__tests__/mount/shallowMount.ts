import {doMount} from './doMount';
import {shallowMount as vtuShallowMount} from '@vue/test-utils';

// @ts-expect-error todo
export const shallowMount: typeof vtuShallowMount = (component, options) => {
  return doMount(vtuShallowMount, component, options);
};
