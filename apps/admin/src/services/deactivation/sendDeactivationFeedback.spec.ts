import {describe, expect, it} from 'vitest';
import {sendDeactivationFeedback} from './sendDeactivationFeedback';

describe('sendDeactivationFeedback', () => {
  it('resolves without sending anything until INT-2271', async () => {
    await expect(sendDeactivationFeedback({reason: 'other', details: ''})).resolves.toBeUndefined();
  });
});
