<template>
  <div
    :aria-hidden="!isOpen"
    :class="{
      hidden: !isOpen,
    }"
    class="fixed h-full inset-0 overflow-x-hidden overflow-y-auto w-full z-50"
    tabindex="-1"
    @keydown.esc="close">
    <div
      v-show="isOpen"
      class="absolute bg-black/50 h-full w-full"
      @click.self="close" />

    <Transition name="slide-up">
      <div
        v-show="isOpen"
        class="m-auto max-w-3xl p-8 w-full">
        <NotificationContainer category="modal" />

        <div class="bg-white dark:bg-gray-800 relative rounded-lg shadow">
          <button
            class="absolute bg-transparent dark:hover:bg-gray-900 dark:hover:text-white hover:bg-gray-200 hover:text-gray-900 inline-flex items-center ml-auto p-1.5 right-2.5 rounded-lg text-gray-400 text-sm top-3"
            type="button"
            @click="close">
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

          <div class="lg:px-8 p-6">
            <PdkHeading level="2">{{ translate(title) }}</PdkHeading>

            <slot :context="context" />
          </div>

          <div class="pb-6 px-6">
            <ActionButton
              v-for="(action, index) in actions"
              :key="`action_${action.id}_${index}`"
              :action="action" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import {type PropType} from 'vue';
import {
  ActionButton,
  type ActionDefinition,
  type AdminModalKey,
  NotificationContainer,
  useLanguage,
  useModalElementContext,
} from '@myparcel-dev/pdk-admin';

const props = defineProps({
  actions: {
    type: Array as PropType<ActionDefinition[]>,
    default: () => [],
  },

  modalKey: {
    type: String as PropType<AdminModalKey>,
    default: null,
  },

  title: {
    type: String,
    required: true,
  },
});

const {isOpen, context, close} = useModalElementContext(props.modalKey);
const {translate} = useLanguage();
</script>
