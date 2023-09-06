import {type Component, resolveComponent} from 'vue';
import {memoize} from 'lodash-unified';
import {type AdminComponent} from '@myparcel-pdk/common';
import {prefixComponent} from '../../helpers';

const memoizedResolveFormComponent = memoize((componentName: AdminComponent): Component => {
  return resolveComponent(prefixComponent(componentName)) as Component;
});

export const resolveFormComponent = (componentName: AdminComponent): Component => {
  return memoizedResolveFormComponent(componentName);
};
