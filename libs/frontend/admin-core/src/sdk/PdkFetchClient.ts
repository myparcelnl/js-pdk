import {isOfType} from '@myparcel/ts-utils';
import {
  type AbstractEndpoint,
  ApiException,
  type EndpointResponse,
  type EndpointResponseBody,
  type EndpointResponseProperty,
  type ErrorResponse,
  FetchClient,
  type Options,
  type ResponseWrapper,
} from '@myparcel/sdk';
import {useNotificationStore} from '../stores';

type EndpointResponseBodyWithNotifications = {
  notifications: Notification[];
};

type PdkEndpointResponseBody<E extends AbstractEndpoint> = EndpointResponseBody<E> &
  EndpointResponseBodyWithNotifications;

export class PdkFetchClient extends FetchClient {
  /**
   * Prepare and execute the final request and handle the response.
   */
  public async doRequest<E extends AbstractEndpoint>(endpoint: E, options: Options<E>): Promise<EndpointResponse<E>> {
    const newOptions = this.normalizeOptions(endpoint, {...options, ...this.options});
    this.validateHeaders(endpoint, newOptions);

    const response = (await this.request(endpoint, newOptions)) as ResponseWrapper<PdkEndpointResponseBody<E>>;

    if (isOfType<ErrorResponse>(response, 'errors')) {
      throw new ApiException(response);
    }

    if (isOfType<ResponseWrapper>(response, 'data')) {
      const property = endpoint.getResponseProperty() as EndpointResponseProperty<E>;

      if (isOfType<EndpointResponseBodyWithNotifications>(response.data, 'notifications')) {
        const notificationStore = useNotificationStore();

        response.data.notifications.forEach((notification) => {
          notificationStore.add(notification);
        });
      }

      return response.data[property];
    }

    return response;
  }
}
