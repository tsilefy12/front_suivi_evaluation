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
import { SectionNavigation } from "../ListBudgetsInitial";
import { Form, Formik } from "formik";
import useFetchBudgetInitial from "../hooks/useFetchBudgetInitial";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { createBudgetInitial, updateBudgetInitial } from "../../../redux/features/budgetInitial";
import { useRouter } from "next/router";
import { cancelEdit } from "../../../redux/features/budgetInitial/budgetInitialSlice";
import OSTextField from "../../shared/input/OSTextField";
import OSSelectField from "../../shared/select/OSSelectField";
import useFetchGrants from "../../GrantsEnCours/hooks/getGrants";
import useFetchBudgetLine from "../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchbudgetLine";

const AddNewBudgetInitial = () => {
  const fetchBudgetInitial = useFetchBudgetInitial();
  const { isEditing, budgetInitial } = useAppSelector((state) => state.budgetInitial);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fetchGrant = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) =>state.grantEncours)
  const fetchligneBudgetaire = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector((state) =>state.budgetLine);

  React.useEffect(() =>{
    fetchGrant();
    fetchligneBudgetaire();
  }, [router.query])

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateBudgetInitial({
            id: budgetInitial.id!,
            budgetInitial: values,
          })
        );
      } else {
        await dispatch(createBudgetInitial(values));
        fetchBudgetInitial();
      }
      router.push("/grants/budgetInitial");
    } catch (error) {
      console.log("error", error);
    }
  };

  const listePeriode = [
    {id: "Periode 1", name: "Periode 2"},
    {id: "Periode 2", name: "Periode 2"},
    {id: "Periode 3", name: "Periode 3"},
  ]
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? budgetInitial
            : {
              grant: isEditing ? budgetInitial?.grant : "",
              ligneBudgetaire: isEditing ? budgetInitial?.ligneBudgetaire : "",
              periode: isEditing ? budgetInitial?.periode : "",
              montant: isEditing ? budgetInitial?.montant : "",
            }
        }
        validationSchema={Yup.object({
          grant: Yup.string().required("Champ obligatoire"),
          ligneBudgetaire: Yup.number().required("Champ obligatoire"),
          periode: Yup.string().required("Champ obligatoire"),
          montant: Yup.number().required("Champ obligatoire"),
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
                    <Link href="/grants/budgetInitial">
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
                  <Typography variant="h5">Créer Budget initial</Typography>
                </SectionNavigation>
                {/* <Divider /> */}
              </NavigationContainer>

              <FormContainer spacing={2}>
                <OSSelectField
                  fullWidth
                  id="outlined-basic"
                  label="Grant"
                  variant="outlined"
                  options={grantEncoursList}
                  dataKey={["code"]}
                  valueKey="id"
                  name="grant"
                />
                <OSSelectField
                  fullWidth
                  id="outlined-basic"
                  label="Ligne budgetaire"
                  variant="outlined"
                  options={budgetLineList}
                  dataKey={["code"]}
                  valueKey="id"
                  name="ligneBudgetaire"
                />
                <OSSelectField
                  fullWidth
                  id="outlined-basic"
                  label="Ligne budgetaire"
                  variant="outlined"
                  options={listePeriode}
                  dataKey="name"
                  valueKey="id"
                  name="periode"
                />
                <OSTextField
                  fullWidth
                  id="outlined-basic"
                  label="montant"
                  variant="outlined"
                  name="montant"

                />
              </FormContainer>
            </Form>
          )
        }}
      </Formik>
    </Container>
  );
};

export default AddNewBudgetInitial;

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
