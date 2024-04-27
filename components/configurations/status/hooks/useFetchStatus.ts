import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getStatuslist } from "../../../../redux/features/status";

const useFetchStatus = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return  async () => {
    let args: any = {};
    if (router.query.search) {
      args.where = {
        OR: [],
      };
    }

    if (router.query.orderBy && router.query.order) {
      switch (router.query.orderBy) {
        default:
          args.orderBy = {
            [<string>router.query.orderBy]: router.query.order,
          };
          break;
      }
    }
    await dispatch(getStatuslist({ args }));
  };
};

export default useFetchStatus;
