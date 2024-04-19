import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks";
import useFetchCalculCarburantList from "../hooks/useFetchCarbuant";
import { createCalculCarburant, updateCalculCarburant } from "../../../../../../redux/features/calculCarburant";
import OSTextField from "../../../../../shared/input/OSTextField";
import OSSelectField from "../../../../../shared/select/OSSelectField";
import { cancelEdit } from "../../../../../../redux/features/calculCarburant/calculCarburantSlice";
import { useRouter } from "next/router";

const AddCalculCarburant = ({ handleClose }: any) => {
  const dispatch = useAppDispatch();
  const { isEditing, calculCarburant } = useAppSelector((state) => state.calculCarburant)
  const fetchCalculCarburant = useFetchCalculCarburantList();
  const router = useRouter()
  const { id }: any = router.query;

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateCalculCarburant({
            id: calculCarburant.id!,
            calculCarburant: values,
          })
        );
      } else {

        await dispatch(createCalculCarburant(values));
      }
      fetchCalculCarburant();
      handleClose();
    } catch (error) {
      console.log("error", error);
    }
  };
  const listeCarburant =[
    {id: "Essence", name: "Essence"},
    {id: "Gasoil", name: "Gasoil"}
  ]
  const listeVehicule =[
    {id: "Véhicule 1", name: "Véhicule 1"},
    {id: "Véhicule 2", name: "Véhicule 2"}
  ]
  
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? calculCarburant
            : {
              trajet: isEditing ? calculCarburant?.trajet : "",
              distance: isEditing ? calculCarburant?.distance : "",
              typeCarburant: isEditing ? calculCarburant?.typeCarburant : "",
              vehicule: isEditing ? calculCarburant?.vehicule : "",
              nombreTrajet: isEditing ? calculCarburant?.nombreTrajet : "",
              distanceTotal: isEditing ? calculCarburant?.distanceTotal : "",
              consommationKilo: isEditing ? calculCarburant?.consommationKilo : "",
              totalCarburant: isEditing ? calculCarburant?.totalCarburant : "",
              missionId: isEditing ? calculCarburant?.missionId: id,
            }
        }
        validationSchema={Yup.object({
          trajet: Yup.string().required("Champ obligatoire"),
          distance: Yup.number().required("Champ obligatoire"),
          typeCarburant: Yup.string().required("Champ obligatoire"),
          vehicule: Yup.string().required("Champ obligatoire"),
          nombreTrajet: Yup.number().required("Champ obligatoire"),
          distanceTotal: Yup.number().required("Champ obligatoire"),
          consommationKilo: Yup.number().required("Champ obligatoire"),
          totalCarburant: Yup.number().required("Champ obligatoire"),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps: any) => {
          return (
            <Form>
              <SectionNavigation>
                <DialogTitle>Créer/modifier calcul des carburants</DialogTitle>
                <DialogContent>
                  <FormContainer spacing={2} mt={2}>
                    <CustomStack
                      direction={{ xs: "column", sm: "column", md: "row" }}
                      spacing={{ xs: 2, sm: 2, md: 1 }}
                    >
                      <OSTextField
                        fullWidth
                        id="outlined-basic"
                        label="Trajet"
                        variant="outlined"
                        name="trajet"
                      />
                      <OSTextField
                        fullWidth
                        id="outlined-basic"
                        label="Distance"
                        variant="outlined"
                        name="distance"
                        type="number"
                      />
                    </CustomStack>
                    <CustomStack
                      direction={{ xs: "column", sm: "column", md: "row" }}
                      spacing={{ xs: 2, sm: 2, md: 1 }}
                    >
                      <FormControl fullWidth>
                       <OSSelectField 
                           fullWidth
                           id="outlined-basic"
                           label="Type carburant"
                           variant="outlined"
                           name="typeCarburant"
                           options={listeCarburant}
                           dataKey="name"
                           valueKey="id"
                       />
                      </FormControl>
                      <FormControl fullWidth>
                      <OSSelectField 
                           fullWidth
                           id="outlined-basic"
                           label="Véhicule"
                           variant="outlined"
                           name="vehicule"
                           options={listeVehicule}
                           dataKey="name"
                           valueKey="id"
                       />
                      </FormControl>
                    </CustomStack>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Nombre de trajet"
                      variant="outlined"
                      name="nombreTrajet"
                      type="number"
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Distance total"
                      variant="outlined"
                      name="distanceTotal"
                      type="number"
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Consommation/km"
                      variant="outlined"
                      name="consommationKilo"
                      type="number"
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Total carburant"
                      variant="outlined"
                      name="totalCarburant"
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

export default AddCalculCarburant;

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
