import {
  Button,
  Container,
  styled,
  Typography,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import * as Yup from "yup";
import { SectionNavigation } from "../ListGrants";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import useFetchGrants from "../../GrantsEnCours/hooks/getGrants";
import { Form, Formik } from "formik";
import OSSelectField from "../../shared/select/OSSelectField";
import OSTextField from "../../shared/input/OSTextField";
import {
  createGrantAdmin,
  updateGrantAdmin,
} from "../../../redux/features/grantAdmin";
import useFetchGrantAdmin from "../hooks/useFetchGrantAdmin";
import { cancelEdit } from "../../../redux/features/grantAdmin/periodeSlice";

const AddNewGrantsAdmin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fetchGrant = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const { isEditing, grantAdmin } = useAppSelector((state) => state.grantAdmin);
  const fetchGrantAdmin = useFetchGrantAdmin();

  React.useEffect(() => {
    fetchGrant();
    fetchGrantAdmin();
  }, [router.query]);
  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateGrantAdmin({
            id: grantAdmin.id!,
            grantAdmin: values,
          })
        );
      } else {
        await dispatch(createGrantAdmin(values));
        fetchGrantAdmin();
      }
      router.push("/grants/grantsAdmin");
    } catch (error) {
      console.log("error", error);
    }
  };
  const listVide = [{ id: "Vide", name: "Vide" }];
  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? grantAdmin
            : {
                grant: isEditing ? grantAdmin?.grant : "",
                bailleur: isEditing ? grantAdmin?.bailleur : "",
              }
        }
        validationSchema={Yup.object({
          grant: Yup.number().required("Champ obligatoire"),
          bailleur: Yup.string().required("Champ obligatoire"),
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
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  justifyContent="space-between"
                  sx={{ mb: 2 }}
                >
                  <Stack flexDirection={"row"}>
                    <Link href="/grants/grantsAdmin">
                      <Button
                        color="info"
                        variant="text"
                        startIcon={<ArrowBack />}
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
                      onClick={() => {
                        formikProps.resetForm();
                        dispatch(cancelEdit());
                      }}
                    >
                      Annuler
                    </Button>
                  </Stack>
                  <Typography variant="h5">
                    {isEditing ? "Modifier" : "Créer"} grant admin
                  </Typography>
                </SectionNavigation>
                <Divider />
              </NavigationContainer>

              <FormContainer sx={{ backgroundColor: "#fff" }} spacing={2}>
                <FormControl fullWidth>
                  <OSSelectField
                    fullWidth
                    id="outlined-basic"
                    label="Grant"
                    variant="outlined"
                    options={grantEncoursList ? grantEncoursList : listVide}
                    dataKey={grantEncoursList ? ["code"] : "name"}
                    valueKey="id"
                    name="grant"
                  />
                </FormControl>
                <OSTextField
                  fullWidth
                  id="outlined-basic"
                  label="Bailleur"
                  variant="outlined"
                  name="bailleur"
                />
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default AddNewGrantsAdmin;

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
