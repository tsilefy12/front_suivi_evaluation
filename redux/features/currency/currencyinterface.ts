export interface CurrencyItem {
    id?: string;
    name?: string;
}
export interface CurrenncyInitialState {
    currencylist: CurrencyItem[];
    currency: CurrencyItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}