import { useRouter } from "next/router";
import { useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { editGrantAdmin } from "../../../../redux/features/grantAdmin";
import AddNewGrantsAdmin from "../../add/AddNewGrantsMonitoring";

const EditGrantAdmin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router.query.id) {
      getGrantAdmin(router.query.id as string);
    }
  }, [router.query]);

  const getGrantAdmin = async (id: string) => {
    await dispatch(editGrantAdmin({ id }));
  };
  return <AddNewGrantsAdmin></AddNewGrantsAdmin>;
};

export default EditGrantAdmin;
