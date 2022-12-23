import './assets/css/tailwind.css';
import * as defaultComponents from '@myparcel/pdk-components';
import App from './App.vue';
import {PdkFrontendPlugin} from '@myparcel/pdk-frontend';
import {context} from './context';
import {createApp} from 'vue';

const div = document.createElement('div');

div.setAttribute('id', 'myparcel-pdk-boot');
div.setAttribute('data-pdk-context', JSON.stringify(context));
document.body.appendChild(div);

const app = createApp(App);

app.use(PdkFrontendPlugin, {components: defaultComponents});

app.mount('#app');
