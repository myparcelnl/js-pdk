import {AsGuestInterface} from './AsGuestInterface.ts';
import {PromiseOr} from '@myparcel/ts-utils';

export interface AsLoggedInUserInterface extends AsGuestInterface {
  goToAccount(): PromiseOr<this>;

  logout(): PromiseOr<this>;
}
