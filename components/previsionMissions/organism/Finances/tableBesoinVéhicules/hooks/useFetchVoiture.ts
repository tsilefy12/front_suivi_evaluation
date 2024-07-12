import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../../../hooks/reduxHooks";
import { getBesoinVehiculeList } from "../../../../../../redux/features/besoinVehicule";
import { getTransportationEquipments } from "../../../../../../redux/features/transportation_equipment";

const useFetchVoiture = () => {
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
    await dispatch(getTransportationEquipments({ args }));
  };
};

export default useFetchVoiture;
