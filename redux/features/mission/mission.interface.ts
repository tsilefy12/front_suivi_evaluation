import { LivrableRapportItem } from "../LivrableRapport/livrableRapport.interface";
import { ActiviteRapportItem } from "../activitesRapport/activiteRapport.interface";

export interface MissionItem {
  id?: string;
  budgetManager?: any;
  missionManager?: any;
  budgetManagerId?: string;
  missionManagerId?: string;
  descriptionMission?: string;
  reference?: string;
  grantId?: number;
  dateDebut?: Date;
  dateFin?: Date;
  status?: string;
  activites?: ActiviteRapportItem[];
  livrables?: LivrableRapportItem[];
  validationPrevision: {
    responsableId: string;
    missionId: string;
    validation: boolean;
  }[];
  validationRapport: {
    responsableId: string;
    missionId: string;
    validation: boolean;
  }[];
  [x: string]: any;
}

export interface MissionInitialState {
  missionListe: MissionItem[];
  mission: MissionItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
  // employeeList: [];
}
