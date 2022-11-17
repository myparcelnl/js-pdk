import {ComponentMap, PdkComponentName, logError} from '@myparcel-pdk/frontend-shared';
import {Plugin} from 'vue';

type RegisterComponentsPlugin = (components: ComponentMap) => Plugin;

const baseComponents: Record<PdkComponentName, null> = Object.freeze({
  PdkAccordion: null,
  PdkAlert: null,
  PdkButton: null,
  PdkCard: null,
  PdkCheckbox: null,
  PdkDropdownButton: null,
  PdkDropdownButtonItem: null,
  PdkFormGroup: null,
  PdkIcon: null,
  PdkInput: null,
  PdkModal: null,
  PdkMultiCheckbox: null,
  PdkRadio: null,
  PdkSelect: null,
  PdkTable: null,
  PdkTableCol: null,
  PdkTableRow: null,
});

/**
 * All components must be manually passed, because dynamic importing is not performant enough.
 */
export const createRegisterComponentsPlugin: RegisterComponentsPlugin = (components) => {
  return {
    install(app) {
      Object.entries({...baseComponents, ...components}).forEach(([name, component]) => {
        if (!component) {
          logError(
            `Component is missing: ${name}. You must provide your own, or pass DefaultPdk${name} in your config.`,
          );
          return;
        }

        app.component(name, component);
      });
    },
  };
};
