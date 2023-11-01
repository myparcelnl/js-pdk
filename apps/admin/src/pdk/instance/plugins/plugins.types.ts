import {type Plugin} from 'vue';
import {type AdminAppConfig} from '../../../types';

export type PdkAppPlugin = (appConfig: AdminAppConfig) => Plugin;
