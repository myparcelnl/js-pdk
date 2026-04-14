import {type OrderMode, resolveOrderMode, SubscriptionFeature} from '../../data';
import {useContext} from './useContext';

export const useOrderMode = (): OrderMode => {
  const context = useContext();
  const subscriptionFeatures = context.account?.subscriptionFeatures ?? [];

  const orderV1 = subscriptionFeatures.includes(SubscriptionFeature.LegacyOrderManagement);
  const orderV2 = subscriptionFeatures.includes(SubscriptionFeature.OrderManagement);

  return resolveOrderMode(orderV1, orderV2);
};
