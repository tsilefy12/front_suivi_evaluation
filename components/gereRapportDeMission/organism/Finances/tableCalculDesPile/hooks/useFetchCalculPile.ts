import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../../../hooks/reduxHooks";
import { getResumeDepense, getResumeDepenseList } from "../../../../../../redux/features/resumeDepense";
import { getCalculPileList } from "../../../../../../redux/features/calculPile";
import { getCalculPileRapportList } from "../../../../../../redux/features/calculPileRapport";

const useFetchCalculPileRapportList = () => {
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
    await dispatch(getCalculPileRapportList({ args }));
  };
};

export default useFetchCalculPileRapportList;
