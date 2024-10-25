import {type Plugin} from 'vue';
import {type AdminAppConfig} from '../../../types/admin.types';

export type PdkAppPlugin = (appConfig: AdminAppConfig) => Plugin;
