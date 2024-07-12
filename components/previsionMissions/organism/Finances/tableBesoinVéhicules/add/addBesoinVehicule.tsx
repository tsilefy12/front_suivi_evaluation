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
import useFetchEmployes from "../../../../../home/Missions/hooks/useFetchEmployees";
import useFetchBesoinEnVehiculeList from "../hooks/useFetchBesoinEnVehicule";
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
import useFetchVehicleList from "../../../Techniques/tableAutreInfoAuto/hooks/useFetchVehicleList";
import useFetchVoiture from "../hooks/useFetchVoiture";

const AddBesoinVehicule = ({ handleClose }: any) => {
  const dispatch = useAppDispatch();
  const fetchBesoinEnVehicule = useFetchBesoinEnVehiculeList();
  const { isEditing, besoinVehicule } = useAppSelector(
    (state) => state.besoinVehicule
  );
  const router = useRouter();
  const { id }: any = router.query;
  const [open, setOpen] = React.useState(false);
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state: any) => state.employe);
  const fetchVehicule = useFetchVehicleList();
  const { vehicleList } = useAppSelector((state: any) => state.vehicle);
  const fetchVoiture = useFetchVoiture();
  const { transportationEquipments } = useAppSelector(
    (state: any) => state.transportation
  );

  React.useEffect(() => {
    fetchVehicule();
    fetchEmployes();
    fetchVoiture();
  }, [router.query]);

  const handleSubmit = async (values: any) => {
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
        values.responsable = [...selectedEmployes.map((item) => item.id)];
        await dispatch(
          updateBesoinVehicule({
            id: besoinVehicule.id!,
            besoinVehicule: values,
          })
        );
      } else {
        values.responsable = [...selectedEmployes.map((item) => item.id)];
        await dispatch(createBesoinVehicule(values));
      }
      fetchBesoinEnVehicule();
      handleClose();
    } catch (error) {
      console.log("error", error);
    }
  };
  const [selectedEmployes, setSelectedEmployes] = React.useState<EmployeItem[]>(
    isEditing
      ? employees.filter((employee: any) =>
          besoinVehicule?.responsable?.includes(employee.id!)
        )
      : []
  );

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
                // nombreJour: isEditing ? besoinVehicule?.nombreJour : "",
                missionId: isEditing ? besoinVehicule?.missionId : id,
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
                          const DateNumber1 = new Date(value).getTime();
                          const date2 = new Date(formikProps.values.dateFin!);
                          const DateNumber2 = date2.getTime();

                          if (DateNumber1 >= DateNumber2) {
                            setOpen(true);
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
                          const date1 = new Date(value).getTime();
                          const date2 = new Date(
                            formikProps.values.dateDebut!
                          ).getTime();

                          if (date1 <= date2) {
                            setOpen(true);
                          }
                        }}
                      />
                    </CustomStack>
                    <FormControl fullWidth>
                      <OSSelectField
                        fullWidth
                        id="outlined-basic"
                        label="Véhicule"
                        variant="outlined"
                        options={transportationEquipments}
                        dataKey={"registration"}
                        valueKey="id"
                        name="vehicule"
                        inputProps={{ autoComplete: "off" }}
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
                        options={employees}
                        getOptionLabel={(employee: any) =>
                          `${employee.name} ${employee.surname}` as string
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
const styleDialog = {
  position: "fixed",
  //left: 150,
  top: 20,
  width: "auto",
  alignItem: "center",
};
