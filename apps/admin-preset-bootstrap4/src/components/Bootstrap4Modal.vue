<template>
  <div
    :id="id"
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
            <PdkIcon :icon="AdminIcon.Close" />
          </button>
        </div>

        <div
          v-if="context"
          class="modal-body">
          <NotificationContainer :category="NotificationCategory.Modal" />

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
import {computed, onMounted, type PropType} from 'vue';
import {
  ActionButton,
  type ActionDefinition,
  AdminIcon,
  type AdminModalKey,
  NotificationCategory,
  NotificationContainer,
  useLanguage,
  useModalStore,
} from '@myparcel-pdk/admin';

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

const id = `pdk-modal-${props.modalKey}`;

onMounted(() => {
  jQuery(`#${id}`).modal();
});
</script>
