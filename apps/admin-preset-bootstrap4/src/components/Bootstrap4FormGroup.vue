<template>
  <div
    v-if="isInteractive"
    v-test="AdminComponent.FormGroup"
    class="form-group row">
    <label
      :class="{
        required: !element.isOptional,
      }"
      :for="id"
      class="col-sm-4 form-control-label">
      <slot name="label">
        {{ element.label }}
      </slot>
    </label>

    <div class="col-sm-8">
      <slot />

      <small
        v-if="element.props?.description"
        class="form-text text-muted"
        v-html="translate(element.props.description)">
      </small>

      <div
        v-if="!element.isValid"
        class="invalid-feedback">
        <ul class="list-unstyled">
          <li
            v-for="(error, index) in element.errors"
            :key="`error_${index}`">
            {{ error }}
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div
    v-else
    class="form-group row">
    <div class="col-12">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, toRefs} from 'vue';
import {
  AdminComponent,
  type FormGroupProps,
  type FormGroupSlots,
  generateFieldId,
  useLanguage,
} from '@myparcel-pdk/admin';
import {type InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {isOfType} from '@myparcel/ts-utils';

const props = defineProps<FormGroupProps>();
defineSlots<FormGroupSlots>();

const propRefs = toRefs(props);

const {translate} = useLanguage();

const id = generateFieldId(propRefs.element);

const isInteractive = computed<boolean>(() => {
  return isOfType<InteractiveElementInstance>(propRefs.element, 'ref');
});
</script>
