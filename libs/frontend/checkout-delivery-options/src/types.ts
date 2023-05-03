import {MyParcelDeliveryOptions} from '@myparcel/delivery-options';
import {Replace} from '@myparcel/ts-utils';

export enum PdkDeliveryOptionsEvent {
  DeliveryOptionsUpdated = 'deliveryOptionsUpdated',
}

type ToRecord<T> = {
  [K in keyof T]: T[K];
};

// TODO: fix types in @myparcel/delivery-options, currently does not allow street.
type DeliveryOptionsAddress = {
  cc: string;
  postalCode: string;
  street: string;
  city: string;
};

export type DeliveryOptionsConfiguration = Replace<
  ToRecord<MyParcelDeliveryOptions.Configuration>,
  'address',
  DeliveryOptionsAddress
>;
