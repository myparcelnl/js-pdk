import {defineNitroConfig} from 'nitropack';

process.env.NITRO_ROOT = __dirname;

export default defineNitroConfig({
  preset: 'netlify',

  storage: {
    db: {
      driver: 'fs',
      base: './data/db',
    },
  },

  routeRules: {
    '/*': {
      cors: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  },
});
