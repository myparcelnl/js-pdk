<template>
  <PdkTable class="mb-0">
    <template #header>
      <PdkTableRow>
        <PdkTableCol component="th">
          <PdkCheckboxInput
            v-model="bulkCheckbox"
            :title="translate('select_all')"
            :element="bulkCheckboxElement"
            :disabled="!shipments.length" />
        </PdkTableCol>

        <PdkTableCol component="th">{{ translate('order_labels_column_track_trace') }}</PdkTableCol>

        <PdkTableCol component="th">{{ translate('order_labels_column_status') }}</PdkTableCol>

        <PdkTableCol component="th">{{ translate('order_labels_column_last_update') }}</PdkTableCol>

        <PdkTableCol
          align="right"
          component="th">
          {{ translate('order_labels_column_actions') }}
        </PdkTableCol>
      </PdkTableRow>
    </template>

    <template #default>
      <PdkTableRow
        v-if="!shipments.length"
        key="row_no_shipments">
        <PdkTableCol colspan="6">
          <div :class="config?.cssUtilities?.textCenter">
            <PdkIcon icon="warn" />
            {{ translate('no_shipments') }}
          </div>
        </PdkTableCol>
      </PdkTableRow>

      <ShipmentLabelTableRow
        v-for="shipment in shipments"
        :key="`row_${shipment?.id}_${shipment.updated}`"
        v-model="selectedRows"
        :shipment="shipment" />
    </template>
  </PdkTable>
</template>

<script lang="ts">
import {FormInstance, InteractiveElementInstance} from '@myparcel/vue-form-builder/src';
import {PropType, computed, defineComponent, ref} from 'vue';
import {useLanguage, useOrderData, usePdkConfig} from '../../composables';
import {Plugin} from '@myparcel-pdk/common/src';
import ShipmentLabelTableRow from './OrderShipmentsTableRow.vue';
import {isDef} from '@vueuse/core';

export default defineComponent({
  name: 'OrderShipmentsTable',
  components: {
    ShipmentLabelTableRow,
  },

  props: {
    order: {
      type: Object as PropType<Plugin.ModelPdkOrder>,
      required: true,
    },
  },

  emits: ['select'],

  setup: (props, ctx) => {
    const mutableSelectedRows = ref<string[]>([]);
    const {translate} = useLanguage();

    const selectedRows = computed({
      get(): string[] {
        return mutableSelectedRows.value;
      },
      set(rows: string[]): void {
        mutableSelectedRows.value = rows;
        ctx.emit('select', rows.map(Number));
      },
    });

    const bulkCheckbox = computed({
      get(): boolean {
        return selectedRows.value.length === props.order?.shipments?.length;
      },

      set(bulkCheckboxChecked: boolean): void {
        const hasShipments = props.order && selectedRows.value.length !== props.order?.shipments?.length;
        const checked = bulkCheckboxChecked || hasShipments;
        const ids = (props.order?.shipments ?? []).map((shipment) => shipment.id?.toString());

        selectedRows.value = (checked ? ids ?? [] : []).filter(isDef);
      },
    });

    const bulkCheckboxElement: InteractiveElementInstance = {
      name: 'bulk-checkbox',
      ref: bulkCheckbox,
      form: {
        name: 'bulk-checkbox',
      } as FormInstance,
    };

    const orderData = useOrderData(props.order);

    return {
      bulkCheckbox,

      config: usePdkConfig(),
      selectedRows,
      translate,

      bulkCheckboxElement,

      shipments: orderData.shipments,
    };
  },
});
</script>
