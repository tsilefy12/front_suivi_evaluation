import { MissionItem } from "../mission/mission.interface";

export interface NotifyItem {
  id?: string;
  missionId?: string;
  link?: string;
  ready?: boolean;
  responsableId?: string;
  type?: string;
  missions?: MissionItem[];
}
export interface NotifyInitialState {
  notifyList: NotifyItem[];
  notify: NotifyItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
