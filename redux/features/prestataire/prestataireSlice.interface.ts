export interface PrestataireItem {
  id?: string;
  name?: string;
  surname?: string;
  photoURL?: string;
  gender?: string;
  matricule?: string;
  birthdate?: string;
  birthplace?: string;
  address?: string;
  cin?: string;
  registrationDateCIN?: string;
  locationOfDeliveryCIN?: string;
  CNAPS?: string;
  numOSIE?: string;
  hiringDate?: string;
  phone?: string;
  email?: string;
  additionalContact?: string;
  bank?: string;
  bankCodeNumber?: string;
  debaucheryDate?: string;
  bankAccountNumber?: string;
  bankCodeAgency?: string;
  RIBKey?: string;
  bankLoan?: false;
  loanStartDate?: string;
  loanEndDate?: string;
  numberOfChildren?: number;
  workplaceId?: string;
}

export interface PrestataireInitialState {
  prestataireListe: PrestataireItem[];
  prestataire: PrestataireItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
