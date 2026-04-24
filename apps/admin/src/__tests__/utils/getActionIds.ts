import {type Component, type ComponentPublicInstance} from 'vue';
import {type VueWrapper} from '@vue/test-utils';

/**
 * Extract action IDs from a mounted component that passes actions as props to a child stub.
 */
export const getActionIds = (wrapper: VueWrapper<ComponentPublicInstance>, childComponent: Component): string[] => {
  const child = wrapper.findComponent(childComponent);
  const actions = child.props('actions') as {id: string}[];

  return actions.map((a) => a.id);
};
