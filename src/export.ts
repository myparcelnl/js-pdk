import {render} from '@/services/render';

interface Configuration {
  components: Record<string, string>;
}

export const setup = (configuration: Configuration) => {};

export const renderAfterHeader = render('components/after-header');
export const renderLoadingPage = render('components/loading-page');
export const renderOrderCard = render('components/order-card');
export const renderOrderListColumn = render('components/order-list-column');
export const renderModuleSettings = render('components/module-settings');
