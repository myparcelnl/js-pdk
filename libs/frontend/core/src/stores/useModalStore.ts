import {ModalKey, NotificationCategory, PdkModalContext} from '../types';
import {defineStore} from 'pinia';
import {ref} from 'vue';
import {useNotificationStore} from './useNotificationStore';

type ModalOpenFn = <K extends ModalKey>(modal: K, context?: PdkModalContext<K>) => void;

type ModalCloseFn = <K extends ModalKey>(modal: K) => void;

export const useModalStore = defineStore('modal', () => {
  const opened = ref<ModalKey | null>(null);
  const context = ref<PdkModalContext | null>(null);
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

    open: <K extends ModalKey>(modal: K, newContext?: PdkModalContext<K>) => {
      openHooks.value.forEach((hook) => hook(modal, newContext));
      context.value = newContext ?? null;
      opened.value = modal;
    },

    close: () => {
      useNotificationStore().remove(NotificationCategory.MODAL);
      const modal = opened.value as ModalKey;

      opened.value = null;
      context.value = null;
      closeHooks.value.forEach((hook) => hook(modal));
    },
  };
});
