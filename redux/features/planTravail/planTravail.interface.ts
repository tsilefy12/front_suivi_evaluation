export interface PlanTravailItem {
    id?: string;
    title?: string;
    startDate?: Date;
    endDate?: Date;
    description?: string;
    projectId?:number;
}
export interface PlanTravailInitialState {
    planTravaillist: PlanTravailItem[];
    planTravail: PlanTravailItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
