export const resolveCarrier = (carrierNameOrIdentifier: string): string | undefined => {
  return carrierNameOrIdentifier.split(':')[0];
};
