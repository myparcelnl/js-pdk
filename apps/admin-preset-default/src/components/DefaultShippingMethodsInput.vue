<template>
  <div v-test="[AdminComponent.ShippingMethodsInput, element]">
    <PdkTable>
      <PdkTableRow>
        <PdkTableCol component="th" />

        <PdkTableCol
          v-for="shippingMethodType in shippingMethodTypes"
          :key="shippingMethodType"
          component="th"
          :class="config?.cssUtilities?.whitespaceNoWrap">
          <PackageType
            v-if="isEnumValue(shippingMethodType.value, PackageTypeName)"
            :package-type="shippingMethodType.value" />

          <span
            v-else
            v-text="translate(shippingMethodType.label)" />
        </PdkTableCol>
      </PdkTableRow>

      <PdkTableRow
        v-for="shippingMethod in items"
        :key="shippingMethod.value">
        <PdkTableCol
          component="th"
          :class="config?.cssUtilities?.whitespaceNoWrap">
          <p v-text="shippingMethod.label" />

          <small
            v-if="shippingMethod.description"
            v-html="translate(shippingMethod.description)" />
        </PdkTableCol>

        <PdkTableCol
          v-for="shippingMethodType in shippingMethodTypes"
          :key="`${shippingMethod.value}-${shippingMethodType.value}}`"
          :class="config?.cssUtilities?.textCenter">
          <PdkRadioInput
            v-model="refs[shippingMethod.value]"
            :element="elements[shippingMethod.value][shippingMethodType.value]" />
        </PdkTableCol>
      </PdkTableRow>
    </PdkTable>

    <a
      v-if="hasMore"
      href="#"
      @click.prevent="loadMore"
      v-text="translate('load_more')" />
  </div>
</template>

<script lang="ts" setup>
import {
  AdminComponent,
  PackageType,
  type ShippingMethodsInputEmits,
  type ShippingMethodsInputProps,
  useAdminConfig,
  useLanguage,
  useLoadMore,
  useShippingMethodsInputContext,
} from '@myparcel-pdk/admin';
import {isEnumValue} from '@myparcel/ts-utils';
import {PackageTypeName} from '@myparcel/constants';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<ShippingMethodsInputProps>();
const emit = defineEmits<ShippingMethodsInputEmits>();

const {translate} = useLanguage();

const config = useAdminConfig();

const {shippingMethods, elements, shippingMethodTypes, refs} = useShippingMethodsInputContext(props, emit);

const {items, hasMore, loadMore} = useLoadMore({items: shippingMethods, step: 5});
</script>
