import {LabelFormat, LabelOutput, LabelPosition, SelectOption} from '@myparcel-pdk/common';

// TODO: get this data from backend

export const LABEL_FORMAT_A4 = 'A4';

export const LABEL_FORMAT_A6 = 'A6';

export const LABEL_OUTPUT_DOWNLOAD = 'download';

export const LABEL_OUTPUT_OPEN = 'open';

export const LABEL_POSITION_TOP_LEFT = '1';

export const LABEL_POSITION_TOP_RIGHT = '2';

export const LABEL_POSITION_BOTTOM_LEFT = '3';

export const LABEL_POSITION_BOTTOM_RIGHT = '4';

export const formatOptions: SelectOption<LabelFormat>[] = [
  {
    label: 'format_a4',
    value: LABEL_FORMAT_A4,
  },
  {
    label: 'format_a6',
    value: LABEL_FORMAT_A6,
  },
];

export const outputOptions: SelectOption<LabelOutput>[] = [
  {
    label: 'output_download',
    value: LABEL_OUTPUT_DOWNLOAD,
  },
  {
    label: 'output_open',
    value: LABEL_OUTPUT_OPEN,
  },
];

export const positionOptions: SelectOption<LabelPosition>[] = [
  {
    label: 'positions_top_left',
    value: LABEL_POSITION_TOP_LEFT,
  },
  {
    label: 'positions_top_right',
    value: LABEL_POSITION_TOP_RIGHT,
  },
  {
    label: 'positions_bottom_left',
    value: LABEL_POSITION_BOTTOM_LEFT,
  },
  {
    label: 'positions_bottom_right',
    value: LABEL_POSITION_BOTTOM_RIGHT,
  },
];
