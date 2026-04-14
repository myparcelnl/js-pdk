import {type Plugin} from '@myparcel-dev/pdk-common';
import {OrderMode} from '../../data';

const GENERAL_SECTION_HEADING = 'settings_order_general_title';

const SHIPMENTS_ONLY_FIELDS: ReadonlySet<string> = new Set(['conceptShipments', 'saveCustomerAddress']);

const ORDER_V2_HIDDEN_TABS: ReadonlySet<string> = new Set(['label', 'customs']);

type Section = Plugin.Field[];

const isSettingsDivider = (field: Plugin.Field): boolean => {
  return field.$component === 'SettingsDivider';
};

const isGeneralDivider = (field: Plugin.Field): boolean => {
  return isSettingsDivider(field) && (field as Record<string, unknown>).heading === GENERAL_SECTION_HEADING;
};

const parseIntoSections = (elements: Plugin.Field[]): Section[] => {
  const sections: Section[] = [];
  let current: Section = [];

  for (const element of elements) {
    if (isSettingsDivider(element) && current.length > 0) {
      sections.push(current);
      current = [];
    }

    current.push(element);
  }

  if (current.length > 0) {
    sections.push(current);
  }

  return sections;
};

const filterGeneralSection = (section: Section, orderMode: OrderMode): Section => {
  const filtered = section.filter((field) => {
    if (isSettingsDivider(field)) {
      return true;
    }

    const fieldName = field.name;

    if (!fieldName) {
      return true;
    }

    if (SHIPMENTS_ONLY_FIELDS.has(fieldName)) {
      return orderMode === OrderMode.Shipments;
    }

    // All other General fields: visible in Shipments and OrderV1, hidden in OrderV2
    return orderMode !== OrderMode.OrderV2;
  });

  const hasVisibleFields = filtered.some((field) => !isSettingsDivider(field));

  return hasVisibleFields ? filtered : [];
};

const filterOrderElements = (elements: Plugin.Field[], orderMode: OrderMode): Plugin.Field[] => {
  return parseIntoSections(elements)
    .flatMap((section) => {
      if (isGeneralDivider(section[0])) {
        return filterGeneralSection(section, orderMode);
      }

      return section;
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
