export interface SiteItem {
    id?: number;
    lieu?: string;
    objectifAnnuelId?: string;
    but?: string;
}
export interface SiteInitialState {
    sitelist: SiteItem[];
    site: SiteItem
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}