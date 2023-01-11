import {ComponentOrHtmlElement, InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {UnwrapNestedRefs} from 'vue';

export type ElementInstance = UnwrapNestedRefs<InteractiveElementInstance<ComponentOrHtmlElement, string>>;
