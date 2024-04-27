export interface ProjectItem {
    id?: string;
    title?: string;
    descriptionEn?: string;
    descriptionFr?: string;
}
export interface ProjectInitialState {
    projectList: ProjectItem[];
    project: ProjectItem
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}