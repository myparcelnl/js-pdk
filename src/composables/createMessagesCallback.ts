import {EventCallback, EventName} from '@/data/eventBus/EventBus';
import {Ref} from 'vue';
import {convertMessagesToAlertData} from '@/services/convertMessagesToAlertData';
import {getMessagesFromResponse} from '@/composables/getMessagesFromResponse';
import {scrollToElement} from '@/utils/scrollToElement';

export const createMessagesCallback =
  <EN extends EventName>(
    alerts: Ref<AlertData[]>,
    variant: Variant,
    errorElementSelector: string | undefined,
  ): EventCallback<EN> =>
  (data) => {
    const messages: ResponseMessage[] = getMessagesFromResponse(data);

    alerts.value = convertMessagesToAlertData(messages, variant);

    if (errorElementSelector) {
      scrollToElement(errorElementSelector);
    }
  };
