import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks";
import { createCalculePile, updateCalculPile } from "../../../../../../redux/features/calculPile";
import useFetchCalculPileList from "../hooks/useFetchCalculPile";
import OSTextField from "../../../../../shared/input/OSTextField";
import { cancelEdit } from "../../../../../../redux/features/calculPile/calculPileSlice";

const AddCalculDesPile = ({ handleClose}: any) => {
const dispatch = useAppDispatch();
const { isEditing, calculPile } = useAppSelector((state) =>state.calculPile)
const fetchCalculPile = useFetchCalculPileList();
  
  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateCalculPile({
            id: calculPile.id!,
            calculPile: values,
          })
        );
      } else {

        await dispatch(createCalculePile(values));
      }
      fetchCalculPile();
      handleClose();
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
            ? calculPile
            : {
              appareil: isEditing ? calculPile?.appareil : "",
              nombreAppareil: isEditing ? calculPile?.nombreAppareil : "",
              nombrePack: isEditing ? calculPile?.nombrePack : "",
              nombrePile: isEditing ? calculPile?.nombrePile : "",
              type: isEditing ? calculPile?.type : "",
              change: isEditing ? calculPile?.change: ""
            }
        }
        validationSchema={Yup.object({
          appareil: Yup.string().required("Champ obligatoire"),
          type: Yup.string().required("Champ obligatoire"),
          nombreAppareil: Yup.number().required("Champ obligatoire"),
          change: Yup.string().required("Champ obligatoire"),
          nombrePack: Yup.number().required("Champ obligatoire"),
          nombrePile: Yup.number().required("Champ obligatoire"),
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
                <DialogTitle>Créer/modifier Calcul des Piles</DialogTitle>
                <DialogContent>
                  <FormContainer spacing={2} mt={2}>
                    <CustomStack
                      direction={{ xs: "column", sm: "column", md: "row" }}
                      spacing={{ xs: 2, sm: 2, md: 1 }}
                    >
                      <OSTextField
                        fullWidth
                        id="outlined-basic"
                        label="Appareil"
                        variant="outlined"
                        name="appareil"
                        type="text"
                      />
                      <OSTextField
                        fullWidth
                        id="outlined-basic"
                        label="Type"
                        variant="outlined"
                        name="type"
                        type="text"
                      />
                      <OSTextField
                        fullWidth
                        id="outlined-basic"
                        label="Nombre Appareil"
                        variant="outlined"
                        name="nombreAppareil"
                        type="number"
                      />
                    </CustomStack>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Nombre de piles"
                      variant="outlined"
                      name="nombrePile"
                      type="number"
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Change"
                      variant="outlined"
                      name="change"
                      type="text"
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Nombre de packs"
                      variant="outlined"
                      name="nombrePack"
                      type="number"
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

export default AddCalculDesPile;

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
