export interface BudgetInitialItem {
    id?: string;
    grant?: number;
    ligneBudgetaire?: number[];
    periodeId?: string[];
    montant?: number;
    periode?: any;
}
export interface BugdgetInitialInitialState {
    budgetInitialList: BudgetInitialItem[];
    budgetInitial: BudgetInitialItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
