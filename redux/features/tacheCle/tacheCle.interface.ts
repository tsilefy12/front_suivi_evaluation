export interface TachCleItem {
    id?: string;
    tacheCle?: string;
    projet?: number;
    responsable?: string;
}
export interface TacheCleInitialState {
    tacheClelist: TachCleItem[];
    tacheCle: TachCleItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
