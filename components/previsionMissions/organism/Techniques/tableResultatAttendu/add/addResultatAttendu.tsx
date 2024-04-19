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
import * as Yup from "yup";
import { useRouter } from "next/router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import useFetchExceptedResultList from "../hooks/useFetchExceptedResultList";
import {
  createExceptedResult,
  updateExceptedResult,
} from "../../../../../../redux/features/exceptedResult";
import { Form, Formik } from "formik";
import OSTextField from "../../../../../shared/input/OSTextField";
import { cancelEdit } from "../../../../../../redux/features/exceptedResult/exceptedResultSlice";

const AddResultatAttendu = ({ handleClose }: any) => {
  const router = useRouter();
  const { id }: any = router.query;
  const dispatch = useAppDispatch();

  const { exceptedResult, isEditing } = useAppSelector(
    (state) => state.exceptedResult
  );
  const fetchExceptedResultListe = useFetchExceptedResultList();

  useEffect(() => {
    fetchExceptedResultListe();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateExceptedResult({
            id: exceptedResult.id!,
            exceptedResult: values,
          })
        );
      } else {
        await dispatch(createExceptedResult(values));
      }
      fetchExceptedResultListe();
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
            ? exceptedResult
            : {
                description: isEditing ? exceptedResult?.description : "",
                missionId: isEditing ? exceptedResult?.missionId: id,
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
                    {isEditing ? "Modifier" : "Formulaire"} résultat
                  </DialogTitle>
                  <DialogContent>
                    <FormContainer spacing={2} mt={2}>
                      <OSTextField
                        id="outlined-basic"
                        label="Résultat"
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

export default AddResultatAttendu;

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
