import {App} from 'vue';

export const registerComponents = (app: App<Element>, components: string[]) => {
  components.forEach((component) => {
    app.component(component, globalComponents[component] ?? null);
  });
};
