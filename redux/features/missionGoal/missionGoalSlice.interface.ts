export interface MissionGoalItem {
  id?: string;
  description?: string;
  missionId?: string;
}

export interface MissionGoalInitialState {
  missionGoalList: MissionGoalItem[];
  missionGoal: MissionGoalItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
