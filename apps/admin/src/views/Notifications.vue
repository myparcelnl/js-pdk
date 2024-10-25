<template>
  <NotificationContainer :category="NotificationCategory.General" />
</template>

<!-- The notification container. Used to display notifications. -->
<script lang="ts" setup>
import {NotificationCategory} from '../data/constants';
import {NotificationContainer} from '../components/common';
</script>
