export interface MissionaryRapportItem {
  id?: string;
  lastNameMissionary?: string;
  firstNameMissionary?: string;
  startDateMissionary?: string;
  returnDateMissionary?: string;
  missionResponsabilityMissionary?: string[];
  missionId?: string;
}

export interface MissionaryRapportInitialState {
  missionaryRapportList: MissionaryRapportItem[];
  missionaryRapport: MissionaryRapportItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
