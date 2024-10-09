export const createLabel = <Label extends string | undefined>(label: Label, type: string): Label => {
  return (label ? `${label}_${type}` : undefined) as Label;
};
