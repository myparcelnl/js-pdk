import {BaseContext, InstanceContextKey, PdkContext} from '../../types';
import {INJECT_PDK_INSTANCE} from '../../data';
import {inject} from 'vue';
import {isEnumValue} from '@myparcel/ts-utils';
import {logError} from '@myparcel-pdk/frontend-shared';

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

  console.warn({instance});

  if (!context) {
    const availableContext = Object.keys(instance?.context ?? {}).join(', ');
    const component = instance?.component ?? 'UNKNOWN';

    logError(`The component "${component}" requires the context "${contextKey}". Available: ${availableContext}`);
    throw new Error(`Failed to render "${component}"`);
  }

  return context;
};
