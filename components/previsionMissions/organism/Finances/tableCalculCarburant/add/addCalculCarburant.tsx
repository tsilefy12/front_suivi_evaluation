import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Autocomplete,
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  styled,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import useFetchCalculCarburantList from "../hooks/useFetchCarbuant";
import {
  createCalculCarburant,
  updateCalculCarburant,
} from "../../../../../../redux/features/calculCarburant";
import OSTextField from "../../../../../shared/input/OSTextField";
import OSSelectField from "../../../../../shared/select/OSSelectField";
import { cancelEdit } from "../../../../../../redux/features/calculCarburant/calculCarburantSlice";
import { useRouter } from "next/router";
import useFetchVehicleList from "../../../Techniques/tableAutreInfoAuto/hooks/useFetchVehicleList";
import useFetchVoiture from "../../tableBesoinVéhicules/hooks/useFetchVoiture";

const AddCalculCarburant = ({ handleClose }) => {
  const dispatch = useAppDispatch();
  const { isEditing, calculCarburant } = useAppSelector(
    (state) => state.calculCarburant
  );
  const fetchCalculCarburant = useFetchCalculCarburantList();
  const router = useRouter();
  const { id } = router.query;
  const fetchVehicule = useFetchVehicleList();
  const { vehicleList } = useAppSelector((state) => state.vehicle);
  const fetchVoiture = useFetchVoiture();
  const { transportationEquipments } = useAppSelector(
    (state) => state.transportation
  );

  React.useEffect(() => {
    fetchVoiture();
  }, []);

  const handleSubmit = async (values) => {
    try {
      if (isEditing) {
        await dispatch(
          updateCalculCarburant({
            id: calculCarburant.id,
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

  const listeCarburant = [
    { id: "Essence", name: "Essence" },
    { id: "Gasoil", name: "Gasoil" },
  ];

  const getVehicleOption = (id: any, options: any) => {
    if (!id) return null;
    return options.find((option: any) => option.id === id) || null;
  };

  const calculateTotalCarburant = (
    distanceTotal: number,
    consommationKilo: number
  ) => {
    return (distanceTotal * consommationKilo) / 100;
  };

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? calculCarburant
            : {
                trajet: "",
                distance: 0,
                typeCarburant: "",
                vehicule: "",
                nombreTrajet: 0,
                distanceTotal: 0,
                consommationKilo: 0,
                totalCarburant: 0,
                missionId: id,
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
        onSubmit={(value, action) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => {
          const { values, setFieldValue } = formikProps;

          const handleDistanceChange = (event: any) => {
            const newDistance = parseInt(event.target.value);
            setFieldValue("distance", newDistance);
            const newDistanceTotal = newDistance * values.nombreTrajet!;
            setFieldValue("distanceTotal", newDistanceTotal);
            setFieldValue(
              "totalCarburant",
              calculateTotalCarburant(
                newDistanceTotal,
                values.consommationKilo!
              )
            );
          };

          const handleNombreTrajetChange = (event) => {
            const newNombreTrajet = parseInt(event.target.value);
            setFieldValue("nombreTrajet", newNombreTrajet);
            const newDistanceTotal = newNombreTrajet * values.distance!;
            setFieldValue("distanceTotal", newDistanceTotal);
            setFieldValue(
              "totalCarburant",
              calculateTotalCarburant(
                newDistanceTotal,
                values.consommationKilo!
              )
            );
          };

          const handleConsommationKiloChange = (event) => {
            const newConsommationKilo = parseFloat(event.target.value);
            setFieldValue("consommationKilo", newConsommationKilo);
            setFieldValue(
              "totalCarburant",
              calculateTotalCarburant(
                values.distanceTotal!,
                newConsommationKilo
              )
            );
          };

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
                        value={values.distance}
                        onChange={handleDistanceChange}
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
                          label="Type du carburant"
                          variant="outlined"
                          name="typeCarburant"
                          options={listeCarburant}
                          dataKey="name"
                          valueKey="id"
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <Autocomplete
                          fullWidth
                          id="outlined-basic"
                          options={transportationEquipments}
                          getOptionLabel={(option) =>
                            ` ${option.brand}${"-"}${option.registration}`
                          }
                          value={getVehicleOption(
                            values.vehicule,
                            transportationEquipments
                          )}
                          onChange={(event, value) =>
                            setFieldValue("vehicule", value ? value.id : "")
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Véhicule"
                              variant="outlined"
                              error={
                                formikProps.touched.vehicule &&
                                Boolean(formikProps.errors.vehicule)
                              }
                              helperText={
                                formikProps.touched.vehicule &&
                                typeof formikProps.errors.vehicule === "string"
                                  ? formikProps.errors.vehicule
                                  : ""
                              }
                            />
                          )}
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                        />
                      </FormControl>
                    </CustomStack>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Nombre de trajets"
                      variant="outlined"
                      name="nombreTrajet"
                      type="number"
                      inputProps={{ autoComplete: "off", min: 0 }}
                      value={values.nombreTrajet}
                      onChange={handleNombreTrajetChange}
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Distance total"
                      variant="outlined"
                      name="distanceTotal"
                      type="number"
                      value={values.distanceTotal}
                      inputProps={{ autoComplete: "off", min: 0 }}
                      disabled
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Consommation/100km"
                      variant="outlined"
                      name="consommationKilo"
                      type="number"
                      value={values.consommationKilo}
                      onChange={handleConsommationKiloChange}
                      inputProps={{ autoComplete: "off", min: 0 }}
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Total carburant"
                      variant="outlined"
                      name="totalCarburant"
                      type="number"
                      value={values.totalCarburant}
                      inputProps={{ autoComplete: "off", min: 0 }}
                      disabled
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

export default AddCalculCarburant;

const FormContainer = styled(Stack)(({ theme }) => ({
  background: "#fff",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({}));

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));
