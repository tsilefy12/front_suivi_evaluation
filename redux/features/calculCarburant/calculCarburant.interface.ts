export interface CalculCarburantItem {
    id?: string;
    trajet?: string;
    distance?: number;
    typeCarburant?: string;
    vehicule?: string;
    nombreTrajet?: number;
    distanceTotal?: number;
    consommationKilo?: number;
    totalCarburant?: number;
}
export interface CalculCarburantInitialState {
    calculCarburantList: CalculCarburantItem[];
    calculCarburant: CalculCarburantItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
