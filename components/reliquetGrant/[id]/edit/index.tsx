import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { editPeriode } from "../../../../redux/features/periode";
import { editReliquatGrant } from "../../../../redux/features/reliquatGrants";
import AddNewReliquatsGrants from "../add/AddNewReliquatsGrants";

const EditReliquatGrant = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router.query.id) {
      getReliquate(router.query.id as string);
    }
  }, [router.query]);

  const getReliquate = async (id: string) => {
    await dispatch(editReliquatGrant({ id }));
  };
  return <AddNewReliquatsGrants></AddNewReliquatsGrants>;
};

export default EditReliquatGrant;
