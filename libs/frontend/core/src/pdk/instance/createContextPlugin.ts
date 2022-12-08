import {FinalPdkConfiguration} from '../../types';
import {INJECT_PDK_INSTANCE} from '../../data';
import {PdkViewComponent} from '@myparcel-pdk/common';
import {Plugin as VuePlugin} from 'vue';
import {createInstanceContext} from './createInstanceContext';
import {logger} from '@myparcel-pdk/frontend-shared/src';
import {useContextStore} from '../../stores';

export const createContextPlugin = (
  config: FinalPdkConfiguration,
  elementId: string,
  componentName: PdkViewComponent,
): VuePlugin => ({
  install(app) {
    logger.debug('Installing context plugin');

    const contextStore = useContextStore();
    contextStore.addContext(config.context);

    const instanceContext = createInstanceContext(config.context);

    app.provide(INJECT_PDK_INSTANCE, {
      component: componentName,
      context: instanceContext,
      config,
    });
  },
});
