import {Component} from 'vue';
import {memoize} from 'lodash-unified';
import {renderWithFormGroup} from './renderWithFormGroup';

const memoizedResolveFormComponent = memoize((string: string): Component => {
  return renderWithFormGroup(`Pdk${string}`);
});

export const resolveFormComponent = (type: string): Component => {
  return memoizedResolveFormComponent(type);
};
