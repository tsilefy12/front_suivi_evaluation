export interface PlannedActivityItem {
  id?: string;
  description?: string;
  missionId?: string;
}

export interface PlannedActivityInitialState {
  plannedActivityList: PlannedActivityItem[];
  plannedActivity: PlannedActivityItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
