<template>
  <div v-if="order !== undefined">
    Shipment options form

    <h1>Order {{ order.externalIdentifier }}</h1>

    <PdkInput v-model="state.deliveryOptions.packageType" />

    <!--    <PdkInput -->
    <!--      v-model="order.externalIdentifier" -->
    <!--      type="hidden" /> -->

    <!--    <PdkFormGroup label="extra_options_label_amount"> -->
    <!--      <PdkInput -->
    <!--        v-model="localData.extraOptions.labelAmount" -->
    <!--        type="number" -->
    <!--        min="1" -->
    <!--        max="10" /> -->
    <!--    </PdkFormGroup> -->

    <!--    <PackageTypeSelectFormGroup v-model="packageType" /> -->
    <!--    &lt;!&ndash;    <PackageFormatSelectFormGroup v-model="localData.labelOptions.package_format" /> &ndash;&gt; -->
    <!--    <DigitalStampWeightSelectFormGroup -->
    <!--      v-if="packageType === 'digital_stamp'" -->
    <!--      v-model="localData.extraOptions.digitalStampWeight" -->
    <!--      :calculated-weight="localData.weight || 0" /> -->

    <!--    <div> -->
    <!--      <PdkFormGroup label="shipment_options_title"> -->
    <!--        <PdkCheckbox -->
    <!--          v-model="shipmentOptions.onlyRecipient" -->
    <!--          label="shipment_options_only_recipient" /> -->

    <!--        <PdkCheckbox -->
    <!--          v-model="shipmentOptions.ageCheck" -->
    <!--          label="shipment_options_age_check" /> -->

    <!--        <PdkCheckbox -->
    <!--          v-model="shipmentOptions.return" -->
    <!--          label="shipment_options_return" /> -->

    <!--        <PdkCheckbox -->
    <!--          v-model="shipmentOptions.signature" -->
    <!--          label="shipment_options_signature" /> -->
    <!--      </PdkFormGroup> -->

    <!--      <InsuranceSelectFormGroup -->
    <!--        v-model="shipmentOptions.insurance" -->
    <!--        :context="order" /> -->
    <!--    </div> -->
  </div>
  <div v-else>No order!</div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, toRefs} from 'vue';
import {useOrder} from '../../composables/query/orders/useOrder';
import {useTranslate} from '../../composables';

export default defineComponent({
  name: 'ShipmentOptionsForm',
  props: {
    orderId: {
      type: String,
      default: undefined,
    },
  },

  setup: (props) => {
    const propRefs = toRefs(props);
    const orderQuery = useOrder(propRefs.orderId);

    const order = computed(() => {
      return orderQuery.data.value;
    });

    const shipmentOptions = computed(() => {
      return order.value?.deliveryOptions.shipmentOptions ?? {};
    });

    // watch([packageType], async ([oldPackageType], [newPackageType]) => {
    //   if (oldPackageType === newPackageType || !order.value?.externalIdentifier) {
    //     return;
    //   }
    //
    //   order.value.deliveryOptions.packageType = packageType.value;
    //   // const response = await useOrderDataContextEventBus().refresh(
    //   //   order.value.externalIdentifier,
    //   //   order.value.deliveryOptions,
    //   // );
    //
    //   // console.log(response);
    //   // todo back update context
    //
    //   // order = response?.context;
    // });

    /**
     * Update the event buses when any order property is modified to be able to send it to the backend.
     */
    // watchEffect(() => {
    //   const values = KEYS_TO_SAVE.reduce((acc, K) => {
    //     return {...acc, [key]: order.value?.[key]};
    //   }, {});
    //
    //   // useDeliveryOptionsEventBus().update(values);
    //   // useOrderActionsEventBus().update(values);
    // });

    return {
      state: ref({...order.value}),
      order,
      orderQuery,
      translate: useTranslate(),
      shipmentOptions,
      // canHaveShipmentOptions,
    };
  },
});
</script>
