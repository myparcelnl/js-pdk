import {ref} from 'vue';
import {defineStore} from 'pinia';
import {AdminModalContext, AdminModalKey, NotificationCategory} from '../types';
import {useLoading} from '../composables';
import {useNotificationStore} from './useNotificationStore';

type ModalOpenFn = <K extends AdminModalKey>(modal: K, context?: AdminModalContext<K>) => void;

type ModalCloseFn = <K extends AdminModalKey>(modal: K) => void;

export const useModalStore = defineStore('modal', () => {
  const {loading} = useLoading();

  const opened = ref<AdminModalKey | null>(null);
  const context = ref<AdminModalContext>(null);

  const openHooks = ref<ModalOpenFn[]>([]);
  const closeHooks = ref<ModalCloseFn[]>([]);

  return {
    loading,

    opened,
    context,

    onOpen: (callback: ModalOpenFn): void => {
      openHooks.value.push(callback);
    },

    onClose: (callback: ModalCloseFn): void => {
      closeHooks.value.push(callback);
    },

    open: <K extends AdminModalKey>(modal: K, newContext: AdminModalContext<K> = null) => {
      openHooks.value.forEach((hook) => hook(modal, newContext));
      // @ts-expect-error excessive depth
      context.value = newContext;
      opened.value = modal;
    },

    close: () => {
      useNotificationStore().remove(NotificationCategory.Modal);
      const modal = opened.value as AdminModalKey;

      opened.value = null;
      context.value = null;
      closeHooks.value.forEach((hook) => hook(modal));
    },
  };
});
