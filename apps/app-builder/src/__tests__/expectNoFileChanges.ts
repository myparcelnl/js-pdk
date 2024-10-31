import {expect} from 'vitest';
import {fsModifyingMethods} from './spies/fs';

export const expectNoFileChanges = (): void => {
  fsModifyingMethods.forEach((spy) => {
    expect(spy).not.toHaveBeenCalled();
  });
};
