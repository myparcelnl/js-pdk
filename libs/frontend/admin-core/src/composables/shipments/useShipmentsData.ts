import {UseShipmentData, useShipmentData} from './useShipmentData';

export const useShipmentsData = (ids: number[]): UseShipmentData[] => {
  return ids.map((shipment) => useShipmentData(shipment));
};
