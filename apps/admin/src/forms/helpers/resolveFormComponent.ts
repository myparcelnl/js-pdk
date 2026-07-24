import {type Component, resolveComponent} from 'vue';
import {memoize} from 'lodash-unified';
import {prefixComponent} from '../../utils';
import {type AdminComponent, triStateModelComponentNames} from '../../data';
import {withTriStateModel} from './withTriStateModel';

const memoizedResolveFormComponent = memoize((componentName: AdminComponent): Component => {
  const component = resolveComponent(prefixComponent(componentName)) as Component;

  // Toggle-like components must expose tri-state ints to the form, regardless
  // of how the registered plugin component models its value internally.
  if ((triStateModelComponentNames as readonly AdminComponent[]).includes(componentName)) {
    return withTriStateModel(component);
  }

  return component;
});

export const resolveFormComponent = (componentName: AdminComponent): Component => {
  return memoizedResolveFormComponent(componentName);
};
