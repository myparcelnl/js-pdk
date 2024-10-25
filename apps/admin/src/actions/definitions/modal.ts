import {executeNextAction} from '../executors/executeNextAction';
import {defineAction} from '../defineAction';
import {useModalStore} from '../../stores/useModalStore';

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
  async handler() {
    const modalStore = useModalStore();

    await modalStore.context?.form?.submit();
  },
  async afterHandle(context) {
    await executeNextAction(context, modalCloseAction);
  },
});
