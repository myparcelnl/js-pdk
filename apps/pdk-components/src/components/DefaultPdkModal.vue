<template>
  <div class="relative">
    <div
      v-if="shown"
      class="bg-black fixed inset-0 opacity-10 z-50" />

    <Transition name="slide-up">
      <div
        :id="id"
        :class="{
          'inline-flex': shown,
          hidden: !shown,
        }"
        class="bg-white border border-gray-300 fixed inset-0 m-auto overflow-y-auto rounded-lg shadow-lg z-50"
        role="dialog"
        tabindex="-1">
        <div>
          <h4 v-text="translate(title)" />
          <PdkButton>
            <PdkIcon icon="close" />
          </PdkButton>
        </div>

        <div v-if="modalContext.shown">
          <!-- Modal content. -->
          <slot :state="modalStore.$state" />
          <!--                  <slot -->
          <!--                    :modal-data="modalContext.modalData" -->
          <!--                    :context="modalContext.additionalContext.value" /> -->
          <!--          <LoaderOverlay v-show="loading" /> -->
        </div>

        <div class="modal-footer">
          <PdkButton
            v-for="(action, index) in actionButtons"
            :key="`action_${action.id}_${index}`"
            v-bind="action" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import {ModalCallbackProps, ModalKey, useModalContext, useModalStore, useTranslate} from '@myparcel-pdk/frontend-core';
import {PropType, computed, defineComponent, toRefs} from 'vue';

/**
 * A modal that can be used to render content.
 *
 * The modalStore is used to control the modal state. The modalContext is used to control the modal data.
 */
export default defineComponent({
  name: 'DefaultPdkModal',
  props: {
    /**
     * Modal ID. Must be unique.
     */
    id: {
      type: String as PropType<ModalKey>,
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
     * Callback to change behavior of the cancel button. Note: You need to manually close the modal when using this.
     */
    onCancel: {
      type: Function as PropType<ModalCallbackProps['onCancel']>,
      default: null,
    },

    /**
     * Modal title.
     */
    title: {
      type: String,
      required: true,
    },

    /**
     * Available actions in the modal. Each action needs an unique id and a label.
     */
    actions: {
      type: Array as PropType<{id: string; onClick?: () => void}[]>,
      default: () => [
        {
          id: 'cancel',
          label: 'cancel',
        },
        {
          id: 'save',
          label: 'save',
        },
      ],
    },
  },

  setup: (props) => {
    const modalStore = useModalStore();
    const propRefs = toRefs(props);
    const modalContext = useModalContext(propRefs.id, propRefs.onSave, propRefs.onCancel);

    return {
      modalContext,

      shown: computed(() => {
        return propRefs.id.value === modalStore.opened || true;
      }),

      modalStore,
      translate: useTranslate(),

      actionButtons: computed(() => {
        return props.actions.map((action) => {
          const {onClick, ...data} = action;

          return {
            ...data,
            onClick() {
              onClick?.();
              return modalContext.onButtonClick(action.id);
            },
          };
        });
      }),
    };
  },
});
</script>
