import {Plugin} from 'vue';
import {AdminAppConfig} from '../../../data';

export type PdkAppPlugin = (appConfig: AdminAppConfig) => Plugin;
