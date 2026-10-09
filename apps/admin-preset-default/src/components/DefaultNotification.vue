<template>
  <div
    v-test="AdminComponent.Notification"
    :aria-busy="notification.loading ? 'true' : undefined">
    <b
      v-if="notification.title"
      v-text="notification.title" />

    <ul v-if="contentArray.length > 1">
      <li
        v-for="item in contentArray"
        :key="item"
        v-text="item" />
    </ul>

    <p
      v-else
      v-text="contentArray[0]" />

    <span
      v-if="notification.loading"
      v-text="translate('loading')" />

    <button
      v-if="notification.action"
      type="button"
      @click="notification.action.onClick()"
      v-text="notification.action.label" />
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {AdminComponent, type NotificationProps, useLanguage} from '@myparcel-dev/pdk-admin';
import {toArray} from '@myparcel-dev/ts-utils';

const props = defineProps<NotificationProps>();

const contentArray = computed(() => toArray(props.notification.content));

const {translate} = useLanguage();
</script>
