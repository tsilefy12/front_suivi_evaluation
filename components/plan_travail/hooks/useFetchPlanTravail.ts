import { useRouter } from "next/router";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { getPlanTravaillist } from "../../../redux/features/planTravail";

const useFetchPlanTravaile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return async () => {
    let args: any = {
      include: {
        TacheCle: {
          include: {
            objectifAnnuel: {
              include: {
                notes: true,
              }
            }
          }
        }
      }
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
    await dispatch(getPlanTravaillist({ args }));
  };
};

export default useFetchPlanTravaile;
