import {ComponentOrHtmlElement, InteractiveElementInstance} from '@myparcel/vue-form-builder/src';
import {UnwrapNestedRefs} from 'vue';

export type ElementInstance = UnwrapNestedRefs<InteractiveElementInstance<ComponentOrHtmlElement, string>>;
