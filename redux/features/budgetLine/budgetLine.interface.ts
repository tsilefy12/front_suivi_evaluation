export interface BudgetLineItem {
    id?: string;
    code?: string;
    grantId?: number;
    amount?: number;
    configOrganisationId?: number;
    configBudgetLineId?: number;
    budgetTypeId?: number;
  }
  
  export interface BudgetLineInitialState {
    budgetLineList: BudgetLineItem[];
    budgetLine: BudgetLineItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
  }
  