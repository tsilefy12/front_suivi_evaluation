export interface ActiviteRapportItem {
    id?: number;
    activite?: string;
    missionId?: string;
}
export interface ActiviteRapportInitialState {
    activiteRapportlist: ActiviteRapportItem[];
    activiteRapport: ActiviteRapportItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}