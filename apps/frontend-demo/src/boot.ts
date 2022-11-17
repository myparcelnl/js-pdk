import {INJECT_GLOBAL_PDK_FRONTEND, InputPdkConfiguration, createPdkFrontend} from '@myparcel/pdk-frontend';
import App from './App.vue';
import {VueQueryPlugin} from '@tanstack/vue-query';
import {context} from './context';
import {createApp} from 'vue';

export const boot = (initialConfig: InputPdkConfiguration): void => {
  const div = document.createElement('div');

  div.setAttribute('id', 'myparcel-core-bootstrap');
  div.setAttribute('data-pdk-context', JSON.stringify(context));

  document.body.appendChild(div);

  const app = createApp(App);

  app.use(VueQueryPlugin);

  const pdkFrontend = createPdkFrontend(initialConfig);

  app.provide(INJECT_GLOBAL_PDK_FRONTEND, pdkFrontend);

  app.mount('#app');
};
