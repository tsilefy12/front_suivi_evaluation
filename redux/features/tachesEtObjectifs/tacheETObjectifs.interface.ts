import { ObjectifAnnuelItem } from "../objectifAnnuels/objectifAnnuel.interface";
import { PlanTravailItem } from "../planTravail/planTravail.interface";

export interface TacheEtObjectifItem {
  id?: string;
  sn?: string;
  keyTasks?: string;
  statusId?: number;
  // timeFrame?: string;
  responsableId?: string;
  expectedResult?: string;
  resources?: string;
  participantsId?: string[];
  notes?: string;
  startDate?: Date;
  objectifAnnuel?: ObjectifAnnuelItem[];
  endDate?: Date;
  planTravaileId?: string;
  planTravaile?: PlanTravailItem[];
}
export interface TacheEtObjectifInitialState {
  tacheEtObjectifList: TacheEtObjectifItem[];
  tacheEtObjectif: TacheEtObjectifItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
