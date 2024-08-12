import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import AddNewGrantsAdmin from "../../add/AddNewGrantsAdmin";
import { editGrantEncours } from "../../../../redux/features/grantEncours";

const EditGrantAdmin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router.query.id) {
      getGrantAdmin(router.query.id as string);
    }
  }, [router.query]);

  const getGrantAdmin = async (id: string) => {
    await dispatch(editGrantEncours({ id }));
  };
  return <AddNewGrantsAdmin></AddNewGrantsAdmin>;
};

export default EditGrantAdmin;
