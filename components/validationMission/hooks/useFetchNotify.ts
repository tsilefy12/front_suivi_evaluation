import { useRouter } from "next/router";
import { getNotifyList } from "../../../redux/features/notify";
import { useAppDispatch } from "../../../hooks/reduxHooks";

const useFetchNotify = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return async () => {
    let args: any = {
      include: {
        missions: true,
      },
    };
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
    await dispatch(getNotifyList({ args }));
  };
};

export default useFetchNotify;
