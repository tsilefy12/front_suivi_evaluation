export interface TacheEtObjectifItem {
    id?: string;
    sn?: string;
    keyTasks?: string;
    statusId?: number;
    timeFrame?: string;
    responsableId?: string;
    expectedResult? : string;
    resources?:string;
    participantsId?: string;
    notes?: string;
    startDate? : Date;
    endDate? : Date;
    planTravaileId?: string;
    planTravaile?: any;

}
export interface TacheEtObjectifInitialState {
    tacheEtObjectifList: TacheEtObjectifItem[];
    tacheEtObjectif: TacheEtObjectifItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
