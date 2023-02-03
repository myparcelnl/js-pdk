<template>
  <div>
    <p v-text="translate('loading')" />
  </div>
</template>

<script lang="ts" setup>
import {useLanguage} from '../composables';
import {useQueryStore} from '../stores';

const queryStore = useQueryStore();
queryStore.registerContextQueries();

const translate = useLanguage();
</script>
