export interface AutreInfoRapportItem {
    id?: string;
    assurance?: string;
    visiteTechnique?: string;
    voiture?: string;
    centureSecurite?: boolean;
    missionId?: string;
}
export interface AutreInfoRapportInitialState {
    autreInfoRapportList: AutreInfoRapportItem[];
    autreInfoRapport: AutreInfoRapportItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}