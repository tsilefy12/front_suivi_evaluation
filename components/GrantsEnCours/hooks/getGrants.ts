import { useRouter } from "next/router";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { getGrantEncoursList } from "../../../redux/features/grantEncours";

const useFetchGrants = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return async () => {
    let args: any = {
      include: {
        budgetLines: true,
        journalBanks: true,
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
    await dispatch(getGrantEncoursList({ args }));
  };
};

export default useFetchGrants;
