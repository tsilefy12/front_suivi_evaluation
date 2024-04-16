import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import {
  // getMissionCopieList,
  getMissionListe,
} from "../../../../redux/features/mission";

const useFetchMissionListe = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return () => {
    let args: any = {};
    if (router.query.search) {
      args.where = {
        OR: [
          {
            descriptionMission: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
        ],
      };
    }
    if (router.query.orderBy && router.query.order) {
      args.orderBy = {
        [<string>router.query.orderBy]: router.query.order,
      };
    }
    dispatch(getMissionListe({ args }));
  };
};

export default useFetchMissionListe;
