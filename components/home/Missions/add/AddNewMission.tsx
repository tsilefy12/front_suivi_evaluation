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
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
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

const AddNewMission = () => {
  const router = useRouter();
  const { isEditing, mission, employeeList } = useAppSelector(
    (state) => state.mission
  );
  const { employees } = useAppSelector((state) => state.employe);
  const dispatch = useAppDispatch();
  const fetchEmployeesListe = useFetchEmployes();

  useEffect(() => {
    fetchEmployeesListe();
  }, []);

  const handleSubmit = async (values: any) => {
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
      router.push("/");
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
            ? mission
            : {
              reference: isEditing ? mission?.reference : "",
              missionManagerId: isEditing ? mission?.missionManagerId : "",
              budgetManagerId: isEditing ? mission?.budgetManagerId : "",
              descriptionMission: isEditing
                ? mission?.descriptionMission
                : "",
            }
        }
        validationSchema={Yup.object({
          reference: Yup.string().required("Champ obligatoire"),
          missionManagerId: Yup.string().required("Champ obligatoire"),
          budgetManagerId: Yup.string().required("Champ obligatoire"),
          descriptionMission: Yup.string().required("Champ obligatoire"),
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
                    <Link href="/">
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
                    {" "}
                    {isEditing ? "Modifier" : "Ajouter"} Mission
                  </Typography>
                </SectionNavigation>
                {/* <Divider /> */}
              </NavigationContainer>

              <FormContainer sx={{ backgroundColor: "#fff" }} spacing={2}>
                {/* <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Référence mission"
                  variant="outlined"
                /> */}
                <CustomStack
                  direction={{ xs: "column", sm: "column", md: "row" }}
                  spacing={{ xs: 2, sm: 2, md: 1 }}
                >
                  <OSTextField
                    id="outlined-basic"
                    label="Référence"
                    name="reference"
                  />
                  <OSSelectField
                    id="outlined-basic"
                    label="Responsable"
                    name="missionManagerId"
                    options={employees}
                    valueKey="id"
                    dataKey={["name", "surname"]}
                  />
                  <OSSelectField
                    id="outlined-basic"
                    label="Gestionnaire du budget"
                    name="budgetManagerId"
                    options={employees}
                    dataKey={["name", "surname"]}
                    valueKey="id"
                  />
                </CustomStack>
                <OSTextField
                  id="outlined-basic"
                  label="Description de la mission"
                  name="descriptionMission"
                  rows={5}
                  type="textarea"
                />
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
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
