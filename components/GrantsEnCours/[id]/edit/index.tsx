import { useRouter } from "next/router";
import { useEffect } from "react";
import { editGrantEncours } from "../../../../redux/features/grantEncours";
import AddNewGrantsEnCours from "../../add/AddNewGrantsEnCours";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";

const EditGrant = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
      if (router.query.id) {
          getGrant(router.query.id as string);
      }
  }, [router.query]);

  const getGrant = async (id: string) => {
      await dispatch(editGrantEncours({ id }));
  };
  return <AddNewGrantsEnCours></AddNewGrantsEnCours>;
};
export default EditGrant;