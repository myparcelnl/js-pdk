# pdk-frontend

This is the frontend for the PDK.

This package requires `@tanstack/vue-query`

```ts
import {VueQueryPlugin} from '@tanstack/vue-query';

const app = createApp(App);

app.use(VueQueryPlugin);

app.mount('#app');
```
