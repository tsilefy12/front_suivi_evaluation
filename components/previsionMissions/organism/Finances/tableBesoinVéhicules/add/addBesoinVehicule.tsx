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
import useFetchEmployes from "../../../../../home/Missions/hooks/useFetchEmployees";
import useFetchBesoinEnVehiculeList from "../hooks/useFetchBesoinEnVehicule";
import { createBesoinVehicule, updateBesoinVehicule } from "../../../../../../redux/features/besoinVehicule";
import OSDatePicker from "../../../../../shared/date/OSDatePicker";
import OSSelectField from "../../../../../shared/select/OSSelectField";
import { cancelEdit } from "../../../../../../redux/features/besoinVehicule/besoinVehiculeSlice";
import OSTextField from "../../../../../shared/input/OSTextField";

const AddBesoinVehicule = ({ handleClose }: any) => {
  const dispatch = useAppDispatch();
  const fetchBesoinEnVehicule = useFetchBesoinEnVehiculeList();
  const { isEditing, besoinVehicule } = useAppSelector((state) => state.besoinVehicule);

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateBesoinVehicule({
            id: besoinVehicule.id!,
            besoinVehicule: values,
          })
        );
      } else {

        await dispatch(createBesoinVehicule(values));
      }
      fetchBesoinEnVehicule();
      handleClose();
    } catch (error) {
      console.log("error", error);
    }
  };

  const listVehicule =[
    {id: "Vehicule 1", name: "Vehicule 1"},
    {id: "Vehicule 2", name: "Vehicule 2"},
    {id: "Vehicule 3", name: "Vehicule 3"}
  ]
  const listResponsable =[
    {id: "Responsable 1", name: "Responsable 1"},
    {id: "Responsable 2", name: "Responsable 2"},
    {id: "Responsable 3", name: "Responsable 3"}
  ]
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? besoinVehicule
            : {
              dateDebut: isEditing ? besoinVehicule?.dateDebut : new Date(),
              dateFin: isEditing ? besoinVehicule?.dateFin : new Date(),
              vehicule: isEditing ? besoinVehicule?.vehicule : "",
              trajet: isEditing ? besoinVehicule?.trajet : "",
              responsable: isEditing ? besoinVehicule?.responsable : "",
              nombreJour: isEditing ? besoinVehicule?.nombreJour : ""
            }
        }
        validationSchema={Yup.object({
          vehicule: Yup.string().required("Champ obligatoire"),
          trajet: Yup.string().required("Champ obligatoire"),
          responsable: Yup.string().required("Champ obligatoire"),
          nombreJour: Yup.number().required("Champ obligatoire"),
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
                <DialogTitle>Créer/modifier besoin en véhicule</DialogTitle>
                <DialogContent>
                  <FormContainer spacing={2} mt={2}>
                    <CustomStack
                      direction={{ xs: "column", sm: "column", md: "row" }}
                      spacing={{ xs: 2, sm: 2, md: 1 }}
                    >
                      <OSDatePicker
                        fullWidth
                        id="outlined-basic"
                        label="Date de début"
                        variant="outlined"
                        name="dateDebut"
                        value={formikProps.values.dateDebut}
                        onChange={(value: any) => formikProps.setFieldValue("dateDebut", value)}
                      />
                      <OSDatePicker
                        fullWidth
                        id="outlined-basic"
                        label="Date de fin"
                        variant="outlined"
                        name="dateFin"
                        value={formikProps.values.dateFin}
                        onChange={(value: any) => formikProps.setFieldValue("dateFin", value)}
                      />
                    </CustomStack>
                    <FormControl fullWidth>
                      <OSSelectField
                        fullWidth
                        id="outlined-basic"
                        label="Vehicule"
                        variant="outlined"
                        options={listVehicule}
                        dataKey="name"
                        valueKey="id"
                        name="vehicule"
                      />
                    </FormControl>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Trajet"
                      variant="outlined"
                      name="trajet"
                    />
                    <FormControl fullWidth>
                    <OSSelectField
                        fullWidth
                        id="outlined-basic"
                        label="Responsable"
                        variant="outlined"
                        options={listResponsable}
                        dataKey="name"
                        valueKey="id"
                        name="responsable"
                      />
                    </FormControl>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Nombre de jour"
                      variant="outlined"
                      name="nombreJour"
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

export default AddBesoinVehicule;

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
