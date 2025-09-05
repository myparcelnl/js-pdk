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
      <div class="shipping-method-details-header">
        <h1>
          <PackageType
            v-if="isEnumValue(selectedShippingMethodType.value, PackageTypeName)"
            :package-type="selectedShippingMethodType.value"></PackageType>
          <span
            v-else
            v-text="translate(selectedShippingMethodType.label)"></span>
        </h1>
        <label class="filter-checkbox">
          <input
            v-model="showAssigned"
            type="checkbox"
            class="filter-checkbox-input" />
          <span class="filter-checkbox-label">{{ translate('show_assigned') }}</span>
        </label>
      </div>

      <div class="search-box">
        <span class="icon"></span>
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="translate('search_shipping_method')" />
      </div>
      <label
        v-for="shippingMethod in filteredShippingMethods"
        :key="shippingMethod.value"
        :class="['shipping-method']">
        <PdkCheckboxInput
          v-model="elements[shippingMethod.value][selectedShippingMethodType.value].ref"
          :element="elements[shippingMethod.value][selectedShippingMethodType.value]" />
        <span class="shipping-method-value">
          <p>
            <b>{{ shippingMethod.label }}</b>
          </p>
          <p>{{ shippingMethod.description }}</p>
          <p
            v-if="refs[shippingMethod.value] && refs[shippingMethod.value] !== selectedShippingMethodType.value"
            class="already-selected-note">
            {{ translate('already_selected_under') }}
            {{ getShippingMethodTypeLabel(refs[shippingMethod.value]) }}
          </p>
        </span>
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, computed} from 'vue';
import {TriState} from '@myparcel-pdk/common';
import {
  AdminComponent,
  PackageType,
  type SelectOptionWithLabel,
  type ShippingMethodsInputEmits,
  type ShippingMethodsInputProps,
  type ShippingMethodType,
  useLanguage,
  useShippingMethodsInputContext,
} from '@myparcel-pdk/admin';
import {isEnumValue} from '@myparcel/ts-utils';
import {PackageTypeName} from '@myparcel/constants';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<ShippingMethodsInputProps>();
const emit = defineEmits<ShippingMethodsInputEmits>();

const {translate} = useLanguage();

const {shippingMethods, elements, shippingMethodTypes, refs} = useShippingMethodsInputContext(props, emit);

const selectedShippingMethodType = ref<SelectOptionWithLabel<ShippingMethodType>>(shippingMethodTypes[0]);
const searchQuery = ref('');
const showAssigned = ref(true);

// Filter shipping methods based on search query and unassigned filter
const filteredShippingMethods = computed(() => {
  let filtered = shippingMethods.value;

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    filtered = filtered.filter((shippingMethod) => {
      const label = String(shippingMethod.label).toLowerCase();
      const description = shippingMethod.description ? String(shippingMethod.description).toLowerCase() : '';
      const value = shippingMethod.value.toString().toLowerCase();

      return label.includes(query) || description.includes(query) || value.includes(query);
    });
  }

  // Filter by assigned status (hide unassigned methods when showAssigned is false)
  if (!showAssigned.value) {
    filtered = filtered.filter((shippingMethod) => {
      const shippingMethodId = shippingMethod.value.toString();
      return refs[shippingMethodId] === TriState.Off;
    });
  }

  return filtered;
});

function selectShippingMethodType(selected: SelectOptionWithLabel<ShippingMethodType>): void {
  selectedShippingMethodType.value = selected;
}

function getShippingMethodTypeLabel(type: ShippingMethodType): string {
  const typeOption = shippingMethodTypes.find((t) => t.value === type);
  return typeOption
    ? isEnumValue(typeOption.value, PackageTypeName)
      ? translate(`package_type_${typeOption.label}`)
      : translate(typeOption.label)
    : String(type);
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

    .shipping-method-details-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1 {
        padding: 0;
        margin: 0 0 16px 0;
      }

      .filter-checkbox {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        font-size: 14px;
        color: #666;
        margin-bottom: 16px;

        .filter-checkbox-input {
          margin: 0;
          cursor: pointer;
        }

        .filter-checkbox-label {
          cursor: pointer;
          user-select: none;
        }

        &:hover {
          color: #333;
        }
      }
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

        .already-selected-note {
          color: #999;
          font-size: 12px;
          font-style: italic;
          margin-top: 2px;
        }
      }
    }
  }
}
</style>
