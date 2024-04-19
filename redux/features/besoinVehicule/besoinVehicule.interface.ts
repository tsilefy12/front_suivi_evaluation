export interface BesoinvehiculeItem {
    id?: string;
    dateDebut?: Date;
    dateFin?: Date;
    vehicule?: string;
    trajet?: string;
    responsable?: string;
    nombreJour?: number;
    missionId?: string;
}
export interface BesoinVehiculeInitialState {
    besoinVehiculeList: BesoinvehiculeItem[];
    besoinVehicule: BesoinvehiculeItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
