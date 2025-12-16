<template>
  <PdkIcon :icon="packageType" />
  <span
    :title="translate(getPackageTypeTranslation())"
    v-text="translate(getPackageTypeTranslation(packageType))" />
</template>

<script lang="ts" setup>
import {type PackageTypeName} from '@myparcel-dev/constants';
import {getPackageTypeTranslation} from '../../utils';
import {useLanguage} from '../../composables';

const props = defineProps<{packageType: PackageTypeName | string}>();

const {translate} = useLanguage();
</script>
