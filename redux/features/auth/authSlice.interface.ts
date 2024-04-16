export interface AuthInitialState {
  isLogedIn: boolean;
  user: {
    id?: string;
    email?: string;
    name?: string;
    profileImageUrl?: string;
    employeeId?: string;
  } | null;
  linkedEmployee?: any;
}
