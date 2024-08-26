import { LivrableRapportItem } from "../LivrableRapport/livrableRapport.interface";
import { PrevisionDepenseItem } from "../PrevisionDepense/previsionDepense.interface";
import { ActiviteRapportItem } from "../activitesRapport/activiteRapport.interface";
import { EmployeItem } from "../employe/employeSlice.interface";
import { LieuxRapportItem } from "../lieuxRapport/lieuxRapport.interface";
import { MissionLocationItem } from "../missionLocation/missionLocationSlice.interface";
import { NotifyItem } from "../notify/notify.interface";
import { RapportDepenseItem } from "../rapportDepense/rapportDepense.interface";
import { RapportFinanceItem } from "../rapportFinance/rapportFinance.interface";
import { RapportTechniqueItem } from "../rapportTechnique/rapportTechnique.interface";
import { ResumeDepenseItem } from "../resumeDepense/reumeDepense.interface";
import { ResumeDepensePrevueItem } from "../resumeDepensePrevue/reumeDepensePrevue.interface";
import { UnCompleteTbbItem } from "../unCompleteTbb/unCompleteTbb.interface";

export interface MissionItem {
  id?: string;
  budgetManager?: EmployeItem[];
  missionManager?: EmployeItem[];
  budgetManagerId?: string[];
  missionManagerId?: string;
  descriptionMission?: string;
  reference?: string;
  verifyFinancial?: string;
  verifyTechnic?: string;
  validateFinancial?: string;
  RefBudget?: string;
  dateDebut?: Date;
  dateFin?: Date;
  dateRF?: Date;
  status?: string;
  validateLogistic?: string;
  retenuAdmin?: number;
  moyenRemise?: string;
  depenseAdmin?: number;
  depensesResp?: number;
  activites?: ActiviteRapportItem[];
  livrables?: LivrableRapportItem[];
  previsionDepense?: PrevisionDepenseItem[];
  rapportDepense?: RapportDepenseItem[];
  validationPrevision?: {
    responsableId: string;
    missionId: string;
    validation: boolean;
    type: string;
  }[];
  validationRapport?: {
    responsableId: string;
    missionId: string;
    validation: boolean;
    type: string;
  }[];
  validationLogistique?: {
    responsableId: string;
    missionId: string;
    validation: boolean;
    type: string;
  }[];
  [x: string]: any;
  uncompleteTbbs?: UnCompleteTbbItem[];
  lieux?: LieuxRapportItem[];
  resumeDepense?: ResumeDepenseItem[];
  missionLocation?: MissionLocationItem[];
  resumeDepensePrevue?: ResumeDepensePrevueItem[];
  rapportFinance?: RapportFinanceItem[];
  rapportTechnique?: RapportTechniqueItem[];
  notify?: NotifyItem[];
}

export interface MissionInitialState {
  missionListe: MissionItem[];
  mission: MissionItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
  // employeeList: [];
}
