import './assets/css/tailwind.css';
import {defaultComponents} from '@myparcel/pdk-frontend-components';

void (async () => {
  const {boot} = await import('./boot');

  boot({
    components: defaultComponents,
  });
})();
