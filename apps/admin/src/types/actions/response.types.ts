import {type PdkEndpointResponse} from '@myparcel-pdk/common';
import {type BackendEndpointDefinition} from '../sdk.types';
import {type BackendEndpoint} from '../../data';
import {type AdminAction, type AdminActionEndpointMap, type MaybeAdminAction} from './actions.types';

export type BackendEndpointResponse<E extends BackendEndpoint> = PdkEndpointResponse<E, BackendEndpointDefinition>;

export type ActionResponse<A extends MaybeAdminAction> = A extends AdminAction
  ? BackendEndpointResponse<AdminActionEndpointMap[A]>
  : void;

export type MaybeActionResponse<A extends MaybeAdminAction> = ActionResponse<A> | void;