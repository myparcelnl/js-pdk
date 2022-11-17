<template>
  <div>
    <ul class="nav nav-tabs" role="tablist">
      <li
        v-for="(tab, index) in moduleSettingsFormContext"
        :key="[tab.name, index, 'tab'].join('_')"
        :class="{
          active: activeTab === tab.name,
        }"
        class="nav-item"
      >
        <a :href="`#${tab.name}`" class="active nav-link" @click="() => changeTab(tab.name)" v-text="tab.label" />
      </li>
    </ul>

    <PdkCard
      v-for="(tab, index) in moduleSettingsFormContext"
      v-show="activeTab === tab.name"
      :key="[tab.name, index].join('_')"
    >
      <SettingsFormItem
        v-for="child in tab.children"
        :key="[tab.name, child.name, child.action, child.label, child.type, index].join('_')"
        :item="child"
        @action="doTheBartman"
        @change="processValue"
      />

      <PdkButton label="save" @click="save" />
    </PdkCard>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SettingsFormItem from "./SettingsFormItem.vue";

export default defineComponent({
  name: "ModuleSettings",
  components: { SettingsFormItem },

  setup: () => {
    // const moduleSettingsFormContext = useGlobalContext(ContextKey.MODULE_SETTINGS_FORM);

    const values = ref<Record<string, unknown>>({});

    // const activeTab = ref<string>(moduleSettingsFormContext.value?.[0]?.name);

    // watch(activeTab, (tab) => {
    //   const {clear} = useEventBusAlerts();
    //
    //   clear();
    // });

    // const save = async () => {
    //   await useModuleSettingsEventBus().save(values.value);
    // };

    return {
      // save,
      // moduleSettingsFormContext,

      processValue(changed: { name: string; value: unknown }) {
        values.value[changed.name] = changed.value;
      },

      doTheBartman: async (event: { action: [string, string] }) => {
        // TODO
        // if (event.action[0] === 'showModal') {
        //   const carrierSettings = moduleSettingsFormContext.value.find((item) => item.name === 'carrier-settings');
        //
        //   console.log($('#' + event.action[1]));
        //   $('#' + event.action[1]).modal('show');
        //   return;
        // }
        // await useButtonActionsEventBus().execute(event.action);
      },

      changeTab(tab: string): void {
        // activeTab.value = tab;
      },

      // activeTab,
    };
  },
});
</script>
