import {AnyContext, InstanceContextKey, PdkContext} from '../../types';
import {getContext} from '../../services';
import {isEnumValue} from '@myparcel/ts-utils';
import {logWarning} from '@myparcel-pdk/frontend-shared';

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
