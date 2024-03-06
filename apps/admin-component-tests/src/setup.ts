import {config} from '@vue/test-utils';
import {wrapperPlugin} from './helpers/wrapperPlugin';

config.plugins.VueWrapper.install(wrapperPlugin);
