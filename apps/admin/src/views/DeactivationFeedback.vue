<template>
  <div
    v-if="isOpen"
    v-test="AdminView.DeactivationFeedback"
    :style="backdropStyle"
    @click.self="cancel">
    <div
      ref="dialog"
      :style="dialogStyle"
      aria-labelledby="pdk-deactivation-feedback-title"
      aria-describedby="pdk-deactivation-feedback-description"
      aria-modal="true"
      role="dialog"
      tabindex="-1"
      @keydown.esc="cancel"
      @keydown.tab="trapFocus">
      <PdkBox>
        <template #header>
          <span id="pdk-deactivation-feedback-title">{{ context.translations.title }}</span>
        </template>

        <p id="pdk-deactivation-feedback-description">{{ context.translations.description }}</p>

        <MagicForm :form="form" />

        <template #footer>
          <PdkButtonGroup>
            <PdkButton
              :disabled="busy"
              @click="cancel">
              {{ context.translations.cancel }}
            </PdkButton>

            <PdkButton
              :disabled="busy"
              @click="deactivate(null)">
              {{ context.translations.skip }}
            </PdkButton>

            <PdkButton
              :disabled="busy || !reason"
              @click="submit">
              {{ context.translations.submit }}
            </PdkButton>
          </PdkButtonGroup>
        </template>
      </PdkBox>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * Asks for the reason of deactivation when the "Deactivate" link of the plugin is clicked in the plugins overview.
 * The plugin passes the selector of that link in the context. Deactivating is never blocked.
 */
import {markRaw, nextTick, onBeforeUnmount, onMounted, ref, type StyleValue} from 'vue';
import {defineField, defineForm, MagicForm} from '@myparcel-dev/vue-form-builder';
import {AdminContextKey} from '@myparcel-dev/pdk-common';
import {useQueryStore} from '../stores';
import {type DeactivationFeedback, sendDeactivationFeedback} from '../services/deactivation/sendDeactivationFeedback';
import {resolveFormComponent} from '../forms/helpers';
import {AdminComponent, AdminView} from '../data';
import {useContext} from '../composables';

const FIELD_REASON = 'reason';
const FIELD_DETAILS = 'details';
// Above the admin menu and bar of the platform.
const Z_INDEX = 9999;
const FOCUSABLE = 'button:not([disabled]), input:not([disabled]), textarea:not([disabled])';

useQueryStore().registerContextQueries(AdminContextKey.DeactivationFeedback);

const context = useContext(AdminContextKey.DeactivationFeedback);

const dialog = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const busy = ref(false);
const reason = ref<string | undefined>();
const details = ref('');

let link: HTMLAnchorElement | null = null;

const hasDetails = (value?: string): boolean => {
  return context.reasons.some((item) => item.value === value && item.hasDetails);
};

const form = markRaw(
  defineForm('deactivationFeedback', {
    fields: [
      defineField({
        name: FIELD_REASON,
        ref: reason,
        component: resolveFormComponent(AdminComponent.RadioGroup),
        props: {
          options: context.reasons.map(({value, label}) => ({value, plainLabel: label})),
          // Do not preselect a reason: the merchant must choose one.
          autoSelectFirstOption: false,
        },
      }),
      defineField({
        name: FIELD_DETAILS,
        ref: details,
        component: resolveFormComponent(AdminComponent.TextArea),
        visibleWhen: () => hasDetails(reason.value),
        attributes: {
          'aria-label': context.translations.detailsPlaceholder,
          placeholder: context.translations.detailsPlaceholder,
        },
      }),
    ],
  }),
);

const backdropStyle: StyleValue = {
  background: 'rgb(0 0 0 / 40%)',
  inset: 0,
  overflowY: 'auto',
  position: 'fixed',
  zIndex: Z_INDEX,
};

const dialogStyle: StyleValue = {
  margin: '48px auto',
  maxWidth: '42rem',
  outline: 'none',
  width: 'calc(100% - 16px)',
};

const close = (): void => {
  isOpen.value = false;
  link?.focus();
};

const cancel = (): void => {
  // The deactivation already started.
  if (!busy.value) {
    close();
  }
};

const deactivate = async (feedback: DeactivationFeedback | null): Promise<void> => {
  // Prevents a second request on a fast double click.
  if (busy.value || !link) {
    return;
  }

  busy.value = true;

  if (feedback) {
    try {
      await sendDeactivationFeedback(feedback);
    } catch (error) {
      // Never block the deactivation.
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  window.location.href = link.href;
};

const submit = (): Promise<void> | undefined => {
  if (!reason.value) {
    return;
  }

  return deactivate({
    reason: reason.value,
    details: hasDetails(reason.value) ? details.value.trim() : '',
  });
};

/**
 * Keep the focus inside the dialog.
 */
const trapFocus = (event: KeyboardEvent): void => {
  const elements = [...(dialog.value?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])];

  if (!elements.length) {
    return;
  }

  const first = elements[0];
  const last = elements[elements.length - 1];

  if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.value)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

const onLinkClick = async (event: MouseEvent): Promise<void> => {
  // Let the browser handle "open in new tab" and similar clicks.
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }

  event.preventDefault();
  isOpen.value = true;

  await nextTick();
  dialog.value?.focus();
};

onMounted(() => {
  link = context.linkSelector ? document.querySelector<HTMLAnchorElement>(context.linkSelector) : null;
  link?.addEventListener('click', onLinkClick);
});

onBeforeUnmount(() => {
  link?.removeEventListener('click', onLinkClick);
});
</script>
