<template>
  <PdkButton
    :click-context="{orderIdentifier: contextData.orderIdentifier}"
    data-target="#deliveryOptions"
    data-toggle="modal"
    icon="create"
    size="sm">
    {{ contextData.deliveryOptions?.carrier }} | {{ formatDate(contextData.deliveryOptions?.date) }}
  </PdkButton>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'DeliveryMomentSelector',

  setup: () => ({
    formatDate,
    contextData: useGlobalContext(ContextKey.ORDER_DATA),
  }),
});
</script>
