import {doMount} from './doMount';
import {mount as vtuMount} from '@vue/test-utils';

// @ts-expect-error whatever, this is a test file
export const mount: typeof vtuMount = (component, options) => {
  return doMount(vtuMount, component, options);
};
