import {defineConfig, PdkPlatformName} from '@myparcel-pdk/app-builder';

export default defineConfig({
  name: 'backend-demo',

  platforms: [PdkPlatformName.MyParcelNl],

  translations: {
    outDir: 'data/translations',
  },
});
