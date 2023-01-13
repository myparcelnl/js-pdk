import {AnyContext, INJECT_PDK_INSTANCE, InstanceContextKey, PdkContext} from '../../';
import {inject} from 'vue';

interface UseInstanceContext {
  <Key extends InstanceContextKey>(contextKey: Key): PdkContext<Key>;
  <Ctx extends AnyContext>(context: Ctx): Ctx;
}

export const useInstanceContext: UseInstanceContext = (context: InstanceContextKey) => {
  const foundInstance = inject(INJECT_PDK_INSTANCE);

  return foundInstance?.context?.[context] ?? null;
};
