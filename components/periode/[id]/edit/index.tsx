import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { editPeriode } from "../../../../redux/features/periode";
import AddNewPeriodeGrants from "../../add/AddNewPeriodeGrants";

const EditPeriode = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (router.query.id) {
            getPeriode(router.query.id as string);
        }
    }, [router.query]);

    const getPeriode = async (id: string) => {
        await dispatch(editPeriode({ id }));
    };
    return (
        <AddNewPeriodeGrants></AddNewPeriodeGrants>
    );
}

export default EditPeriode;
