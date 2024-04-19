export interface AutreInfoPrevisionItem {
    id?: string;
    assurance?: string;
    visiteTechnique?: string;
    voiture?: string;
    centureSecurite?: string
    missionId?: string;
}
export interface AutreInfoPrevisionInitialState {
    autreInfoPrevisionList: AutreInfoPrevisionItem[];
    autreInfoPrevision: AutreInfoPrevisionItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}