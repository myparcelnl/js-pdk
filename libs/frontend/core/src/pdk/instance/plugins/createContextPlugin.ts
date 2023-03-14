import {INJECT_ADMIN_INSTANCE} from '../../../data';
import {PdkAppPlugin} from './plugins.types';
import {createInstanceContext} from '../createInstanceContext';

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
