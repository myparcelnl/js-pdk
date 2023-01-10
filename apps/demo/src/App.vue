<template>
  <div class="flex flex-col min-h-full">
    <header class="bg-emerald-900 flex-grow p-5">
      <h1 class="font-bold text-xl">MyParcel</h1>

      <ul>
        <li>
          <RouterLink
            v-for="item in routes"
            :key="item"
            :to="item.path"
            :class="{
              'text-emerald-100': $route.path === item.path,
            }">
            {{ item.name }}
          </RouterLink>
        </li>
      </ul>
    </header>

    <div class="flex">
      <aside class="bg-gray-50 p-5">sidebar</aside>

      <div class="flex flex-col flex-grow">
        <div class="">
          <div id="mypa-notifications"></div>
        </div>

        <main class="flex p-5">
          <div class="max-w-screen-2xl mx-auto w-full">
            <RouterView />
          </div>
        </main>
      </div>
    </div>
    <div id="mypa-modals"></div>
  </div>
</template>

<script lang="ts">
import {RouterLink, RouterView, useRouter} from 'vue-router';
import {defineComponent} from 'vue';
import {useGlobalPdkFrontend} from '@myparcel-pdk/frontend-core';

export default defineComponent({
  name: 'DemoApp',
  components: {RouterView, RouterLink},
  setup: () => {
    const fe = useGlobalPdkFrontend();

    void fe.render('Notifications', '#mypa-notifications');

    return {
      routes: useRouter()
        .getRoutes()
        .filter((route) => {
          return !route.meta?.hidden && route.aliasOf === undefined;
        }),
    };
  },
});
</script>
