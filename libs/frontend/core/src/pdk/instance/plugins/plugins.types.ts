import {PdkFrontendAppConfig} from '../../PdkFrontend';
import {Plugin} from 'vue';

export type PdkAppPlugin = (appConfig: PdkFrontendAppConfig) => Plugin;
