export interface InternsItem {
  matricule?: string;
  id?: string;
  name?: string;
  surname?: string;
  cin?: string;
  startDate?: string;
  endDate?: string;
  durationOfTheInternship?: string;
  address?: string;
  positionId?: string;
  internshipTypeId?: string;
  hiringDate?: string;
  photoURL?: string;
  phone?: string;
  email?: string;
  debaucheryDate?: string;
  programId?: string;
  indemnite?: boolean;
}

export interface InternshipInitialState {
  interns: InternsItem[];
  intern: InternsItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
