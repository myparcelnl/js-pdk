<template>
  <div
    v-test="AdminComponent.Modal"
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
import {toRefs} from 'vue';
import {
  ActionButton,
  AdminComponent,
  type ModalProps,
  type ModalSlots,
  NotificationContainer,
  useLanguage,
  useModalElementContext,
} from '@myparcel-pdk/admin';

const props = withDefaults(defineProps<ModalProps>(), {
  actions: () => [],
  title: '',
});
defineSlots<ModalSlots>();

const propRefs = toRefs(props);

const {isOpen, context, close} = useModalElementContext(propRefs.modalKey);
const {translate} = useLanguage();
</script>
