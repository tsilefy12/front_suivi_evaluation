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
import useFetchCalculCarburantRapportList from "../hooks/useFetchCarbuant";
import { createCalculCarburantRapport, updateCalculCarburantRapport } from "../../../../../../redux/features/calculCarburantRapport";
import OSTextField from "../../../../../shared/input/OSTextField";
import OSSelectField from "../../../../../shared/select/OSSelectField";
import { cancelEdit } from "../../../../../../redux/features/calculCarburantRapport/calculCarburantRapportSlice";
import { useRouter } from "next/router";
import useFetchBesoinEnVehiculeList from "../../../../../previsionMissions/organism/Finances/tableBesoinVéhicules/hooks/useFetchBesoinEnVehicule";


const AddcalculCarburantRapport = ({ handleClose }: any) => {
  const dispatch = useAppDispatch();
  const { isEditing, calculCarburantRapport } = useAppSelector((state) => state.calculCarburantRapport)
  const fetchcalculCarburantRapport = useFetchCalculCarburantRapportList();
  const router = useRouter()
  const { id }: any = router.query;
  const fetchVehicule = useFetchBesoinEnVehiculeList();
  const { vehicleList } = useAppSelector((state: any) =>state.vehicle)

  React.useEffect(() =>{
    fetchVehicule();
  },  [id])

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateCalculCarburantRapport({
            id: calculCarburantRapport.id!,
            calculCarburantRapport: values,
          })
        );
      } else {

        await dispatch(createCalculCarburantRapport(values));
      }
      fetchcalculCarburantRapport();
      handleClose();
    } catch (error) {
      console.log("error", error);
    }
  };
  const listeCarburant =[
    {id: "Essence", name: "Essence"},
    {id: "Gasoil", name: "Gasoil"}
  ]
 
  
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? calculCarburantRapport
            : {
              trajet: isEditing ? calculCarburantRapport?.trajet : "",
              distance: isEditing ? calculCarburantRapport?.distance : "",
              typeCarburant: isEditing ? calculCarburantRapport?.typeCarburant : "",
              vehicule: isEditing ? calculCarburantRapport?.vehicule : "",
              nombreTrajet: isEditing ? calculCarburantRapport?.nombreTrajet : "",
              distanceTotal: isEditing ? calculCarburantRapport?.distanceTotal : 0,
              consommationKilo: isEditing ? calculCarburantRapport?.consommationKilo : 0,
              // totalCarburant: isEditing ? calculCarburantRapport?.totalCarburant : "",
              missionId: isEditing ? calculCarburantRapport?.missionId: id,
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
                        inputProps={{ autoComplete: "off" }}
                      />
                      <OSTextField
                        fullWidth
                        id="outlined-basic"
                        label="Distance"
                        variant="outlined"
                        name="distance"
                        type="number"
                        inputProps={{ autoComplete: "off", min: 0 }}
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
                           options={vehicleList}
                           dataKey={["vehicleType"]}
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
                      inputProps={{ autoComplete: "off", min: 0 }}
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Distance total"
                      variant="outlined"
                      name="distanceTotal"
                      type="text"
                      value={formikProps.values.distanceTotal}
                      onChange={(event: any) =>{
                        const newValue = parseFloat(event.target.value)
                        formikProps.setFieldValue("distanceTotal", newValue)
                        const TotalCarburant = newValue * formikProps.values.consommationKilo
                        formikProps.setFieldValue("totalCarburant", TotalCarburant)
                      }}
                      inputProps={{ autoComplete: "off", min: 0 }}
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Consommation/km"
                      variant="outlined"
                      name="consommationKilo"
                      type="number"
                      value={formikProps.values.consommationKilo}
                      onChange={(event: any) =>{
                        const newValue = parseFloat(event.target.value)
                        formikProps.setFieldValue("consommationKilo", newValue)
                        const TotalCarburant = newValue * formikProps.values.distanceTotal
                        formikProps.setFieldValue("totalCarburant", TotalCarburant)
                      }}
                      inputProps={{ autoComplete: "off", min: 0 }}
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Total carburant"
                      variant="outlined"
                      name="totalCarburant"
                      type="number"
                      value={formikProps.values.distanceTotal * formikProps.values.consommationKilo}
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

export default AddcalculCarburantRapport;

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
