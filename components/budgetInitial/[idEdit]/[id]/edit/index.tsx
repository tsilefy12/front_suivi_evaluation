import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import { editBudgetInitial } from "../../../../../redux/features/budgetInitial";
import AddNewBudgetInitial from "../../../add/AddNewBudgetInitial";
import useFetchGrants from "../../../../GrantsEnCours/hooks/getGrants";

const EditBudgetInitial = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fetchGrant = useFetchGrants();
  const { error } = useAppSelector((state) => state.budgetInitial);

  useEffect(() => {
    fetchGrant();
    if (router.query.id) {
      getBudgetInitial(router.query.id as string);
    }
  }, [router.query]);

  const getBudgetInitial = async (id: string) => {
    await dispatch(editBudgetInitial({ id }));
  };

  return (
    <div>
      {error && (
        <div>
          Error: {error.message} (Status: {error.status})
        </div>
      )}
      <AddNewBudgetInitial />
    </div>
  );
};

export default EditBudgetInitial;
