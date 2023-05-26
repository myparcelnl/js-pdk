import {type ActionContext, executeNextAction} from '../executors';
import {defineAction} from '../defineAction';
import {useModalStore} from '../../stores';

/**
 * Close current modal.
 */
export const modalCloseAction = defineAction({
  id: 'modal_close',
  label: 'action_close',
  handler() {
    const modalStore = useModalStore();

    modalStore.close();
  },
});

/**
 * Trigger a submit on the form in the current modal context.
 */
export const modalSubmitFormAction = defineAction({
  id: 'modal_submit',
  label: 'action_submit',
  async handler(context: ActionContext) {
    const modalStore = useModalStore();

    await modalStore.context?.form?.submit();

    await executeNextAction(context, modalCloseAction);
  },
});
