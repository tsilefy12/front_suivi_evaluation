import { LivrableRapportItem } from "../LivrableRapport/livrableRapport.interface";
import { PrevisionDepenseItem } from "../PrevisionDepense/previsionDepense.interface";
import { ActiviteRapportItem } from "../activitesRapport/activiteRapport.interface";
import { RapportDepenseItem } from "../rapportDepense/rapportDepense.interface";

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
  previsionDepense?: PrevisionDepenseItem[];
  rapportDepense?: RapportDepenseItem[];
  validationPrevision?: {
    responsableId: string;
    missionId: string;
    validation: boolean;
  }[];
  validationRapport?: {
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
