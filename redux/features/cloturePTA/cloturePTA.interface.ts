export interface CloturePTAItem {
  id?: string;
  planTravaileId?: string;
  dateCloture?: Date;
}

export interface CloturePTAInitialState {
  cloturePtaList: CloturePTAItem[];
  cloturePta: CloturePTAItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}