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
  Autocomplete,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
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
import useFetchPeriode from "../../periode/hooks/useFetchPeriode";
import { PeriodeItem } from "../../../redux/features/periode/periode.interface";
import { getValueAndUnit } from "polished";

const AddNewBudgetInitial = () => {
  const fetchBudgetInitial = useFetchBudgetInitial();
  const { isEditing, budgetInitial } = useAppSelector(state => state.budgetInitial);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fetchGrant = useFetchGrants();
  const { grantEncoursList } = useAppSelector(state => state.grantEncours)
  const fetchligneBudgetaire = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector(state => state.budgetLine);
  const fetchPeriode = useFetchPeriode();
  const { periodelist } = useAppSelector(state => state.periode)
  const [grantValue, setGrantValue] = React.useState<string>("vide");
  const { id }: any = router.query;
  const uniqueValues = new Set();

  React.useEffect(() => {
    fetchGrant();
    fetchligneBudgetaire();
    fetchPeriode();
  }, [router.query])
  //  console.log("value key :", grantValue)
  //get grant dans periode
  let periodeGrantList: { id: any, name: any }[] = [];
  let [selectedPeriode, setSelectedPeriode] = React.useState<any[]>(
    isEditing
      ? periodelist.filter(pg =>
        budgetInitial?.periodeId?.includes(pg.id!)
      )
      : periodeGrantList
  );
  grantEncoursList.map((g: any) => {
    if (grantValue !== "vide") {
      periodelist.map(p => {
        let PeriodeGrant: any = p.grant;
        if (grantValue === PeriodeGrant) {
          if (!uniqueValues.has(p.id)) {
            uniqueValues.add(p.id);
            periodeGrantList.push({ id: p.id, name: p.periode })
          }
        }
      })
    }
    uniqueValues.add(g.id)
    periodeGrantList.push({id: "", name: ""});
  })

  //get grant dans budget
  let BudgetLineGrantList:any = [];
  let [selectedBudgetLine, setSelectedBudgetLine] = React.useState<any[]>(
    isEditing
      ? budgetLineList.filter((pg: any) =>
        Array.isArray(budgetInitial?.ligneBudgetaire) && budgetInitial?.ligneBudgetaire.includes(pg.id)
      )
      : BudgetLineGrantList
  );
  grantEncoursList.map(g => {
    if (grantValue !=="vide") {
        if (grantValue === g.id!) {
          if (!uniqueValues.has(g.id)) {
            uniqueValues.add(g.id);
            return BudgetLineGrantList = g.budgetLines;
          }
        }
    }
    uniqueValues.add(g.id)
    return BudgetLineGrantList = [];
  })

  // console.log("bi :", BudgetLineGrantList)

  const handleSubmit = async (values: any) => {
    values.periodeId = [...selectedPeriode.map(p => p.id)];
    values.ligneBudgetaire = [...selectedBudgetLine.map(bl => bl.id)];
    values.grant = grantValue;

    let totalMontantBudget = selectedBudgetLine.reduce((total: number, currentItem: any) => total + currentItem.amount, 0);
    let totalMontantPeriode = selectedPeriode.reduce((total: number, currentItem: any) => total + currentItem.montant, 0);

    let somme = totalMontantBudget + totalMontantPeriode;
    values.montant = somme;
    // console.log("montant :", selectedBudgetLine)
    try {
      if (isEditing) {
        // console.log("periode id :", values.periodeId)
        await dispatch(
          updateBudgetInitial({
            id: budgetInitial.id!,
            budgetInitial: values,
          })
        );
      } else {
        await dispatch(createBudgetInitial(values))
      }
      fetchBudgetInitial()
      router.push("/grants/budgetInitial");
    } catch (error) {
      console.log("error", error);
    }
  };

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
              periodeId: isEditing ? budgetInitial?.periodeId : "",
              // montant: isEditing ? budgetInitial?.montant : ,
            }
        }
        // validationSchema={Yup.object({
        //   // periodeId: Yup.string().required("Cham obligatoire"),
        // })}
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
                  <Typography variant="h5">{isEditing ? "Modifier Budget initial" : "Créer Budget initial"}</Typography>
                </SectionNavigation>
                {/* <Divider /> */}
              </NavigationContainer>

              <FormContainer spacing={2}>
                <OSTextField
                  fullWidth
                  select
                  id="outlined-basic"
                  label="Grant"
                  variant="outlined"
                  value={grantValue}
                  onChange={(e: any) => setGrantValue(e.target.value)}
                  name="grant"
                >
                  <MenuItem value="vide">Select grant</MenuItem>
                  {
                    grantEncoursList.map(g => (
                      <MenuItem key={g.id!} value={g.id!}>{g.code}</MenuItem>
                    ))
                  }
                </OSTextField>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={BudgetLineGrantList}
                  getOptionLabel={(option) => option.name}
                  value={selectedBudgetLine}
                  onChange={(event, newValue) => {
                    setSelectedBudgetLine(newValue!);
                  }}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      id="outlined-basic"
                      label="Sélectionnez ligne budgetaire"
                      variant="outlined"
                    />
                  )}
                />
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={periodeGrantList}
                  getOptionLabel={(option) => option.name}
                  value={selectedPeriode}
                  onChange={(event, newValue) => {
                    setSelectedPeriode(newValue!);
                  }}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      id="outlined-basic"
                      label="Sélectionnez periode"
                      variant="outlined"
                    />
                  )}
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
