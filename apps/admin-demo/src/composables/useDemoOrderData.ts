/* eslint-disable @typescript-eslint/no-magic-numbers */
import {mergeWith} from 'lodash-unified';
import {type Plugin, type Base} from '@myparcel-pdk/common';
import {type RecursivePartial} from '@myparcel/ts-utils';
import {PackageTypeName} from '@myparcel/constants';

const baseAddress = Object.freeze({
  cc: 'US',
  city: 'Miami',
  address1: '16, Main street 2nd floor',
  postalCode: '33133',
  region: 'Florida',
  email: 'admin@prestashop.dev.myparcel.nl',
  phone: '0102030405',
  person: 'John DOE',
  company: 'My Company',
});

const createShippingAddress = (data?: RecursivePartial<Base.ModelContactDetails>): Base.ModelContactDetails => {
  return mergeWith({}, baseAddress, data) as Base.ModelContactDetails;
};

const baseOrder = Object.freeze({
  externalIdentifier: '3',
  customsDeclaration: {
    contents: 1,
    items: [],
    weight: 0,
  },
  deliveryOptions: {
    labelAmount: 1,
    packageType: PackageTypeName.Package,
    shipmentOptions: {},
  },
  shippingAddress: createShippingAddress(),
  exported: false,
  orderPrice: 0,
  orderVat: 0,
  orderPriceAfterVat: 0,
  shipmentPrice: 0,
  shipmentVat: 0,
  shipmentPriceAfterVat: 0,
  totalPrice: 0,
  totalVat: 0,
  totalPriceAfterVat: 0,
  shipments: [
    {
      orderId: '3',
      price: {
        amount: 0,
        currency: 'EUR',
      },
      hidden: false,
      delayed: false,
      delivered: false,
      deliveryOptions: {
        labelAmount: 1,
        packageType: PackageTypeName.Package,
        shipmentOptions: {},
      },
      id: 4,
      isReturn: false,
      multiCollo: false,
      partnerTrackTraces: [],
      physicalProperties: {
        weight: 0,
      },
      referenceIdentifier: '4',
      shippingAddress: createShippingAddress(),
      updated: {
        date: '2021-06-24 14:00:00.000000',
        timezone: 'Europe/Amsterdam',
        timezone_type: 3,
      },
    },
  ],
}) satisfies Plugin.ModelContextOrderDataContext;

const createOrderData = (
  data?: RecursivePartial<Plugin.ModelContextOrderDataContext>,
): Plugin.ModelContextOrderDataContext => {
  return mergeWith({}, baseOrder, data, (objValue, srcValue) => {
    return Array.isArray(objValue) ? srcValue : undefined;
  }) as Plugin.ModelContextOrderDataContext;
};

// eslint-disable-next-line max-lines-per-function
export const useDemoOrderData = (): Plugin.ModelContextOrderDataContext[] => [createOrderData(), createOrderData()];
