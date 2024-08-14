export interface RapportTechniqueItem {
  id: string;
  missionId: string;
  pieceJointe: string;
}

export interface RapportTechniqueInitialState {
  rapportTechniqueList: RapportTechniqueItem[];
  rapportTechnique: {};
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}