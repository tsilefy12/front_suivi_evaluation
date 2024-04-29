export interface LivrableRapportItem {
    id?: number;
    livrablee?: string;
    missionId?: string;
}
export interface LivrableRapportInitialState {
    livrableRapportlist: LivrableRapportItem[];
    livrableRapport: LivrableRapportItem
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}