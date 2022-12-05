<template>
  <div id="myparcel-pdk-notifications">
    <NotificationContainer />
  </div>
</template>

<script lang="ts">
import NotificationContainer from '../../components/NotificationContainer.vue';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Notifications',
  components: {
    NotificationContainer,
  },
});
</script>
