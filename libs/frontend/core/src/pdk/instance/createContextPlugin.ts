import {INJECT_PDK_INSTANCE} from '../../data';
import {PdkAppPlugin} from '../types';
import {createInstanceContext} from './createInstanceContext';
import {useContextStore} from '../../stores';

export const createContextPlugin: PdkAppPlugin = ({appName, logger, config, context}) => ({
  install(app) {
    logger.debug(`Installing context plugin`);

    const contextStore = useContextStore();
    contextStore.addContext(context);

    const instanceContext = createInstanceContext(context);
    contextStore.addContext(instanceContext);

    app.provide(INJECT_PDK_INSTANCE, {
      appName,
      config,
      context: instanceContext,
      logger,
    });
  },
});
