import {BaseContext, InstanceContextKey, PdkContext, isEnumValue} from '@myparcel/pdk-frontend-shared';
import {inject} from 'vue';
import {logError} from '../../services/logging';
import {INJECT_PDK_INSTANCE} from '../injections';

interface GetContext {
  <C extends InstanceContextKey>(contextKey: C): PdkContext<C>;
  <C extends InstanceContextKey>(contextKey: C): BaseContext;
}

/**
 * Get a context entry from the window object.
 */
export const getContext: GetContext = (contextKey) => {
  if (!isEnumValue(contextKey, InstanceContextKey)) {
    throw new Error(`Key ${contextKey} is not a valid instance context key.`);
  }

  const instance = inject(INJECT_PDK_INSTANCE);
  const context = instance?.context?.[contextKey];

  if (!context) {
    const availableContext = Object.keys(instance?.context ?? {}).join(', ');
    const component = instance?.component ?? 'UNKNOWN';

    console.log(component, availableContext);

    logError(`The component "${component}" requires the context "${contextKey}". Available: ${availableContext}`);
    throw new Error(`Failed to render "${component}"`);
  }

  return context;
};
