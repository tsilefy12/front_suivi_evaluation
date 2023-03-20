export interface Column {
  id: "finance" ;
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

export interface Data {
  finance: string;
}
