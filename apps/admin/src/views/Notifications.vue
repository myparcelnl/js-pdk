<template>
  <NotificationContainer :category="NotificationCategory.General" />
</template>

<!-- The notification container. Used to display notifications. -->
<script lang="ts" setup>
import {NotificationContainer} from '../components';
import {NotificationCategory} from "../data";
</script>
