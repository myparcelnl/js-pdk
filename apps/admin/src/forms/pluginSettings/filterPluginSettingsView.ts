import {type Plugin} from '@myparcel-dev/pdk-common';
import {OrderMode} from '../../data';

const GENERAL_SECTION_HEADING = 'settings_order_general_title';

const SHIPMENTS_ONLY_FIELDS: ReadonlySet<string> = new Set(['conceptShipments', 'saveCustomerAddress']);

const ORDER_V2_HIDDEN_TABS: ReadonlySet<string> = new Set(['label', 'customs']);

const isSettingsDivider = (field: Plugin.Field): boolean => {
  return field.$component === 'SettingsDivider';
};

const isGeneralDivider = (field: Plugin.Field): boolean => {
  return isSettingsDivider(field) && (field as Record<string, unknown>).heading === GENERAL_SECTION_HEADING;
};

const filterOrderElements = (elements: Plugin.Field[], orderMode: OrderMode): Plugin.Field[] => {
  let inGeneralSection = false;

  return elements.filter((field) => {
    if (isGeneralDivider(field)) {
      inGeneralSection = true;
    } else if (isSettingsDivider(field)) {
      inGeneralSection = false;
    }

    if (!inGeneralSection) {
      return true;
    }

    if (isSettingsDivider(field)) {
      return orderMode !== OrderMode.OrderV2;
    }

    if (SHIPMENTS_ONLY_FIELDS.has(field.name ?? '')) {
      return orderMode === OrderMode.Shipments;
    }

    return orderMode !== OrderMode.OrderV2;
  });
};

export const filterPluginSettingsView = (
  view: Plugin.ModelContextPluginSettingsViewContext,
  orderMode: OrderMode,
): Plugin.ModelContextPluginSettingsViewContext => {
  const entries = Object.entries(view).filter(([tabId]) => {
    return !(orderMode === OrderMode.OrderV2 && ORDER_V2_HIDDEN_TABS.has(tabId));
  });

  return Object.fromEntries(
    entries.map(([tabId, tabView]) => {
      if (tabId !== 'order' || !tabView.elements) {
        return [tabId, tabView];
      }

      return [
        tabId,
        {
          ...tabView,
          elements: filterOrderElements(tabView.elements, orderMode),
        },
      ];
    }),
  ) as Plugin.ModelContextPluginSettingsViewContext;
};
