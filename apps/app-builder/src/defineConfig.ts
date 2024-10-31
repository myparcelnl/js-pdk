import {type PdkBuilderConfig} from './types/config.types';

export const defineConfig = <C extends PdkBuilderConfig | (() => PdkBuilderConfig)>(config: C): C => config;
