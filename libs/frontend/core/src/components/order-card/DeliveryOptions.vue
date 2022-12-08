<template>
  <Transition name="mypa__fade">
    <PdkAlerts
      v-if="alerts.length"
      :alerts="alerts" />
    <form v-else-if="loaded">
      <div
        v-show="loaded"
        v-html="htmlContent" />
    </form>
    <!--    <LoaderOverlay -->
    <!--      v-else -->
    <!--      :show="true" -->
    <!--      style="height: 100px" /> -->
  </Transition>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useDeliveryOptions} from '../../composables';

export default defineComponent({
  name: 'DeliveryOptions',

  setup: () => {
    // const contextData = useGlobalContext(ContextKey.GET_ORDERS);
    // const deliveryOptionsEventBus = useDeliveryOptionsEventBus();

    const onUpdate = (event: CustomEvent): void => {
      // deliveryOptionsEventBus.update({
      //   orderIdentifier: contextData.value.orderIdentifier ?? null,
      //   deliveryOptions: event.detail,
      // });
    };

    return {
      // ...useEventBusAlerts(deliveryOptionsEventBus),
      ...useDeliveryOptions(onUpdate),
    };
  },
});
</script>
