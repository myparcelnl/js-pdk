import {type PromiseOr} from '@myparcel/ts-utils';
import {type AsGuestInterface} from './AsGuestInterface.ts';

export interface AsLoggedInUserInterface extends AsGuestInterface {
  goToAccount(): PromiseOr<this>;

  logout(): PromiseOr<this>;
}
