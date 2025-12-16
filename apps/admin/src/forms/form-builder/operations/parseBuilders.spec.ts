import {afterEach, describe, expect, it} from 'vitest';
import {type AnyElementConfiguration, useFormBuilder} from '@myparcel-dev/vue-form-builder';
import {type FormBuilder} from '../types';
import {parseBuilders} from './parseBuilders';

interface TestInput {
  name: string;
  input: FormBuilder[];
  result: Partial<AnyElementConfiguration>;
}

const datasets: TestInput[] = [
  {
    name: '$afterUpdate',
    input: [{$afterUpdate: [{}]}],
    result: {
      afterUpdate: expect.any(Function),
    },
  },
  {
    name: '$visibleWhen',
    input: [{$visibleWhen: {}}],
    result: {
      visibleWhen: expect.any(Function),
    },
  },
  {
    name: '$disabledWhen',
    input: [{$disabledWhen: {}}],
    result: {
      disabledWhen: expect.any(Function),
    },
  },
  {
    name: '$readOnlyWhen',
    input: [{$readOnlyWhen: {}}],
    result: {
      readOnlyWhen: expect.any(Function),
    },
  },
  {
    name: 'multiple',
    input: [
      {
        $visibleWhen: {},
        $afterUpdate: [{}],
        $disabledWhen: {},
        $readOnlyWhen: {},
      },
    ],
    result: {
      afterUpdate: expect.any(Function),
      disabledWhen: expect.any(Function),
      readOnlyWhen: expect.any(Function),
      visibleWhen: expect.any(Function),
    },
  },
];

describe('parseBuilders', () => {
  afterEach(() => {
    useFormBuilder().forms.value = {};
  });

  it.each(datasets)('parses builder $name', ({input, result}) => {
    const parsed = parseBuilders(input, '');

    expect(parsed).toEqual(result);
  });
});
