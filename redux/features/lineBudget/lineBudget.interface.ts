export interface LineBudgetItem {
    id?: number;
    name?: string;
}

export interface LineBudgetInitialState {
    lineBudgetList: LineBudgetItem[];
    lineBudget: LineBudgetItem
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}