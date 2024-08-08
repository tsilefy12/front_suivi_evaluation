export interface UnCompleteTbbItem {
  id?: string;
  missionId?: string;
  retenuAdmin?: number;
  moyenRemise?: string;
  depenseAdmin?: number;
  depensesResp?: number;
  ordreDeMission?: string;
  piecesClassees?: string;
  remarqueAttente?: string;
  explicationImprevu?: string;
  type?: string;
}

export interface UncompleteTbbInitialState {
  unCompleteTbbList: UnCompleteTbbItem[];
  unCompleteTbb: UnCompleteTbbItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
