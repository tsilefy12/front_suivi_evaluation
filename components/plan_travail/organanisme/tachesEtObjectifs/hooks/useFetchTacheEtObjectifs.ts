import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import { getTacheEtObjectifsList } from "../../../../../redux/features/tachesEtObjectifs";

const useFetchTacheEtObjectifs = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return async () => {
    let args: any = {
      include: {
        objectifAnnuel: true,
        planTravaile: true,
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
    await dispatch(getTacheEtObjectifsList({ args }));
  };
};

export default useFetchTacheEtObjectifs;
