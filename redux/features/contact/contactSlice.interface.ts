export interface ContactItem {
  id?: string;
  lastNameContact?: string;
  firstNameContact?: string;
  locationContact?: string;
  numberContact?: boolean;
  noteContact?: boolean;
  missionId?: string;
}

export interface ContactInitialState {
  contactList: ContactItem[];
  contact: ContactItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
