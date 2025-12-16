<template>
  <div
    :class="adminConfig.cssUtilities?.displayFlex"
    class="position-absolute w-100">
    <PdkLoader class="m-auto" />
  </div>
</template>

<script lang="ts" setup>
import {useAdminConfig} from '@myparcel-dev/pdk-admin';

const adminConfig = useAdminConfig();
</script>
