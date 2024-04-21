import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { editBudgetInitial } from "../../../redux/features/budgetInitial";
import AddNewBudgetInitial from "../add/AddNewBudgetInitial";

const EditBudgetInitial = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (router.query.id) {
            getBudgetInitial(router.query.id as string);
        }
    }, [router.query]);

    const getBudgetInitial = async (id: string) => {
        await dispatch(editBudgetInitial({ id }));
    };
    return (
        <AddNewBudgetInitial></AddNewBudgetInitial>
    );
}

export default EditBudgetInitial;
