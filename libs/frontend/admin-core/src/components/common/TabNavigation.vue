<template>
  <component
    :is="buttonWrapper"
    v-if="tabs.length > 1">
    <component
      :is="button"
      v-for="tab in tabs"
      :key="`tab_button_${tab.name}`"
      :active="tab.name === activeTab"
      @click="() => handleClick(tab)">
      <PdkIcon
        v-if="tab.icon"
        :icon="tab.icon" />
      {{ translate(tab.label) }}
      <span
        v-if="tab.labelSuffix"
        v-text="` ${translate(tab.labelSuffix)}`"></span>
    </component>
    <slot name="button-wrapper" />
  </component>

  <PdkTabNavContentWrapper v-if="activeTabContents">
    <Transition
      :name="config.transitions?.tabNavigation"
      mode="out-in">
      <KeepAlive>
        <component
          :is="activeTabContents.component"
          :key="activeTabContents.name"
          v-test="`TabNavContent-${activeTabContents.name}`" />
      </KeepAlive>
    </Transition>
  </PdkTabNavContentWrapper>
</template>

<script lang="ts" setup>
import {computed, ref, type PropType, watch} from 'vue';
import {type TabDefinition, AdminComponent, type PrefixedAdminComponent} from '@myparcel-pdk/common';
import {type ComponentOrHtmlElement} from '@myparcel/vue-form-builder';
import {prefixComponent} from '../../helpers';
import {HASH_SEPARATOR} from '../../data';
import {useAdminConfig, useLanguage} from '../../composables';

const props = defineProps({
  button: {
    type: [String, Object] as PropType<ComponentOrHtmlElement | PrefixedAdminComponent>,
    default: () => prefixComponent(AdminComponent.TabNavButton),
  },

  buttonWrapper: {
    type: [String, Object] as PropType<ComponentOrHtmlElement | PrefixedAdminComponent>,
    default: () => prefixComponent(AdminComponent.TabNavButtonWrapper),
  },

  closeable: {
    type: Boolean,
  },

  hashPrefix: {
    type: String,
    default: '',
  },

  initialTab: {
    type: [String, Boolean],
    default: null,
  },

  tabs: {
    type: Array as PropType<TabDefinition[]>,
    required: true,
  },
});

const activeTab = ref<string | null>(null);

const handleClick = (tab: TabDefinition) => {
  if (props.initialTab !== false) {
    window.location.hash = props.hashPrefix + tab.name;
  }

  if (props.closeable && activeTab.value === tab.name) {
    activeTab.value = null;
    return;
  }

  activeTab.value = tab.name;
};

const activeTabContents = computed(() => {
  return (props.tabs as unknown as TabDefinition[])?.find((tab) => tab.name === activeTab.value);
});

const config = useAdminConfig();
const {translate} = useLanguage();

watch(
  () => [props.tabs, props.initialTab],
  () => {
    if (!props.tabs?.length) {
      activeTab.value = null;
      return;
    }

    if (activeTab.value || props.initialTab === false) {
      return;
    }

    let initialTab = props.initialTab === true ? null : props.initialTab;

    if (!props.initialTab) {
      const hash = window.location.hash.replace('#', '').replace(props.hashPrefix ?? '', '');
      const tabName = hash.split(HASH_SEPARATOR)[0];

      const isValidHash = props.tabs?.some((tab) => tab.name === tabName);

      if (isValidHash) {
        initialTab = tabName;
      }
    }

    activeTab.value = initialTab ?? props.tabs?.[0]?.name;
  },
  {immediate: true, deep: true},
);
</script>
