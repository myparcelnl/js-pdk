<template>
  <PdkButton
    :click-context="{orderIdentifier: contextData.orderIdentifier}"
    data-target="#deliveryOptions"
    data-toggle="modal"
    icon="create"
    size="sm">
    {{ contextData.deliveryOptions?.carrier }} |
    {{ formatter.formatRelative(contextData.deliveryOptions?.date) }}
  </PdkButton>
</template>

<script lang="ts">
import {ContextKey} from '../../types';
import {defineComponent} from 'vue';
import {useGlobalContext} from '../../composables';
import {useDateFormatter} from '@myparcel-pdk/frontend-shared/src';

export default defineComponent({
  name: 'DeliveryMomentSelector',

  setup: () => ({
    formatter: useDateFormatter(),
    contextData: useGlobalContext(ContextKey.ORDER_DATA),
  }),
});
</script>
