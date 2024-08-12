import { BudgetLineItem } from "../budgetLine/budgetLine.interface";

export interface GrantEncoursItem {
  id?: string;
  code?: string;
  postAnalyticId?: number;
  projectId?: number;
  bankId?: number;
  programmeId?: number;
  type?: string;
  bailleur?: string;
  amount?: number;
  amountMGA?: number;
  currencyId?: number;
  responsable?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  techValidator?: string;
  financeValidator?: string;
  financeVerificator?: string;
  budgetLines?: BudgetLineItem[];
  journalBanks?: { grantId: number; debit: number; credit: number }[];
}

export interface GrantEncoursInitialState {
  grantEncoursList: GrantEncoursItem[];
  grantEncour: GrantEncoursItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
