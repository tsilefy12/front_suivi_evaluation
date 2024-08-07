import { TacheEtObjectifItem } from "../tachesEtObjectifs/tacheETObjectifs.interface";

export interface ObjectifAnnuelItem {
  id?: string;
  objectiveTitle?: string;
  year?: number;
  taskAndObjectiveId?: string;
  tacheCle?: TacheEtObjectifItem[];
  notes?: { siteId: string; objectifAnnuelId: string; note: number }[];
}
export interface ObjectifAnnuelsInitialState {
  objectifsAnnuelList: ObjectifAnnuelItem[];
  objectisfAnnuel: ObjectifAnnuelItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
