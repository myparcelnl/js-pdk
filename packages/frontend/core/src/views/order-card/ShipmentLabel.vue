<template>
  <PdkTableRow>
    <PdkTableCol>
      <PdkCheckbox
        v-model="model"
        :value="shipment.id" />
    </PdkTableCol>
    <PdkTableCol>
      <a
        :href="shipment.barcode"
        class="text-nowrap"
        rel="noopener noreferrer"
        target="_blank">
        {{ shipment.barcode }}
        <PdkIcon
          class="font-16"
          icon="open_in_new" />
      </a>
    </PdkTableCol>

    <PdkTableCol>{{ shipment.status }}</PdkTableCol>
    <PdkTableCol>{{ shipment.updated }}</PdkTableCol>
    <PdkTableCol class="text-right">
      <div class="btn-group">
        <PdkButton
          class="btn-sm"
          icon="local_printshop"
          label="action_print"
          @click="() => doLabelAction()" />

        <PdkDropdownButton
          :options="rowDropdownItems"
          class="dropdown-toggle-split"
          @click="(action) => doLabelAction(action)" />
      </div>
    </PdkTableCol>
  </PdkTableRow>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {deleteAction, refreshAction, returnAction} from '../../data/dropdownActions';
import {PdkAction} from '../../data/global/actions';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'ShipmentLabel',

  props: {
    shipment: {
      type: Object as PropType<MyParcelPdk.Shipment>,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: String,
      default: null,
    },
  },

  setup: (props, ctx) => {
    /**
     * Callback function for any label action.
     */
    const doLabelAction = async (action: PdkAction = PdkAction.LABEL_PRINT): Promise<void> => {
      // await executeLabelAction(action, Number(props.shipment.id_label), props.shipment);
    };

    const model = useVModel(props, 'modelValue', ctx.emit);

    return {
      model,
      doLabelAction,
      rowDropdownItems: [refreshAction, returnAction, deleteAction],
    };
  },
});
</script>
