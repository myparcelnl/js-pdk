import {defineAction} from '../defineAction';
import {useModalStore} from '../../stores';

/**
 * Close current modal.
 */
export const modalCancelAction = defineAction({
  id: 'cancel',
  label: 'action_cancel',
  handler() {
    const modalStore = useModalStore();
    modalStore.close();
  },
});
