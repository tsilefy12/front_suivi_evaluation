export interface MissionItem {
  id?: string;
  budgetManager?: any;
  missionManager?: any;
  budgetManagerId?: string;
  missionManagerId?: string;
  descriptionMission?: string;
  reference?: string;
  grantId?: number;
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
