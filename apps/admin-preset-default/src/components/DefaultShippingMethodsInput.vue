<template>
  <div
    v-test="AdminComponent.ShippingMethodsInput"
    class="shipping-methods">
    <div class="shipping-method-types">
      <button
        v-for="shippingMethodType in shippingMethodTypes"
        :key="shippingMethodType.value"
        type="button"
        :class="['package-type-option', {selected: selectedShippingMethodType.value === shippingMethodType.value}]"
        @click="selectShippingMethodType(shippingMethodType)">
        <PackageType
          v-if="isEnumValue(shippingMethodType.value, PackageTypeName)"
          :package-type="shippingMethodType.value" />

        <span
          v-else
          v-text="translate(shippingMethodType.label)" />
      </button>
    </div>
    <div class="shipping-method-details">
      <h1>{{ translate(selectedShippingMethodType.label) }}</h1>
      <div class="search-box">
        <span class="icon"></span>
        <input
          type="text"
          placeholder="Zoek verzendmethode..." />
      </div>
      <label
        v-for="shippingMethod in shippingMethods"
        :key="shippingMethod.value"
        :class="['shipping-method']">
        <PdkRadioInput
          v-model="refs[shippingMethod.value]"
          :element="elements[shippingMethod.value][selectedShippingMethodType.value]" />
        <span class="shipping-method-value">
          <p>
            <b>{{ translate(shippingMethod.label) }}</b>
          </p>
          <p>{{ translate(shippingMethod.description) }}</p>
        </span>
      </label>
    </div>
    <!--    <PdkTable> -->
    <!--      <PdkTableRow> -->
    <!--        <PdkTableCol component="th" /> -->

    <!--        <PdkTableCol -->
    <!--          v-for="shippingMethodType in shippingMethodTypes" -->
    <!--          :key="shippingMethodType" -->
    <!--          :class="config?.cssUtilities?.whitespaceNoWrap" -->
    <!--          component="th"> -->
    <!--          <PackageType -->
    <!--            v-if="isEnumValue(shippingMethodType.value, PackageTypeName)" -->
    <!--            :package-type="shippingMethodType.value" /> -->

    <!--          <span -->
    <!--            v-else -->
    <!--            v-text="translate(shippingMethodType.label)" /> -->
    <!--        </PdkTableCol> -->
    <!--      </PdkTableRow> -->

    <!--      <PdkTableRow -->
    <!--        v-for="shippingMethod in items" -->
    <!--        :key="shippingMethod.value"> -->
    <!--        <PdkTableCol -->
    <!--          :class="config?.cssUtilities?.whitespaceNoWrap" -->
    <!--          component="th"> -->
    <!--          <p v-text="shippingMethod.label" /> -->

    <!--          <small -->
    <!--            v-if="shippingMethod.description" -->
    <!--            v-html="translate(shippingMethod.description)" /> -->
    <!--        </PdkTableCol> -->

    <!--        <PdkTableCol -->
    <!--          v-for="shippingMethodType in shippingMethodTypes" -->
    <!--          :key="`${shippingMethod.value}-${shippingMethodType.value}}`" -->
    <!--          :class="config?.cssUtilities?.textCenter"> -->
    <!--          <PdkRadioInput -->
    <!--            v-model="refs[shippingMethod.value]" -->
    <!--            :element="elements[shippingMethod.value][shippingMethodType.value]" /> -->
    <!--        </PdkTableCol> -->
    <!--      </PdkTableRow> -->
    <!--    </PdkTable> -->

    <!--    <a -->
    <!--      v-if="hasMore" -->
    <!--      href="#" -->
    <!--      @click.prevent="loadMore" -->
    <!--      v-text="translate('load_more')" /> -->
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {
  AdminComponent,
  PackageType,
  type SelectOptionWithLabel,
  type ShippingMethodsInputEmits,
  type ShippingMethodsInputProps,
  type ShippingMethodType,
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
console.log({shippingMethods}, {elements}, {shippingMethodTypes}, {refs});

const {items, hasMore, loadMore} = useLoadMore({items: shippingMethods, step: 5});

const selectedShippingMethodType = ref<SelectOptionWithLabel<ShippingMethodType>>(shippingMethodTypes[0]);

function selectShippingMethodType(selected: SelectOptionWithLabel<ShippingMethodType>): void {
  selectedShippingMethodType.value = selected;
}
</script>

<style>
.shipping-methods {
  display: flex;
  gap: 16px;

  .shipping-method-types {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex-shrink: 0;

    button {
      padding: 12px 16px;
      border: none;
      border-radius: 3px;
      background-color: #ffffff;
      color: #333333;
      font-size: 14px;
      font-weight: 500;
      text-align: left;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
      width: 200px;

      &:hover {
        background-color: #f0f0f0;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      }

      &.selected {
        background-color: #f4f9ff;
        box-shadow: 0 2px 8px rgba(25, 118, 210, 0.2);

        &:hover {
          background-color: #bbdefb;
        }
      }
    }
  }

  .shipping-method-details {
    background-color: #fff;
    border-radius: 8px;
    padding: 16px;
    margin-left: 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    width: 100%;
    overflow-y: auto;
    height: 360px;

    h1 {
      padding: 0;
      margin: 0 0 16px 0;
    }

    .search-box {
      display: flex;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 2px 6px;
      background-color: #fff;
      margin-bottom: 16px;

      .icon {
        width: 16px;
        height: 16px;
        margin-right: 8px;
        background: url('../assets/icons/magnifying-glass-solid-full.svg') no-repeat center;
        background-size: contain;
      }

      input {
        border: none;
        outline: none;
        flex: 1;
        font-size: 14px;
        color: #333;

        &:focus {
          outline: none;
          box-shadow: none;
        }

        &::placeholder {
          color: #aaa;
        }
      }
    }

    .shipping-method {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 0;
      border-top: 1px solid #f0f0f0;

      &:hover {
        cursor: pointer;
      }

      input[type='checkbox'] {
        margin-top: 2px;
      }

      .shipping-method-value {
        flex: 1;

        p {
          margin: 0 0 4px 0;

          &:last-child {
            margin-bottom: 0;
            color: #666;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
