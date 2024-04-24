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
import React from "react";
import * as Yup from "yup";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import { SectionNavigation } from "../ListReliquetsGrants";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useFetchEliquatGrant from "../hooks/useFetchEliquatGrant";
import { createReliquatGrant, updateReliquatGrant } from "../../../redux/features/reliquatGrants";
import { cancelEdit } from "../../../redux/features/reliquatGrants/reliquatGrantSlice";
import OSTextField from "../../shared/input/OSTextField";
import OSSelectField from "../../shared/select/OSSelectField";
import useFetchGrants from "../../GrantsEnCours/hooks/getGrants";

const AddNewReliquatsGrants = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isEditing, reliquatGrant } = useAppSelector((state: any) => state.reliquatGrant)
  const fetchEliquatGrant = useFetchEliquatGrant();
  const fetchGrant = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state: any) => state.grantEncours)

  React.useEffect(() => {
    fetchEliquatGrant();
    fetchGrant();
  }, [router.query])

  const handleSubmit = async (values: any) => {

    try {
      if (isEditing) {
        await dispatch(
          updateReliquatGrant({
            id: reliquatGrant.id!,
            reliquatGrant: values,
          })
        );
      } else {
        await dispatch(createReliquatGrant(values));
        fetchEliquatGrant();
      }
      router.push("/grants/reliquatGrants");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? reliquatGrant
            : {
              grant: isEditing ? reliquatGrant?.grant : "",
              soldeCaisse: isEditing ? reliquatGrant?.soldeCaisse : "",
              soldeBank: isEditing ? reliquatGrant?.soldeBank : "",
              // montantTotal: isEditing ? reliquatGrant?.montantTotal : "",
            }
        }
        validationSchema={Yup.object({
          grant: Yup.number().required("Champ obligatoire"),
          soldeCaisse: Yup.number().required("Champ obligatoire"),
          soldeBank: Yup.number().required("Champ obligatoire"),
          montantTotal: Yup.number().required("Champ obligatoire"),
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
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  justifyContent="space-between"
                  sx={{ mb: 2 }}
                >
                  <Stack flexDirection={"row"}>
                    <Link href="/grants/reliquatGrants">
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
                  <Typography variant="h5">Créer Réliquats Grants</Typography>
                </SectionNavigation>
                {/* <Divider /> */}
              </NavigationContainer>

              <FormContainer spacing={2} sx={{ backgroundColor: "#fff" }}>
                <FormControl fullWidth>
                  <OSSelectField
                    fullWidth
                    id="outlined-basic"
                    label="Grant"
                    variant="outlined"
                    name="grant"
                    options={grantEncoursList}
                    dataKey={["code"]}
                    valueKey="id"
                  />
                </FormControl>
                <OSTextField
                  fullWidth
                  id="outlined-basic"
                  label="Solde caisse"
                  variant="outlined"
                  name="soldeCaisse"
                  type="number"
                  value={formikProps.values.soldeCaisse}
                  onChange={(event: any) => {
                    const newValue = parseFloat(event.target.value);
                    formikProps.setFieldValue("soldeCaisse", newValue);
                    const newMontant = parseFloat(formikProps.values.soldeBank!) + newValue;
                    formikProps.setFieldValue("montantTotal", newMontant);
                  }}
                />
                <OSTextField
                  fullWidth
                  id="outlined-basic"
                  label="Solde Banque"
                  variant="outlined"
                  name="soldeBank"
                  type="number"
                  value={formikProps.values.soldeBank}
                  onChange={(event: any) => {
                    const newValue = parseFloat(event.target.value);
                    formikProps.setFieldValue("soldeBank", newValue);
                    const newMontant = parseFloat(formikProps.values.soldeCaisse! )+ newValue;
                    formikProps.setFieldValue("montantTotal", newMontant);
                  }}
                />
                <OSTextField
                  fullWidth
                  id="outlined-basic"
                  label="Montant Total"
                  variant="outlined"
                  name="montantTotal"
                  type="number"
                  value={parseFloat(formikProps.values.soldeCaisse! + formikProps.values.soldeBank!)}
                />
              </FormContainer>
            </Form>
          )
        }}
      </Formik>
    </Container>
  );
};

export default AddNewReliquatsGrants;

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
