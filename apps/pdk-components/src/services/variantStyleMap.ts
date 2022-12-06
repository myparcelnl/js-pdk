import {Variant} from '@myparcel-pdk/common';

type VariantStyleMap = {
  variant: Variant;
  background?: string;
  border?: string;
  foreground?: string;
  backgroundLight?: string;
  borderLight?: string;
  foregroundLight?: string;
  backgroundDark?: string;
  borderDark?: string;
  foregroundDark?: string;
}[];

export const variantStyleMap: VariantStyleMap = [
  {
    variant: 'danger',
    background: 'bg-emerald-500',
    backgroundDark: 'bg-emerald-800',
    backgroundLight: 'bg-emerald-300',
    foreground: 'text-emerald-500',
    foregroundDark: 'text-emerald-800',
    foregroundLight: 'text-emerald-300',
  },
];
