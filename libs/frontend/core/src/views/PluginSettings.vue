<template>
  <PdkPluginSettingsWrapper>
    <TabNavigation :tabs="tabs" />
  </PdkPluginSettingsWrapper>
</template>

<script setup lang="ts">
/**
 * Plugin settings screen.
 */
import {ChildrenSettingsView, FormSettingsView, createPluginSettingsViews} from '../forms';
import {MagicForm} from '@myparcel/vue-form-builder';
import {PdkTab} from '@myparcel-pdk/common';
import {TabNavigation} from '../components/common';
import {h} from 'vue';
import {isOfType} from '@myparcel/ts-utils';

const views = createPluginSettingsViews();

const renderFormTab = (view: FormSettingsView): PdkTab => {
  return {
    name: view.id,
    label: view.title,
    component: () => h('div', [h('p', view.description), h(MagicForm, {form: view.form})]),
  };
};

const tabs = views.map((view) => {
  if (isOfType<ChildrenSettingsView>(view, 'children')) {
    const childTabs: PdkTab[] = view.children.map(renderFormTab);

    return {
      name: view.id,
      label: view.title,
      component: () => h(TabNavigation, {tabs: childTabs, hashPrefix: view.id + '-'}),
    };
  }

  return renderFormTab(view);
});
</script>
