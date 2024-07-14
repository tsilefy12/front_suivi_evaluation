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
import {
  createPlanTravail,
  updatePlanTravail,
} from "../../../redux/features/planTravail";
import { Form, Formik } from "formik";
import { Check, Close } from "@mui/icons-material";
import { cancelEdit } from "../../../redux/features/planTravail/planTravailSlice";
import OSDatePicker from "../../shared/date/OSDatePicker";
import OSTextField from "../../shared/input/OSTextField";
import { getProjectList } from "../../../redux/features/project/useCase/getProjectList";
import OSSelectField from "../../shared/select/OSSelectField";

const ObjectifStrategiqueForm = ({ handleClose, getId }: any) => {
  const dispatch = useAppDispatch();
  // const fetchPlanTravail = ();*
  const router = useRouter();
  const { isEditing, planTravail } = useAppSelector(
    (state) => state.planTravail
  );

  const { projectList } = useAppSelector((state: any) => state.project);

  React.useEffect(() => {
    dispatch(getProjectList({}));
  }, [router.query]);

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        values.startDate = new Date(values.startDate).toISOString();
        values.endDate = new Date(values.endDate).toISOString();
        await dispatch(
          updatePlanTravail({
            id: planTravail.id!,
            planTravail: values,
          })
        );
        handleClose();
      } else {
        values.startDate = new Date(values.startDate).toISOString();
        values.endDate = new Date(values.endDate).toISOString();
        await dispatch(createPlanTravail(values));
        handleClose();
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
                title: isEditing && getId !== "" ? planTravail?.title : "",
                startDate:
                  isEditing && planTravail?.startDate
                    ? new Date(planTravail?.startDate)
                    : new Date(),
                endDate:
                  isEditing && planTravail?.endDate
                    ? new Date(planTravail?.endDate)
                    : new Date(),
                description: isEditing ? planTravail?.description : "",
                projectId: isEditing ? planTravail?.projectId : 0,
              }
        }
        validationSchema={Yup.object({
          startDate: Yup.date().required("Champ obligatoire"),
          endDate: Yup.date().required("Champ obligatoire"),
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
                <DialogTitle>
                  {" "}
                  {isEditing ? "Modifier" : "Nouveau"} plan de travail{" "}
                  {isEditing ? planTravail?.projectId : ""}
                </DialogTitle>
                <DialogContent>
                  <FormContainer spacing={2} mt={2}>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Titre"
                      variant="outlined"
                      name="title"
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Description"
                      variant="outlined"
                      name="description"
                      multiline
                      rows={3}
                    />
                    <FormControl fullWidth>
                      <OSDatePicker
                        fullWidth
                        id="outlined-basic"
                        label="Date début"
                        variant="outlined"
                        value={formikProps.values.startDate!}
                        onChange={(value: any) =>
                          formikProps.setFieldValue("startDate", value)
                        }
                        name="startDate"
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <OSDatePicker
                        fullWidth
                        id="outlined-basic"
                        label="Date fin"
                        variant="outlined"
                        value={formikProps.values.endDate!}
                        onChange={(value: any) =>
                          formikProps.setFieldValue("endDate", value)
                        }
                        name="endDate"
                      />
                    </FormControl>
                    <OSSelectField
                      id="outlined-basic"
                      label="Projet"
                      name="projectId"
                      options={projectList}
                      dataKey="title"
                      valueKey="id"
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
                  >
                    Annuler
                  </Button>
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
          );
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

const SectionNavigation = styled(Stack)(({ theme }) => ({}));
