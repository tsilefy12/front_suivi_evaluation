import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  styled,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { createPlanTravail, updatePlanTravail } from "../../../redux/features/planTravail";
import { Form, Formik } from "formik";
import { Check, Close } from "@mui/icons-material";
import { cancelEdit } from "../../../redux/features/planTravail/planTravailSlice";
import OSDatePicker from "../../shared/date/OSDatePicker";
import OSTextField from "../../shared/input/OSTextField";

const ObjectifStrategiqueForm = ({ handleClose }: any) => {
  const dispatch = useAppDispatch();
  // const fetchPlanTravail = ();
  const router = useRouter();
  const { isEditing, planTravail } = useAppSelector((state) => state.planTravail);


  React.useEffect(() => {
    // fetchplanTravail();
  }, [router.query])

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updatePlanTravail({
            id: planTravail.id!,
            planTravail: values,
          })
        );
        handleClose()
      } else {
        await dispatch(createPlanTravail(values));
        handleClose();
        // fetchplanTravail();
      }
      router.push("/plan_travail");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? planTravail
            : {
              date: isEditing ? planTravail?.date : "",
              description: isEditing ? planTravail?.description : ""
            }
        }
        validationSchema={Yup.object({
          date: Yup.string().required("Champ obligatoire"),
          description: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <SectionNavigation width={{ xs: "100%", sm: "560px" }}>
                <DialogTitle> Créer/Modifier Objectif Strategique </DialogTitle>
                <DialogContent>
                  <FormContainer spacing={2} mt={2}>
                    <FormControl fullWidth>
                      <OSDatePicker
                        fullWidth
                        id="outlined-basic"
                        label="Date"
                        variant="outlined"
                        value={formikProps.values.date!}
                        onChange={(value: any) =>formikProps.setFieldValue("date", value)}
                        name="date"
                      />
                    </FormControl>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Description"
                      variant="outlined"
                      name="description"
                    />
                  </FormContainer>
                </DialogContent>
                <DialogActions>
                  <Button
                    color="warning"
                    variant="text"
                    startIcon={<Close />}
                    onClick={() => {
                      formikProps.resetForm();
                      dispatch(cancelEdit());
                      handleClose();
                    }}
                  >Annuler</Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<Check />}
                    sx={{ marginInline: 3 }}
                    type="button"
                    onClick={formikProps.submitForm}
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

export default ObjectifStrategiqueForm;

const FormContainer = styled(Stack)(({ theme }) => ({
  // padding: 30,
  // borderRadius: 20,
  background: "#fff",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({
}));