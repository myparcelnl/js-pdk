<template>
  <div id="myparcel-pdk-notifications">
    <NotificationContainer />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import NotificationContainer from './HeaderAlerts.vue';

export default defineComponent({
  name: 'Notifications',
  components: {
    NotificationContainer,
  },
});
</script>
