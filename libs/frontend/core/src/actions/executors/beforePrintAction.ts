import {ActionParameters, FrontendAction} from '../index';
import {ModalKey} from '../../types';
import {useFormBuilder} from '@myparcel/vue-form-builder';
import {useModalStore} from '../../stores';
import {usePluginSettings} from '../../composables';

export const beforePrintAction = <A extends FrontendAction>(
  action: A,
  parameters: Partial<ActionParameters<A>> = {},
): Promise<ActionParameters<A>> => {
  const pluginSettings = usePluginSettings();

  if (!pluginSettings.label.prompt) {
    return Promise.resolve(parameters as ActionParameters<A>);
  }

  const modalStore = useModalStore();
  modalStore.open(ModalKey.PRINT_OPTIONS);

  return new Promise((resolve) => {
    modalStore.onClose(() => {
      const formBuilder = useFormBuilder();

      resolve({
        ...parameters,
        ...(formBuilder.forms[ModalKey.PRINT_OPTIONS]?.getValues() ?? {}),
      } as ActionParameters<A>);
    });
  });
};
