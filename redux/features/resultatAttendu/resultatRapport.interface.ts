export interface ResultatRapportItem {
    id?: number;
    resultat?: string;
    missionId?: string;
}
export interface ResultatRapportInitialState {
    resultatRapportlist: ResultatRapportItem[];
    resultatRapport: ResultatRapportItem
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}