import {ActionParameters, AdminModalKey, PrintAction} from '../../types';
import {ActionContext} from '../executors';
import {useFormBuilder} from '@myparcel/vue-form-builder/src';
import {useModalStore} from '../../stores';
import {usePluginSettings} from '../../composables';

export const waitForLabelPrompt = <A extends PrintAction>({
  parameters,
}: ActionContext<A>): Promise<ActionParameters<A>> => {
  const pluginSettings = usePluginSettings();

  if (!pluginSettings.label.prompt) {
    return Promise.resolve(parameters as ActionParameters<A>);
  }

  const modalStore = useModalStore();
  modalStore.open(AdminModalKey.PRINT_OPTIONS);

  return new Promise((resolve) => {
    modalStore.onClose(() => {
      const formBuilder = useFormBuilder();

      // @ts-expect-error this works
      const form = formBuilder.forms?.[AdminModalKey.PRINT_OPTIONS];

      resolve({
        ...parameters,
        ...(form?.getValues() ?? {}),
      } as ActionParameters<A>);
    });
  });
};
