import {InstanceContextKey, ModalKey, PdkContext} from '@myparcel/pdk-frontend-shared';
import {StoreDefinition, defineStore} from 'pinia';
import {ref} from 'vue';

export type ModalContextMap<K extends ModalKey> = PdkContext<
  K extends ModalKey.SHIPMENT_OPTIONS ? InstanceContextKey.ORDER_IDENTIFIER : never
>;

export type ModalStore<K extends ModalKey = ModalKey> = StoreDefinition<
  'modal',
  {
    opened: K | null;
    context: ModalContextMap<K> | null;
    onOpen: null | ((modal: K) => void);
    onClose: null | ((modal: null | K) => void);
  },
  unknown,
  {
    open: (modal: K, newContext?: ModalContextMap<K>) => void;
    close: (modal: K, newContext?: ModalContextMap<K>) => void;
  }
>;

export const useModalStore = defineStore('modal', () => {
  type K = ModalKey;

  const opened = ref<K | null>(null);
  const context = ref<ModalContextMap<K> | null>(null);
  const onOpen = ref<null | ((modal: K) => void)>(null);
  const onClose = ref<null | ((modal: null | K) => void)>(null);

  const open = (modal: K, newContext?: ModalContextMap<K>) => {
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
