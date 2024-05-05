import { useRouter } from "next/router";
import { useEffect } from "react";
import AddNewTacheCle from "../../add/AddNewTacheEtObjectifs";
import { useAppDispatch } from "../../../../../../hooks/reduxHooks";
import { editTacheEtObjectifs, getTacheEtObjectifs } from "../../../../../../redux/features/tachesEtObjectifs";
import AddNewTacheEtObjectifs from "../../add/AddNewTacheEtObjectifs";

const EditTacheCle = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (router.query.idT) {
            getTacheCle(router.query.idT as string);
        }
    }, [router.query]);

    const getTacheCle = async (id: string) => {
        await dispatch(editTacheEtObjectifs({ id }));
    };
    return (
        <AddNewTacheEtObjectifs></AddNewTacheEtObjectifs>
    );
}

export default EditTacheCle;
