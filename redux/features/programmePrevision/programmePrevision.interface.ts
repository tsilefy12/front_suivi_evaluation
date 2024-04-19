export interface ProgrammePrevisionItem {
    id?: string;
    dateDebut?: Date;
    dateFin?: Date;
    activitePrevue?: string;
    livrable?: string;
    responsable?: string;
    missionId?: string;
}
export interface ProgrammePrevisionInitialState {
    programmePrevisionList: ProgrammePrevisionItem[];
    programmePrevision: ProgrammePrevisionItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}