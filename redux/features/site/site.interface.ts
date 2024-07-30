import { PlanTravailItem } from "../planTravail/planTravail.interface";

export interface SiteItem {
  id?: string;
  lieu?: string;
}
export interface SiteInitialState {
  sitelist: SiteItem[];
  site: SiteItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
