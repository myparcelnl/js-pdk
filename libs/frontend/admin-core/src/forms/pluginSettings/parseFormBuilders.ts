import {type FormBuilder, type HandlerDefinition, parseBuilders} from '@myparcel-pdk/frontend-form-builder';
import {type AnyElementConfiguration} from '@myparcel/vue-form-builder';
import {useActionStore} from '../../stores';

export const parseFormBuilders = (
  $builders: FormBuilder[] | undefined,
  prefix: string,
): Partial<AnyElementConfiguration> => {
  const customHandlers: HandlerDefinition[] = [
    {
      name: '$fetchContext',
      callback: ({$id}) => {
        console.log('fetchContext', $id);

        void useActionStore().dispatch('fetchContext', {id: $id});
      },
    },
  ];

  return parseBuilders($builders ?? [], prefix, customHandlers);
};
