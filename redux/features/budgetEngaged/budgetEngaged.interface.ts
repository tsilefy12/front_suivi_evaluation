export interface BudgetEngagedItem {
    id?: string;
    date?: Date;
    grantsId?: number;
    budgetLineId?: number;
    libelle?: string;
    amount?: number;
}
export interface BudgetEngagedInitialState {
    budgetEngagedList: BudgetEngagedItem[];
    budgetEngaged: BudgetEngagedItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
