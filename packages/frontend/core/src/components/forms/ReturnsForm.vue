<template>
  <div>
    <PdkFormGroup label="customer_name">
      <PdkInput v-model="contextData.name" />
    </PdkFormGroup>
    <PdkFormGroup label="customer_email">
      <PdkInput v-model="contextData.email" />
    </PdkFormGroup>
    <PdkFormGroup label="custom_label">
      <PdkInput v-model="customLabel" />
    </PdkFormGroup>
    <PackageTypeSelectFormGroup
      v-if="packageTypeOptions.length"
      v-model="packageType"
      :options="packageTypeOptions" />
    <PackageFormatSelectFormGroup
      v-if="packageFormatOptions.length"
      v-model="packageFormat"
      :options="packageFormatOptions" />

    <PdkFormGroup>
      <PdkCheckbox
        v-model="shipmentOptions.signature"
        label="shipment_options_signature" />
    </PdkFormGroup>

    <InsuranceSelectFormGroup v-model.number="shipmentOptions.insurance" />
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue';
import {useGlobalContext, useTranslate} from '../../composables';
import {ContextKey} from '@myparcel/pdk-frontend-shared';
import InsuranceSelectFormGroup from '../common/form/InsuranceSelectFormGroup.vue';
import PackageFormatSelectFormGroup from '../common/form/PackageFormatSelectFormGroup.vue';
import PackageTypeSelectFormGroup from '../common/form/PackageTypeSelectFormGroup.vue';

export default defineComponent({
  name: 'ReturnsForm',
  components: {
    InsuranceSelectFormGroup,
    PackageFormatSelectFormGroup,
    PackageTypeSelectFormGroup,
  },

  props: {
    modalData: {
      type: Object,
      default: null,
    },
  },

  setup: (props) => {
    const translate = useTranslate();
    const contextData = useGlobalContext(ContextKey.RETURNS_FORM);
    const label = {barcode: props.modalData.barcode};

    return {
      contextData,
      shipmentOptions: reactive({}),
      packageTypeOptions: [],
      packageFormatOptions: [],
      packageType: ref(),
      packageFormat: ref(),
      customLabel: ref<string>(`${translate('return_prefix')} ${label.barcode}`),
    };
  },
});
</script>
