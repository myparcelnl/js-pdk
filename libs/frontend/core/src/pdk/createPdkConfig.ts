import {DefaultPdkConfiguration, PdkConfiguration} from '../types';
import {LogLevel} from '../services';
import {mergeWith} from 'lodash-unified';

const defaultConfig = Object.freeze<DefaultPdkConfiguration>({
  components: undefined,
  formConfig: {},
  formatters: {},
  logLevel: import.meta.env.PROD ? LogLevel.INFO : LogLevel.DEBUG,
  transitions: {},
});

export const createPdkConfig = (customConfig?: PdkConfiguration | undefined): PdkConfiguration => {
  const merged = mergeWith({}, defaultConfig, customConfig, (obj, src, key) => {
    if (key === 'components') {
      return src ?? obj;
    }
  });

  Object.keys(defaultConfig).forEach((key) => {
    if (!merged[key as keyof PdkConfiguration]) {
      throw new Error(`Config key "${key}" is missing.`);
    }
  });

  return Object.freeze(merged as unknown as PdkConfiguration);
};
