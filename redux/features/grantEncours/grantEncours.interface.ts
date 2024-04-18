export interface GrantEncoursItem {
    id?: string;
    code?: string;
    postAnalyticId?: number;
    projectId?: number;
    bankId?: number;
    titleFr?: string;
    titleEn?: string;
    bailleur?: string;
    amount?: number;
    amountMGA?: number;
    responsable?: string;
    startDate?: string;
    endDate?: string;
    duration?: number;
  }
  
  export interface GrantEncoursInitialState {
    grantEncoursList: GrantEncoursItem[];
    grantEncours: GrantEncoursItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
  }
  