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
import * as Yup from "yup";
import useFetchDeliverableList from "../hooks/useFetchDeliverableList";
import {
  createDeliverable,
  updateDeliverable,
} from "../../../../../../redux/features/deliverable";
import { Form, Formik } from "formik";
import OSTextField from "../../../../../shared/input/OSTextField";
import { cancelEdit } from "../../../../../../redux/features/deliverable/deliverableSlice";

const AddLivrable = ({ handleClose }: any) => {
  const router = useRouter();
  const { id }: any = router.query;
  const dispatch = useAppDispatch();

  const { deliverable, isEditing } = useAppSelector(
    (state: any) => state.deliverable
  );
  const fetchDeliverableListe = useFetchDeliverableList();

  useEffect(() => {
    fetchDeliverableListe();
  }, []);

  const handleSubmit = async (values: any) => {

    values.missionId = id;
    try {
      if (isEditing) {
        await dispatch(
          updateDeliverable({
            id: deliverable.id!,
            deliverable: values,
          })
        );
      } else {
        await dispatch(createDeliverable(values));
      }
      fetchDeliverableListe();
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
            ? deliverable
            : {
              description: isEditing ? deliverable?.description : "",
              missionId: isEditing ? deliverable?.missionId: id,
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
                    {isEditing ? "Modifier" : "Formulaire"} livrables
                  </DialogTitle>
                  <DialogContent>
                    <FormContainer spacing={2} mt={2}>
                      <OSTextField
                        id="outlined-basic"
                        label="Livrable"
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

export default AddLivrable;

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
