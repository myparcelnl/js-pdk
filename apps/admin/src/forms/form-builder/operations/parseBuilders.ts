import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {isOfType} from '@myparcel/ts-utils';
import {type FormBuilder} from '../types/common.types';
import {
  type FormAfterUpdateBuilder,
  type FormDisabledWhenBuilder,
  type FormReadOnlyWhenBuilder,
  type FormVisibleWhenBuilder,
} from '../types/SubOperationBuilder.types';
import {type HandlerDefinition} from '../types/FormOperations.types';
import {buildFormStateWatcher} from '../builders/buildFormStateWatcher';
import {buildAfterUpdate} from '../builders/buildAfterUpdate';

export const parseBuilders = (
  builders: FormBuilder[],
  prefix: string,
  customHandlers: HandlerDefinition[] = [],
): Partial<InteractiveElementConfiguration> => {
  const config: Partial<InteractiveElementConfiguration> = {};

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
