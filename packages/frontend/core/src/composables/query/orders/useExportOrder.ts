import {ApiException} from '@myparcel/sdk';
import {MyParcelPdk} from '@myparcel/pdk-frontend-shared';
import {useMutation} from 'vue-query';
import {useSdk} from '../../sdk/useSdk';

type Input = {
  print?: boolean;
  orderData: Partial<MyParcelPdk.OrderDataContext>;
};

export const useExportOrder = () => {
  const sdk = useSdk();

  // const mutationKey = ['order', id.value];

  return useMutation<Input, ApiException, Input>(
    async (input) => {
      const options = {
        parameters: {
          orderIds: input.orderData.externalIdentifier,
          print: String(Number(input?.print ?? false)),
        },
        body: input.orderData,
      };

      console.log(sdk);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return sdk.exportOrder(options);
    },
    {
      onSuccess(response, input, c) {
        console.log({response, input, c});
      },
    },
  );
};
