import {ModalKey} from '../types';
import {defineStore} from 'pinia';
import {ref} from 'vue';

export type ModalContextMap<K extends ModalKey> = Record<string, any>;

// export type ModalStore<K extends ModalKey = ModalKey> = StoreDefinition<
//   'modal',
//   {
//     opened: K | null;
//     context: ModalContextMap<K> | null;
//     onOpen: null | ((modal: K) => void);
//     onClose: null | ((modal: null | K) => void);
//   },
//   unknown,
//   {
//     open: (modal: K, newContext?: ModalContextMap<K>) => void;
//     close: (modal: K, newContext?: ModalContextMap<K>) => void;
//   }
// >;

export const useModalStore = defineStore('modal', () => {
  const opened = ref<ModalKey | null>(null);
  const context = ref<ModalContextMap<ModalKey> | null>(null);
  const onOpen = ref<null | ((modal: ModalKey) => void)>(null);
  const onClose = ref<null | ((modal: null | ModalKey) => void)>(null);

  const open = (modal: ModalKey, newContext?: ModalContextMap<ModalKey>) => {
    onOpen.value?.(modal);

    opened.value = modal;
    context.value = newContext ?? null;
    console.log('open', opened.value, context.value);
  };

  const close = () => {
    onClose.value?.(opened.value);
    opened.value = null;
    context.value = null;
    console.log('close', opened.value, context.value);
  };

  return {
    opened,
    context,

    onOpen,
    onClose,

    open,
    close,
  };
});
