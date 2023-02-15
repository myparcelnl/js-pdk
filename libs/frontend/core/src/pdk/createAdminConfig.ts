import {AdminConfiguration, DefaultAdminConfiguration} from '../types';
import {LogLevel} from '../services';
import {mergeWith} from 'lodash-unified';

const defaultConfig = Object.freeze<DefaultAdminConfiguration>({
  components: undefined,
  formatters: {},
  logLevel: import.meta.env.PROD ? LogLevel.INFO : LogLevel.DEBUG,
  transitions: {},
});

export const createAdminConfig = (customConfig?: AdminConfiguration | undefined): AdminConfiguration => {
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