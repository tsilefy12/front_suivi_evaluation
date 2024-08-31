import {
  Button,
  Container,
  styled,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Autocomplete,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SectionNavigation } from "../../../plan_travail/objectifStrategique";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  createMission,
  updateMission,
} from "../../../../redux/features/mission";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { cancelEdit } from "../../../../redux/features/mission/missionSlice";
import OSSelectField from "../../../shared/select/OSSelectField";
import OSTextField from "../../../shared/input/OSTextField";
import useFetchEmployes from "../hooks/useFetchEmployees";
import useFetchGrants from "../../../GrantsEnCours/hooks/getGrants";
import { MissionItem } from "../../../../redux/features/mission/mission.interface";
import useFetchMissionListe from "../hooks/useFetchMissionListe";
import OSDatePicker from "../../../shared/date/OSDatePicker";
import { EmployeItem } from "../../../../redux/features/employe/employeSlice.interface";
import { get } from "http";

const AddNewMission = () => {
  const router = useRouter();
  const { isEditing, mission, missionListe } = useAppSelector(
    (state) => state.mission
  );
  const { employees } = useAppSelector((state) => state.employe);
  const dispatch = useAppDispatch();
  const fetchEmployeesListe = useFetchEmployes();
  const fetchGrants = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const fetchMission = useFetchMissionListe();
  const [open, setOpen] = React.useState(false);
  const [statut, setStatut] = React.useState("vide");
  const [getVerify, setGetVerify] = React.useState<string>("");
  const [getMission, setGetMission] = React.useState<string>("");
  useEffect(() => {
    fetchEmployeesListe();
    fetchGrants();
    fetchMission();
  }, []);

  const [selectedEmployes, setSelectedEmployes] = useState<EmployeItem[]>(
    isEditing
      ? employees.filter((employee: any) =>
          mission?.budgetManagerId?.includes(employee.id!)
        )
      : []
  );
  const handleSubmit = async (values: any) => {
    const now = new Date().getTime();
    const startDaty = new Date(values.dateDebut).getTime();
    const endDaty = new Date(values.dateFin).getTime();

    try {
      if (isEditing) {
        values.budgetManagerId = [...selectedEmployes.map((item) => item.id)];
        if (startDaty > now && statut == "vide") {
          values.status = "En attente";
        } else if (startDaty <= now && endDaty >= now && statut == "vide") {
          values.status = "Encours";
        } else if (endDaty <= now && statut == "vide") {
          values.status = "Terminé";
        } else {
          values.status = statut;
        }

        await dispatch(
          updateMission({
            id: mission.id!,
            mission: values,
          })
        );
      } else {
        values.budgetManagerId = [...selectedEmployes.map((item) => item.id)];
        if (startDaty > now && statut == "vide") {
          values.status = "En attente";
        } else if (startDaty <= now && endDaty >= now && statut == "vide") {
          values.status = "Encours";
        } else if (endDaty <= now && statut == "vide") {
          values.status = "Terminé";
        } else {
          values.status = statut;
        }
        await dispatch(createMission(values));
      }
      return router.push("/missions/ListMission");
    } catch (error) {
      return console.log("error", error);
    }
  };
  const statusList = [
    { id: "En attente", name: "En attente" },
    { id: "Encours", name: "Encours" },
    { id: "Terminé", name: "Terminé" },
    { id: "Annuler", name: "Annuler" },
  ];
  const getResponsableOption = (id: any, options: any) => {
    if (!id) return null;
    return options.find((option: any) => option.id === id) || null;
  };

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? mission
            : {
                reference: isEditing ? mission?.reference : null,
                missionManagerId: isEditing ? mission?.missionManagerId : "",
                budgetManagerId: isEditing ? mission?.budgetManagerId : [],
                descriptionMission: isEditing
                  ? mission?.descriptionMission
                  : "",
                verifyFinancial: isEditing ? mission?.verifyFinancial : "",
                verifyTechnic: isEditing ? mission?.verifyTechnic : "",
                validateFinancial: isEditing ? mission?.validateFinancial : "",
                RefBudget: isEditing ? mission?.RefBudget : "",
                dateDebut: isEditing ? mission?.dateDebut : new Date(),
                dateFin: isEditing ? mission?.dateFin : new Date(),
                status: isEditing ? mission?.status : "",
                dateRF: isEditing ? mission?.dateRF : new Date(),
                validateLogistic: isEditing ? mission?.validateLogistic : "",
              }
        }
        validationSchema={Yup.object().shape({
          descriptionMission: Yup.string().required("Champ obligatoire"),
          RefBudget: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <NavigationContainer>
                <SectionNavigation
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 1, md: 2 }}
                  justifyContent="space-between"
                >
                  <Stack flexDirection={"row"}>
                    <Link href="/missions/ListMission">
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
                      onClick={formikProps.submitForm}
                    >
                      Enregistrer
                    </Button>
                    <Link href="/missions/ListMission">
                      <Button
                        variant="text"
                        color="warning"
                        size="small"
                        startIcon={<Close />}
                        sx={{ marginInline: 3 }}
                        onClick={() => {
                          formikProps.resetForm();
                          dispatch(cancelEdit());
                        }}
                      >
                        Annuler
                      </Button>
                    </Link>
                  </Stack>
                  <Typography variant="h5">
                    {" "}
                    {isEditing ? "Modification de mission" : "Nouveau mission"}
                  </Typography>
                </SectionNavigation>
                {/* <Divider /> */}
              </NavigationContainer>

              <FormContainer sx={{ backgroundColor: "#fff" }} gap={2}>
                <Stack direction={"row"} gap={2}>
                  <Autocomplete
                    fullWidth
                    id="outlined-basic"
                    options={employees}
                    getOptionLabel={(option: any) =>
                      option.name + " " + option.surname
                    }
                    value={getResponsableOption(
                      formikProps.values.missionManagerId,
                      employees
                    )}
                    onChange={(event, value) =>
                      formikProps.setFieldValue(
                        "missionManagerId",
                        value ? value.id : ""
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Responsable"
                        variant="outlined"
                        error={
                          formikProps.touched.missionManagerId &&
                          Boolean(formikProps.errors.missionManagerId)
                        }
                        required
                      />
                    )}
                    isOptionEqualToValue={(option: any, value: any) =>
                      option.id === value.id
                    }
                  />
                  <Autocomplete
                    fullWidth
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
                        label="Gestionnaires"
                        variant="outlined"
                      />
                    )}
                  />
                </Stack>
                <Stack direction={"row"} gap={2} alignItems={"center"}>
                  <OSTextField
                    id="outlined-basic"
                    label="Référence budget"
                    name="RefBudget"
                    inputProps={{ autoComplete: "off" }}
                    value={formikProps.values.RefBudget}
                    onChange={(e: any) => {
                      formikProps.setFieldValue("RefBudget", e.target.value);
                      const verifierRefBudget = missionListe
                        .filter((f: MissionItem) => f.id)
                        .map((e: MissionItem) => {
                          setGetMission(e.reference as string);
                          return e.RefBudget;
                        });
                      if (
                        verifierRefBudget.includes(e.target.value) &&
                        !isEditing
                      ) {
                        const budgets = "budgets";
                        setGetVerify(budgets);
                        return setOpen(true);
                      }
                    }}
                  />
                  <OSTextField
                    fullWidth
                    select
                    id="outlined-basic"
                    label="Status"
                    name="status"
                    value={
                      statut != "vide" ? statut : formikProps.values.status
                    }
                    onChange={(e: any) => setStatut(e.target.value)}
                  >
                    {statusList.map((s) => (
                      <MenuItem key={s.id} value={s.id}>
                        {s.name}
                      </MenuItem>
                    ))}
                  </OSTextField>
                </Stack>
                <Stack direction={"row"} gap={2}>
                  <OSDatePicker
                    fullWidth
                    id="outlined-basic"
                    label="Date début"
                    name="dateDebut"
                    value={formikProps.values.dateDebut}
                    onChange={(value: any) => {
                      formikProps.setFieldValue("dateDebut", value);
                      const date1 = new Date(value).getTime();
                      const date2 = new Date(
                        formikProps.values.dateFin as Date
                      ).getTime();
                      if (date1 > date2) {
                        return setOpen(true);
                      }
                    }}
                  />
                  <OSDatePicker
                    fullWidth
                    id="outlined-basic"
                    label="Date fin"
                    name="dateFin"
                    value={formikProps.values.dateFin}
                    onChange={(value: any) => {
                      formikProps.setFieldValue("dateFin", value);
                      const date1 = new Date(
                        formikProps.values.dateDebut as Date
                      ).getTime();
                      const date2 = new Date(value).getTime();
                      if (date1 > date2) {
                        return setOpen(true);
                      }
                    }}
                  />
                  <OSDatePicker
                    id="outlined-basic"
                    label="Date RF"
                    name="dateRF"
                    value={formikProps.values.dateRF}
                    onChange={(value: any) =>
                      formikProps.setFieldValue("dateRF", value)
                    }
                  />
                </Stack>
                <OSTextField
                  id="outlined-basic"
                  label="Description de la mission"
                  name="descriptionMission"
                  type="textarea"
                  inputProps={{ autoComplete: "off" }}
                  multiline
                  rows={3}
                />
                <Stack direction={"row"} gap={2}>
                  <Autocomplete
                    fullWidth
                    id="outlined-basic"
                    options={employees}
                    getOptionLabel={(option: any) =>
                      option.name + " " + option.surname
                    }
                    value={getResponsableOption(
                      formikProps.values.verifyTechnic,
                      employees
                    )}
                    onChange={(event, value) =>
                      formikProps.setFieldValue(
                        "verifyTechnic",
                        value ? value.id : ""
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Vérificateur technique"
                        variant="outlined"
                        error={
                          formikProps.touched.verifyTechnic &&
                          Boolean(formikProps.errors.verifyTechnic)
                        }
                        required
                      />
                    )}
                    isOptionEqualToValue={(option: any, value: any) =>
                      option.id === value.id
                    }
                  />
                  <Autocomplete
                    fullWidth
                    id="outlined-basic"
                    options={employees}
                    getOptionLabel={(option: any) =>
                      option.name + " " + option.surname
                    }
                    value={getResponsableOption(
                      formikProps.values.verifyFinancial,
                      employees
                    )}
                    onChange={(event, value) =>
                      formikProps.setFieldValue(
                        "verifyFinancial",
                        value ? value.id : ""
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Vérificateur financier"
                        variant="outlined"
                        error={
                          formikProps.touched.verifyFinancial &&
                          Boolean(formikProps.errors.verifyFinancial)
                        }
                        required
                      />
                    )}
                    isOptionEqualToValue={(option: any, value: any) =>
                      option.id === value.id
                    }
                  />
                  <Autocomplete
                    fullWidth
                    id="outlined-basic"
                    options={employees}
                    getOptionLabel={(option: any) =>
                      option.name + " " + option.surname
                    }
                    value={getResponsableOption(
                      formikProps.values.validateFinancial,
                      employees
                    )}
                    onChange={(event, value) =>
                      formikProps.setFieldValue(
                        "validateFinancial",
                        value ? value.id : ""
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Validateur financier"
                        variant="outlined"
                        error={
                          formikProps.touched.validateFinancial &&
                          Boolean(formikProps.errors.validateFinancial)
                        }
                        required
                      />
                    )}
                    isOptionEqualToValue={(option: any, value: any) =>
                      option.id === value.id
                    }
                  />
                  <Autocomplete
                    fullWidth
                    id="outlined-basic"
                    options={employees}
                    getOptionLabel={(option: any) =>
                      option.name + " " + option.surname
                    }
                    value={getResponsableOption(
                      formikProps.values.validateLogistic,
                      employees
                    )}
                    onChange={(event, value) =>
                      formikProps.setFieldValue(
                        "validateLogistic",
                        value ? value.id : ""
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Validateur logistique"
                        variant="outlined"
                        error={
                          formikProps.touched.validateLogistic &&
                          Boolean(formikProps.errors.validateLogistic)
                        }
                        required
                      />
                    )}
                    isOptionEqualToValue={(option: any, value: any) =>
                      option.id === value.id
                    }
                  />
                </Stack>
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
      <Dialog open={open}>
        <DialogTitle sx={{ color: "red" }}>Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`${
              getVerify == "budgets"
                ? `Référence budget existe déjà avec la mission de ${getMission}"`
                : " La date début doit être inférieure que la date fin"
            }`}
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>
              <Check color="primary" />
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AddNewMission;

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
