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
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";

import OSTextField from "../../../../../shared/input/OSTextField";
import { cancelEdit } from "../../../../../../redux/features/calculPileRapport/calculPileRapportSlice";
import { useRouter } from "next/router";
import {
  createCalculePileRapport,
  updateCalculPileRapport,
} from "../../../../../../redux/features/calculPileRapport";
import useFetchCalculPileRapportList from "../hooks/useFetchCalculPile";

const AddCalculDesPileRapport = ({ handleClose }: any) => {
  const dispatch = useAppDispatch();
  const fetchCalculPileRapport = useFetchCalculPileRapportList();
  const { isEditing, calculPileRapport } = useAppSelector(
    (state) => state.calculPileRapport
  );
  const router = useRouter();
  const { id }: any = router.query;

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateCalculPileRapport({
            id: calculPileRapport.id!,
            calculPileRapport: values,
          })
        );
      } else {
        await dispatch(createCalculePileRapport(values));
      }
      fetchCalculPileRapport();
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
            ? calculPileRapport
            : {
                appareil: isEditing ? calculPileRapport?.appareil : "",
                nombreAppareil: isEditing
                  ? calculPileRapport?.nombreAppareil
                  : "",
                nombrePack: isEditing ? calculPileRapport?.nombrePack : "",
                nombrePile: isEditing ? calculPileRapport?.nombrePile : "",
                type: isEditing ? calculPileRapport?.type : "",
                change: isEditing ? calculPileRapport?.change : "",
                missionId: isEditing ? calculPileRapport?.missionId : id,
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
                        inputProps={{ autoComplete: "off" }}
                      />
                      <OSTextField
                        fullWidth
                        id="outlined-basic"
                        label="Type"
                        variant="outlined"
                        name="type"
                        type="text"
                        inputProps={{ autoComplete: "off" }}
                      />
                      <OSTextField
                        fullWidth
                        id="outlined-basic"
                        label="Nombre d'appareils"
                        variant="outlined"
                        name="nombreAppareil"
                        type="number"
                        inputProps={{ autoComplete: "off", min: 0 }}
                      />
                    </CustomStack>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Nombre de piles"
                      variant="outlined"
                      name="nombrePile"
                      type="number"
                      inputProps={{ autoComplete: "off", min: 0 }}
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Changements"
                      variant="outlined"
                      name="change"
                      type="text"
                      inputProps={{ autoComplete: "off" }}
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Nombre de packs"
                      variant="outlined"
                      name="nombrePack"
                      type="number"
                      inputProps={{ autoComplete: "off", min: 0 }}
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
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default AddCalculDesPileRapport;

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
