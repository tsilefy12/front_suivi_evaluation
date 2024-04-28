export interface ProgrammeRapportItem {
    id?: string;
    dateDebut?: Date;
    dateFin?: Date;
    activitePrevueR?: string;
    livrableR?: string;
    responsableR?: string;
    missionId?: string;
}
export interface ProgrammeRapportInitialState {
    programmeRapportList: ProgrammeRapportItem[];
    programmeRapport: ProgrammeRapportItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}