import {type Plugin} from 'vue';
import {type AdminAppConfig} from '../../../data';

export type PdkAppPlugin = (appConfig: AdminAppConfig) => Plugin;
