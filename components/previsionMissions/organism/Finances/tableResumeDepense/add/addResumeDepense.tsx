import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { createResumeDepense, updateResumeDepense } from "../../../../../../redux/features/resumeDepense";
import useFetchResumeDepenseList from "../hooks/useFetchResumeDepense";
import OSSelectField from "../../../../../shared/select/OSSelectField";
import useFetchGrants from "../../../../../GrantsEnCours/hooks/getGrants";
import useFetchBudgetLine from "../../tablePrevision/hooks/useFetchbudgetLine";
import OSTextField from "../../../../../shared/input/OSTextField";
import { cancelEdit } from "../../../../../../redux/features/resumeDepense/resumeDepenseSlice";

const AddResumeDepense = ({ handleClose }: any) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { id }: any = router.query;
  const { isEditing, resumeDepense } = useAppSelector((state) =>state.resumeDepense) 
  const fetchResumeDepense = useFetchResumeDepenseList();
  const fetchGrant = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const fetchBudgetLine = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector((state) => state.budgetLine)

  React.useEffect(() =>{
    fetchResumeDepense();
    fetchBudgetLine();
    fetchGrant();
  }, [router.query])

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateResumeDepense({
            id: resumeDepense.id!,
            resumeDepense: values,
          })
        );
      } else {

        await dispatch(createResumeDepense(values));
      }
      fetchResumeDepense();
      handleClose();
    } catch (error) {
      console.log("error", error);
    }
  };
  const listPardefaut = [
    { id: 1, name: "vide" }
  ]
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? resumeDepense
            : {
              grant: isEditing ? resumeDepense?.grant : "",
              depensePrevue: isEditing ? resumeDepense?.depensePrevue : "",
              ligneBudgetaire: isEditing ? resumeDepense?.ligneBudgetaire : "",
              remarque: isEditing ? resumeDepense?.remarque : "",
              budgetDepense: isEditing ? resumeDepense?.budgetDepense: "",
              missionId: isEditing ? resumeDepense?.missionId: id,
            }
        }
        validationSchema={Yup.object({
          grant: Yup.number().required("Champ obligatoire"),
          depensePrevue: Yup.string().required("Champ obligatoire"),
          ligneBudgetaire: Yup.number().required("Champ obligatoire"),
          remarque: Yup.string().required("Champ obligatoire"),
          budgetDepense:  Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <SectionNavigation>
                <DialogTitle>Créer/modifier résumé de dépense</DialogTitle>
                <DialogContent>
                  <FormContainer spacing={2} mt={2}>
                  <FormControl fullWidth>
                      <OSSelectField
                        fullWidth
                        id="outlined-basic"
                        label="Grant"
                        variant="outlined"
                        name="grant"
                        options={grantEncoursList ? grantEncoursList : listPardefaut}
                        dataKey={grantEncoursList ? ["code"] : "name"}
                        valueKey="id"
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <OSSelectField
                        fullWidth
                        id="outlined-basic"
                        label="Ligne budgetaire"
                        variant="outlined"
                        name="ligneBudgetaire"
                        options={budgetLineList ? budgetLineList : listPardefaut}
                        dataKey={budgetLineList ? ["code"] : "name"}
                        valueKey="id"
                      />
                    </FormControl>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Dépense prévue"
                      variant="outlined"
                      name="depensePrevue"
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Budget de dépense"
                      variant="outlined"
                      name="budgetDepense"
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Rémarque"
                      variant="outlined"
                      name="remarque"
                    />
                  </FormContainer>
                </DialogContent>
                <DialogActions>
                <Button
                    color="warning"
                    onClick={() => {
                      formikProps.resetForm();
                      dispatch(cancelEdit());
                      handleClose();
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                  >
                    Enregistrer
                  </Button>
                </DialogActions>
              </SectionNavigation>
            </Form>
          )
        }}
      </Formik>
    </Container>
  );
};

export default AddResumeDepense;

const FormContainer = styled(Stack)(({ theme }) => ({
  // padding: 10,
  background: "#fff",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({}));

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));
