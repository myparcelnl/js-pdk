import {describe, expect, it} from 'vitest';
import {sendDeactivationFeedback} from './sendDeactivationFeedback';

describe('sendDeactivationFeedback', () => {
  it('resolves without sending anything until the PDK endpoint exists', async () => {
    await expect(sendDeactivationFeedback({reason: 'other', details: ''})).resolves.toBeUndefined();
  });
});
