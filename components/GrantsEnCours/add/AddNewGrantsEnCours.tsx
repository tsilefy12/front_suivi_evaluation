import {
  Button,
  Container,
  styled,
  Typography,
  FormControl,
  MenuItem,
  Stack,
  Autocomplete,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
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
import { EmployeItem } from "../../../redux/features/employe/employeSlice.interface";
//import { GrantEncoursItem } from "../../../redux/features/grantEncours/grantEncours.interface";
import useFetchPostAnalytique from "../hooks/getPostAnalytique";
import useFetchProject from "../hooks/getProject";
import useFetchCurrency from "../hooks/getCurrency";

const AddNewGrantsEnCours = () => {
  const router = useRouter();
  const { isEditing, grantEncour, grantEncoursList }: any = useAppSelector(
    (state: any) => state.grantEncours
  );
  const dispatch: any = useAppDispatch();
  const fetchBank = useFetchBank();
  const fetchEmploys = useFetchEmploys();
  const { bankList } = useAppSelector((state: any) => state.bank);
  const { employees } = useAppSelector((state: any) => state.employe);
  const fetchPostAnalytique = useFetchPostAnalytique();
  const { postAnalytiqueList } = useAppSelector(
    (state: any) => state.postAnalytique
  );
  const fetcProject = useFetchProject();
  const fetchCurreny = useFetchCurrency();
  const { currencylist } = useAppSelector((state: any) => state.currency);
  const { projectList } = useAppSelector((state: any) => state.project);

  const [open, setOpen] = React.useState(false);

  // const [selectedEmployes, setSelectedEmployes] = useState<EmployeItem[]>(
  //   isEditing
  //     ? employees.filter((employee: any) =>
  //         grantEncour?.responsable?.includes(employee.id!)
  //       )
  //     : []
  // );

  React.useEffect(() => {
    fetchBank();
    fetchEmploys();
    fetchPostAnalytique();
    fetcProject();
    fetchCurreny();
  }, [router.query]);

  const listBank: { id: string; name: string }[] = [];
  //get list bank
  if (bankList.length > 0) {
    bankList.forEach((element: any) => {
      listBank.push({ id: element["id"], name: element["name"] });
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
    values.projectId = 1;
    values.postAnalyticId = null;
    values.bankId = null;

    const date1 = new Date(values.startDate);
    const DateNumber1 = date1.getTime();
    const date2 = new Date(values.endDate);
    const DateNumber2 = date2.getTime();

    if (DateNumber1 >= DateNumber2) {
      setOpen(true);
    } else {
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
    }
  };
  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? grantEncour
            : {
                code: isEditing ? grantEncour?.code : "",
                postAnalyticId: isEditing ? grantEncour?.postAnalyticId : 0,
                projectId: isEditing ? grantEncour?.projectId : 0,
                bankId: isEditing ? grantEncour?.bankId : "",
                // titleFr: isEditing ? grantEncour?.titleFr : "",
                // titleEn: isEditing ? grantEncour?.titleEn : "",
                bailleur: isEditing ? grantEncour?.bailleur : "",
                amount: isEditing ? grantEncour?.amount : 0,
                amountMGA: isEditing ? grantEncour?.amountMGA : 0,
                responsable: isEditing ? grantEncour?.responsable : "",
                startDate: isEditing
                  ? grantEncour?.startDate
                  : new Date().toISOString(),
                endDate: isEditing
                  ? grantEncour?.endDate
                  : new Date().toISOString(),
                techDate: isEditing
                  ? grantEncour?.techDate
                  : new Date().toISOString(),
                financeDate: isEditing
                  ? grantEncour?.financeDate
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
                deadline: isEditing
                  ? grantEncour?.deadline
                  : new Date().toISOString(),
                note: isEditing ? grantEncour?.note : "",
              }
        }
        validationSchema={Yup.object({
          code: Yup.string().required("Champ obligatoire"),
          bailleur: Yup.string().required("Champ obligatoire"),
          amount: Yup.string().required("Champ obligatoire"),
          amountMGA: Yup.string().required("Champ obligatoire"),
          note: Yup.string().required("Champ obligatoire"),
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
                      type="button" // Modifier le type à "button"
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
                    >
                      Annuler
                    </Button>
                  </Stack>
                  <Typography variant="h5">
                    {isEditing ? "Modif GRANT" : "Créer GRANT"}
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
                    label="Projet"
                    variant="outlined"
                    name="projectId"
                    options={projectList}
                    dataKey="title"
                    valueKey="id"
                    type="number"
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
                    label="Status"
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
                    label="Finance validateur"
                    variant="outlined"
                    name="financeValidator"
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
                    label="Validateur technique"
                    variant="outlined"
                    name="techValidator"
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
                    onChange={(value: any) =>
                      formikProps.setFieldValue("startDate", value)
                    }
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
                    onChange={(value: any) =>
                      formikProps.setFieldValue("endDate", value)
                    }
                  />
                  <OSDatePicker
                    fullWidth
                    id="outlined-basic"
                    label="Date tech"
                    variant="outlined"
                    name="techDate"
                    value={
                      !isEditing
                        ? formikProps.values.techDate
                        : grantEncour?.techDate
                    }
                    onChange={(value: any) =>
                      formikProps.setFieldValue("techDate", value)
                    }
                  />
                  <OSDatePicker
                    fullWidth
                    id="outlined-basic"
                    label="Deadline"
                    variant="outlined"
                    name="deadline"
                    value={
                      !isEditing
                        ? formikProps.values.deadline
                        : grantEncour?.deadline
                    }
                    onChange={(value: any) =>
                      formikProps.setFieldValue("deadline", value)
                    }
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
                  options={currencylist}
                  dataKey={["name"]}
                  valueKey="id"
                />
                <FormControl>
                  <OSSelectField
                    fullWidth
                    id="outlined-basic"
                    label="Responsable"
                    variant="outlined"
                    name="responsable"
                    options={employees}
                    dataKey={["name", "surname"]}
                    valueKey="id"
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
                <OSTextField
                  fullWidth
                  id="outlined-basic"
                  label="Notes"
                  variant="outlined"
                  name="note"
                  multiline
                  rows={3}
                />
              </FormContainer>
            </Container>
          );
        }}
      </Formik>
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
