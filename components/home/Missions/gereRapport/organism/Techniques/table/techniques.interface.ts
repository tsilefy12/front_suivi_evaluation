export interface Column {
  id: "technique" ;
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

export interface Data {
  technique: string;
}
