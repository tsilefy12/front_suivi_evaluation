import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getEmployes } from "../../../../redux/features/employe/employeSlice";
// import { getEmployees } from "../../../../redux/features/mission";

/**
 * @description Hook to fetch employees
 */
const useFetchEmployes = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return async () => {
    let args: any = {};
    if (router.query.search) {
      args.where = {};
    }
    if (router.query.orderBy && router.query.order) {
      args.orderBy = {
        [<string>router.query.orderBy]: router.query.order,
      };
    }
    await dispatch(getEmployes({ args }));
  };
};

export default useFetchEmployes;
