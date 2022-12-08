import {describe, expect, it} from 'vitest';
import {FrontendAction} from '../data';
import {PdkButtonAction} from '../types';
import {useAction} from './useAction';

describe('usePropAction', () => {
  const inputs: {input: Partial<PdkButtonAction> & {action: PdkButtonAction}; output: PdkButtonAction}[] = [
    {
      input: {action: {label: 'test', id: 'test', onClick: () => {}}},
      output: {label: 'test', id: 'test', onClick: () => {}},
    },
    {
      input: {action: FrontendAction.SHIPMENT_DELETE},
      output: {label: 'test', id: 'test', onClick: () => {}},
    },
  ];
  it.each(inputs)('resolves action', ({input, output}) => {
    const action = useAction(input);

    expect(action.value).toEqual(output);
  });
});
