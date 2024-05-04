export interface ResumeDepensePrevueItem {
    id?: string;
    grant?: number;
    ligneBudgetaire?: number;
    depensePrevue?: string;
    budgetDepense?: string;
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
