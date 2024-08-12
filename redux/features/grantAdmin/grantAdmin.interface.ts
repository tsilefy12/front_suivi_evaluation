export interface GrantAdminItem {
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
}
export interface GrantAdminInitialState {
  grantAdminlist: GrantAdminItem[];
  grantAdmin: GrantAdminItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
