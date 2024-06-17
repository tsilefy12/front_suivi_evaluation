export interface AuthInitialState {
  isLogedIn: boolean;
  user: {
    id?: string;
    email?: string;
    name?: string;
    profileImageUrl?: string;
    employeeId?: string;
    groups?: Group[];
  } | null;
  linkedEmployee?: any;
}

export type PermissionType = "RA" | "RM" | "C" | "U" | "D";
interface Group {
  code: string;
  name: string;
  permissionTypes: PermissionType[];
  service: Service;
}

interface Service {
  name: string;
}
