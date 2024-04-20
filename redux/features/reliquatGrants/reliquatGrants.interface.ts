export interface ReliquatGrantsItem {
    id?: string;
    grant?: string;
    soldeCaisse?: number;
    soldeBank?: number;
    montantTotal?: string;
}
export interface ReliquatGrantsInitialState {
    reliquatGrantList: ReliquatGrantsItem[];
    reliquatGrant: ReliquatGrantsItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
