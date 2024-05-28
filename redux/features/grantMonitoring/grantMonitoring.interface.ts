export interface GrantMonitoringItem {
  id?: string;
  grantId?: number;
  dayLeft?: number;
}
export interface GrantMonitoringInitialState {
  grantMonitoringlist: GrantMonitoringItem[];
  grantMonitoring: GrantMonitoringItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
