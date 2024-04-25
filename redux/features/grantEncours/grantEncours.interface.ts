export interface GrantEncoursItem {
    id?: string;
    code?: string;
    postAnalyticId?: number;
    // projectId?: number;
    bankId?: number;
    titleFr?: string;
    titleEn?: string;
    bailleur?: string;
    amount?: number;
    amountMGA?: number;
    currencyId?: number;
    responsable?: string;
    startDate?: Date;
    endDate?: Date;
    deadline?: number;
    techDate?: Date;
    financeDate?: Date;
    status?: string;
    techValidator?: string;
    financeValidator?: string;
    financeVerificator?: string;
  }
  
  export interface GrantEncoursInitialState {
    grantEncoursList: GrantEncoursItem[];
    grantEncour: GrantEncoursItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
  }
  