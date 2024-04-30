export interface MissionRapportItem {
  id?: string;
  nomPrenom?: string;
  lieuInstitution?: string;
  numero?: string;
  remarque?: string;
  missionId?: string;
}

export interface MissionRapportInitialState {
  missionRapportList: MissionRapportItem[];
  missionRapport: MissionRapportItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
