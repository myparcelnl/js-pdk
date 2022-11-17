import {Component, ref} from 'vue';
import {InteractiveElementInstance, defineField, defineForm} from '@myparcel/vue-form-builder';

export const shipmentOptionsForm = defineForm('shipmentOptions', {
  fields: [
    defineField({
      name: 'name',
      component: 'PdkTextInput' as unknown as Component,
      ref: ref(''),
      label: 'Name',
      validators: [
        {
          validate: (field, value) => !String(value).startsWith('John'),
          errorMessage: 'John is not allowed',
        },
        {
          validate: (field, value) => !String(value).includes('e'),
          errorMessage: 'E is not allowed',
        },
      ],
    }),

    // new HiddenInput({
    //   name: 'orderId',
    //   ref: ref(1),
    // }),

    defineField({
      name: 'orderId',
      component: 'PdkInput' as unknown as Component,
      ref: ref(1),
    }),

    defineField({
      name: 'labelAmount',
      component: 'PdkInput' as unknown as Component,
      ref: ref(1),
      label: 'Label Amount',
      props: {
        type: 'number',
        min: 1,
        max: 10,
      },
    }),

    defineField({
      name: 'packageType',
      component: 'PdkInput' as unknown as Component,
      ref: ref('package'),
      label: 'Package Type',
      props: {
        options: [
          {
            label: 'Package',
            value: 'package',
          },
          {
            label: 'Mailbox',
            value: 'mailbox',
          },
          {
            label: 'Letter',
            value: 'letter',
          },
          {
            label: 'Digital Stamp',
            value: 'digital_stamp',
          },
        ],
      },

      // afterUpdate: (field, newValue, oldValue) => {
      //   const isPackage = newValue === 'package';
      //   const {model} = field.form;
      //
      //   model.ageCheck.isVisible = isPackage;
      //   model.ageCheck.ref = isPackage ? model.ageCheck.ref : false;
      //   model.insurance.isVisible = isPackage;
      //   model.insurance.ref = isPackage ? model.insurance.ref : 0;
      //   model.largeFormat.isVisible = isPackage;
      //   model.largeFormat.ref = isPackage ? model.largeFormat.ref : false;
      //   model.onlyRecipient.isVisible = isPackage;
      //   model.onlyRecipient.ref = isPackage ? model.onlyRecipient.ref : false;
      //   model.return.isVisible = isPackage;
      //   model.return.ref = isPackage ? model.return.ref : false;
      //   model.signature.isVisible = isPackage;
      //   model.signature.ref = isPackage ? model.signature.ref : false;
      // },
    }),

    defineField({
      name: 'carrier',
      label: 'Carrier',
      component: 'PdkSelect',
      ref: ref<string | null>(null),
    }),

    defineField({
      name: 'signature',
      component: 'PdkToggleSwitch',
      ref: ref(true),
      label: 'Signature',
    }),

    defineField({
      name: 'onlyRecipient',
      component: 'PdkToggleSwitch',
      ref: ref(false),
      label: 'Only Recipient',
    }),

    defineField({
      name: 'ageCheck',
      component: 'PdkToggleSwitch',
      ref: ref(false),
      label: 'Age Check',
    }),

    defineField({
      name: 'return',
      component: 'PdkToggleSwitch',
      ref: ref(false),
      label: 'Return',
    }),

    defineField({
      name: 'largeFormat',
      component: 'PdkToggleSwitch',
      ref: ref(false),
      label: 'Large Format',
    }),

    defineField({
      name: 'insurance',
      component: 'PdkTextInput',
      ref: ref(1000),
      label: 'Insurance',
      validate: (field: InteractiveElementInstance, value: number) => {
        return value < 500;
      },
    }),

    defineField({
      component: 'TSubmitButton',
    }),
  ],
});

export const labelSettingsForm = defineForm('labelSettings', {
  fields: [],
});
