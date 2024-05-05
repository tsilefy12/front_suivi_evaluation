import { useRouter } from "next/router";
import { getObjectifAnnuelslist } from "../../../../../../../redux/features/objectifAnnuels";
import { useAppDispatch } from "../../../../../../../hooks/reduxHooks";

const useFetchObjectifsAnnuel = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return async () => {
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
    await dispatch(getObjectifAnnuelslist({ args }));
  };
};

export default useFetchObjectifsAnnuel;
