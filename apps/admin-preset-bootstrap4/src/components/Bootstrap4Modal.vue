<template>
  <div
    :id="id"
    class="fade modal"
    role="dialog"
    tabindex="-1">
    <div
      v-test="AdminComponent.Modal"
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
          v-if="isActive"
          class="modal-body">
          <NotificationContainer :category="NotificationCategory.Modal" />

          <slot :context="modalStore.context" />
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
import {computed, onMounted, toValue} from 'vue';
import {
  ActionButton,
  AdminComponent,
  AdminIcon,
  type ModalProps,
  type ModalSlots,
  NotificationCategory,
  NotificationContainer,
  useLanguage,
  useModalStore,
} from '@myparcel-dev/pdk-admin';

const props = withDefaults(defineProps<ModalProps>(), {
  actions: () => [],
  title: '',
});
defineSlots<ModalSlots>();

const {translate} = useLanguage();

const modalStore = useModalStore();

const isActive = computed(() => props.modalKey && props.modalKey === modalStore.opened);

const id = computed(() => `pdk-modal-${props.modalKey}`);

onMounted(() => {
  const $this = jQuery(`#${toValue(id)}`);

  // @ts-expect-error show is not in the type definition
  $this.modal({show: isActive.value});

  $this.on('hidden.bs.modal', () => {
    modalStore.close();
  });
});
</script>
