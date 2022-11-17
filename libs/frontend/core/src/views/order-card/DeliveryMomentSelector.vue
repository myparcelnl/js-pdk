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
import {ContextKey} from '../../types';
import {defineComponent} from 'vue';
import {formatDate} from '@myparcel-pdk/frontend-shared';
import {useGlobalContext} from '../../composables';

export default defineComponent({
  name: 'DeliveryMomentSelector',

  setup: () => ({
    formatDate,
    contextData: useGlobalContext(ContextKey.ORDER_DATA),
  }),
});
</script>
