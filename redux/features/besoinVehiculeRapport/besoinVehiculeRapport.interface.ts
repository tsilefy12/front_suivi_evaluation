export interface BesoinvehiculeRapportItem {
    id?: string;
    dateDebut?: Date;
    dateFin?: Date;
    vehicule?: string;
    trajet?: string;
    responsable?: string[];
    nombreJour?: number;
    missionId?: string;
}
export interface BesoinVehiculeRapportInitialState {
    besoinVehiculeRapportList: BesoinvehiculeRapportItem[];
    besoinVehiculeRapport: BesoinvehiculeRapportItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
