import {PdkBuilderConfig} from '../types';

export const mergeDefaultConfig = (config: PdkBuilderConfig): Required<PdkBuilderConfig> => ({
  distFolder: 'dist',
  debug: false,
  zipFileName: ':platform-:name-:version',
  ...config,
});
