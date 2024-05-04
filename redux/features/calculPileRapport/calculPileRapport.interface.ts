export interface CalculPileRapportItem {
    id?: string;
    appareil?:       string;
    type?:          string;
    nombreAppareil?: number;
    nombrePile?:     number;
    change?:        string;
    nombrePack?:    number;
    missionId?: string;
}
export interface CalculPileRapportInitialState {
    calculPileRapportList: CalculPileRapportItem[];
    calculPileRapport: CalculPileRapportItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
