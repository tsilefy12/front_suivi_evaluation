export interface TypeItem {
    id?: number;
    name?: string;
}

export interface TypeInitialState {
    typeList: TypeItem[];
    type: TypeItem
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}