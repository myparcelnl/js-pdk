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

<script setup lang="ts">
import {
  ActionButton,
  NotificationContainer,
  ResolvedAction,
  useLanguage,
  useModalStore,
} from '@myparcel-pdk/frontend-core/src';
import {computed, defineProps} from 'vue';
import {AdminModalKey} from '@myparcel-pdk/frontend-core';

const props = defineProps<{
  actions: ResolvedAction[];
  modalKey: AdminModalKey;
  title: string;
}>();

const {translate} = useLanguage();

const modalStore = useModalStore();

const context = computed(() => {
  return props.modalKey && props.modalKey === modalStore.opened ? modalStore.context : null;
});
</script>
