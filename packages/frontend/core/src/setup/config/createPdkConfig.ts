import {DefaultPdkConfiguration, FinalPdkConfiguration, InputPdkConfiguration} from './types';
import {getElementContext} from './getElementContext';
import {mergeWith} from 'lodash-unified';

const defaultConfig = Object.freeze<DefaultPdkConfiguration>({
  components: undefined,
  context: undefined,
  pluginSettings: {},
});

const BOOTSTRAP_CONTAINER_ID = 'myparcel-core-bootstrap';

export const createPdkConfig = (customConfig: InputPdkConfiguration | undefined): FinalPdkConfiguration => {
  const context = getElementContext(BOOTSTRAP_CONTAINER_ID);

  const merged = mergeWith({}, defaultConfig, {context}, customConfig, (obj, src, key) => {
    if (key === 'components') {
      return src ?? obj;
    }
  });

  Object.keys(defaultConfig).forEach((key) => {
    if (!merged[key as keyof FinalPdkConfiguration]) {
      throw new Error(`Config key "${key}" is missing.`);
    }
  });

  return Object.freeze(merged as FinalPdkConfiguration);
};
