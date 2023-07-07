// noinspection JSUnusedGlobalSymbols

import {type PdkBuilderConfig} from './types';

export type {PdkBuilderConfig};

export {PdkPlatformName} from './types';

export const defineConfig = <C extends PdkBuilderConfig | (() => PdkBuilderConfig)>(config: C): C => config;
