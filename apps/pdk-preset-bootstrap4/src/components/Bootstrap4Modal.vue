<template>
  <div
    :id="`pdk-modal-${modalKey}`"
    class="fade modal"
    tabindex="-1"
    role="dialog">
    <div
      class="modal-dialog"
      role="document">
      <div class="modal-content">
        <div class="modal-header">
          <PdkHeading
            level="4"
            class="modal-title">
            {{ translate(title) }}
          </PdkHeading>
          <button
            type="button"
            class="close"
            data-dismiss="modal">
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

<script lang="ts">
import {
  ActionButton,
  ModalKey,
  NotificationContainer,
  PdkButtonAction,
  useLanguage,
  useModalStore,
} from '@myparcel/pdk-frontend';
import {PropType, computed, defineComponent, toRefs} from 'vue';

/**
 * @see import('@myparcel/pdk-components').DefaultModal
 */
export default defineComponent({
  name: 'Bootstrap4Modal',

  components: {
    NotificationContainer,
    ActionButton,
  },

  props: {
    modalKey: {
      type: String as PropType<ModalKey>,
      default: null,
    },

    title: {
      type: String,
      required: true,
    },

    /**
     * Available actions in the modal.
     */
    actions: {
      type: Array as PropType<PdkButtonAction[]>,
      required: true,
    },
  },

  setup: (props) => {
    const propRefs = toRefs(props);
    const modalStore = useModalStore();
    const {translate} = useLanguage();

    return {
      translate,

      context: computed(() => {
        return propRefs.modalKey.value === modalStore.opened ? modalStore.context : null;
      }),
    };
  },
});
</script>
