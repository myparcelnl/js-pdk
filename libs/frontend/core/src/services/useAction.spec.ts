import {afterAll, beforeAll, describe, expect, it, vi} from 'vitest';
import {FrontendAction} from '../actions';
import {PdkAppInstance} from '../data';
import {PdkButtonAction} from '../types';
import {createLogger} from './logger';
import {createPdkConfig} from '../pdk';
import {useAction} from './useAction';

describe('usePropAction', () => {
  beforeAll(() => {
    vi.mock('../usePdkInstance', () => ({
      usePdkInstance: (): PdkAppInstance => ({
        appName: 'test',
        context: {},
        config: createPdkConfig(),
        logger: createLogger('test'),
      }),
    }));
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

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
