export interface GrantEncoursItem {
    id?: string;
    code?: string;
    postAnalytiqueId?: string;
    projectId?: string;
    bankId?: string;
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
  