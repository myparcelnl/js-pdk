import {PdkAppConfig} from '../../../data';
import {Plugin} from 'vue';

export type PdkAppPlugin = (appConfig: PdkAppConfig) => Plugin;
