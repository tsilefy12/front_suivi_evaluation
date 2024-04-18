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
import { createGrantEncours, updateGrantEncours } from "../../../redux/features/grantEncours";
import OSDatePicker from "../../shared/date/OSDatePicker";
import { cancelEdit } from "../../../redux/features/grantEncours/grantEncoursSlice";
import useFetchBank from "../hooks";
import OSSelectField from "../../shared/select/OSSelectField";
import useFetchEmploys from "../hooks/getResponsable";
import { EmployeItem } from "../../../redux/features/employe/employeSlice.interface";
//import { GrantEncoursItem } from "../../../redux/features/grantEncours/grantEncours.interface";
import useFetchPostAnalytique from "../hooks/getPostAnalytique";
import useFetchProject from "../hooks/getProject";

const AddNewGrantsEnCours = () => {
  const router = useRouter();
  const { isEditing, grantEnCours, grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const dispatch = useAppDispatch();
  const fetchBank = useFetchBank();
  const fetchEmploys = useFetchEmploys();
  const { bankList } = useAppSelector((state) =>state.bank);
  const { employees } = useAppSelector((state) =>state.employe)
  const fetchPostAnalytique = useFetchPostAnalytique();
  const { postAnalytiqueList } = useAppSelector((state) =>state.postAnalytique);
  const fetcProject = useFetchProject();
  const { projectList } = useAppSelector((state) =>state.project);

  const [idProject, setIdProject]: any = React.useState(null);
  let [titreFr, setTitreFr]: any = React.useState("")
  let [titreEn, setTitreEn]: any = React.useState("")
  const nulValue: any = null;

  const [selectedEmployes, setSelectedEmployes] = useState<EmployeItem[]>(
    isEditing
      ? employees.filter((employee) =>
          grantEnCours?.employeeIDs?.includes(employee.id!)
        )
      : []
  );

  React.useEffect(() =>{
    fetchBank();
    fetchEmploys();
    fetchPostAnalytique();
    fetcProject();
  }, [])

  const listBank: {id: string, name: string }[]=[]
  //get list bank
    if (bankList.length > 0) {
      bankList.forEach((element: any) => {
          listBank.push({id: element["id"], name: element['name']})
      });
    }else{
      listBank.push({id: "", name: ""})
    }

    //get list project
      if (projectList.length > 0) {
          projectList.map((element: any) => {
            if (idProject == element.id) {
             titreFr = element.titleFr
             titreEn = element.titleEn
        };
      })
    }

  const handleSubmit = async (values: any) => {
    values.responsable = [...selectedEmployes.map((item) =>item.id)];
    values.titleFr = titreFr;
    values.titleEn = titreEn;
    values.projectId = (idProject == null) ? null : idProject
        try {
      if (isEditing) {
        await dispatch(
          updateGrantEncours({
            id: grantEnCours.id!,
            grantEncours: values,
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
  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? grantEnCours
            : {
              code: isEditing ? grantEnCours?.code: "",
              postAnalyticId: isEditing ? grantEnCours?.postAnalyticId : "",
              projectId: isEditing ? grantEnCours?.projectId : "",
              bankId: isEditing ? grantEnCours?.bankId : "",
              titleFr: isEditing ? grantEnCours?.titleFr : "",
              titleEn: isEditing ? grantEnCours?.titlEn : "",
              bailleur: isEditing ? grantEnCours?.bailleur : "",
              amount: isEditing ? grantEnCours?.amount : 0,
              amountMGA: isEditing ? grantEnCours?.amountMGA : 0,
              responsable: isEditing ? grantEnCours?.responsable : "",
              startDate: isEditing ? grantEnCours?.startDate : new Date(),
              endDate: isEditing ? grantEnCours?.enDate : new Date(),
              duration: isEditing ? grantEnCours?.duration : 0,

            }
        }
        validationSchema={Yup.object({
          code: Yup.string().required("Champ obligatoire"),
          postAnalyticId: Yup.number().required("Champ obligatoire"),
          bankId: Yup.number().required("Champ obligatoire"),
          // titleFr: Yup.string().required("Champ obligatoire"),
          // titleEn: Yup.string().required("Champ obligatoire"),
          bailleur: Yup.string().required("Champ obligatoire"),
          amount: Yup.string().required("Champ obligatoire"),
          amountMGA: Yup.string().required("Champ obligatoire"),
          // responsable: Yup.string().required("Champ obligatoire"),
          duration: Yup.number().required("Champ obligatoire"),
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
                  direction={{ xs: 'column', sm: 'row' }}
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
                  <Typography variant="h5">{isEditing ? "Modif GRANT": "Créer GRANT"}</Typography>
                </SectionNavigation>
                {/* <Divider /> */}
              </NavigationContainer>

              <FormContainer sx={{ backgroundColor: "#fff", pb: 5 }} spacing={2}>
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
                    label="Poste analytique"
                    variant="outlined"
                    name="postAnalyticId"
                    options={postAnalytiqueList}
                    dataKey="name"
                    valueKey="id"
                  />
                  <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Bailleur"
                    variant="outlined"
                    name="bailleur"
                  />
                </Stack>
                <CustomStack
                  direction={{ xs: "column", sm: "column", md: "row" }}
                  spacing={{ xs: 2, sm: 2, md: 1 }}
                >
                  <TextField
                    fullWidth
                    select
                    id="outlined-basic"
                    label="Projet"
                    variant="outlined"
                    name="projectId"
                    type="number"
                    value={idProject}
                    onChange={(e) =>setIdProject(e.target.value)}
                  >
                    <MenuItem value={nulValue}>Nouveau Projet</MenuItem>
                    {
                        projectList.map((item) =>(
                          <MenuItem value={item.id}>{item.id + "-"+ item.titleEn}</MenuItem>
                        ))
                    }
                  </TextField>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Projet en français"
                    variant="outlined"
                    name="titleFr"
                    value={titreFr}
                    onChange={(e) =>setTitreFr(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Projet en Anglais"
                    variant="outlined"
                    name="titleEn"
                    value={titreEn}
                    onChange={(e) =>setTitreEn(e.target.value)}
                  />
                </CustomStack>
                <CustomStack direction="row" spacing={4}
                >
                  <OSDatePicker
                    fullWidth
                    id="outlined-basic"
                    label="Date de début"
                    variant="outlined"
                    value={!isEditing ? formikProps.values.startDate: grantEnCours?.startDate}
                    onChange={(value: any) =>formikProps.setFieldValue("startDate", value)}
                  />
                  <OSDatePicker
                    fullWidth
                    id="outlined-basic"
                    label="Date de fin"
                    variant="outlined"
                    value={!isEditing ? formikProps.values.endDate: grantEnCours?.endDate}
                    onChange={(value: any) =>formikProps.setFieldValue("endDate", value)}
                  />
                  <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Durée"
                    variant="outlined"
                    name="duration"
                    type="number"
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
                <FormControl>
                <Autocomplete
                    multiple
                    id="tags-standard"
                    options={employees}
                    getOptionLabel={(employee) =>
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
                        label="Sélectionnez participant"
                        variant="outlined"
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
          )
        }}
      </Formik>
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
