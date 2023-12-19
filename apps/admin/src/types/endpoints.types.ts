import {type BackendEndpoint, type EndpointObject} from '@myparcel-pdk/common';
import {
  type BACKEND_ENDPOINTS_ORDERS,
  type BACKEND_ENDPOINTS_SHIPMENTS,
  type BACKEND_ENDPOINTS_WEBHOOKS,
} from '../data';

export type BackendPdkEndpointObject = EndpointObject<BackendEndpoint>;

export type BackendShipmentEndpoint = (typeof BACKEND_ENDPOINTS_SHIPMENTS)[number];

export type BackendOrderEndpoint = (typeof BACKEND_ENDPOINTS_ORDERS)[number];

export type BackendWebhookEndpoint = (typeof BACKEND_ENDPOINTS_WEBHOOKS)[number];
