import {AdminContext, AdminInstanceContextKey, AnyAdminContext, INJECT_ADMIN_INSTANCE} from '../../';
import {inject} from 'vue';

interface UseInstanceContext {
  <Key extends AdminInstanceContextKey>(contextKey: Key): AdminContext<Key>;
  <Ctx extends AnyAdminContext>(context: Ctx): Ctx;
}

export const useInstanceContext: UseInstanceContext = (context: AdminInstanceContextKey) => {
  const foundInstance = inject(INJECT_ADMIN_INSTANCE);

  return foundInstance?.context?.[context] ?? null;
};
