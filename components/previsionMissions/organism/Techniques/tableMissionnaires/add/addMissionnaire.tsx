import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Box,
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  TextField,
} from "@mui/material";
import OSTextField from "../../../../../shared/input/OSTextField";
import { useRouter } from "next/router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import useFetchMissionaryList from "../hooks/useFetchMissionaryList";
import {
  createMissionary,
  updateMissionary,
} from "../../../../../../redux/features/missionary";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { cancelEdit } from "../../../../../../redux/features/missionary/missionarySlice";
import OSDateTimePicker from "../../../../../shared/date/OSDateTimePicker";
import OSDatePicker from "../../../../../shared/date/OSDatePicker";

const AddMissionnaire = ({ handleClose }: any) => {
  const router = useRouter();
  const { id }= router.query;
  const dispatch = useAppDispatch();

  const { missionary, isEditing } = useAppSelector(
    (state) => state.missionary
  );
  const fetchMissionaryList = useFetchMissionaryList();

  useEffect(() => {
    fetchMissionaryList();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateMissionary({
            id: missionary.id!,
            missionary: values,
          })
        );
      } else {
        await dispatch(createMissionary(values));
      }
      fetchMissionaryList();
      handleClose();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Box>
      <Formik
        enableReinitialize
        initialValues={
          isEditing
            ? missionary
            : {
                lastNameMissionary: isEditing ? missionary?.lastNameMissionary : "",
                firstNameMissionary: isEditing ? missionary?.firstNameMissionary : "",
                startDateMissionary: isEditing ? missionary?.startDateMissionary : "",
                returnDateMissionary: isEditing ? missionary?.returnDateMissionary : "",
                missionResponsabilityMissionary: isEditing ? missionary?.missionResponsabilityMissionary : "",
                missionId: isEditing ? missionary?.missionId: id,
              }
        }
        validationSchema={Yup.object({
          lastNameMissionary: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
                <SectionNavigation>
                  <DialogTitle>
                    {isEditing ? "Modifier" : "Formulaire"} Missionnaire
                  </DialogTitle>
                  <DialogContent>
                    <FormContainer spacing={2} mt={2}>
                      <OSTextField
                        id="outlined-basic"
                        label="Nom"
                        name="lastNameMissionary"
                        inputProps={{ autoComplete: "off" }}
                      />
                      <OSTextField
                        id="outlined-basic"
                        label="Prénom"
                        name="firstNameMissionary"
                        inputProps={{ autoComplete: "off" }}
                      />
                      <OSDatePicker
                        fullWidth
                        label="Date de debut"
                        value={formikProps.values.startDateMissionary}
                        onChange={(value: any) =>
                          formikProps.setFieldValue("startDateMissionary", value)
                        }
                      />
                      <OSDatePicker
                        fullWidth
                        label="Date de retour"
                        value={formikProps.values.returnDateMissionary}
                        onChange={(value: any) =>
                          formikProps.setFieldValue("returnDateMissionary", value)
                        }
                      />
                      <OSTextField
                        id="outlined-basic"
                        label="Responsable"
                        name="missionResponsabilityMissionary"
                        inputProps={{ autoComplete: "off" }}
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
                    <Button variant="contained" type="submit">
                      Enregistrer
                    </Button>
                  </DialogActions>
                </SectionNavigation>
              </Container>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AddMissionnaire;

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
