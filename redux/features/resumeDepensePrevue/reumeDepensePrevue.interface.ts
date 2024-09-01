export interface ResumeDepensePrevueItem {
  id?: string;
  grant?: number;
  ligneBudgetaire?: number;
  depensePrevue?: any;
  remarque?: string;
  missionId?: string;
}
export interface ResumeDepensePrevueInitialState {
  resumeDepensePrevueList: ResumeDepensePrevueItem[];
  resumeDepensePrevue: ResumeDepensePrevueItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
