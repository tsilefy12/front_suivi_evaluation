import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../../../hooks/reduxHooks";
import { getObjectifRapportlist } from "../../../../../../redux/features/objectifRapport";
import { getProgrammeRapportList } from "../../../../../../redux/features/programmeRapport";

const useFetchProgrammeRapport = () => {
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
    await dispatch(getProgrammeRapportList({ args }));
  };
};

export default useFetchProgrammeRapport;
