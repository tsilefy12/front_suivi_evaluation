import { useRouter } from "next/router";
import { useEffect } from "react";
import AddNewTacheCle from "../../add/AddNewTacheEtObjectifs";
import { useAppDispatch } from "../../../../../../hooks/reduxHooks";
import { editTacheCle } from "../../../../../../redux/features/tachesEtObjectifs";

const EditTacheCle = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (router.query.id) {
            getTacheCle(router.query.id as string);
        }
    }, [router.query]);

    const getTacheCle = async (id: string) => {
        await dispatch(editTacheCle({ id }));
    };
    return (
        <AddNewTacheCle></AddNewTacheCle>
    );
}

export default EditTacheCle;
