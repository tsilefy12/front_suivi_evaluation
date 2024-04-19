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
import { useRouter } from "next/router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import useFetchPlannedActivityList from "../hooks/useFetchPlannedActivityList";
import {
  createPlannedActivity,
  updatePlannedActivity,
} from "../../../../../../redux/features/plannedActivity";
import { Form, Formik } from "formik";
import OSTextField from "../../../../../shared/input/OSTextField";
import * as Yup from "yup";
import { cancelEdit } from "../../../../../../redux/features/plannedActivity/plannedActivitySlice";

const AddActivitesPrevues = ({ handleClose }: any) => {
  const router = useRouter();
  const { id }: any = router.query;
  const dispatch = useAppDispatch();

  const { plannedActivity, isEditing } = useAppSelector(
    (state) => state.plannedActivity
  );
  const fetchPlannedActivityListe = useFetchPlannedActivityList();

  useEffect(() => {
    fetchPlannedActivityListe();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updatePlannedActivity({
            id: plannedActivity.id!,
            plannedActivity: values,
          })
        );
      } else {
        await dispatch(createPlannedActivity(values));
      }
      fetchPlannedActivityListe();
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
            ? plannedActivity
            : {
                description: isEditing ? plannedActivity?.description : "",
                missionId: isEditing ? plannedActivity?.missionId: id,
              }
        }
        validationSchema={Yup.object({
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
              <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
                <SectionNavigation>
                  <DialogTitle>
                    {isEditing ? "Modifier" : "Formulaire"} activité prévus
                  </DialogTitle>
                  <DialogContent>
                    <FormContainer spacing={2} mt={2}>
                      <OSTextField
                        id="outlined-basic"
                        label="Activités"
                        name="description"
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

export default AddActivitesPrevues;

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
