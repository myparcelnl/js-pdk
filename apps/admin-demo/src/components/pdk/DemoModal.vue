<template>
  <div
    :id="`pdk-modal-${modalKey}`"
    ref="wrapper"
    :aria-hidden="isOpen ? 'false' : 'true'"
    :class="{
      hidden: !isOpen,
    }"
    class="fixed h-full inset-0 overflow-x-hidden overflow-y-auto w-full z-50"
    tabindex="-1"
    @keydown.esc="close">
    <div
      v-show="isOpen"
      class="absolute bg-black/50 h-full w-full"
      @click.self="modalStore.close" />

    <Transition name="slide-up">
      <div
        v-show="isOpen"
        class="m-auto max-w-md p-8 w-full">
        <NotificationContainer category="modal" />

        <div class="bg-white dark:bg-zinc-800 relative rounded-lg shadow">
          <button
            class="absolute bg-transparent dark:hover:bg-zinc-900 dark:hover:text-white hover:bg-zinc-200 hover:text-zinc-900 inline-flex items-center ml-auto p-1.5 right-2.5 rounded-lg text-sm text-zinc-400 top-3"
            type="button"
            @click="modalStore.close">
            <svg
              aria-hidden="true"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                clip-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                fill-rule="evenodd" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>

          <div class="lg:px-8 px-6 py-6">
            <h3 v-text="title" />

            <slot :state="modalStore.$state" />
          </div>

          <ActionButton
            v-for="(action, index) in resolvedActions"
            :key="`action_${action.id}_${index}`"
            :action="action" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import {
  ActionButton,
  ActionDefinition,
  AdminModalKey,
  ModalCallbackProps,
  NotificationContainer,
  useLanguage,
  useModalContext,
  useModalStore,
} from '@myparcel-pdk/frontend-core/src';
import {PropType, computed, defineComponent, ref, toRefs} from 'vue';

/**
 * @see import('@myparcel-pdk/admin-components').DefaultModal
 */
export default defineComponent({
  name: 'DemoModal',
  components: {
    NotificationContainer,
    ActionButton,
  },

  props: {
    /**
     * Available actions in the modal. Each action needs a unique id and a label.
     */
    actions: {
      type: Array as PropType<ActionDefinition[]>,
      default: () => [],
    },

    /**
     * Modal k. Must be unique.
     */
    modalKey: {
      type: String as PropType<AdminModalKey>,
      default: null,
    },

    /**
     * Callback to change behavior of the cancel button. Note: You need to manually close the modal when using this.
     */
    onCancel: {
      type: Function as PropType<ModalCallbackProps['onCancel']>,
      default: null,
    },

    /**
     * Callback to change behavior of the save button. Note: You need to manually close the modal when using this.
     */
    onSave: {
      type: Function as PropType<ModalCallbackProps['onSave']>,
      default: null,
    },

    /**
     * Modal title.
     */
    title: {
      type: String,
      required: true,
    },
  },

  setup: (props) => {
    const {translate} = useLanguage();
    const wrapper = ref<HTMLElement | null>(null);
    const modalStore = useModalStore();
    const propRefs = toRefs(props);
    const modalContext = useModalContext(propRefs.modalKey, propRefs.onSave, propRefs.onCancel);

    return {
      modalContext,

      isOpen: computed(() => {
        return propRefs.modalKey.value && propRefs.modalKey.value === modalStore.opened;
      }),

      modalStore,
      translate,

      resolvedActions: computed(() => {
        return props.actions.map((action) => {
          const {onClick, ...data} = action;

          return {
            ...data,
            async onClick() {
              await onClick?.();

              return modalContext?.onButtonClick(action.id);
            },
          };
        });
      }),

      wrapper,
    };
  },
});
</script>
