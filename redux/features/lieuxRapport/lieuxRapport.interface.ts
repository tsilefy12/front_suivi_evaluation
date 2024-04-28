export interface LieuxRapportItem {
  id?: string;
  fonkotany?: string;
  commune?: string;
  district?: string;
  missionId?: string;
}

export interface LieuxRapportInitialState {
  lieuxRapportlist: LieuxRapportItem[];
  lieuxRapport: LieuxRapportItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
