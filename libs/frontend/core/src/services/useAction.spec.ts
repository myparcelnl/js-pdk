import {describe, expect, it} from 'vitest';
import {FrontendAction} from '../actions';
import {PdkButtonAction} from '../types';
import {useAction} from './useAction';

describe('usePropAction', () => {
  const inputs: {input: Partial<PdkButtonAction> & {action: PdkButtonAction}; output: PdkButtonAction}[] = [
    {
      input: {action: {label: 'test', id: 'test', onClick: () => undefined}},
      output: {label: 'test', id: 'test', onClick: () => undefined},
    },
    {
      input: {action: FrontendAction.SHIPMENTS_DELETE},
      output: {label: 'test', id: 'test', onClick: () => undefined},
    },
  ];

  it.each(inputs)('resolves action', ({input, output}) => {
    const action = useAction(input);

    expect(action.value).toEqual(output);
  });
});
