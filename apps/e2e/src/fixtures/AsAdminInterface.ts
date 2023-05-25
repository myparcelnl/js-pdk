import {OrderIdentifier, ProductIdentifier} from '../types.ts';
import {AsLoggedInUserInterface} from './AsLoggedInUserInterface.ts';
import {PromiseOr} from '@myparcel/ts-utils';

export interface AsAdminInterface extends AsLoggedInUserInterface {
  createOrder(): PromiseOr<OrderIdentifier>;

  createProduct(): PromiseOr<this>;

  downloadLabel(): PromiseOr<this>;

  executeBulkEdit(): PromiseOr<this>;

  executeBulkExport(): PromiseOr<this>;

  executeBulkExportPrint(): PromiseOr<this>;

  executeBulkPrint(): PromiseOr<this>;

  expectChosenDeliveryOptionsToBe(): PromiseOr<this>;

  expectProductSettingsToBePersisted(productIdentifier?: ProductIdentifier): PromiseOr<this>;

  expectToBeOnMyParcelSettingsPage(): PromiseOr<this>;

  expectToSeeChosenDeliveryOptions(orderIdentifier?: OrderIdentifier): PromiseOr<this>;

  expectToSeeFreshOrder(orderIdentifier?: OrderIdentifier): PromiseOr<this>;

  fillProductSettings(): PromiseOr<this>;

  goToDashboard(): PromiseOr<this>;

  goToLastOrder(): PromiseOr<this>;

  goToMyParcelSettings(): PromiseOr<this>;

  goToNewOrderPage(): PromiseOr<this>;

  goToNewProductPage(): PromiseOr<this>;

  goToOrder(orderIdentifier: OrderIdentifier): PromiseOr<this>;

  goToOrders(): PromiseOr<this>;

  goToPlugins(): PromiseOr<this>;

  goToProducts(): PromiseOr<this>;

  goToWooCommerceSettings(): PromiseOr<this>;

  navigateToMyParcelSettings(isMobile: boolean): PromiseOr<this>;

  navigateToSettingsTab(tab: string): PromiseOr<this>;

  saveProduct(): PromiseOr<ProductIdentifier>;

  selectMultipleOrders(amount?: number): PromiseOr<this>;
}
