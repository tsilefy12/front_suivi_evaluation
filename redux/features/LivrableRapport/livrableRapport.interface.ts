export interface LivrableRapportItem {
    id?: number;
    livrable?: string;
    missionId?: string;
}
export interface LivrableRapportInitialState {
    livrableRapportlist: LivrableRapportItem[];
    livrableRapport: LivrableRapportItem
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}