import {describe, expect, it, vi} from 'vitest';
import {FIELD_HEIGHT, FIELD_LENGTH, FIELD_WIDTH} from '../field';
import {createDimensionFields} from './createDimensionFields';

// Full mock (no importOriginal) to avoid the Vue file import chain
// that triggers "Install @vitejs/plugin-vue" errors.
vi.mock('../../helpers', () => ({
  resolveFormComponent: () => 'MockNumberInput',
  defineFormField: (config: Record<string, unknown>) => config,
}));

describe('createDimensionFields', () => {
  it('creates a field per dimension, in centimeters', () => {
    const fields = createDimensionFields({});

    expect(fields.map((field) => field.name)).toEqual([FIELD_LENGTH, FIELD_WIDTH, FIELD_HEIGHT]);
    expect(fields.map((field) => field.label)).toEqual(['length_in_cm', 'width_in_cm', 'height_in_cm']);
  });

  /**
   * Only `attributes` is bound to the rendered input; `props` is merely readable from `element.props`
   * by components that opt in, and no number input does. A `min` on `props` would silently do nothing,
   * so assert the channel and not just the value.
   */
  it('puts min on attributes so it reaches the input', () => {
    const fields = createDimensionFields({});

    fields.forEach((field) => {
      expect(field.attributes).toEqual({min: 0});
      expect(field.props?.min).toBeUndefined();
    });
  });

  it('leaves untouched fields undefined rather than defaulting them to 0', () => {
    const fields = createDimensionFields({});

    expect(fields.map((field) => field.ref?.value)).toEqual([undefined, undefined, undefined]);
  });

  it('seeds each field from the order refs when a value was stored', () => {
    const fields = createDimensionFields({
      [FIELD_LENGTH]: 40,
      [FIELD_WIDTH]: 20,
      [FIELD_HEIGHT]: 30,
    });

    expect(fields.map((field) => field.ref?.value)).toEqual([40, 20, 30]);
  });
});
