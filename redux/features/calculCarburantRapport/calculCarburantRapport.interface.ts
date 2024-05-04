export interface CalculCarburantRapportItem {
    id?: string;
    trajet?: string;
    distance?: number;
    typeCarburant?: string;
    vehicule?: string;
    nombreTrajet?: number;
    distanceTotal?: number;
    consommationKilo?: number;
    totalCarburant?: number;
    missionId?: string;
}
export interface CalculCarburantRapportInitialState {
    calculCarburantRapportList: CalculCarburantRapportItem[];
    calculCarburantRapport: CalculCarburantRapportItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
