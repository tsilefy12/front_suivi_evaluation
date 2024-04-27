export interface StatusItem {
    id?: number;
    status?: string;
}
export interface StatusInitialState {
    statuslist: StatusItem[];
    statut: StatusItem
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}