import {NamedAction, OnClickAction, PdkButtonAction} from '../types';
import {describe, expect, it} from 'vitest';
import {FrontendAction} from '../actions';
import {useAction} from './useAction';

describe('usePropAction', () => {
  const inputs: {input: Partial<NamedAction | OnClickAction>; output: PdkButtonAction}[] = [
    {
      input: {action: FrontendAction.SHIPMENTS_DELETE},
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
