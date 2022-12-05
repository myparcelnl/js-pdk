import {AnyContext, INJECT_PDK_INSTANCE, InstanceContextKey, PdkContext} from '../../';
import {inject} from 'vue';
import {isEnumValue} from '@myparcel/ts-utils';

interface UseInstanceContext {
  <Key extends InstanceContextKey>(contextKey: Key): PdkContext<Key>;
  <Ctx extends AnyContext>(context: Ctx): Ctx;
}

export const useContext: UseInstanceContext = (context: InstanceContextKey | AnyContext) => {
  let contextData;

  if (isEnumValue(context, InstanceContextKey)) {
    const instance = inject(INJECT_PDK_INSTANCE);

    contextData = instance?.context?.[context] ?? null;
  } else {
    contextData = context;
  }

  return contextData;
};
