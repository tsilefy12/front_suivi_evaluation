export interface MissionLocationItem {
  id?: string;
  village?: string;
  commune?: string;
  district?: string;
  missionId?: string;
}

export interface MissionLocationInitialState {
  missionLocationList: MissionLocationItem[];
  missionLocation: MissionLocationItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
