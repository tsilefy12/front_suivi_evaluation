import {
  Button,
  Container,
  styled,
  Typography,
  FormControl,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Autocomplete,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { SectionNavigation } from "../ListGrants";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import OSTextField from "../../shared/input/OSTextField";
import { Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHooks";
import {
  createGrantEncours,
  updateGrantEncours,
} from "../../../redux/features/grantEncours";
import OSDatePicker from "../../shared/date/OSDatePicker";
import { cancelEdit } from "../../../redux/features/grantEncours/grantEncoursSlice";
import useFetchBank from "../hooks";
import OSSelectField from "../../shared/select/OSSelectField";
import useFetchEmploys from "../hooks/getResponsable";
import useFetchPostAnalytique from "../hooks/getPostAnalytique";
import useFetchProject from "../hooks/getProject";
import useFetchCurrency from "../hooks/getCurrency";
import useFetchProgrammeRH from "../hooks/getProgrammeListe";
import useFetchStagiaire from "../hooks/getStagiaire";
import useFetchPrestataire from "../hooks/getPrestataire";

const AddNewGrantsEnCours = () => {
  const router = useRouter();
  const { isEditing, grantEncour }: any = useAppSelector(
    (state: any) => state.grantEncours
  );
  const dispatch: any = useAppDispatch();
  const fetchBank = useFetchBank();
  const fetchEmploys = useFetchEmploys();
  const { bankList } = useAppSelector((state: any) => state.bank);
  const { employees } = useAppSelector((state: any) => state.employe);
  const fetchPostAnalytique = useFetchPostAnalytique();
  const fetchStagiaire = useFetchStagiaire();
  const { interns } = useAppSelector((state: any) => state.stagiaire);
  const fetchPrestataire = useFetchPrestataire();
  const { prestataireListe } = useAppSelector(
    (state: any) => state.prestataire
  );

  const fetcProject = useFetchProject();
  const fetchCurreny = useFetchCurrency();
  const { currencyListe } = useAppSelector((state: any) => state.currency);
  const { projectList } = useAppSelector((state: any) => state.project);
  const fetchProgrammeRH = useFetchProgrammeRH();
  const { programmeRHList } = useAppSelector((state: any) => state.programmeRH);

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    fetchBank();
    fetchEmploys();
    fetchPostAnalytique();
    fetcProject();
    fetchCurreny();
    fetchProgrammeRH();
    fetchStagiaire();
    fetchPrestataire();
  }, []);

  // console.log("prestataire :", interns);
  const listBank: { id: string; name: string }[] = [];
  //get list bank
  if (bankList.length > 0) {
    bankList.forEach((element: any) => {
      listBank.push({ id: element["id"], name: element["chequier"] });
    });
  } else {
    listBank.push({ id: "", name: "" });
  }
  // console.log("grant :", grantEncoursList)
  const listStatus = [
    { id: "PENDING", name: "PENDING" },
    { id: "IN_PROGRESS", name: "IN_PROGRESS" },
    { id: "COMPLETED", name: "COMPLETED" },
  ];

  const handleSubmit = async (values: any) => {
    values.postAnalyticid = null;
    values.type = null;
    if (values.bankId === "") {
      values.bankId = null;
    }
    try {
      if (isEditing) {
        await dispatch(
          updateGrantEncours({
            id: grantEncour.id!,
            grantEncour: values,
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
  const formatOptions = (options: any) => {
    return options.map((option: any) => ({
      id: option.id,
      name: option.name,
      surname: option.surname,
    }));
  };

  // Fusionner les listes et les transformer
  const allOptions = [
    ...formatOptions(employees),
    ...formatOptions(interns),
    ...formatOptions(prestataireListe),
  ];
  const [selectedOption, setSelectedOption] = useState<any>(null);
  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? grantEncour
            : {
                code: isEditing ? grantEncour?.code : "",
                programmeId: isEditing ? grantEncour?.programmeId : "",
                projectId: isEditing ? grantEncour?.projectId : "",
                bankId: isEditing ? grantEncour?.bankId : "",
                type: isEditing ? grantEncour?.type : "",
                bailleur: isEditing ? grantEncour?.bailleur : "",
                amount: isEditing ? grantEncour?.amount : 0,
                amountMGA: isEditing ? grantEncour?.amountMGA : 0,
                responsable: isEditing
                  ? grantEncour?.responsable
                  : selectedOption
                  ? selectedOption.id!
                  : "",
                startDate: isEditing
                  ? grantEncour?.startDate
                  : new Date().toISOString(),
                endDate: isEditing
                  ? grantEncour?.endDate
                  : new Date().toISOString(),
                status: isEditing ? grantEncour?.status : "",
                financeValidator: isEditing
                  ? grantEncour?.financeValidator
                  : "",
                financeVerificator: isEditing
                  ? grantEncour?.financeVerificator
                  : "",
                techValidator: isEditing ? grantEncour?.techValidator : "",
                currencyId: isEditing ? grantEncour?.currencyId : "",
              }
        }
        validationSchema={Yup.object({
          code: Yup.string().required("Champ obligatoire"),
          bailleur: Yup.string().required("Champ obligatoire"),
          amount: Yup.string().required("Champ obligatoire"),
          amountMGA: Yup.string().required("Champ obligatoire"),
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
                  direction={{ xs: "column", sm: "row" }}
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
                      type="button"
                      onClick={formikProps.submitForm}
                    >
                      Enregistrer
                    </Button>
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
                  </Stack>
                  <Typography variant="h5">
                    {isEditing ? "Modif Grant" : "Nouveau Grant"}
                  </Typography>
                </SectionNavigation>
                {/* <Divider /> */}
              </NavigationContainer>

              <FormContainer
                sx={{ backgroundColor: "#fff", pb: 5 }}
                spacing={2}
              >
                <Stack direction="row" spacing={2}>
                  <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Code"
                    variant="outlined"
                    name="code"
                  />
                  <OSSelectField
                    fullWidth
                    id="outlined-basic"
                    label="Programme"
                    variant="outlined"
                    name="programmeId"
                    type="string"
                    options={programmeRHList}
                    dataKey="name"
                    valueKey="id"
                  />
                  <OSSelectField
                    fullWidth
                    id="outlined-basic"
                    label="Projet"
                    variant="outlined"
                    name="projectId"
                    type="string"
                    options={projectList}
                    dataKey="title"
                    valueKey="id"
                  />
                  <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Bailleur"
                    variant="outlined"
                    name="bailleur"
                  />
                  <OSSelectField
                    fullWidth
                    id="outlined-basic"
                    label="Statut"
                    variant="outlined"
                    name="status"
                    type="string"
                    options={listStatus}
                    dataKey="name"
                    valueKey="id"
                  />
                </Stack>
                <CustomStack
                  direction={{ xs: "column", sm: "column", md: "row" }}
                  spacing={{ xs: 2, sm: 2, md: 1 }}
                >
                  <OSSelectField
                    fullWidth
                    id="outlined-basic"
                    label="Validateur technique"
                    variant="outlined"
                    name="techValidator"
                    options={employees}
                    dataKey={["name", "surname"]}
                    valueKey="id"
                  />
                  <OSSelectField
                    fullWidth
                    id="outlined-basic"
                    label="Finance vérificateur"
                    variant="outlined"
                    name="financeVerificator"
                    options={employees}
                    dataKey={["name", "surname"]}
                    valueKey="id"
                  />
                  <OSSelectField
                    fullWidth
                    id="outlined-basic"
                    label="Finance validateur"
                    variant="outlined"
                    name="financeValidator"
                    options={employees}
                    dataKey={["name", "surname"]}
                    valueKey="id"
                  />
                </CustomStack>
                <CustomStack direction="row" spacing={4}>
                  <OSDatePicker
                    fullWidth
                    id="outlined-basic"
                    label="Date de début"
                    variant="outlined"
                    value={
                      !isEditing
                        ? formikProps.values.startDate
                        : grantEncour?.startDate
                    }
                    onChange={(value: any) => {
                      formikProps.setFieldValue("startDate", value);
                      const date1 = new Date(value);
                      const DateNumber1 = date1.getTime();
                      const date2 = new Date(formikProps.values.endDate);
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
                    value={
                      !isEditing
                        ? formikProps.values.endDate
                        : grantEncour?.endDate
                    }
                    onChange={(value: any) => {
                      formikProps.setFieldValue("endDate", value);
                      const date1 = new Date(formikProps.values.startDate);
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
                  <OSSelectField
                    fullWidth
                    id="outlined-basic"
                    label="Compte banque"
                    variant="outlined"
                    name="bankId"
                    options={listBank}
                    dataKey="name"
                    valueKey="id"
                  />
                </FormControl>
                <OSSelectField
                  fullWidth
                  id="outlined-basic"
                  label="Currency"
                  variant="outlined"
                  name="currencyId"
                  options={currencyListe}
                  dataKey={["name"]}
                  valueKey="id"
                />
                <FormControl>
                  <Autocomplete
                    fullWidth
                    id="outlined-basic"
                    options={allOptions}
                    getOptionLabel={(option) =>
                      `${option.name} ${option.surname}`
                    }
                    value={
                      allOptions.find(
                        (option) => option.id === formikProps.values.responsable
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      setSelectedOption(newValue ? newValue.id : null);
                      formikProps.setFieldValue(
                        "responsable",
                        newValue ? newValue.id : ""
                      );
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Responsable"
                        variant="outlined"
                        name="responsable"
                      />
                    )}
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
                    name="amount"
                    type="number"
                  />
                  <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Montant en MGA"
                    variant="outlined"
                    name="amountMGA"
                    type="number"
                  />
                </CustomStack>
              </FormContainer>
            </Container>
          );
        }}
      </Formik>
      <Dialog open={open} disablePortal={false} sx={styleDialog}>
        <DialogTitle color="red">Attention!!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            La date début doit être inférieure de la date fin
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
const styleDialog = {
  position: "fixed",
  //left: 150,
  top: 20,
  width: "auto",
  alignItem: "center",
};
