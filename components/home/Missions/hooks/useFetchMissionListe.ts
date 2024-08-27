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
    let args: any = {
      include: {
        validationPrevision: true,
        validationRapport: true,
        activites: true,
        livrables: true,
        previsionDepense: true,
        rapportDepense: true,
        uncompleteTbbs: true,
        lieux: true,
        missionLocation: true,
        resumeDepensePrevue: true,
        rapportFinance: true,
        rapportTechnique: true,
        notify: true,
        missionGoals: true,
        exceptedResults: true,
        plannedActivities: true,
      },
    };
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
