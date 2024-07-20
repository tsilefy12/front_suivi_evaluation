import { MissionItem } from "../mission/mission.interface";

export interface ImprevuePrevisionItem {
  id?: string;
  date?: Date;
  grant?: string;
  ligneBudgetaire?: string;
  nombre?: number;
  imprevue?: number;
  pu?: number;
  regleme?: string;
  libelle?: string;
  idMission?: string;
  missions?: MissionItem[];
}

export interface ImprevuePrevisionInitialState {
  imprevuePrevisionlist: ImprevuePrevisionItem[];
  imprevuePrevision: ImprevuePrevisionItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
