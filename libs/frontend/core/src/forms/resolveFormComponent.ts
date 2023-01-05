import {Component, resolveComponent} from 'vue';
import {memoize} from 'lodash-unified';

const memoizedResolveFormComponent = memoize((string: string): Component => {
  return resolveComponent(`Pdk${string}`) as Component;
});

export const resolveFormComponent = (type: string): Component => {
  return memoizedResolveFormComponent(type);
};
