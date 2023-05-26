import {FetchClient, GetCarrier, GetCarriers, type MyParcelSdk, createMyParcelSdk} from '@myparcel/sdk';

let sdk: ReturnType<typeof useMyParcelApi>;

/**
 * @returns {MyParcelSdk<GetCarrier | GetCarriers>}
 */
export const useMyParcelApi = (): MyParcelSdk<GetCarrier | GetCarriers> => {
  if (sdk) {
    return sdk;
  }

  const client = new FetchClient();

  sdk = createMyParcelSdk(client, [new GetCarriers(), new GetCarrier()]);

  return sdk;
};
