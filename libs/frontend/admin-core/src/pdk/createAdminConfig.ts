import {mergeWith} from 'lodash-unified';
import {type AdminConfiguration, type DefaultAdminConfiguration} from '../types';
import {LogLevel} from '../services';

const createDefaultConfig = (): DefaultAdminConfiguration => ({
  components: undefined,
  formatters: {},
  logLevel: import.meta.env.PROD ? LogLevel.Info : LogLevel.Debug,
  transitions: {},
});

export const createAdminConfig = (customConfig?: AdminConfiguration | undefined): AdminConfiguration => {
  const defaultConfig = createDefaultConfig();

  const merged = mergeWith({}, defaultConfig, customConfig, (obj, src, key) => {
    if (key === 'components') {
      return src ?? obj;
    }
  });

  Object.keys(defaultConfig).forEach((key) => {
    if (!merged[key as keyof AdminConfiguration]) {
      throw new Error(`Config key "${key}" is missing.`);
    }
  });

  return Object.freeze(merged as unknown as AdminConfiguration);
};
