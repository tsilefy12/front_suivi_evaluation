import { SiteItem } from "../site/site.interface";
import { TacheEtObjectifItem } from "../tachesEtObjectifs/tacheETObjectifs.interface";

export interface PlanTravailItem {
  id?: string;
  title?: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
  projectId?: number;
  TacheCle?: TacheEtObjectifItem[];
}
export interface PlanTravailInitialState {
  planTravaillist: PlanTravailItem[];
  planTravail: PlanTravailItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
