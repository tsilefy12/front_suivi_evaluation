export interface BudgetLineItem {
    id?: string;
    code?: string;
    grantId?: number;
  }
  
  export interface BudgetLineInitialState {
    budgetLineList: BudgetLineItem[];
    budgetLine: BudgetLineItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
  }
  