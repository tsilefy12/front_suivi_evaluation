export interface ObjectifRapportItem {
    id?: number;
    objectif?: string;
    missionId?: string;
}
export interface ObjectifRapportInitialState {
    objectifRapportlist: ObjectifRapportItem[];
    objectifRapport: ObjectifRapportItem
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}