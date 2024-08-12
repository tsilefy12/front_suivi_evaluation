export interface Column {
  id: "logistic";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

export interface Data {
  logistic: string;
}
