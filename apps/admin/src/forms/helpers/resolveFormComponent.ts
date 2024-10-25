import {type Component, resolveComponent} from 'vue';
import {memoize} from 'lodash-unified';
import {prefixComponent} from '../../utils/prefixComponent';
import {type AdminComponent} from '../../data/components';

const memoizedResolveFormComponent = memoize((componentName: AdminComponent): Component => {
  return resolveComponent(prefixComponent(componentName)) as Component;
});

export const resolveFormComponent = (componentName: AdminComponent): Component => {
  return memoizedResolveFormComponent(componentName);
};
