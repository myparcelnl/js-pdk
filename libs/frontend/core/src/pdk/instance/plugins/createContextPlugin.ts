import {INJECT_PDK_INSTANCE} from '../../../data';
import {PdkAppPlugin} from './plugins.types';
import {createInstanceContext} from '../createInstanceContext';

export const createContextPlugin: PdkAppPlugin = ({appName, logger, config, context}) => ({
  install(app) {
    logger.debug('Installing context plugin');

    app.provide(INJECT_PDK_INSTANCE, {
      appName,
      config,
      context: createInstanceContext(context),
      logger,
    });
  },
});
