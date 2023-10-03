export type Keyable = string | number | symbol;

export type DateTime = {
  date: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  timezone_type: number;
  timezone: string;
};

export type DateTimeImmutable = DateTime;
