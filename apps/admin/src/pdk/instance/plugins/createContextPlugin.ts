import {createInstanceContext} from '../createInstanceContext';
import {INJECT_ADMIN_INSTANCE} from '../../../symbols';
import {type PdkAppPlugin} from './plugins.types';

export const createContextPlugin: PdkAppPlugin = ({appName, config, context, logger, view}) => ({
  install(app) {
    logger.debug('Installing context plugin');

    app.provide(INJECT_ADMIN_INSTANCE, {
      appName,
      config,
      context: createInstanceContext(context),
      logger,
      view,
    });
  },
});
