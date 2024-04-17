export interface CalculPileItem {
    id?: string;
    appareil?:       string;
    type?:          string;
    nombreAppareil?: number;
    nombrePile?:     number;
    change?:        string;
    nombrePack?:    number
}
export interface CalculPileInitialState {
    calculPileList: CalculPileItem[];
    calculPile: CalculPileItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
