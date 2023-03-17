import {Replace, isOfType} from '@myparcel/ts-utils';
import {Plugin} from '@myparcel-pdk/common/src';
import {QUERY_KEY_ORDER} from '../../actions';
import {QueryClient} from '@tanstack/vue-query';
import {Shipment} from '@myparcel-pdk/common';
import {setQueryData} from './setQueryData';

type FilteredShipment = {id: number; updated: unknown};

type FilteredOrder = Replace<Plugin.ModelContextOrderDataContext, 'shipments', FilteredShipment[]>;

export const setQueryOrder = (queryClient: QueryClient, order: Plugin.ModelPdkOrder | FilteredOrder): void => {
  let filteredOrder: FilteredOrder;

  if (isOfType<Shipment.ModelShipment>(order.shipments[0], 'orderId')) {
    filteredOrder = {
      ...order,
      shipments: (order as Plugin.ModelPdkOrder).shipments
        .filter((shipment) => !shipment.deleted)
        .map(({id, updated}) => ({id, updated})),
    };
  } else {
    filteredOrder = order;
  }

  setQueryData(queryClient, [QUERY_KEY_ORDER, {id: order.externalIdentifier}], filteredOrder);
};