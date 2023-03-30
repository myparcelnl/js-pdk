<template>
  <NotificationContainer />
  <NotificationContainer :category="NotificationCategory.Api" />
</template>

<!-- The notification container. Used to display notifications. -->
<script lang="ts" setup>
import {NotificationCategory} from '@myparcel-pdk/frontend-core/src';
import {NotificationContainer} from '../components';
</script>
