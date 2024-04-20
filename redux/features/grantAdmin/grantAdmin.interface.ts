export interface GrantAdminItem {
    id?: string;
    grant?: number;
    bailleur?: string;
}
export interface GrantAdminInitialState {
    grantAdminlist: GrantAdminItem[];
    grantAdmin: GrantAdminItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
