export interface GrantEncoursItem {
    id?: string;
    code?: string;
    posteAnalytique?: string;
    bailleur?: string;
    projetEnFrancais?: string;
    projetEnAnglais?: string;
    dateDebut?: Date;
    dateFin?: Date;
    duree?: number;
    compteBanque?: string;
    responsable?: string;
    seuil?: number;
    montantEnDevise?: number;
    montantEnMGA?: number;
  }
  
  export interface GrantEncoursInitialState {
    grantEncoursList: GrantEncoursItem[];
    grantEncours: GrantEncoursItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
  }
  