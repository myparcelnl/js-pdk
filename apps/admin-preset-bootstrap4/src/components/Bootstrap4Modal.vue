<template>
  <div
    :id="`pdk-modal-${modalKey}`"
    class="fade modal"
    role="dialog"
    tabindex="-1">
    <div
      class="modal-dialog"
      role="document">
      <div class="modal-content">
        <div class="modal-header">
          <PdkHeading
            class="modal-title"
            level="4">
            {{ translate(title) }}
          </PdkHeading>
          <button
            class="close"
            data-dismiss="modal"
            type="button">
            <PdkIcon icon="close" />
          </button>
        </div>

        <div
          v-if="context"
          class="modal-body">
          <NotificationContainer category="modal" />

          <slot :context="context" />
        </div>

        <div class="modal-footer">
          <div class="btn-group">
            <ActionButton
              v-for="(action, index) in actions"
              :key="`action_${action.id}_${index}`"
              :action="action" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {PropType, computed} from 'vue';
import {
  ActionButton,
  ActionDefinition,
  AdminModalKey,
  NotificationContainer,
  useLanguage,
  useModalStore,
} from '@myparcel-pdk/frontend-admin-core';

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
    default: null,
  },
});

const {translate} = useLanguage();

const modalStore = useModalStore();

const context = computed(() => {
  return props.modalKey && props.modalKey === modalStore.opened ? modalStore.context : null;
});
</script>
