import {ActionParameters, PrintAction} from '../consts';
import {ActionContext} from '../executors';
import {ModalKey} from '../../types';
import {useFormBuilder} from '@myparcel/vue-form-builder';
import {useModalStore} from '../../stores';
import {usePluginSettings} from '../../composables';

export const waitForLabelPrompt = <A extends PrintAction>({
  parameters,
}: ActionContext<A>): Promise<ActionParameters<A>> => {
  const pluginSettings = usePluginSettings();

  console.log(pluginSettings);

  if (!pluginSettings.label.prompt) {
    return Promise.resolve(parameters as ActionParameters<A>);
  }

  const modalStore = useModalStore();
  modalStore.open(ModalKey.PRINT_OPTIONS);

  return new Promise((resolve) => {
    modalStore.onClose(() => {
      const formBuilder = useFormBuilder();

      // @ts-expect-error this works
      const form = formBuilder.forms?.[ModalKey.PRINT_OPTIONS];

      resolve({
        ...parameters,
        ...(form?.getValues() ?? {}),
      } as ActionParameters<A>);
    });
  });
};
