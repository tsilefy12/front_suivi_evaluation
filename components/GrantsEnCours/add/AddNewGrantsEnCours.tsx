import {
  Button,
  Container,
  styled,
  Typography,
  FormControl,
  MenuItem,
  Stack,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { SectionNavigation } from "../ListGrants";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import OSTextField from "../../shared/input/OSTextField";
import { Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHooks";
import { createGrantEncours, updateGrantEncours } from "../../../redux/features/grantEncours";
import OSDatePicker from "../../shared/date/OSDatePicker";
import { cancelEdit } from "../../../redux/features/grantEncours/grantEncoursSlice";

const AddNewGrantsEnCours = () => {
  const router = useRouter();
  const { isEditing, grantEnCours } = useAppSelector((state) => state.grantEncours);
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateGrantEncours({
            id: grantEnCours.id!,
            grantEncours: values,
          })
        );
      } else {
        await dispatch(createGrantEncours(values));
      }
      router.push("/grants/grantsEnCours");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <Formik
        enableReinitialize = { isEditing ? true: false }
        initialValues={ 
          isEditing
            ? grantEnCours
            : {
              code: isEditing ? grantEnCours?.code : "",
              postAnalytique: isEditing ? grantEnCours?.posteAnalytique : "",
              bailleur: isEditing ? grantEnCours?.bailleur : "",
              projetEnFrancais: isEditing ? grantEnCours?.projetEnFrancais : "",
              projetEnAnglais: isEditing ? grantEnCours?.projetEnAnglais : "",
              dateDebut: isEditing ? grantEnCours?.dateDanque : new Date(),
              dateFin: isEditing ? grantEnCours?.dateFin : new Date(),
              duree: isEditing ? grantEnCours?.duree : 0,
              responsable: isEditing ? grantEnCours?.responsable : "",
              seui: isEditing ? grantEnCours?.seuil : 0,
              montantEnDevise: isEditing ? grantEnCours?.montantEnDevise : 0,
              montantEnMGA: isEditing ? grantEnCours?.montantEnMGA : 0,
            }
        }
        validationSchema={Yup.object({
          code: Yup.string().required("Champ obligatoire"),
          postAnalytique: Yup.string().required("Champ obligatoire"),
          bailleur: Yup.string().required("Champ obligatoire"),
          projetEnFrancais: Yup.string().required("Champ obligatoire"),
          projetEnAnglais: Yup.string().required("Champ obligatoire"),
          dateDebut: Yup.string().required("Champ obligatoire"),
          dateFin: Yup.string().required("Champ obligatoire"),
          duree: Yup.number().required("Champ obligatoire"),
          responsable: Yup.string().required("Champ obligatoire"),
          seuil: Yup.number().required("Champ obligatoire"),
          montantENDevice: Yup.number().required("Champ obligatoire"),
          montantEnMGA: Yup.number().required("Champ obligatoire"),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            <Container maxWidth="xl" sx={{ pb: 5 }}>
              <NavigationContainer>
                <SectionNavigation
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  justifyContent="space-between"
                  sx={{ mb: 4 }}
                >
                  <Stack flexDirection={"row"}>
                    <Link href="/grants/grantsEnCours">
                      <Button
                        color="info"
                        variant="text"
                        startIcon={<ArrowBack />}
                        onClick={() => {
                          formikProps.resetForm();
                          dispatch(cancelEdit());
                        }}
                      >
                        Retour
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<Check />}
                      sx={{ marginInline: 3 }}
                      type="submit"
                    >
                      Enregistrer
                    </Button>
                    <Button
                      variant="text"
                      color="warning"
                      size="small"
                      startIcon={<Close />}
                      sx={{ marginInline: 3 }}
                    >
                      Annuler
                    </Button>
                  </Stack>
                  <Typography variant="h5">Créer GRANT</Typography>
                </SectionNavigation>
                {/* <Divider /> */}
              </NavigationContainer>

              <FormContainer sx={{ backgroundColor: "#fff", pb: 5 }} spacing={2}>
                <Stack direction="row" spacing={2}>
                  <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Code"
                    variant="outlined"
                    name="code"
                  />
                  <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Poste analytique"
                    variant="outlined"
                    name="postAnalytique"
                  />
                  <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Bailleur"
                    variant="outlined"
                    name="bailleur"
                  />
                </Stack>
                <CustomStack
                  direction={{ xs: "column", sm: "column", md: "row" }}
                  spacing={{ xs: 2, sm: 2, md: 1 }}
                >
                  <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Projet en français"
                    variant="outlined"
                    name="projetEnFrancais"
                  />
                  <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Projet en Anglais"
                    variant="outlined"
                    name="projetEnAnglais"
                  />
                </CustomStack>
                <CustomStack direction="row" spacing={4}
                >
                  <OSDatePicker
                    fullWidth
                    id="outlined-basic"
                    label="Date de début"
                    variant="outlined"
                    type="date"
                    name="dateDebut"
                  />
                  <OSDatePicker
                    fullWidth
                    id="outlined-basic"
                    label="Date de fin"
                    variant="outlined"
                    type="date"
                    name="dateDebut"
                  />
                  <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Durée"
                    variant="outlined"
                    name="duree"
                  />
                </CustomStack>
                <FormControl fullWidth>
                  <OSTextField
                    fullWidth
                    select
                    id="outlined-basic"
                    label="Compte banque"
                    variant="outlined"
                    name="compteBanque"
                  >
                    <MenuItem>Compte 1</MenuItem>
                    <MenuItem>Compte 2</MenuItem>
                    <MenuItem>Compte 3</MenuItem>
                  </OSTextField>
                </FormControl>
                <FormControl>
                  <OSTextField
                    fullWidth
                    select
                    id="outlined-basic"
                    label="Responsable"
                    variant="outlined"
                    name="responsable"
                  >
                    <MenuItem>Responsable 1</MenuItem>
                    <MenuItem>Responsable 2</MenuItem>
                    <MenuItem>Responsable 3</MenuItem>
                  </OSTextField>
                </FormControl>
                <FormControl fullWidth>
                  <OSTextField
                    id="outlined-basic"
                    label="Seuil"
                    variant="outlined"
                    type="number"
                    name="seuil"
                  />
                </FormControl>
                <CustomStack
                  direction={{ xs: "column", sm: "column", md: "row" }}
                  spacing={{ xs: 2, sm: 2, md: 1 }}
                >
                  <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Montant en dévise"
                    variant="outlined"
                    name="montantEnDevise"
                  />
                  <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Montant en MGA"
                    variant="outlined"
                    name="montantEnMGA"
                  />
                </CustomStack>
              </FormContainer>
            </Container>
          )
        }}
      </Formik>
    </Container>
  );
};

export default AddNewGrantsEnCours;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));

const FormContainer = styled(Stack)(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
}));
