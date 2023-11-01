import {ref, type Ref, type UnwrapNestedRefs} from 'vue';
import {defineStore} from 'pinia';
import {type AdminModalContext, type AdminModalKey, NotificationCategory} from '../types';
import {useLoading} from '../composables';
import {useNotificationStore} from './useNotificationStore';

type ModalOpenFn = <K extends AdminModalKey>(modal: K, context?: AdminModalContext<K>) => void;

type ModalCloseFn = <K extends AdminModalKey>(modal: K) => void;

type ModalStore = {
  loading: Ref<boolean>;
  opened: Ref<AdminModalKey | null>;
  context: Ref<UnwrapNestedRefs<AdminModalContext>>;
  onOpen(callback: ModalOpenFn): void;
  onClose(callback: ModalCloseFn): void;
  open<K extends AdminModalKey>(modal: K, newContext?: AdminModalContext<K>): void;
  close(): void;
};

export const useModalStore = defineStore('modal', (): ModalStore => {
  const {loading} = useLoading();

  const opened = ref<AdminModalKey | null>(null);
  const context = ref<AdminModalContext>(null);

  const openHooks = ref<ModalOpenFn[]>([]);
  const closeHooks = ref<ModalCloseFn[]>([]);

  return {
    loading,

    opened,

    context,

    onOpen(callback) {
      openHooks.value.push(callback);
    },

    onClose(callback) {
      closeHooks.value.push(callback);
    },

    open(modal, newContext) {
      // TODO: fix excessive depth error
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      context.value = newContext;
      opened.value = modal;

      openHooks.value.forEach((hook) => hook(modal, newContext));
    },

    close() {
      useNotificationStore().remove(NotificationCategory.Modal);
      const modal = opened.value as AdminModalKey;

      opened.value = null;
      context.value = null;
      closeHooks.value.forEach((hook) => hook(modal));
    },
  };
});
