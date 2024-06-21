import {
  Button,
  Container,
  styled,
  Typography,
  MenuItem,
  Stack,
  Icon,
} from "@mui/material";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Add, Check, Close, Delete } from "@mui/icons-material";
import { Form, Formik } from "formik";
import useFetchBudgetInitial from "../hooks/useFetchBudgetInitial";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  createBudgetInitial,
  updateBudgetInitial,
} from "../../../redux/features/budgetInitial";
import { createGrantMonitoring } from "../../../redux/features/grantMonitoring"; // Importer la fonction de création de monitoring
import { useRouter } from "next/router";
import { cancelEdit } from "../../../redux/features/budgetInitial/budgetInitialSlice";
import OSTextField from "../../shared/input/OSTextField";
import useFetchGrants from "../../GrantsEnCours/hooks/getGrants";
import useFetchBudgetLine from "../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchbudgetLine";
import useFetchPeriode from "../../periode/hooks/useFetchPeriode";
import { PeriodeItem } from "../../../redux/features/periode/periode.interface";

const BudgetForm = ({
  formikProps,
  BudgetLineGrantList,
  ligneBudgetMontants,
  setLigneBudgetMontants,
}: any) => {
  const [budgetForms, setBudgetForms] = useState([
    { ligneBudgetaire: "", montant: "" },
  ]);

  const handleAddLigneBudgetMontant = (ligneBudgetaire: any, montant: any) => {
    const newLigneBudgetMontants = [
      ...ligneBudgetMontants,
      { ligneBudgetaire, montant },
    ];
    setLigneBudgetMontants(newLigneBudgetMontants);
    setBudgetForms([...budgetForms, { ligneBudgetaire, montant }]);
    // formikProps.setFieldValue("ligneBudgetaire", ligneBudgetaire);
    // formikProps.setFieldValue("montant", "");
  };
  const handleDeleteLigneBudgetMontant = (indexToDelete: number) => {
    setBudgetForms((prevForms) =>
      prevForms.filter((form, index) => index !== indexToDelete)
    );
  };
  return (
    <>
      {budgetForms.map((form, index) => (
        <Stack direction={"row"} gap={1} key={index}>
          <OSTextField
            fullWidth
            select
            id={`outlined-basic-ligneBudgetaire-${index}`}
            label="ligne budgetaire"
            variant="outlined"
            name={`ligneBudgetaire-${index}`}
            value={formikProps.values[`ligneBudgetaire-${index}`] || "vide"}
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
            id={`outlined-basic-montant-${index}`}
            label="Montant"
            variant="outlined"
            name={`montant-${index}`}
            type="number"
            value={formikProps.values[`montant-${index}`] || ""}
            onChange={formikProps.handleChange}
            disable={formikProps.values.montant != "" ? true : false}
          />
          <Stack direction={"row"} gap={2}>
            <Button
              onClick={() =>
                handleAddLigneBudgetMontant(
                  formikProps.values[`ligneBudgetaire-${index}`],
                  formikProps.values[`montant-${index}`]
                )
              }
              startIcon={<Add color="primary" style={{ fontSize: 25 }} />}
              style={{
                borderRadius: "50%",
                maxWidth: "10px",
                minWidth: "10px",
                marginLeft: 8,
              }}
            ></Button>
            <Button
              onClick={() => handleDeleteLigneBudgetMontant(index)}
              style={{
                color: index === 0 ? "GrayText" : "#ff8c00",
                borderRadius: "50%",
                maxWidth: "10px",
                minWidth: "10px",
              }}
              disabled={index === 0}
            >
              <Delete style={{ fontSize: 25 }} />
            </Button>
          </Stack>
        </Stack>
      ))}
    </>
  );
};

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
  const [grantValue, setGrantValue] = useState<string>("vide");
  const { id } = router.query;
  const uniqueValues = new Set();
  const [getIdGrant, setGetIdGrant] = useState(0);
  const [ligneBudgetMontants, setLigneBudgetMontants] = useState<any[]>([]);

  useEffect(() => {
    fetchGrant();
    fetchligneBudgetaire();
    fetchPeriode();
  }, [router.query]);

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

  const [BudgetLineGrantList, setBudgetLineGrantList] = useState<any>([]);

  useEffect(() => {
    if (grantEncoursList.length > 0) {
      grantEncoursList.forEach((g) => {
        if (getIdGrant !== 0 && Number(getIdGrant) === Number(g.id)) {
          setBudgetLineGrantList(g.budgetLines!);
        }
      });
    }
  }, [getIdGrant, grantEncoursList]);

  useEffect(() => {
    if (id) {
      const idGrant = periodelist.find((p: PeriodeItem) => p.id === id)?.grant;
      if (idGrant !== undefined) {
        setGetIdGrant(idGrant!);
      }
    }
  }, [periodelist, id]);

  const handleSubmit = async (values: any) => {
    try {
      let createdBudgetInitialId = null;
      let promises: Promise<any>[] = [];
      if (isEditing) {
        values.grant = getIdGrant;
        await dispatch(
          updateBudgetInitial({
            id: budgetInitial.id!,
            budgetInitial: values,
          })
        );
        createdBudgetInitialId = budgetInitial.id;
      } else {
        values.grant = getIdGrant;
        const resultAction = await dispatch(createBudgetInitial(values));
        createdBudgetInitialId = resultAction.payload.id;
      }

      for (const item of ligneBudgetMontants) {
        await dispatch(
          createGrantMonitoring({
            budgetInitialId: createdBudgetInitialId,
            ligneBudgetaire: item.ligneBudgetaire,
            montant: item.montant,
          })
        );
      }
      await Promise.all(promises);
      fetchBudgetInitial();
      router.push(`/grants/budgetInitial/${getIdGrant}/list`);
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
                grant: isEditing ? budgetInitial?.grant : getIdGrant,
                periodeId: isEditing ? budgetInitial?.periodeId : id!,
              }
        }
        validationSchema={Yup.object({
          periodeId: Yup.string().required("Champ obligatoire"),
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
                      ? "Modifier budget initial"
                      : "Créer budget initial"}
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
                  onChange={(value: any) =>
                    formikProps.setFieldValue("periodeId", value)
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
                      : "vide"
                  }
                  onChange={(e: any) => setGrantValue(e.target.value)}
                  name="grant"
                />
                <BudgetForm
                  formikProps={formikProps}
                  BudgetLineGrantList={BudgetLineGrantList}
                  handleSubmit={handleSubmit}
                  ligneBudgetMontants={ligneBudgetMontants} // Passer la liste à BudgetForm
                  setLigneBudgetMontants={setLigneBudgetMontants} // Passer la fonction de mise à jour
                />
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
