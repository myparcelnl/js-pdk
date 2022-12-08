import {DefaultPdkConfiguration, FinalPdkConfiguration, InputPdkConfiguration} from '../types';
import {LogLevel} from '@myparcel-pdk/frontend-shared';
import {getElementContext} from '../services';
import {mergeWith} from 'lodash-unified';

const defaultConfig = Object.freeze<DefaultPdkConfiguration>({
  components: undefined,
  context: undefined,
  formatters: {},
  locale: 'en-US',
  logLevel: import.meta.env.PROD ? LogLevel.INFO : LogLevel.DEBUG,
  transitions: {},
});

/**
 * Must match \MyParcelNL\Pdk\Plugin\Service\RenderService::BOOTSTRAP_CONTAINER_ID.
 *
 * @see https://github.com/myparcelnl/pdk/blob/main/src/Plugin/Service/RenderService.php
 */
const BOOTSTRAP_CONTAINER_SELECTOR = '#myparcel-pdk-bootstrap';

export const createPdkConfig = (customConfig: InputPdkConfiguration | undefined): FinalPdkConfiguration => {
  const context = getElementContext(BOOTSTRAP_CONTAINER_SELECTOR);

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

  return Object.freeze(merged as unknown as FinalPdkConfiguration);
};
