import { BudgetLineItem } from "../budgetLine/budgetLine.interface";

export interface GrantEncoursItem {
    id?: string;
    code?: string;
    postAnalyticId?: number;
    projectId?: number;
    bankId?: number;
    // titleFr?: string;
    // titleEn?: string;
    bailleur?: string;
    amount?: number;
    amountMGA?: number;
    currencyId?: number;
    responsable?: string;
    startDate?: string;
    endDate?: string;
    deadline?: string;
    techDate?: string;
    financeDate?: string;
    status?: string;
    techValidator?: string;
    financeValidator?: string;
    financeVerificator?: string;
    budgetLines?: BudgetLineItem[];
  }
  
  export interface GrantEncoursInitialState {
    grantEncoursList: GrantEncoursItem[];
    grantEncour: GrantEncoursItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
  }
  