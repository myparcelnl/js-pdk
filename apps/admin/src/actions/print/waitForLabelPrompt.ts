import {markRaw, watch} from 'vue';
import {type FormInstance, FormHook, useFormBuilder} from '@myparcel-dev/vue-form-builder';
import {StopActionHandler} from '../stopActionHandler';
import {type ActionContext} from '../executors';
import {type ActionParameters, type PrintAction} from '../../types';
import {useModalStore} from '../../stores';
import {AdminModalKey} from '../../data';

/**
 * Ask the merchant for the label options before printing. Use this as the `beforeHandle` of a
 * print action, which the print actions do whenever the `label.prompt` setting is on.
 *
 * @param context The action context. Its parameters are merged with the submitted values.
 * @returns The print parameters, or a rejection with `StopActionHandler` when the merchant
 *   closes the modal instead of submitting it.
 */
export const waitForLabelPrompt = <A extends PrintAction>({
  parameters,
}: ActionContext<A>): Promise<ActionParameters<A>> => {
  const formBuilder = useFormBuilder();
  const modalStore = useModalStore();

  return new Promise((resolve, reject) => {
    /**
     * Runs when the merchant submits the modal. Stops watching and takes this listener back off
     * the form, so the next print can put its own listener on. `vue-form-builder` matches
     * listeners by their source text and refuses one it already has, so a modal that reuses a
     * single form would otherwise drop the next print's listener as a duplicate and never
     * answer it.
     */
    const onAfterSubmit = (form: FormInstance): void => {
      stopWatching();
      form.off(FormHook.AfterSubmit, onAfterSubmit);

      // Lets the print action carry on, printing with the options the merchant just picked.
      // Those win over whatever the action was called with.
      resolve({...parameters, ...form.getValues()} as ActionParameters<A>);
    };

    // Open before watching. Opening resets the modal context, which would wipe the form the
    // watcher publishes there when the modal reuses a form it built earlier.
    modalStore.open(AdminModalKey.PrintOptions);

    // Listens for the print options form appearing or being replaced, and hooks every form it
    // sees. The modal builds its form after it opens, and builds a fresh one on a later open,
    // so binding once would bind to a form the merchant never fills in. A listener left behind
    // on a replaced form does no harm, because `getForm` never returns that instance again.
    const stopWatching = watch(
      () => formBuilder.getForm(AdminModalKey.PrintOptions),
      (form?: FormInstance) => {
        if (!form) {
          return;
        }

        // The modal's submit action reads the form back out of here.
        modalStore.context ??= {};
        modalStore.context.form = markRaw(form);

        form.on(FormHook.AfterSubmit, onAfterSubmit);
      },
      // Immediate, because a modal that reuses its form already has one by the time we get
      // here, and the watcher would never fire for it.
      {immediate: true},
    );

    modalStore.onClose(() => {
      stopWatching();
      formBuilder.getForm(AdminModalKey.PrintOptions)?.off(FormHook.AfterSubmit, onAfterSubmit);

      // Ends the print action without printing anything. The executor reads a StopActionHandler
      // as "the merchant cancelled", so it stops quietly instead of showing an error.
      reject(new StopActionHandler());
    });
  });
};
