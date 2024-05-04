export interface PrevisionDepenseItem {
    id?: string;
    date?: Date;
    libelle?: string;
    nombre?: number;
    pu?: number;
    montant?: number;
    imprevue?: number;
    grant?: number;
    ligneBudgetaire?: number;
    regleme?: string;
    missionId?: string;
}
export interface PrevisionDepenseInitialState {
    previsionDepenselist: PrevisionDepenseItem[];
    previsionDepense: PrevisionDepenseItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
