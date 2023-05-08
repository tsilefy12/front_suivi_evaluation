export interface MissionaryItem {
  id?: string;
  lastNameMissionary?: string;
  firstNameMissionary?: string;
  startDateMissionary?: string;
  returnDateMissionary?: string;
  missionResponsabilityMissionary?: string;
  missionId?: string;
}

export interface MissionaryInitialState {
  missionaryList: MissionaryItem[];
  missionary: MissionaryItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
