<template>
  <NotificationContainer :category="NotificationCategory.General" />
</template>

<!-- The notification container. Used to display notifications. -->
<script lang="ts" setup>
import {NotificationCategory} from '../types';
import {NotificationContainer} from '../components';
</script>
