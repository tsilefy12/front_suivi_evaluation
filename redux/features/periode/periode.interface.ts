export interface PeriodeItem {
  id?: string;
  periode?: string;
  montant?: number;
  grant?: number;
  debut?: Date;
  fin?: Date;
  deadline?: Date;
  notes?: string;
  dateFinance?: Date;
  dateTechnic?: Date;
}
export interface PeriodeInitialState {
  periodelist: PeriodeItem[];
  periode: PeriodeItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
