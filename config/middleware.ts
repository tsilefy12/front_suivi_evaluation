import { useAppSelector } from "../hooks/reduxHooks";
import { PermissionType } from "../redux/features/auth/authSlice.interface";

export const usePermitted = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (service: string, permissionType: PermissionType) => {
    return user?.groups
      ?.find((g) => g.service.name === service)
      ?.permissionTypes.includes(permissionType);
  };
};
