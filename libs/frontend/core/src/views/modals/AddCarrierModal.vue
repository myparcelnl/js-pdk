<template>
  <PdkModal
    id="addCarrier"
    :context-key="contextKey.ADD_CARRIER_FORM"
    :on-save="addCarrier"
    on-leave=""
    title="add_carrier_title">
    <template #default="data">
      <PdkSettingsFormItem
        v-for="(child, index) in data.context.children"
        :key="[data.context.name, child.name, child.action, child.label, child.type, index].join('_')"
        :item="child"
        @change="processValue" />
    </template>
  </PdkModal>
</template>

<script lang="ts">
import {AddCarrierValue, ContextKey} from '@myparcel-pdk/frontend-shared';
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'AddCarrierModal',

  setup: () => {
    const values = ref<Record<string, string>>({});

    return {
      contextKey: ContextKey,

      processValue(val: AddCarrierValue): void {
        values.value[val.name] = val.value;
      },

      async addCarrier(): Promise<void> {
        // await useButtonActionsEventBus().execute([endpoints.label ?? '', 'addCarrier'], values.value);
      },
    };
  },
});
</script>
