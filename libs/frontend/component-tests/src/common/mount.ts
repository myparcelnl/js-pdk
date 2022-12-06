import {INJECT_GLOBAL_PDK_FRONTEND, INJECT_PDK_INSTANCE, INJECT_TRANSLATIONS} from '@myparcel/pdk-frontend';
import {createPinia} from 'pinia';
import {mount as vtuMount} from '@vue/test-utils';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const mount: typeof vtuMount = (component, options) => {
  options ??= {};
  options.global ??= {};
  options.global.provide ??= {};
  options.global.plugins ??= [];
  options.global.plugins.push(createPinia());
  options.global.provide[INJECT_GLOBAL_PDK_FRONTEND as symbol] ??= {};
  options.global.provide[INJECT_PDK_INSTANCE as symbol] ??= {};
  options.global.provide[INJECT_TRANSLATIONS as symbol] ??= {};

  return vtuMount(component, options);
};
