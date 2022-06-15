<template>
  <div class="form-group row">
    <label class="col-sm-4 control-label">
      <slot name="label">
        {{ $filters.translate(label) }}
      </slot>
    </label>
    <div class="col-sm-8">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'FormGroup',
  props: {
    label: {
      type: String,
      default: null,
    },
  },
});
</script>
