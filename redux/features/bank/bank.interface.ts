export interface BankItem {
    id?: string;
    bankId?: string;
}
export interface BankInitialState {
    bankList: BankItem[];
    bank: BankItem
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}