export interface OrganisationItem {
    id?: number;
    name?: string;
}

export interface OrganisationInitialState {
    organisationList: OrganisationItem[];
    organisation: OrganisationItem
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}