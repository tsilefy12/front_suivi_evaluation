export interface ProgrammeRHItem {
  id?: number;
  name?: string;
  managerId?: number;
}

export interface ProgrammeRHInitialState {
  programmeRHList: ProgrammeRHItem[];
  programmeRH: ProgrammeRHItem;
  isEditing: boolean;
  loading: boolean;
  error: any;
}
