import {ComputedRef, Ref, ref} from 'vue';
import {Plugin} from '@myparcel-pdk/common';
import {Replace} from '@myparcel/ts-utils';

type ReplacedOrder<O extends Plugin.ModelPdkOrder> = Replace<O, 'shipments', ComputedRef<O['shipments']>>;

export function useOrderData<O extends Plugin.ModelPdkOrder>(
  order: O,
): ReplacedOrder<O> & {
  deletedShipments: Ref<number[]>;
} {
  /**
   * Ref for optimistic deletion of shipments.
   */
  const deletedShipments = ref<number[]>([]);

  return {
    ...order,
    deletedShipments,
    // shipments: computed(() => {
    //   console.log(order.shipments);
    //
    //   return (
    //     order.shipments?.filter((shipment) => {
    //       return !shipment.deleted && shipment.id && !deletedShipments.value.includes(shipment.id);
    //     }) ?? []
    //   );
    // }),
  };
}
