<template>
  <div v-test="[AdminComponent.ShippingMethodsInput, element]">
    <PdkTable>
      <tr>
        <th>Shipping method</th>

        <th
          v-for="option in shippingMethodOptions"
          :key="option">
          <PackageType
            v-if="isEnumValue(option, PackageTypeName)"
            :package-type="option" />

          <span
            v-else
            v-text="translate(option)" />
        </th>
      </tr>

      <tr
        v-for="option in options"
        :key="option.value">
        <th
          :class="config?.cssUtilities?.whitespaceNoWrap"
          v-text="option.label" />

        <td
          v-for="packageType in shippingMethodOptions"
          :key="`${option.value}-${packageType}}`">
          <PdkRadioInput
            v-model="refs[option.value]"
            :element="elements[option.value][packageType]" />
        </td>
      </tr>
    </PdkTable>

    <pre v-text="model"></pre>
  </div>
</template>

<script generic="T extends ShippingMethodsInputModelValue" lang="ts" setup>
import {
  AdminComponent,
  PackageType,
  type ShippingMethodsInputEmits,
  type ShippingMethodsInputModelValue,
  type ShippingMethodsInputProps,
  useAdminConfig,
  useLanguage,
  useShippingMethodsInputContext,
} from '@myparcel-pdk/admin';
import {useForm} from '@myparcel/vue-form-builder';
import {isEnumValue} from '@myparcel/ts-utils';
import {PackageTypeName} from '@myparcel/constants'; // eslint-disable-next-line vue/no-unused-properties

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<ShippingMethodsInputProps<T>>();
const emit = defineEmits<ShippingMethodsInputEmits<T>>();

const {translate} = useLanguage();

const config = useAdminConfig();
const form = useForm();

const {options, elements, shippingMethodOptions, refs, model} = useShippingMethodsInputContext(props, emit);

const onChange = (...args) => {
  console.log(...args);
};
</script>
