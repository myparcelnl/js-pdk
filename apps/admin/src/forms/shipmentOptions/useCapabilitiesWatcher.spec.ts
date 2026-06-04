import {describe, expect, it} from 'vitest';
import {ref} from 'vue';
import {useCapabilitiesWatcher, type FormInput, type OrderInput} from './useCapabilitiesWatcher';

describe('useCapabilitiesWatcher', () => {
  it('merges order and form refs into the initial selection', () => {
    const orderRef = ref<OrderInput>({cc: 'NL', weight: 2000});
    const formRef = ref<FormInput>({carrier: 'POSTNL', packageType: 'PACKAGE'});

    const selection = useCapabilitiesWatcher(orderRef, formRef);

    expect(selection.value).toMatchObject({cc: 'NL', weight: 2000, carrier: 'POSTNL', packageType: 'PACKAGE'});
  });
});
