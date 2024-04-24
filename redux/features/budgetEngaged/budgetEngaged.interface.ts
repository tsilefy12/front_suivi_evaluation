export interface BudgetEngagedItem {
    id?: string;
    date?: Date;
    grantsId?: number;
    grants? :any;
    budgetLineId?: number;
    budgetLine? :any;
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
