<template>
  {{ form }}
  <!--  <div> -->
  <!--    <ul -->
  <!--      class="nav nav-tabs" -->
  <!--      role="tablist"> -->
  <!--      <li -->
  <!--        v-for="(tab, index) in moduleSettingsFormContext" -->
  <!--        :key="[tab.name, index, 'tab'].join('_')" -->
  <!--        :class="{ -->
  <!--          active: activeTab === tab.name, -->
  <!--        }" -->
  <!--        class="nav-item"> -->
  <!--        <a -->
  <!--          :href="`#${tab.name}`" -->
  <!--          class="active nav-link" -->
  <!--          @click="() => changeTab(tab.name)" -->
  <!--          v-text="tab.label" /> -->
  <!--      </li> -->
  <!--    </ul> -->

  <!--    <PdkCard -->
  <!--      v-for="(tab, index) in moduleSettingsFormContext" -->
  <!--      v-show="activeTab === tab.name" -->
  <!--      :key="[tab.name, index].join('_')"> -->
  <!--      <SettingsFormItem -->
  <!--        v-for="child in tab.children" -->
  <!--        :key="[tab.name, child.name, child.action, child.label, child.type, index].join('_')" -->
  <!--        :item="child" -->
  <!--        @action="doTheBartman" -->
  <!--        @change="processValue" /> -->

  <!--      <PdkButton -->
  <!--        label="save" -->
  <!--        @click="save" /> -->
  <!--    </PdkCard> -->
  <!--  </div> -->
</template>

<script setup lang="ts">
/**
 * Module settings.
 */
import {createLabelSettingsForm} from '../forms';

const form = createLabelSettingsForm();
</script>
