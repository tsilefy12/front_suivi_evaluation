import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../../../hooks/reduxHooks";
import { getAutreInfoRapportList } from "../../../../../../redux/features/autreInfoRapport";

const useFetchAutreInfoRapport = () => {
  const router = useRouter();
  const dispatch: any = useAppDispatch();

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
    await dispatch(getAutreInfoRapportList({ args }));
  };
};
export default useFetchAutreInfoRapport;
