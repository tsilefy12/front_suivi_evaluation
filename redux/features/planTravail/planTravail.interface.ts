import { CloturePTAItem } from "../cloturePTA/cloturePTA.interface";
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
  clotures?: CloturePTAItem[];
}
export interface PlanTravailInitialState {
  planTravaillist: PlanTravailItem[];
  planTravail: PlanTravailItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
