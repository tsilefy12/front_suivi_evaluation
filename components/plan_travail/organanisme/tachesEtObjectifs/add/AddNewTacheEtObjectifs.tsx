import { Container, styled, Stack } from "@mui/material";
import React, { useState } from "react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import useFetchEmploys from "../../../../GrantsEnCours/hooks/getResponsable";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import {
  updateTacheEtObjectifs,
  createTacheEtObjectifs,
  getTacheEtObjectifsList,
} from "../../../../../redux/features/tachesEtObjectifs";
import { EmployeItem } from "../../../../../redux/features/employe/employeSlice.interface";
import { getStatuslist } from "../../../../../redux/features/status";
import NewTacheEtObjectifs from "./NewTacheEtObjectifs";
import {
  createObejectifAnnuel,
  deleteObjectifAnnuel,
  updateObjectifAnnuel,
} from "../../../../../redux/features/objectifAnnuels";
import { TacheEtObjectifItem } from "../../../../../redux/features/tachesEtObjectifs/tacheETObjectifs.interface";

const AddNewTacheEtObjectifs = () => {
  const router = useRouter();
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state: any) => state.employe);
  const { isEditing, tacheEtObjectif } = useAppSelector(
    (state) => state.tacheEtObjectifs
  );
  const dispatch = useAppDispatch();
  const [valuesArticle, setValuesArticle] = useState<any[]>([]);
  const [idDelete, setIdDelete] = useState<any[]>([]);

  const { idT }: any = router.query;
  const { id }: any = router.query;

  React.useEffect(() => {
    if (isEditing) {
      setValuesArticle((prev: any[]) => {
        console.log(prev);
        prev = tacheEtObjectif.objectifAnnuel!;
        return prev;
      });
    }
    fetchEmployes();
    dispatch(getStatuslist({}));
    dispatch(getTacheEtObjectifsList({}));
  }, [router.query]);

  const [selectedEmployes, setSelectedEmployes] = useState<EmployeItem[]>(
    isEditing
      ? employees.filter((employee: any) =>
          tacheEtObjectif?.participantsId?.includes(employee.id!)
        )
      : []
  );

  const generateSerialNumber = (items: TacheEtObjectifItem[]): string => {
    let maxSn = 0;
    items.forEach((item) => {
      if (item.sn) {
        const sn = parseInt(item.sn);
        if (!isNaN(sn) && sn > maxSn) {
          maxSn = sn;
        }
      }
    });
    const newSn = (maxSn + 1).toString().padStart(4, "0");
    return newSn;
  };

  const handleSubmit = async (values: any) => {
    values.participantsId = [...selectedEmployes.map((item) => item.id)];
    // console.log("valeur participant id :", values.participantId)
    if (!values.sn) {
      values.sn = generateSerialNumber([tacheEtObjectif]);
    }
    try {
      if (isEditing) {
        const res = await dispatch(
          updateTacheEtObjectifs({ idT, tacheEtObjectif })
        );
        if (valuesArticle.length > 0) {
          valuesArticle?.forEach((item: any, index: any) => {
            console.log("idT :", item.id);
            const idT = item.idT;
            const objectifAnnuels = {
              objectiveTitle: item.objectiveTitle,
              year: item.year,
              taskAndObjectiveId: res.payload.id,
            };
            if (idT) {
              dispatch(updateObjectifAnnuel({ id, objectifAnnuels }));
            } else {
              dispatch(createObejectifAnnuel(objectifAnnuels));
            }
          });
        }
        idDelete?.forEach((element: any, index: any) => {
          const id = element.id;
          dispatch(deleteObjectifAnnuel({ id }));
        });
      } else {
        const res = await dispatch(createTacheEtObjectifs(values));
        if (valuesArticle.length > 0) {
          valuesArticle.forEach((element: any, index: any) => {
            const newData = {
              objectiveTitle: element.objectiveTitle,
              year: element.year,
              taskAndObjectiveId: res.payload.id!,
            };
            dispatch(createObejectifAnnuel(newData));
          });
        }
      }
      dispatch(getTacheEtObjectifsList({}));
      router.push(`/plan_travail/${id}/tachesEtObjectifs`);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? tacheEtObjectif
            : {
                sn: isEditing ? tacheEtObjectif?.sn : "",
                keyTasks: isEditing ? tacheEtObjectif?.keyTasks : "",
                statusId: isEditing ? tacheEtObjectif?.statusId : "",
                timeFrame: isEditing ? tacheEtObjectif?.timeFrame : "",
                responsableId: isEditing ? tacheEtObjectif?.responsableId : "",
                expectedResult: isEditing
                  ? tacheEtObjectif?.expectedResult
                  : "",
                resources: isEditing ? tacheEtObjectif?.resources : "",
                participantsId: isEditing
                  ? tacheEtObjectif?.participantsId
                  : "",
                notes: isEditing ? tacheEtObjectif?.notes : "",
                startDate: isEditing
                  ? new Date(tacheEtObjectif?.startDate!)
                  : new Date(),
                endDate: isEditing
                  ? new Date(tacheEtObjectif?.endDate!)
                  : new Date(),
                planTravaileId: id,
                objectiveTitle: "",
                year: 0,
              }
        }
        validationSchema={Yup.object({
          keyTasks: Yup.string().required("Champ obligatoire"),
          resources: Yup.string().required("Champ obligatoire"),
          expectedResult: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => (
          <NewTacheEtObjectifs
            setIdDelete={setIdDelete}
            formikProps={formikProps}
            valuesArticle={valuesArticle}
            setValuesArticle={setValuesArticle}
            selectedEmployes={selectedEmployes}
            setSelectedEmployes={setSelectedEmployes}
          />
        )}
      </Formik>
    </Container>
  );
};

export default AddNewTacheEtObjectifs;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));
