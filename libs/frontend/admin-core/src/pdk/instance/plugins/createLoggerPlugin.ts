import {PdkAppPlugin} from './plugins.types';

export const createLoggerPlugin: PdkAppPlugin = (appConfig) => ({
  install(app) {
    app.config.errorHandler = (err: unknown): void => {
      appConfig.logger.error(err);
    };

    app.config.warnHandler = (msg: string): void => {
      appConfig.logger.warn(msg);
    };
  },
});
