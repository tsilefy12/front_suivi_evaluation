export interface RapportFinanceItem {
  id?: string;
  missionId?: string;
  pieceJointe?: string;
}

export interface RapportFinanceInitialState {
  rapportFinanceList: RapportFinanceItem[];
  rapportFinance: {};
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}