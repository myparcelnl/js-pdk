const {PdkPlatformName} = require('@myparcel-pdk/app-builder');

/**
 * @type {import('@myparcel-pdk/app-builder').PdkBuilderConfig}
 */
module.exports = {
  name: 'backend-demo',

  platforms: [PdkPlatformName.MyParcelNl],

  translations: {
    outDir: 'data/translations',
  },
};
