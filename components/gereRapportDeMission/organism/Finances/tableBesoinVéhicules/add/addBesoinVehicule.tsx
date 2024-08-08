import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Autocomplete,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import {
  createBesoinVehicule,
  updateBesoinVehicule,
} from "../../../../../../redux/features/besoinVehicule";
import OSDatePicker from "../../../../../shared/date/OSDatePicker";
import OSSelectField from "../../../../../shared/select/OSSelectField";
import { cancelEdit } from "../../../../../../redux/features/besoinVehicule/besoinVehiculeSlice";
import OSTextField from "../../../../../shared/input/OSTextField";
import { useRouter } from "next/router";
import { Check } from "@mui/icons-material";
import useFetchEmploys from "../../../../../GrantsEnCours/hooks/getResponsable";
import { EmployeItem } from "../../../../../../redux/features/employe/employeSlice.interface";
import {
  createBesoinVehiculeRapport,
  getBesoinVehiculeRapportList,
  updateBesoinVehiculeRapport,
} from "../../../../../../redux/features/besoinVehiculeRapport";
import useFetchBesoinEnVehiculeRapportList from "../hooks/useFetchBesoinEnVehicule";
import useFetchVehicleList from "../../../../../previsionMissions/organism/Techniques/tableAutreInfoAuto/hooks/useFetchVehicleList";
import useFetchVoiture from "../../../../../previsionMissions/organism/Finances/tableBesoinVéhicules/hooks/useFetchVoiture";
import useFetchMissionaryRapportList from "../../../Techniques/tableMissionnaires/hooks/useFetchMissionaryList";
import { MissionairesItem } from "../../../../../../redux/features/missionaires/missionaires.interface";

const AddbesoinVehiculeRapport = ({ handleClose }: any) => {
  const dispatch = useAppDispatch();
  const { isEditing, besoinVehiculeRapport } = useAppSelector(
    (state) => state.besoinVehiculeRapport
  );
  const router = useRouter();
  const { id }: any = router.query;
  const [open, setOpen] = React.useState(false);
  const fetchBesoinEnVehiculeRapportList =
    useFetchBesoinEnVehiculeRapportList();
  const fetchVoiture = useFetchVoiture();
  const { transportationEquipments } = useAppSelector(
    (state: any) => state.transportation
  );
  const fetchMissionaryRapportList = useFetchMissionaryRapportList();
  const { missionaireslist } = useAppSelector(
    (state: any) => state.missionaires
  );
  const data = async () => {
    await fetchVoiture();
    await fetchMissionaryRapportList();
    await fetchBesoinEnVehiculeRapportList();
  };
  React.useEffect(() => {
    data();
  }, [router.query]);

  const handleSubmit = async (values: any) => {
    values.responsable = [...selectedEmployes.map((item) => item.id)];
    const date1 = new Date(values.dateDebut);
    const DateNumber1 = date1.getTime();
    const date2 = new Date(values.dateFin);
    const DateNumber2 = date2.getTime();
    let calculDuree = (
      (DateNumber2 - DateNumber1) /
      (24 * 60 * 60 * 1000)
    ).toFixed(0);
    values.nombreJour = parseInt(calculDuree);
    try {
      if (isEditing) {
        await dispatch(
          updateBesoinVehiculeRapport({
            id: besoinVehiculeRapport.id!,
            besoinVehiculeRapport: values,
          })
        );
      } else {
        await dispatch(createBesoinVehiculeRapport(values));
      }
      fetchBesoinEnVehiculeRapportList();
      handleClose();
    } catch (error) {
      console.log("error", error);
    }
  };
  const [selectedEmployes, setSelectedEmployes] = React.useState<
    MissionairesItem[]
  >(
    isEditing
      ? missionaireslist.filter(
          (missionaire: MissionairesItem) =>
            besoinVehiculeRapport?.responsable?.includes(missionaire.id!) &&
            missionaire.missionId == id
        )
      : []
  );
  const getVehicleOption = (id: any, options: any) => {
    if (!id) return null;
    return options.find((option: any) => option.id === id) || null;
  };
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? besoinVehiculeRapport
            : {
                dateDebut: isEditing
                  ? besoinVehiculeRapport?.dateDebut
                  : new Date(),
                dateFin: isEditing
                  ? besoinVehiculeRapport?.dateFin
                  : new Date(),
                vehicule: isEditing ? besoinVehiculeRapport?.vehicule : "",
                trajet: isEditing ? besoinVehiculeRapport?.trajet : "",
                responsable: isEditing
                  ? besoinVehiculeRapport?.responsable
                  : "",
                // nombreJour: isEditing ? besoinVehiculeRapport?.nombreJour : "",
                missionId: isEditing ? besoinVehiculeRapport?.missionId : id,
              }
        }
        validationSchema={Yup.object({
          vehicule: Yup.string().required("Champ obligatoire"),
          trajet: Yup.string().required("Champ obligatoire"),
          // responsable: Yup.string().required("Champ obligatoire"),
          // nombreJour: Yup.number().required("Champ obligatoire"),
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
                        onChange={(value: any) => {
                          formikProps.setFieldValue("dateDebut", value);
                          const date1 = new Date(value);
                          const DateNumber1 = date1.getTime();
                          const date2 = new Date(
                            formikProps.values.dateFin as Date
                          );
                          const DateNumber2 = date2.getTime();
                          if (DateNumber1 >= DateNumber2) {
                            return setOpen(true);
                          }
                        }}
                      />
                      <OSDatePicker
                        fullWidth
                        id="outlined-basic"
                        label="Date de fin"
                        variant="outlined"
                        name="dateFin"
                        value={formikProps.values.dateFin}
                        onChange={(value: any) => {
                          formikProps.setFieldValue("dateFin", value);
                          const date1 = new Date(
                            formikProps.values.dateDebut as Date
                          );
                          const DateNumber1 = date1.getTime();
                          const date2 = new Date(value);
                          const DateNumber2 = date2.getTime();
                          if (DateNumber1 >= DateNumber2) {
                            return setOpen(true);
                          }
                        }}
                      />
                    </CustomStack>
                    <FormControl fullWidth>
                      <Autocomplete
                        fullWidth
                        id="outlined-basic"
                        options={transportationEquipments}
                        getOptionLabel={(option: any) =>
                          ` ${option.brand}${"-"}${option.registration}`
                        }
                        value={getVehicleOption(
                          formikProps.values.vehicule,
                          transportationEquipments
                        )}
                        onChange={(event, value) =>
                          formikProps.setFieldValue(
                            "vehicule",
                            value ? value.id : ""
                          )
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
                        isOptionEqualToValue={(option: any, value: any) =>
                          option.id === value.id
                        }
                      />
                    </FormControl>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Trajet"
                      variant="outlined"
                      name="trajet"
                      inputProps={{ autoComplete: "off" }}
                    />
                    <FormControl fullWidth>
                      <Autocomplete
                        multiple
                        id="tags-standard"
                        options={missionaireslist.filter(
                          (missionaire: MissionairesItem) =>
                            missionaire.missionId == id
                        )}
                        getOptionLabel={(missionaire: any) =>
                          `${missionaire.lastNameMissionary} ${missionaire.firstNameMissionary}` as string
                        }
                        value={selectedEmployes}
                        onChange={(event, newValue) => {
                          setSelectedEmployes(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            id="outlined-basic"
                            label="Sélectionnez responsable"
                            variant="outlined"
                          />
                        )}
                      />
                    </FormControl>
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
                    type="button"
                    onClick={formikProps.submitForm}
                  >
                    Enregistrer
                  </Button>
                </DialogActions>
              </SectionNavigation>
              <Dialog open={open} disablePortal={false} sx={styleDialog}>
                <DialogTitle color="red">Attention!!</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    La date début doit être inferieure de la date fin
                  </DialogContentText>
                  <DialogActions>
                    <Button onClick={() => setOpen(false)}>
                      <Check color="primary" />
                    </Button>
                  </DialogActions>
                </DialogContent>
              </Dialog>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default AddbesoinVehiculeRapport;

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
const styleDialog = {
  position: "fixed",
  //left: 150,
  top: 20,
  width: "auto",
  alignItem: "center",
};
