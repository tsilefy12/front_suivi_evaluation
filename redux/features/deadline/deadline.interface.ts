export interface DeadlineItem {
  id?: string;
  grantId?: number;
  deadline?: Date;
  startDate?: Date;
  endDate?: Date;
  dateTech?: Date;
  dateFinance?: Date;
  responsable?: string;
  notes?: string;
}
export interface DeadlineInitialState {
  deadlinelist: DeadlineItem[];
  deadlines: DeadlineItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
