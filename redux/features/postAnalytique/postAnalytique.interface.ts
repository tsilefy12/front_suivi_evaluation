export interface PostAnalytiqueItem {
    id?: number;
    name?: string;
}
export interface PostAnalytiqueInitialState {
    postAnalytiqueList: PostAnalytiqueItem[];
    postAnalytique: PostAnalytiqueItem
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}