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

  const [ref, setReference] = React.useState(0);
  React.useEffect(() => {
    const refer = missionListe.map((m: any) => Number(m.reference));
    if (refer.length == 0) {
      refer.push(0);
      return setReference(Math.max(...refer) + 1);
    }
    return setReference(Math.max(...refer) + 1);
  }, [missionListe]);
  const [selectedEmployes, setSelectedEmployes] = useState<EmployeItem[]>(
    isEditing
      ? employees.filter((employee: any) =>
          mission?.budgetManagerId?.includes(employee.id!)
        )
      : []
  );
  const handleSubmit = async (values: any) => {
    values.budgetManagerId = [...selectedEmployes.map((item) => item.id)];

    const now = new Date().getTime();
    const startDaty = new Date(values.dateDebut).getTime();
    const endDaty = new Date(values.dateFin).getTime();
    if (startDaty >= endDaty) {
      const daty = "daty";
      setGetVerify(daty);
      return setOpen(true);
    }
    const verifierRefBudget = missionListe
      .filter((f: MissionItem) => f.id)
      .map((e: MissionItem) => {
        setGetMission(e.reference as string);
        return e.RefBudget;
      });

    if (verifierRefBudget.includes(values.RefBudget)) {
      const budgets = "budgets";
      setGetVerify(budgets);
      return setOpen(true);
    }

    if (!values.reference) {
      values.reference = ref.toString().padStart(3, "0");
    }
    if (startDaty > now && statut == "vide") {
      values.status = "En attente";
    } else if (startDaty <= now && endDaty >= now && statut == "vide") {
      values.status = "Encours";
    } else if (endDaty <= now && statut == "vide") {
      values.status = "Terminé";
    } else {
      values.status = statut;
    }
    try {
      if (isEditing) {
        await dispatch(
          updateMission({
            id: mission.id!,
            mission: values,
          })
        );
      } else {
        await dispatch(createMission(values));
      }
      router.push("/missions/ListMission");
    } catch (error) {
      console.log("error", error);
    }
  };
  const statusList = [
    { id: "En attente", name: "En attente" },
    { id: "Encours", name: "Encours" },
    { id: "Terminé", name: "Terminé" },
    { id: "Annuler", name: "Annuler" },
  ];

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? mission
            : {
                reference: isEditing ? mission?.reference : "",
                missionManagerId: isEditing ? mission?.missionManagerId : "",
                budgetManagerId: isEditing ? mission?.budgetManagerId : "",
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
              }
        }
        validationSchema={Yup.object({
          // reference: Yup.string().required("Champ obligatoire"),
          missionManagerId: Yup.string().required("Champ obligatoire"),
          // budgetManagerId: Yup.string().required("Champ obligatoire"),
          descriptionMission: Yup.string().required("Champ obligatoire"),
          // verifyFinancial: Yup.string().required("Champ obligatoire"),
          // verifyTechnic: Yup.string().required("Champ obligatoire"),
          // validateFinancial: Yup.string().required("Champ obligatoire"),
          RefBudget: Yup.string().required("Champ obligatoire"),
          dateDebut: Yup.string().required("Champ obligatoire"),
          dateFin: Yup.string().required("Champ obligatoire"),
          // status: Yup.string().required("Champ obligatoire"),
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
                    {isEditing ? "Modifier" : "Ajouter"} mission
                  </Typography>
                </SectionNavigation>
                {/* <Divider /> */}
              </NavigationContainer>

              <FormContainer sx={{ backgroundColor: "#fff" }} gap={2}>
                <Stack direction={"row"} gap={2}>
                  <OSSelectField
                    id="outlined-basic"
                    label="Responsable"
                    name="missionManagerId"
                    options={employees}
                    valueKey="id"
                    dataKey={["name", "surname"]}
                  />
                  <OSTextField
                    id="outlined-basic"
                    label="Référence budget"
                    name="RefBudget"
                    inputProps={{ autoComplete: "off" }}
                  />
                </Stack>
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
                      label="Gestionnaires"
                      variant="outlined"
                    />
                  )}
                />
                <Stack direction={"row"} gap={2}>
                  <OSDatePicker
                    fullWidth
                    id="outlined-basic"
                    label="Date début"
                    name="dateDebut"
                    value={formikProps.values.dateDebut}
                    onChange={(value: any) =>
                      formikProps.setFieldValue("dateDebut", value)
                    }
                  />
                  <OSDatePicker
                    fullWidth
                    id="outlined-basic"
                    label="Date fin"
                    name="dateFin"
                    value={formikProps.values.dateFin}
                    onChange={(value: any) =>
                      formikProps.setFieldValue("dateFin", value)
                    }
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
                    <MenuItem value="vide">Select status</MenuItem>
                    {statusList.map((s) => (
                      <MenuItem key={s.id} value={s.id}>
                        {s.name}
                      </MenuItem>
                    ))}
                  </OSTextField>
                </Stack>
                <Stack direction={"row"} gap={2}>
                  <OSSelectField
                    id="outlined-basic"
                    label="Vérificateur finance"
                    name="verifyFinancial"
                    options={employees}
                    dataKey={["name", "surname"]}
                    valueKey="id"
                  />
                  <OSSelectField
                    id="outlined-basic"
                    label="Validateur finance"
                    name="validateFinancial"
                    options={employees}
                    dataKey={["name", "surname"]}
                    valueKey="id"
                  />
                  <OSSelectField
                    id="outlined-basic"
                    label="Vérificateur technique"
                    name="verifyTechnic"
                    options={employees}
                    dataKey={["name", "surname"]}
                    valueKey="id"
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
              getVerify == "daty"
                ? " La date début doit être inférieure que la date fin"
                : `Référence budget existe déjà avec la mission de "MISSION_${getMission}"`
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
