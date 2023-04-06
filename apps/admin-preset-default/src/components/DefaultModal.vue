<template>
  <div
    :aria-hidden="!isOpen"
    tabindex="-1"
    @keydown.esc="close">
    <div
      v-show="isOpen"
      @click="close" />

    <Transition name="slide-up">
      <div v-show="isOpen">
        <NotificationContainer category="modal" />

        <div>
          <button
            type="button"
            @click="close">
            <svg
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                clip-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                fill-rule="evenodd" />
            </svg>
            <span>Close modal</span>
          </button>

          <div>
            <PdkHeading level="2">{{ translate(title) }}</PdkHeading>

            <slot :context="context" />
          </div>

          <ActionButton
            v-for="(action, index) in actions"
            :key="`action_${action.id}_${index}`"
            :action="action" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import {
  ActionButton,
  ActionDefinition,
  AdminModalKey,
  NotificationContainer,
  useLanguage,
  useModalElementContext,
} from '@myparcel-pdk/frontend-admin-core/src';
import {PropType} from 'vue';

const props = defineProps({
  /**
   * Available actions in the modal.
   */
  actions: {
    type: Array as PropType<ActionDefinition[]>,
    default: () => [],
  },

  /**
   * Modal key.
   */
  modalKey: {
    type: String as PropType<AdminModalKey>,
    default: null,
  },

  /**
   * Modal title.
   */
  title: {
    type: String,
    required: true,
  },
});

const {isOpen, context, close} = useModalElementContext(props.modalKey);
const {translate} = useLanguage();
</script>
