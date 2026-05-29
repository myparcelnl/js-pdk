import {type Plugin} from '@myparcel-dev/pdk-common';
import {OrderMode} from '../../data';

const GENERAL_SECTION_HEADING = 'settings_order_general_title';

/**
 * Settings only relevant when the plugin creates shipments via the shipments API —
 * that covers Shipments mode and the V2 hybrid (manual export). Order v1 uses the
 * fulfilment-orders path instead, so these settings are hidden there.
 *
 * @TODO INT-1590: revisit when sales-channel detection lands — under V2 with an
 *       active sales channel these settings should be hidden again.
 */
const SHIPMENT_EXPORT_FIELDS: ReadonlySet<string> = new Set(['conceptShipments', 'saveCustomerAddress']);

// @TODO INT-1590: restore tab hiding once sales-channel detection lands; under V2
//       with an active sales channel the label and customs tabs become irrelevant
//       again (the sales channel handles fulfilment end-to-end).
// const ORDER_V2_HIDDEN_TABS: ReadonlySet<string> = new Set(['label', 'customs']);

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

    // @TODO INT-1590: restore the V2-divider hiding for active-sales-channel state.
    // if (isSettingsDivider(field)) {
    //   return orderMode !== OrderMode.OrderV2;
    // }

    if (SHIPMENT_EXPORT_FIELDS.has(field.name ?? '')) {
      return orderMode !== OrderMode.OrderV1;
    }

    // @TODO INT-1590: restore the V2 general-section hiding for active-sales-channel state.
    // return orderMode !== OrderMode.OrderV2;
    return true;
  });
};

/**
 * Filter the plugin-settings view for the active order mode.
 *
 * Today the V2 hybrid surfaces all the same tabs and fields as Shipments mode so
 * manual export keeps working. Only Order v1 hides the shipment-export-specific
 * fields, because v1 uses fulfilment orders instead.
 *
 * @TODO INT-1590: once sales-channel detection lands, re-introduce tab hiding for
 *       V2 with an active sales channel — the label/customs tabs and shipment-export
 *       fields become irrelevant when the sales channel handles fulfilment
 *       end-to-end.
 */
export const filterPluginSettingsView = (
  view: Plugin.ModelContextPluginSettingsViewContext,
  orderMode: OrderMode,
): Plugin.ModelContextPluginSettingsViewContext => {
  // @TODO INT-1590: restore the V2 tab-hiding step using ORDER_V2_HIDDEN_TABS
  //       (declared as commented constant above) once sales-channel detection lands.
  // const entries = Object.entries(view).filter(([tabId]) => {
  //   return !(orderMode === OrderMode.OrderV2 && ORDER_V2_HIDDEN_TABS.has(tabId));
  // });
  const entries = Object.entries(view);

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
