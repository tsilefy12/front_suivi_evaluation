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
import useFetchMissionGoalListe from "../hooks/useFetchObjectifList";
import {
  createMissionGoal,
  updateMissionGoal,
} from "../../../../../../redux/features/missionGoal";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { cancelEdit } from "../../../../../../redux/features/missionGoal/missionGoalSlice";

const AddObjectif = ({ handleClose }: any) => {
  const router = useRouter();
  const { id }: any = router.query;
  const dispatch = useAppDispatch();

  const { missionGoal, isEditing } = useAppSelector(
    (state) => state.missionGoal
  );
  const fetchMissionGoalList = useFetchMissionGoalListe();

  useEffect(() => {
    fetchMissionGoalList();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateMissionGoal({
            id: missionGoal.id!,
            missionGoal: values,
          })
        );
      } else {
        await dispatch(createMissionGoal(values));
      }
      fetchMissionGoalList();
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
            ? missionGoal
            : {
                description: isEditing ? missionGoal?.description : "",
                missionId: isEditing ? missionGoal?.missionId: id,
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
                    {isEditing ? "Modifier" : "Formulaire"} objectif
                  </DialogTitle>
                  <DialogContent>
                    <FormContainer spacing={2} mt={2}>
                      <OSTextField
                        id="outlined-basic"
                        label="Objectif"
                        name="description"
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

export default AddObjectif;

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
