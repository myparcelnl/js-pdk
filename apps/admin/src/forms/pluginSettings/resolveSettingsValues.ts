import {get as lodashGet} from 'lodash-unified';

/**
 * Resolve settings values for a given form ID, falling back to the wildcard
 * key when no carrier-specific settings have been saved yet.
 *
 * Example: "carrier.POSTNL" → try pluginSettings.carrier.POSTNL first,
 * fall back to pluginSettings.carrier.* if it doesn't exist.
 */
export const resolveSettingsValues = (
  pluginSettings: Record<string, unknown>,
  id: string,
): Record<string, unknown> => {
  return (lodashGet(pluginSettings, id)
    ?? lodashGet(pluginSettings, id.replace(/\.[^.]+$/, '.*'), {})) as Record<string, unknown>;
};
