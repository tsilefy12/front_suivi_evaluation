export interface TachCleItem {
    id?: string;
    tacheCle?: string;
    projet?: number;
    responsable?: string;
    planTravaileId?: string;
    planTravaile?: any;
}
export interface TacheCleInitialState {
    tacheClelist: TachCleItem[];
    tacheCle: TachCleItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
