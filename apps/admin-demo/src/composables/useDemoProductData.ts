import {type Plugin} from '@myparcel-pdk/admin';
import {PackageTypeName} from '@myparcel/constants';

export const useDemoProductData = (): Plugin.ModelPdkProduct[] => {
  return [
    {
      name: 'Product 1',
      sku: '123456',
      externalIdentifier: '1',
      weight: 100,
      settings: {
        allowOnlyRecipient: -1,
        allowSignature: -1,
        countryOfOrigin: 'NL',
        customsCode: '0',
        disableDeliveryOptions: -1,
        dropOffDelay: -1,
        exportAgeCheck: -1,
        exportInsurance: -1,
        exportLargeFormat: -1,
        fitInMailbox: -1,
        packageType: PackageTypeName.Package,
        returnShipments: -1,
      },
    },
  ];
};
