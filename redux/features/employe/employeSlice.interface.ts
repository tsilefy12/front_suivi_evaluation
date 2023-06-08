export interface EmployeInitialState {
  employees: EmployeItem[];
  employe: EmployeItem;
  linkedUser: {};
  isEditing: boolean;
  loading: boolean;
  error: any;
  form: EmployeFormItem;
}

export interface EmployeFormItem {
  users:
    | [
        {
          id?: string;
          name?: string;
          email?: string;
          active?: boolean;
          profileImageUrl?: string;
          employeeId?: string;
        }
      ]
    | any[];
}

export interface EmployeItem {
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
  bankAccountNumber?: string;
  bankCodeAgency?: string;
  RIBKey?: string;
  bankLoan?: false;
  loanStartDate?: string;
  loanEndDate?: string;
  numberOfChildren?: number;
  workplaceId?: string;
  programId?: string;
  categoryId?: string;
  classId?: string;
  echelonId?: string;
  osieId?: string;
  managerId?: string;
  positionId?: string;
  userId?: string;
  dateOfDuplicateCIN?: string;
  maritalStatus?: string;
  passportNumber?: string;
  passportDeliveryDate?: string;
  passportExpirationDate?: string;
  passportDeliveryAuthority?: string;
  dirversLicenseNumber?: string;
  dirversLicenseExpirationDate?: string;
  dirversLicenseDeliveryDate?: string;
  diversLicenseDeliveryAuthority?: string;
}
