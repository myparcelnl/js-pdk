<template>
  <PdkIcon :icon="packageType" />
  <span
    :title="translate(getPackageTypeTranslation())"
    v-text="translate(getPackageTypeTranslation(packageType))" />
</template>

<script lang="ts" setup>
import {type PackageTypeName} from '@myparcel/constants';
import {getPackageTypeTranslation} from '../../utils/translations/getPackageTypeTranslation';
import {useLanguage} from '../../composables/language/useLanguage';

const props = defineProps<{packageType: PackageTypeName | string}>();

const {translate} = useLanguage();
</script>
