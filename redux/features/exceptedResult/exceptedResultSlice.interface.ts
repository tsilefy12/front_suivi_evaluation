export interface ExceptedResultItem {
  id?: string;
  description?: string;
  missionId?: string;
}

export interface ExceptedResultInitialState {
  exceptedResultList: ExceptedResultItem[];
  exceptedResult: ExceptedResultItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
