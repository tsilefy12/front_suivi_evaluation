import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch } from "../../../../../../hooks/reduxHooks";
import ObjectifsGeneralForm from "../../add/addObjectifGeneral";
import { editObjectifGeneral } from "../../../../../../redux/features/objectifGeneral";

const EditObjectifGeneral = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (router.query.id) {
            getObjectifGeneral(router.query.id as string);
        }
    }, [router.query]);

    const getObjectifGeneral = async (id: string) => {
        await dispatch(editObjectifGeneral({ id }));
    };
    return (
        <ObjectifsGeneralForm></ObjectifsGeneralForm>
    );
}

export default EditObjectifGeneral;
