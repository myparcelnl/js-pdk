import {markRaw} from 'vue';
import {useFormBuilder} from '@myparcel/vue-form-builder';
import {StopActionHandler} from '../stopActionHandler';
import {ActionContext} from '../executors';
import {ActionParameters, AdminModalKey, PrintAction} from '../../types';
import {useModalStore} from '../../stores';

export const waitForLabelPrompt = <A extends PrintAction>({
  parameters,
}: ActionContext<A>): Promise<ActionParameters<A>> => {
  const formBuilder = useFormBuilder();
  const modalStore = useModalStore();

  return new Promise((resolve, reject) => {
    formBuilder.on('afterRegister', (form) => {
      modalStore.context ??= {};
      // @ts-expect-error infinitely deep instantiation
      modalStore.context.form = markRaw(form);

      if (form.name !== AdminModalKey.PrintOptions) {
        return;
      }

      form.on('afterSubmit', (instance) => {
        resolve({
          ...parameters,
          ...instance.getValues(),
        } as ActionParameters<A>);
      });
    });

    modalStore.onClose(() => {
      reject(new StopActionHandler());
    });

    modalStore.open(AdminModalKey.PrintOptions);
  });
};
