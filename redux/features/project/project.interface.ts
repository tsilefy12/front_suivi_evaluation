export interface ProjectItem {
    id?: string;
    titleFr?: string;
    titleEn?: string;
}
export interface ProjectInitialState {
    projectList: ProjectItem[];
    project: ProjectItem
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}