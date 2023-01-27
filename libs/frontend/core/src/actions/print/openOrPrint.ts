import {ActionContextWithResponse} from '../executors';
import {PrintAction} from '../consts';
import {downloadPdf} from '../../services';
import {generateLabelFilename} from '../../utils';

export const openOrPrint = async <A extends PrintAction>(context: ActionContextWithResponse<A>): Promise<void> => {
  await downloadPdf(context.response.url, generateLabelFilename(context.parameters));
};
