export interface RapportDepenseItem {
  id?: string;
  date?: Date;
  libelle?: string;
  montant?: number;
  grant?: number;
  ligneBudgetaire?: number;
  missionId?: string;
  refPiece?: string;
  modePaiement?: string;
  typeRapport?: string;
}
export interface RapportDepenseInitialState {
  rapportDepenseList: RapportDepenseItem[];
  rapportDepense: RapportDepenseItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
