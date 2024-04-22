export interface ObjectifGeneralItem {
    id?: string;
    objectif?: string;
    planTravaileId?: string;
    planTravaile?: any;
}
export interface ObjectifGeneralInitialState {
    objectifGenerallist: ObjectifGeneralItem[];
    objectifGeneral: ObjectifGeneralItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
