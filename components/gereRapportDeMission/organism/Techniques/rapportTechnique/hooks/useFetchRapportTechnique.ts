import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../../../hooks/reduxHooks";
import { getRapportTechniqueList } from "../../../../../../redux/features/rapportTechnique/useCase/getRapportTechnique";

const useFetchRapportTechnique = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return async () => {
    const args: any = {};
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
    await dispatch(getRapportTechniqueList({ args }));
  };
};
export default useFetchRapportTechnique;
