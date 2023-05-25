import {Component, resolveComponent} from 'vue';
import {AdminComponent} from '@myparcel-pdk/common';
import {memoize} from 'lodash-unified';
import {prefixComponent} from '../../helpers';

const memoizedResolveFormComponent = memoize((componentName: AdminComponent): Component => {
  return resolveComponent(prefixComponent(componentName)) as Component;
});

export const resolveFormComponent = (componentName: AdminComponent): Component => {
  return memoizedResolveFormComponent(componentName);
};
