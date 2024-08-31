export interface UnCompleteTbbItem {
  id?: string;
  missionId?: string;
  ordreDeMission?: string;
  piecesClassees?: string;
  remarqueAttente?: string;
  explicationImprevu?: string;
  type?: string;
  devise?: number;
  coursDevise?: number;
  retenuAdmin?: number;
  moyenRemise?: string;
  depenseAdmin?: number;
  depensesResp?: number;
  [x: string]: any;
}

export interface UncompleteTbbInitialState {
  unCompleteTbbList: UnCompleteTbbItem[];
  unCompleteTbb: UnCompleteTbbItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
