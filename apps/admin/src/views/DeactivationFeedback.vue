<template>
  <div
    v-if="isOpen"
    v-test="AdminView.DeactivationFeedback"
    class="pdk-deactivation-feedback"
    @click.self="cancel">
    <div
      ref="dialog"
      aria-describedby="pdk-deactivation-feedback-description"
      aria-labelledby="pdk-deactivation-feedback-title"
      aria-modal="true"
      class="pdk-deactivation-feedback__dialog"
      role="dialog"
      tabindex="-1"
      @keydown.esc="cancel"
      @keydown.tab="trapFocus">
      <header class="pdk-deactivation-feedback__header">
        <h2
          id="pdk-deactivation-feedback-title"
          class="pdk-deactivation-feedback__title">
          {{ context.translations.title }}
        </h2>

        <button
          :aria-label="context.translations.cancel"
          :disabled="busy"
          class="pdk-deactivation-feedback__close"
          type="button"
          @click="cancel">
          <span aria-hidden="true">&times;</span>
        </button>
      </header>

      <p
        id="pdk-deactivation-feedback-description"
        class="pdk-deactivation-feedback__description">
        {{ context.translations.description }}
      </p>

      <fieldset class="pdk-deactivation-feedback__reasons">
        <legend class="pdk-deactivation-feedback__sr-only">{{ context.translations.title }}</legend>

        <PdkRadioGroup
          v-model="reason"
          :element="reasonElement" />
      </fieldset>

      <PdkTextArea
        v-if="hasDetails(reason)"
        v-model="details"
        :aria-label="context.translations.detailsPlaceholder"
        :element="detailsElement"
        :placeholder="context.translations.detailsPlaceholder"
        class="pdk-deactivation-feedback__details"
        rows="3" />

      <footer class="pdk-deactivation-feedback__footer">
        <PdkButton
          :disabled="busy"
          @click="deactivate(null)">
          {{ context.translations.skip }}
        </PdkButton>

        <PdkButton
          :disabled="busy || !reason"
          :variant="Variant.Primary"
          @click="submit">
          {{ context.translations.submit }}
        </PdkButton>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * Asks for the reason of deactivation when the "Deactivate" link of the plugin is clicked in the plugins overview.
 * The plugin passes the selector of that link in the context. Deactivating is never blocked.
 *
 * The dialog has its own layout, so it looks the same on every platform. The controls are Pdk* components, so they
 * match the platform.
 */
import {nextTick, onBeforeUnmount, onMounted, ref} from 'vue';
import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {AdminContextKey, Variant} from '@myparcel-dev/pdk-common';
import {createFormElement} from '../utils';
import {useQueryStore} from '../stores';
import {type DeactivationFeedback, sendDeactivationFeedback} from '../services/deactivation/sendDeactivationFeedback';
import {AdminView} from '../data';
import {useContext} from '../composables';

const FOCUSABLE = 'button:not([disabled]), input:not([disabled]), textarea:not([disabled])';

useQueryStore().registerContextQueries(AdminContextKey.DeactivationFeedback);

const context = useContext(AdminContextKey.DeactivationFeedback);

const dialog = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const busy = ref(false);
const reason = ref<string | undefined>();
const details = ref('');

/**
 * These inputs are not part of a form, so their state is fixed. Plain booleans work because the inputs only read them.
 */
const elementState = {
  isValid: true,
  isDisabled: false,
  isSuspended: false,
  isReadOnly: false,
  isVisible: true,
} as unknown as Partial<InteractiveElementConfiguration>;

const reasonElement = createFormElement({
  ...elementState,
  name: 'deactivationFeedbackReason',
  props: {
    options: context.reasons.map(({value, label}) => ({value, plainLabel: label})),
    // Do not preselect a reason: the merchant must choose one.
    autoSelectFirstOption: false,
  },
});

const detailsElement = createFormElement({...elementState, name: 'deactivationFeedbackDetails', props: {}});

let link: HTMLAnchorElement | null = null;

const hasDetails = (value?: string): boolean => {
  return context.reasons.some((item) => item.value === value && item.hasDetails);
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

<style scoped>
.pdk-deactivation-feedback {
  align-items: center;
  background: rgb(0 0 0 / 50%);
  box-sizing: border-box;
  display: flex;
  inset: 0;
  justify-content: center;
  overflow-y: auto;
  padding: 16px;
  position: fixed;
  /* Above the admin menu and bar of the platform. */
  z-index: 100000;
}

.pdk-deactivation-feedback__dialog {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 12px 40px rgb(0 0 0 / 25%);
  box-sizing: border-box;
  color: #1e1e1e;
  margin: auto;
  max-width: 480px;
  padding: 24px;
  width: 100%;
}

.pdk-deactivation-feedback__dialog:focus {
  outline: none;
}

.pdk-deactivation-feedback__header {
  align-items: flex-start;
  display: flex;
  gap: 16px;
  justify-content: space-between;
}

.pdk-deactivation-feedback__title {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 0;
  padding: 0;
}

.pdk-deactivation-feedback__close {
  background: none;
  border: 0;
  border-radius: 4px;
  color: #757575;
  cursor: pointer;
  flex-shrink: 0;
  font-size: 24px;
  height: 32px;
  line-height: 1;
  margin: -4px -8px 0 0;
  width: 32px;
}

.pdk-deactivation-feedback__close:hover,
.pdk-deactivation-feedback__close:focus-visible {
  background: #f0f0f0;
  color: #1e1e1e;
}

.pdk-deactivation-feedback__description {
  color: #50575e;
  margin: 8px 0 20px;
}

.pdk-deactivation-feedback__reasons {
  border: 0;
  margin: 0;
  min-width: 0;
  padding: 0;
}

/* One reason per row, with room for the larger radio buttons of mobile layouts. */
.pdk-deactivation-feedback__reasons :deep(> div) {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pdk-deactivation-feedback__reasons :deep(> div > div) {
  align-items: center;
  display: flex;
  gap: 8px;
}

.pdk-deactivation-feedback__reasons :deep(input[type='radio']) {
  flex-shrink: 0;
  margin: 0;
}

.pdk-deactivation-feedback__reasons :deep(label) {
  cursor: pointer;
}

.pdk-deactivation-feedback__details {
  box-sizing: border-box;
  margin-top: 16px;
  width: 100%;
}

.pdk-deactivation-feedback__footer {
  border-top: 1px solid #e0e0e0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 16px;
}

.pdk-deactivation-feedback__sr-only {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

@media (max-width: 480px) {
  .pdk-deactivation-feedback__dialog {
    padding: 20px 16px;
  }

  .pdk-deactivation-feedback__footer :deep(button) {
    flex: 1 1 100%;
  }
}
</style>
