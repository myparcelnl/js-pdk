import {Component, resolveComponent} from 'vue';
import {memoize} from 'lodash-unified';

const memoizedResolveFormComponent = memoize((component: string): Component => {
  return resolveComponent(`Pdk${component}`) as Component;
});

export const resolveFormComponent = (component: string): Component => {
  return memoizedResolveFormComponent(component);
};
