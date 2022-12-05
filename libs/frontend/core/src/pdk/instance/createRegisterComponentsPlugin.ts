import {PdkComponentMap, PdkComponentName, logger} from '@myparcel-pdk/frontend-shared';
import {Plugin} from 'vue';

type RegisterComponentsPlugin = (components: PdkComponentMap) => Plugin;

const baseComponents: Record<PdkComponentName, null> = Object.freeze({
  PdkAccordion: null,
  PdkAlert: null,
  PdkButton: null,
  PdkCard: null,
  PdkCheckbox: null,
  PdkDropdownButton: null,
  PdkFormGroup: null,
  PdkIcon: null,
  PdkInput: null,
  PdkModal: null,
  PdkMultiCheckbox: null,
  PdkNumberInput: null,
  PdkRadio: null,
  PdkSelect: null,
  PdkTable: null,
  PdkTableCol: null,
  PdkTableRow: null,
  PdkToggle: null,
});

/**
 * All components must be manually passed, because dynamic importing is not performant enough.
 */
export const createRegisterComponentsPlugin: RegisterComponentsPlugin = (components) => {
  return {
    install(app) {
      Object.entries({...baseComponents, ...components}).forEach(([name, component]) => {
        if (!component) {
          logger.error(
            `Component is missing: ${name}. You must provide your own, or pass DefaultPdk${name} in your config.`,
          );
          return;
        }

        app.component(name, component);
      });
    },
  };
};
