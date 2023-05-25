<template>
  <div class="flex flex-col flex-grow">
    <header class="bg-emerald-900 p-5">
      <h1 class="m-0">MyParcel</h1>
    </header>

    <div class="flex flex-grow">
      <aside class="bg-gray-900 w-48">
        <ul class="flex flex-col">
          <li
            v-for="item in routes"
            :key="item">
            <RouterLink
              :class="{
                'text-emerald-100 font-bold border-emerald-100 bg-gray-800': item.path === $route.path,
                'border-transparent': item.path !== $route.path,
              }"
              :to="item.path"
              class="flex p-3">
              {{ item.name }}
            </RouterLink>
          </li>
        </ul>
      </aside>

      <main class="flex-grow p-5">
        <div class="max-w-screen-2xl mx-auto w-full">
          <RouterView />
        </div>
      </main>
    </div>

    <footer class="bg-gray-900 px-5 py-2">
      <strong>© MyParcel</strong>
    </footer>

    <div class="absolute bottom-0 max-w-md px-4 right-0">
      <NotificationsView />
    </div>

    <ModalsView />
  </div>
</template>

<script lang="ts" setup>
import {ModalsView, NotificationsView} from '@myparcel-pdk/frontend-admin-core';
import {RouterLink, RouterView, useRouter} from 'vue-router';

const routes = useRouter()
  .getRoutes()
  .filter((route) => !route.meta?.hidden && route.aliasOf === undefined);
</script>
