<template>
  <div class="p-2">
    <template v-if="config.hasValue">
      <label
        v-if="item.label"
        v-text="item.label" />

      <component
        :is="config.component"
        v-model="moduleSettingsValues[item.name]"
        :label="item.label"
        :name="item.name"
        v-bind="item.attributes"
        @change="$emit('change', {name: item.name, value: $event})"
        @input="$emit('change', {name: item.name, value: $event})" />

      <p
        v-if="item.description"
        class="help-block"
        v-text="item.description" />
    </template>

    <component
      :is="config.component"
      v-else-if="typesWithChildren.includes(item.type)"
      :item="item"
      v-bind="item.attributes" />

    <component
      :is="config.component"
      v-else-if="item.action"
      v-bind="item.attributes"
      @click="$emit('action', {action: item.action})">
      <label
        v-if="item.label"
        v-text="item.label" />
    </component>

    <component
      :is="config.component"
      v-else
      v-bind="item.attributes">
      <h1
        v-if="item.label"
        v-text="item.label" />

      <SettingsFormItem
        v-for="(child, index) in item.children"
        :key="[child.name, child.action, child.label, child.type, index].join('_')"
        :item="child"
        @action="$emit('action', $event)"
        @change="$emit('change', $event)" />
    </component>
    <!--    <component -->
    <!--      :is="component" -->
    <!--      v-bind="moduleSettingsContext[tabName].form[item.name].attributes" /> -->
    <!--      v-model="moduleSettingsContext[tabName].form[item.name].value" -->
    <!--      :name="item.name" -->
    <!--      :label="item.label" -->

    <!--    <p class="help-block"> -->
    <!--      {{ moduleSettingsContext[tabName].form[item.name].description }} -->
    <!--    </p> -->

    <!--    <pre v-text="item" /> -->

    <!-- {{ moduleSettingsContext[tabName].form[item.name] }} -->
  </div>
</template>

<script lang="ts">
import {PropType, computed, defineComponent} from 'vue';
import {ContextKey} from '../../types';
import {ModuleSettingsFormItem} from '@myparcel-pdk/frontend-shared';
import {useGlobalContext} from '../../composables';

export default defineComponent({
  name: 'SettingsFormItem',
  components: {},
  props: {
    item: {
      type: Object as PropType<ModuleSettingsFormItem>,
      required: true,
    },
  },

  emits: ['action', 'change'],

  setup: (props) => {
    const getComponent = (type: string) => {
      switch (type) {
        case 'accordion':
          return 'PdkAccordion';
        case 'checkbox':
          return 'PdkCheckbox';
        case 'multi':
          return 'PdkMultiCheckbox';
        case 'select':
          return 'PdkSelect';
        case 'submit':
          return 'PdkButton';
        case 'switch':
          return 'PdkSwitch';
        case 'text':
          return 'PdkInput';
      }

      return 'div';
    };

    const config = computed(() => {
      return {
        component: getComponent(props.item.type),
        hasValue: Boolean(props.item.name),
      };
    });

    const moduleSettingsValues = useGlobalContext(ContextKey.MODULE_SETTINGS_VALUES);

    return {
      config,
      moduleSettingsValues,
      typesWithChildren: ['accordion'],
    };
  },
});
</script>
