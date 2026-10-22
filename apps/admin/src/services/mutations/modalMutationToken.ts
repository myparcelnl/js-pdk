import {type ModalToken, useModalStore} from '../../stores';

export type ModalMutationContext = {modalToken: ModalToken | null};

/**
 * Creates an onMutate that keeps the token of the modal that is open when the
 * mutation starts. Pass the onMutate it replaces, for example the default one
 * of the query client, so that one still runs.
 */
export const keepModalToken =
  <TVariables>(onMutate?: (variables: TVariables) => unknown) =>
  (variables: TVariables): ModalMutationContext => {
    void onMutate?.(variables);

    return {modalToken: useModalStore().token};
  };

/**
 * Tells if the modal that was open when the mutation started is still open.
 * Use it in late mutation callbacks, so they do not change a modal that the
 * user opened in the meantime.
 */
export const isSameModal = (context: ModalMutationContext | undefined): boolean => {
  const modalToken = context?.modalToken;

  return Boolean(modalToken) && modalToken === useModalStore().token;
};
