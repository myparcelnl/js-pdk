import {type PdkBuilderConfig} from './types/config';

export const defineConfig = <C extends PdkBuilderConfig | (() => PdkBuilderConfig)>(config: C): C => config;
