export interface ReliquatGrantsItem {
  id?: string;
  grant?: number;
  soldeCaisse?: number;
  soldeBank?: number;
  montantTotal?: number;
}
export interface ReliquatGrantsInitialState {
  reliquatGrantList: ReliquatGrantsItem[];
  caisselist: [];
  reliquatGrant: ReliquatGrantsItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
