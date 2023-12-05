export type ModalCallback = (id: string) => Promise<void> | void;

export interface ModalCallbackProps {
  onCancel: ModalCallback;
  onSave: ModalCallback;
}
