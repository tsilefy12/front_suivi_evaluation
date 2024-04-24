import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import AddNewMission from "../../add/AddNewMission";
import { editMission } from "../../../../../redux/features/mission";

const EditMission = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
      if (router.query.id) {
        getMission(router.query.id as string);
      }
  }, [router.query]);

  const getMission = async (id: string) => {
      await dispatch(editMission({ id }));
  };
  return <AddNewMission></AddNewMission>;
};
export default EditMission;