import {
  Button,
  Container,
  styled,
  Typography,
  MenuItem,
  Stack,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import * as Yup from "yup";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import { Form, Formik } from "formik";
import useFetchBudgetInitial from "../hooks/useFetchBudgetInitial";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  createBudgetInitial,
  updateBudgetInitial,
} from "../../../redux/features/budgetInitial";
import { useRouter } from "next/router";
import { cancelEdit } from "../../../redux/features/budgetInitial/budgetInitialSlice";
import OSTextField from "../../shared/input/OSTextField";
import useFetchGrants from "../../GrantsEnCours/hooks/getGrants";
import useFetchBudgetLine from "../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchbudgetLine";
import useFetchPeriode from "../../periode/hooks/useFetchPeriode";
import { PeriodeItem } from "../../../redux/features/periode/periode.interface";

const AddNewBudgetInitial = () => {
  const fetchBudgetInitial = useFetchBudgetInitial();
  const { isEditing, budgetInitial } = useAppSelector(
    (state) => state.budgetInitial
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fetchGrant = useFetchGrants();
  const { grantEncoursList = [] } = useAppSelector(
    (state) => state.grantEncours
  );
  const fetchligneBudgetaire = useFetchBudgetLine();
  const { budgetLineList = [] } = useAppSelector((state) => state.budgetLine);
  const fetchPeriode = useFetchPeriode();
  const { periodelist = [] } = useAppSelector((state) => state.periode);
  const [grantValue, setGrantValue] = React.useState<string>("vide");
  const { id } = router.query;
  const uniqueValues = new Set();
  const [getIdGrant, setGetIdGrant] = React.useState(0);
  const [ligneBudgetMontants, setLigneBudgetMontants] = React.useState<any[]>(
    []
  );

  React.useEffect(() => {
    fetchGrant();
    fetchligneBudgetaire();
    fetchPeriode();
  }, [router.query]);

  React.useEffect(() => {
    console.log("grantEncoursList: ", grantEncoursList);
  }, [grantEncoursList]);

  let periodeGrantList: { id: any; name: any; amount: number }[] = [];

  if (grantEncoursList.length > 0) {
    grantEncoursList.forEach((g) => {
      if (grantValue !== "vide") {
        periodelist.forEach((p) => {
          let PeriodeGrant = p.grant;
          if (Number(grantValue) === Number(PeriodeGrant)) {
            if (!uniqueValues.has(p.id)) {
              uniqueValues.add(p.id);
              periodeGrantList.push({
                id: p.id,
                name: p.periode,
                amount: p.montant!,
              });
            }
          }
        });
      }
      uniqueValues.add(g.id);
      periodeGrantList.push({ id: "", name: "", amount: 0 });
    });
  }

  const [BudgetLineGrantList, setBudgetLineGrantList] = React.useState<any>([]);

  let [selectedBudgetLine, setSelectedBudgetLine] = React.useState<any>(
    isEditing
      ? budgetLineList.filter(
          (pg) =>
            Array.isArray(budgetInitial?.ligneBudgetaire) &&
            budgetInitial?.ligneBudgetaire.includes(Number(pg.id))
        )
      : BudgetLineGrantList
  );

  React.useEffect(() => {
    if (grantEncoursList.length > 0) {
      grantEncoursList.forEach((g) => {
        if (getIdGrant !== 0 && Number(getIdGrant) === Number(g.id)) {
          setBudgetLineGrantList(g.budgetLines!);
        }
      });
    }
  }, [getIdGrant, grantEncoursList]);

  React.useEffect(() => {
    if (id) {
      const idGrant = periodelist.find((p: PeriodeItem) => p.id === id)?.grant;
      if (idGrant !== undefined) {
        setGetIdGrant(idGrant!);
      }
    }
  }, [periodelist, id]);

  const handleSubmit = async (values: any) => {
    try {
      const updatedValues = {
        ...values,
        ligneBudgetaire: ligneBudgetMontants,
        grant: getIdGrant,
      };

      if (isEditing) {
        await dispatch(
          updateBudgetInitial({
            id: budgetInitial.id!,
            budgetInitial: updatedValues,
          })
        );
      } else {
        await dispatch(createBudgetInitial(updatedValues));
      }

      fetchBudgetInitial();
      router.push(`/grants/budgetInitial/${getIdGrant}/list`);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleAddLigneBudgetMontant = (ligneBudgetaire: any, montant: any) => {
    setLigneBudgetMontants((prev) => [...prev, { ligneBudgetaire, montant }]);
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
                ligneBudgetaire: isEditing
                  ? budgetInitial?.ligneBudgetaire
                  : "",
                periodeId: isEditing ? budgetInitial?.periodeId : id!,
                montant: isEditing ? budgetInitial?.montant : "",
              }
        }
        validationSchema={Yup.object({
          periodeId: Yup.string().required("Cham obligatoire"),
        })}
        onSubmit={(value, action) => {
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
                    <Link href={`/grants/budgetInitial/${getIdGrant}/list`}>
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
                      type="button"
                      onClick={formikProps.submitForm}
                    >
                      Enregistrer
                    </Button>
                    <Link href={`/grants/budgetInitial/${getIdGrant}/list`}>
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
                    {isEditing
                      ? "Modifier Budget initial"
                      : "Créer Budget initial"}
                  </Typography>
                </SectionNavigation>
              </NavigationContainer>

              <FormContainer spacing={2}>
                <OSTextField
                  fullWidth
                  id="outlined-basic"
                  label="Période"
                  variant="outlined"
                  name="periodeId"
                  value={
                    id ? periodelist.find((p) => p.id === id)?.periode : ""
                  }
                />
                <OSTextField
                  fullWidth
                  id="outlined-basic"
                  label="Grant"
                  variant="outlined"
                  value={
                    id && getIdGrant
                      ? grantEncoursList.find(
                          (g) => Number(g.id) === Number(getIdGrant)
                        )?.code
                      : ""
                  }
                  onChange={(e: any) => setGrantValue(e.target.value)}
                  name="grant"
                />
                <Stack direction={"row"} gap={2}>
                  <OSTextField
                    fullWidth
                    select
                    id="outlined-basic"
                    label="ligne budgetaire"
                    variant="outlined"
                    name="ligneBudgetaire"
                    value={formikProps.values.ligneBudgetaire || "vide"}
                    onChange={formikProps.handleChange}
                  >
                    <MenuItem value="vide">Select budget line</MenuItem>
                    {BudgetLineGrantList.map((m: any) => (
                      <MenuItem key={m.id} value={m.id}>
                        {m.code}
                      </MenuItem>
                    ))}
                  </OSTextField>
                  <OSTextField
                    fullWidth
                    select={budgetInitial.id === id}
                    id="outlined-basic"
                    label="Montant"
                    variant="outlined"
                    name="montant"
                    type="number"
                    value={formikProps.values.montant || ""}
                    onChange={formikProps.handleChange}
                    sx={{ display: isEditing }}
                  >
                    <MenuItem>Select</MenuItem>
                  </OSTextField>
                  <Button
                    onClick={() =>
                      handleAddLigneBudgetMontant(
                        formikProps.values.ligneBudgetaire,
                        formikProps.values.montant
                      )
                    }
                  >
                    <Check color="primary" />
                  </Button>
                </Stack>

                {/* <div>
                  <Typography variant="h6">
                    Lignes Budgetaires et Montants
                  </Typography>
                  <ul>
                    {ligneBudgetMontants.map((item, index) => (
                      <li key={index}>
                        {`Ligne Budgetaire: ${item.ligneBudgetaire}, Montant: ${item.montant}`}
                      </li>
                    ))}
                  </ul>
                </div> */}
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default AddNewBudgetInitial;

const NavigationContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({
  display: "flex",
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
