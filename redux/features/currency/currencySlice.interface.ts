export interface CurrencyItem {
  id?: number;
  iso?: string;
  symbol?: string;
  name?: string;
  lastUpdated?: string;
  rate?: number;
  decimalPlaces?: number;
  symbolPosition?: string;
  thousandSeparator?: string;
  default?: boolean;
}

export interface CurrencyInitialState {
  currencyListe: CurrencyItem[];
  currency: CurrencyItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
