export interface ResumeDepenseItem {
    id?: string;
    grant?: number;
    ligneBudgetaire?: number[];
    depensePrevue?: string;
    budgetDepense?: string;
    remarque?: string;
    missionId?: string;
}
export interface ResumeDepenseInitialState {
    resumeDepenseList: ResumeDepenseItem[];
    resumeDepense: ResumeDepenseItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
