import {PdkButtonAction} from '../types';
import {ComputedRef, computed} from 'vue';

export const usePropAction = (
  props: Partial<PdkButtonAction> & {action: PdkButtonAction},
): ComputedRef<Partial<PdkButtonAction>> =>
  computed(() => {
    console.log(props);

    if (!props.action) {
      return props;
    }

    return {
      ...props.action,
      ...props,
    };
  });
