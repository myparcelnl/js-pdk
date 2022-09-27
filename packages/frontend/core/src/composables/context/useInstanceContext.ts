import {AnyContext, InstanceContextKey, PdkContext, isEnumValue} from '@myparcel/pdk-frontend-shared';
import {getContext} from '../../data/global/getContext';
import {logWarning} from '../../services/logging';

interface UseContext {
  <Key extends InstanceContextKey>(contextKey: Key): PdkContext<Key>;
  <Context extends AnyContext>(context: Context): Context;
}

export const useInstanceContext: UseContext = (context: InstanceContextKey | AnyContext) => {
  let contextData;

  if (isEnumValue(context, InstanceContextKey)) {
    contextData = getContext(context);
  } else {
    contextData = context;
  }

  if (!contextData) {
    logWarning('Failed to get context object.');
  }

  return contextData;
};
