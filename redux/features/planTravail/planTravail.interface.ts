export interface PlanTravailItem {
    id?: string;
    date?: Date;
    description?: string;
}
export interface PlanTravailInitialState {
    planTravaillist: PlanTravailItem[];
    planTravail: PlanTravailItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
