import {AnyContext, ContextKey} from '@/data/global/context';
import {PropType} from 'vue';

export const contextProps = {
  contextKey: {
    type: String as PropType<ContextKey>,
    default: null,
  },
  context: {
    type: [String, Object] as PropType<AnyContext>,
    default: null,
  },
};
