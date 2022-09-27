import {INJECT_GLOBAL_PDK_FRONTEND, INJECT_TRANSLATIONS} from '../data/injections';
import {createStore} from '../setup/plugins/createStore';
import {mount as vtuMount} from '@vue/test-utils';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const mount: typeof vtuMount = (component, options) => {
  options ??= {};
  options.global ??= {};
  options.global.provide ??= {};
  options.global.plugins ??= [];
  options.global.plugins.push(createStore());
  options.global.provide[INJECT_GLOBAL_PDK_FRONTEND as symbol] ??= {};
  options.global.provide[INJECT_TRANSLATIONS as symbol] ??= {};

  return vtuMount(component, options);
};
