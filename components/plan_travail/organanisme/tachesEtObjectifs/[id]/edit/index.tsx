import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAppDispatch } from "../../../../../../hooks/reduxHooks";
import { editTacheEtObjectifs } from "../../../../../../redux/features/tachesEtObjectifs";
import AddNewTacheEtObjectifs from "../../add/AddNewTacheEtObjectifs";

const EditTacheCle = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      getTacheCle(id as string);
    }
  }, [router.query]);

  const getTacheCle = async (id: string) => {
    await dispatch(
      editTacheEtObjectifs({
        id,
        args: {
          include: {
            objectifAnnuel: true,
          },
        },
      })
    );
  };
  return <AddNewTacheEtObjectifs></AddNewTacheEtObjectifs>;
};

export default EditTacheCle;
