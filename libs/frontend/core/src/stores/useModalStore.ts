import {AdminModalContext, AdminModalKey, NotificationCategory} from '../types';
import {defineStore} from 'pinia';
import {ref} from 'vue';
import {useNotificationStore} from './useNotificationStore';

type ModalOpenFn = <K extends AdminModalKey>(modal: K, context?: AdminModalContext<K>) => void;

type ModalCloseFn = <K extends AdminModalKey>(modal: K) => void;

export const useModalStore = defineStore('modal', () => {
  const opened = ref<AdminModalKey | null>(null);
  const context = ref<AdminModalContext | null>(null);
  const loading = ref<boolean>(false);

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

    open: <K extends AdminModalKey>(modal: K, newContext?: AdminModalContext<K>) => {
      openHooks.value.forEach((hook) => hook(modal, newContext));
      context.value = newContext ?? null;
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
