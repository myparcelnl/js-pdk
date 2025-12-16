import path from 'node:path';

const dirname = new URL('.', import.meta.url).pathname;

export const MOCK_ROOT_DIR = path.resolve(dirname, '../..', '.test');

export const DEFAULT_FILE_SYSTEM: Readonly<Record<string, unknown>> = Object.freeze({
  config: {
    'pdk.php': '<?php return [];',
  },
  src: {
    Pdk: {
      'MyParcelNLController.php': '<?php echo "Hello from MyParcelNL";',
    },
    'index.php': '<?php echo "Version: 1.0.0";',
  },
  'composer.json': JSON.stringify({
    name: 'myparcelnl/app',
    version: '1.0.0',
  }),
  'package.json': JSON.stringify({
    name: '@myparcel-dev/app',
    version: '1.0.0',
  }),
  'readme.txt': 'Hello world!',
});
