<template>
  <Transition
    name="mypa__fade"
    @beforeEnter="shown = true"
    @afterLeave="shown = false">
    <div
      v-show="show"
      class="mypa__loader-overlay tw-h-100 tw-position-absolute tw-w-100"
      :class="{
        'd-flex': show || shown,
      }">
      <div class="tw-m-auto" />
    </div>
  </Transition>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'LoaderOverlay',
  props: {
    show: {
      type: Boolean,
    },
  },

  setup: () => ({
    // Toggled by the transition to be able to differentiate between its start and end.
    shown: ref(false),
  }),
});
</script>
