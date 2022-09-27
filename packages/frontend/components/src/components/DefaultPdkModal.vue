<template>
  <div
    :id="id"
    :class="{
      show: modalContext.shown,
    }"
    class="fade modal"
    role="dialog"
    tabindex="-1">
    <div
      class="modal-dialog"
      role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4
            class="modal-title"
            v-text="translate(title)" />
          <button
            class="close"
            data-dismiss="modal"
            type="button">
            <PdkIcon icon="close" />
          </button>
        </div>

        <div
          v-if="modalContext.shown"
          class="modal-body">
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
    </div>
  </div>
</template>

<script lang="ts">
import {ModalCallbackProps, useModalContext, useModalStore, useTranslate} from '@myparcel/pdk-frontend';
import {PropType, computed, defineComponent} from 'vue';
import {ModalKey} from '@myparcel/pdk-frontend-shared';

export default defineComponent({
  name: 'DefaultPdkModal',

  props: {
    id: {
      type: String as PropType<ModalKey>,
      default: null,
    },

    /**
     * Callback to change behavior of save button. Note: You need to manually close the modal when using this.
     */
    onSave: {
      type: Function as PropType<ModalCallbackProps['onSave']>,
      default: null,
    },

    /**
     * Callback to change behavior of leave button. Note: You need to manually close the modal when using this.
     */
    onLeave: {
      type: Function as PropType<ModalCallbackProps['onLeave']>,
      default: null,
    },

    title: {
      type: String,
      required: true,
    },

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
    const modalContext = useModalContext(props.id, props.onSave, props.onLeave);

    return {
      modalContext,

      modalStore: useModalStore(),
      translate: useTranslate(),

      actionButtons: computed(() => {
        return props.actions.map((action) => {
          const {onClick, ...data} = action;

          return {
            ...data,
            onClick() {
              onClick?.();
              modalContext.onButtonClick(action.id);
            },
          };
        });
      }),
    };
  },
});
</script>
