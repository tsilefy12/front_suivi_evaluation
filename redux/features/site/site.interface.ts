export interface SiteItem {
    id?: string;
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