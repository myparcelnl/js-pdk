import {type AnyElementConfiguration} from '@myparcel/vue-form-builder';
import {isOfType} from '@myparcel/ts-utils';
import {
  type FormAfterUpdateBuilder,
  type FormBuilder,
  type FormDisabledWhenBuilder,
  type FormReadOnlyWhenBuilder,
  type FormVisibleWhenBuilder,
  type HandlerDefinition,
} from '../types';
import {buildAfterUpdate, buildFormStateWatcher} from '../builders';

export const parseBuilders = (
  builders: FormBuilder[],
  prefix: string,
  customHandlers: HandlerDefinition[] = [],
): Partial<AnyElementConfiguration> => {
  const config: Partial<AnyElementConfiguration> = {};

  builders?.forEach((builder) => {
    if (isOfType<FormVisibleWhenBuilder>(builder, '$visibleWhen')) {
      config.visibleWhen = buildFormStateWatcher(builder.$visibleWhen, prefix);
    }

    if (isOfType<FormDisabledWhenBuilder>(builder, '$disabledWhen')) {
      config.disabledWhen = buildFormStateWatcher(builder.$disabledWhen, prefix);
    }

    if (isOfType<FormReadOnlyWhenBuilder>(builder, '$readOnlyWhen')) {
      config.readOnlyWhen = buildFormStateWatcher(builder.$readOnlyWhen, prefix);
    }

    if (isOfType<FormAfterUpdateBuilder>(builder, '$afterUpdate')) {
      config.afterUpdate = buildAfterUpdate(builder.$afterUpdate, prefix, customHandlers);
    }
  });

  return config;
};
