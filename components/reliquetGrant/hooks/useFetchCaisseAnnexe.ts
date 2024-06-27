import { useRouter } from "next/router";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { getCaisse } from "../../../redux/features/reliquatGrants";

const useFetchCaiseeDas = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return async () => {
    const args = {
        include: {
          caisse: {
            include: {
              workplace: true
            }
          }
        }
    };
    await dispatch(getCaisse({ args }));
  };
};

export default useFetchCaiseeDas;
