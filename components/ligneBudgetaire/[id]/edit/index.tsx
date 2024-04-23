import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import AddNewBudgetLine from "../add";
import { editBudgetLine } from "../../../../redux/features/budgetLine";

const EditBudgetLine= () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
      if (router.query.id) {
        getBudgetLine(router.query.id as string);
      }
  }, [router.query]);

  const getBudgetLine = async (id: string) => {
      await dispatch(editBudgetLine({ id }));
  };
  return <AddNewBudgetLine></AddNewBudgetLine>;
};
export default EditBudgetLine;