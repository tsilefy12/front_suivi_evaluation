import {
  Button,
  Container,
  styled,
  Typography,
  TextField,
  FormControl,
  Stack,
  Autocomplete,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import { SectionNavigation } from "../ListTacheCles";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import useFetchEmploys from "../../../GrantsEnCours/hooks/getResponsable";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { createTacheCle, updateTacheCle } from "../../../../redux/features/tacheCle";
import useFetchTacheCle from "../hooks/useFetchTacheCle";
import { EmployeItem } from "../../../../redux/features/employe/employeSlice.interface";
import useFetchProject from "../../../GrantsEnCours/hooks/getProject";
import OSTextField from "../../../shared/input/OSTextField";
import OSSelectField from "../../../shared/select/OSSelectField";
import { cancelEdit } from "../../../../redux/features/tacheCle/tacheCle";

const AddNewTacheCle = () => {
  const router = useRouter();
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state) => state.employe)
  const { tacheCle, isEditing, tacheClelist } = useAppSelector((state) => state.tacheCle)
  const dispatch = useAppDispatch();
  const fetchTacheCle = useFetchTacheCle();
  const { grantEnCours } = useAppSelector((state) =>state.grantEncours) 
  const { projectList } = useAppSelector((state) =>state.project)
  const fetchProject = useFetchProject();

  React.useEffect(() => {
    fetchEmployes();
    fetchProject();
  }, [router.query])

  const [selectedEmployes, setSelectedEmployes] = React.useState<EmployeItem[]>(
    isEditing
      ? employees.filter((employee: any) =>
          tacheCle?.responsable?.includes(employee.id!)
        )
      : []
  );
//  console.log(" id responsable :", selectedEmployes)
  const handleSubmit = async (values: any) => {
    values.responsable = [...selectedEmployes.map((item) =>item.id)];
    try {
      if (isEditing) {
        await dispatch(
          updateTacheCle({
            id: tacheCle.id!,
            tacheCle: values,
          })
        );
      } else {
        await dispatch(createTacheCle(values));
        fetchTacheCle();
      }
      router.push("/plan_travail/tacheCle");
    } catch (error) {
      console.log("error", error);
    }
  };
    //get list project
    const listProjet: {id: number, name: any}[]=[];
    if (projectList.length > 0) {
      projectList.map((element: any) => {
        listProjet.push({id: element.id, name: element.titleEn})
    })
  }else{
    listProjet.push({id: 0, name: ""})
  }
  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? tacheCle
            : {
              tacheCle: isEditing ? tacheCle?.tacheCle : "",
              responsable: isEditing ? tacheCle?.responsable : "",
              projet: isEditing ? tacheCle?.projet : "",
            }
        }
        validationSchema={Yup.object({
          // tacheCle: Yup.string().required("Champ obligatoire"),
          // projet: Yup.number().required("Champ obligatoire"),
          // responsable: Yup.string().required("Champ obligatoire"),
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
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 1, sm: 1, md: 4 }}
                  justifyContent="space-between"
                  sx={{ mb: 2 }}
                >
                  <Stack flexDirection={"row"}>
                    <Link href="/plan_travail/tacheCle">
                      <Button color="info" variant="text" startIcon={<ArrowBack />}>
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
                      onClick={() => {
                        formikProps.resetForm();
                        dispatch(cancelEdit());
                      }}
                    >
                      Annuler
                    </Button>
                  </Stack>
                  <Typography variant="h5">Créer Tâches clés</Typography>
                </SectionNavigation>
                {/* <Divider /> */}
              </NavigationContainer>

              <FormContainer spacing={2}>
                <OSTextField
                  fullWidth
                  id="outlined-basic"
                  label="Tâche clé"
                  variant="outlined"
                  name="tacheCle"
                />
                <OSSelectField                  
                  fullWidth
                  id="outlined-basic"
                  label="Projet"
                  variant="outlined"
                  options={listProjet}
                  dataKey="name"
                  valueKey="id"
                  name="projet"
                  type="number"
                />
                <FormControl fullWidth>
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
              </FormContainer>
            </Form>
          )
        }}
      </Formik>
    </Container>
  );
};

export default AddNewTacheCle;

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
  background: "#fff",
}));
