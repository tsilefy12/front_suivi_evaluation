export interface MissionairesItem {
  id?: string;
  lastNameMissionary?: string;
  firstNameMissionary?: string;
  startDateMissionary?: Date;
  returnDateMissionary?: Date;
  missionResponsabilityMissionary?: string[];
  missionId?: string;
}

export interface MissionairesInitialState {
  missionaireslist: MissionairesItem[];
  missionaires: MissionairesItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
