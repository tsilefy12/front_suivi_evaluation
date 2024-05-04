import {
  Button,
  Container,
  styled,
  Typography,
  TextField,
  FormControl,
  Stack,
  Autocomplete,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import { SectionNavigation } from "../ListTacheEtObjectifs";
import { Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import useFetchEmploys from "../../../../GrantsEnCours/hooks/getResponsable";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/reduxHooks";
import { updateTacheEtObjectifs, createTacheEtObjectifs, getTacheEtObjectifsList } from "../../../../../redux/features/tachesEtObjectifs";
import { EmployeItem } from "../../../../../redux/features/employe/employeSlice.interface";
import useFetchProject from "../../../../GrantsEnCours/hooks/getProject";
import OSTextField from "../../../../shared/input/OSTextField";
import OSSelectField from "../../../../shared/select/OSSelectField";
import { cancelEdit } from "../../../../../redux/features/tachesEtObjectifs/tacheEtObjectifsSlice";
import { getStatuslist } from "../../../../../redux/features/status";
import OSDatePicker from "../../../../shared/date/OSDatePicker";
import NewTacheEtObjectifs from "./NewTacheEtObjectifs";
import { createObejectifAnnuel, updateObjectifAnnuel } from "../../../../../redux/features/objectifAnnuels";

const AddNewTacheEtObjectifs = () => {
    const router = useRouter();
    const fetchEmployes = useFetchEmploys();
    const { employees } = useAppSelector((state: any) => state.employe)
    const { isEditing,  tacheEtObjectif } = useAppSelector((state) => state.tacheEtObjectifs)
    const dispatch = useAppDispatch();
    const [ valuesArticle, setValuesArticle ] = useState < any[]> ([])
    const [ idDelete,setIdDelete] = useState < any[]> ([])

    const { idT }: any = router.query;
    const { id }: any = router.query;

    React.useEffect(() => {
        fetchEmployes();
        dispatch(getStatuslist({}))
        dispatch(getTacheEtObjectifsList({}))
    }, [router.query])
  
    const [selectedEmployes, setSelectedEmployes] = useState<EmployeItem[]>(
        isEditing
            ? employees.filter((employee: any) =>
                tacheEtObjectif?.participantsId?.includes(employee.id!)
            )
            : []
    );
    const handleSubmit = async (values: any) => {
        values.participantsId = [...selectedEmployes.map((item) => item.id)]
        console.log("valeur participant id :", values.participantId)

        try {
            if (isEditing) {
               const res =   await dispatch(
                updateTacheEtObjectifs({idT, tacheEtObjectif }))
                console.log("value article :", valuesArticle)
                    if (valuesArticle.length > 0) {
                        valuesArticle?.forEach((item: any, index: any) =>{
                            console.log("idT :", item.id)
                            const idT = item.idT
                            if (idT) {
                                const objectifAnnuels = {
                                    objectiveTitle:item.objectiveTitle,
                                    year:item.year,
                                    taskAndObjectiveId:res.payload.id
                                };
                                dispatch(updateObjectifAnnuel({id, objectifAnnuels}))
                            }
                        })
                    }
            } else {
                const res = await dispatch(createTacheEtObjectifs(values));
                if(valuesArticle.length > 0 ){
                    valuesArticle.forEach((element:any, index:any) => {
                        const newData = {
                            objectiveTitle: element.objectiveTitle,
                            year: element.year,
                            taskAndObjectiveId: res.payload.id!
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
                                timeFrame: isEditing ? tacheEtObjectif?.timeFrame: "",
                                responsableId: isEditing ? tacheEtObjectif?.responsableId : "",
                                expectedResult: isEditing ? tacheEtObjectif?.expectedResult : "",
                                resources: isEditing ? tacheEtObjectif?.resources : "",
                                participantsId: isEditing ? tacheEtObjectif?.participantsId : "",
                                notes: isEditing ? tacheEtObjectif?.notes : "",
                                startDate:isEditing ? new Date(tacheEtObjectif?.startDate!): new Date(),
                                endDate: isEditing ? new Date(tacheEtObjectif?.endDate!) : new Date(),
                                planTravaileId: id,
                                // objectiveTitle:"",
                                year:0
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
                {(formikProps) =><NewTacheEtObjectifs setIdDelete={setIdDelete} formikProps={formikProps} valuesArticle={valuesArticle} 
                setValuesArticle={setValuesArticle} selectedEmployes={selectedEmployes} setSelectedEmployes={setSelectedEmployes}/>}
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

const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));

const FormContainer = styled(Stack)(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
  background: "#fff",
}));
