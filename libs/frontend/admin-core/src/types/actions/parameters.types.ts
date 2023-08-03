import {type BackendEndpoint, type LabelFormat, type LabelOutput, type LabelPosition} from '@myparcel-pdk/common';
import {type FormInstance} from '@myparcel/vue-form-builder';
import {type OneOrMore} from '@myparcel/ts-utils';
import {type AdminContextKey} from '../context.types';
import {type OrderIds, type ShipmentIds} from '../common.types';
import {type AdminAction, type AdminActionEndpointMap, type MaybeAdminAction} from './actions.types';

type LabelParameters = {
  output?: LabelOutput;
  format?: LabelFormat;
  position?: OneOrMore<LabelPosition>;
};

type OrderIdParameters = {
  orderIds?: OrderIds;
};

type ShipmentIdParameters = {
  shipmentIds?: ShipmentIds;
};

type FormParameters = {
  form: FormInstance;
};

type OptionalFormParameters = {
  form?: false | FormInstance;
};

type ProductIdParameters = {
  productIds?: OneOrMore<string>;
};

type HooksParameters = {
  hooks: OneOrMore<string>;
};

type ContextParameters = {
  context?: OneOrMore<AdminContextKey>;
};

export interface EndpointMutationInputMap extends Record<BackendEndpoint, Record<string, unknown>> {
  [BackendEndpoint.FetchContext]: ContextParameters;

  [BackendEndpoint.UpdateAccount]: FormParameters;

  [BackendEndpoint.ExportOrders]: OrderIdParameters & OptionalFormParameters;
  [BackendEndpoint.FetchOrders]: OrderIdParameters;
  [BackendEndpoint.PrintOrders]: OrderIdParameters & LabelParameters & OptionalFormParameters;
  [BackendEndpoint.UpdateOrders]: OrderIdParameters & FormParameters;

  [BackendEndpoint.DeleteShipments]: OrderIdParameters & ShipmentIdParameters;
  [BackendEndpoint.ExportReturn]: OrderIdParameters & ShipmentIdParameters;
  [BackendEndpoint.FetchShipments]: OrderIdParameters & ShipmentIdParameters;
  [BackendEndpoint.UpdateShipments]: OrderIdParameters & ShipmentIdParameters;
  [BackendEndpoint.PrintShipments]: OrderIdParameters & ShipmentIdParameters & OptionalFormParameters & LabelParameters;

  [BackendEndpoint.FetchProducts]: ProductIdParameters;

  [BackendEndpoint.UpdatePluginSettings]: FormParameters;
  [BackendEndpoint.UpdateProductSettings]: ProductIdParameters & FormParameters;

  [BackendEndpoint.CreateWebhooks]: HooksParameters;
  [BackendEndpoint.DeleteWebhooks]: HooksParameters;
  [BackendEndpoint.FetchWebhooks]: never;
}

export type ActionInput<E extends BackendEndpoint> = EndpointMutationInputMap[E];

export type ActionParameters<A extends MaybeAdminAction> = A extends AdminAction
  ? ActionInput<AdminActionEndpointMap[A]>
  : Record<string, unknown>;

export type MaybeActionParameters<A extends MaybeAdminAction> = ActionParameters<A> | void;
