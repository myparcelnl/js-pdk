import {vi} from 'vitest';
import {type PdkFormData} from '../types';
import {DEFAULT_MOCK_FORM_DATA} from './constants';

export const doRequestSpy = vi.fn();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const getFormSpy = vi.fn(() => document.querySelector<HTMLFormElement>('form')!);

export const getFormDataSpy = vi.fn((): PdkFormData => DEFAULT_MOCK_FORM_DATA);

export const hasAddressTypeSpy = vi.fn(() => true);

export const initializeSpy = vi.fn(() => Promise.resolve());

export const toggleFieldSpy = vi.fn();
