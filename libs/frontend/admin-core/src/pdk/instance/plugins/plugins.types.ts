import {AdminAppConfig} from '../../../data';
import {Plugin} from 'vue';

export type PdkAppPlugin = (appConfig: AdminAppConfig) => Plugin;
