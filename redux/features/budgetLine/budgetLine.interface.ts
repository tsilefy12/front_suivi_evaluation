export interface BudgetLineItem {
    id?: string;
    code?: string;
    grantId?: number;
    amount?: number;
    lineBudget?:"";
    type?:"";
    organisation?:"";
  }
  
  export interface BudgetLineInitialState {
    budgetLineList: BudgetLineItem[];
    budgetLine: BudgetLineItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
  }
  