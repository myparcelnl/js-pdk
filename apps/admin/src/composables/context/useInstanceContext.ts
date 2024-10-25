import {inject} from 'vue';
import {type AdminContext, type AnyAdminContext} from '../../types/context.types';
import {INJECT_ADMIN_INSTANCE} from '../../symbols';
import {type AdminInstanceContextKey} from '../../data/constants';

interface UseInstanceContext {
  <Key extends AdminInstanceContextKey>(contextKey: Key): AdminContext<Key>;
  <Ctx extends AnyAdminContext>(context: Ctx): Ctx;
}

export const useInstanceContext: UseInstanceContext = (context: AdminInstanceContextKey) => {
  const foundInstance = inject(INJECT_ADMIN_INSTANCE);

  return foundInstance?.context?.[context] ?? null;
};
