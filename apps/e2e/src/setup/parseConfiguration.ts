import {CREDENTIALS_FILE_ADMIN, CREDENTIALS_FILE_USER} from '../constants.ts';
import {type Config, type ResolvedConfig} from './types.ts';

export const parseConfiguration = (config: Config): ResolvedConfig => ({
  credentialsFileAdmin: CREDENTIALS_FILE_ADMIN,
  credentialsFileUser: CREDENTIALS_FILE_USER,
  ...config,
});
