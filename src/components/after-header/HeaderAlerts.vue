<template>
  <PsAlerts id="myparcel-header-alerts" :alerts="alerts" />
</template>

<script lang="ts">
import PsAlerts from '@/components/common/PsAlerts.vue';
import {buttonActionsEventBus} from '@/data/eventBus/ButtonActionsEventBus';
import {defineComponent} from 'vue';
import {labelActionsEventBus} from '@/data/eventBus/LabelActionsEventBus';
import {moduleSettingsEventBus} from '@/data/eventBus/ModuleSettingsEventBus';
import {orderActionsEventBus} from '@/data/eventBus/OrderActionsEventBus';
import {useEventBusAlerts} from '@/composables/useEventBusAlerts';

export default defineComponent({
  name: 'HeaderAlerts',
  components: {PsAlerts},
  setup: () => {
    return {
      ...useEventBusAlerts(
        [labelActionsEventBus, orderActionsEventBus, moduleSettingsEventBus, buttonActionsEventBus],
        'body',
      ),
    };
  },
});
</script>
