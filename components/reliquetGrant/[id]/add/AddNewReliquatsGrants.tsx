import {
  Button,
  Container,
  styled,
  Typography,
  FormControl,
  MenuItem,
  Stack,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { ArrowBack, Check, Close } from "@mui/icons-material";
import { SectionNavigation } from "../../ListReliquetsGrants";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import useFetchEliquatGrant from "../../hooks/useFetchEliquatGrant";
import {
  createReliquatGrant,
  updateReliquatGrant,
} from "../../../../redux/features/reliquatGrants";
import { cancelEdit } from "../../../../redux/features/reliquatGrants/reliquatGrantSlice";
import OSTextField from "../../../shared/input/OSTextField";
import useFetchGrants from "../../../GrantsEnCours/hooks/getGrants";
import useFetchCaisee from "../../hooks/useFetchCaisse";

const AddNewReliquatsGrants = () => {
  const router = useRouter();
  const { id }: any = router.query;
  const dispatch = useAppDispatch();
  const { isEditing, reliquatGrant, caisselist } = useAppSelector(
    (state: any) => state.reliquatGrant
  );
  const fetchEliquatGrant = useFetchEliquatGrant();
  const fetchGrant = useFetchGrants();
  const { grantEncoursList } = useAppSelector(
    (state: any) => state.grantEncours
  );
  const fetchCaisse = useFetchCaisee();

  React.useEffect(() => {
    fetchEliquatGrant();
    fetchGrant();
    fetchCaisse();
  }, [router.query]);

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateReliquatGrant({
            id: reliquatGrant.id!,
            reliquatGrant: values,
          })
        );
        fetchEliquatGrant();
      } else {
        await dispatch(createReliquatGrant(values));
        fetchEliquatGrant();
      }
      router.push("/grants/reliquatGrants");
    } catch (error) {
      console.log("error", error);
    }
  };

  const [soldeBankByGrant, setSoldeBankByGrant] = React.useState(0);

  React.useEffect(() => {
    let totalSolde = 0;
    grantEncoursList.forEach((grant: any) => {
      if (Array.isArray(grant.journalBanks)) {
        grant.journalBanks.forEach((jb: any) => {
          if (jb.id == id) {
            totalSolde = jb.debit - jb.credit;
          }
        });
      }
    });
    setSoldeBankByGrant(totalSolde);
  }, [grantEncoursList, id]);

  const [soldeCaisses, setSoldeCaisse] = React.useState(0);
  React.useEffect(() => {
    let CalculSoldeCaisses = 0;
    caisselist
      .filter((c: any) => c.grantId == id)
      .forEach((solde: any) => {
        CalculSoldeCaisses = solde.debit - solde.credit;
        setSoldeCaisse(CalculSoldeCaisses);
      });
  }, [caisselist, id]);

  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <Formik
        enableReinitialize={true}
        initialValues={
          isEditing
            ? reliquatGrant
            : {
                grant: id || "",
                soldeCaisse: soldeCaisses,
                soldeBank: soldeBankByGrant,
              }
        }
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
                    <Link href="/grants/reliquatGrants">
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
                  <Typography variant="h5">Créer reliquats grants</Typography>
                </SectionNavigation>
              </NavigationContainer>

              <FormContainer spacing={2} sx={{ backgroundColor: "#fff" }}>
                <FormControl fullWidth>
                  <OSTextField
                    fullWidth
                    select
                    id="outlined-basic"
                    label="Grant"
                    variant="outlined"
                    name="grant"
                    value={formikProps.values.grant}
                    onChange={(event: any) =>
                      formikProps.setFieldValue("grant", event.target.value)
                    }
                  >
                    <MenuItem value="">Select grant</MenuItem>
                    {grantEncoursList.map((g: any) => (
                      <MenuItem key={g.id} value={g.id}>
                        {g.code}
                      </MenuItem>
                    ))}
                  </OSTextField>
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
                    if (!isNaN(newValue)) {
                      formikProps.setFieldValue("soldeCaisse", newValue);
                      const newMontant =
                        parseFloat(formikProps.values.soldeBank) + newValue;
                      formikProps.setFieldValue("montantTotal", newMontant);
                    } else {
                      console.error(
                        "Invalid number input:",
                        event.target.value
                      );
                    }
                  }}
                />

                <OSTextField
                  fullWidth
                  id="outlined-basic"
                  label="Solde banque"
                  variant="outlined"
                  name="soldeBank"
                  type="number"
                  value={formikProps.values.soldeBank}
                  onChange={(event: any) => {
                    const newValue = parseFloat(event.target.value);
                    if (!isNaN(newValue)) {
                      formikProps.setFieldValue("soldeBank", newValue);
                      const newMontant =
                        parseFloat(formikProps.values.soldeCaisse) + newValue;
                      formikProps.setFieldValue("montantTotal", newMontant);
                    } else {
                      console.error(
                        "Invalid number input:",
                        event.target.value
                      );
                    }
                  }}
                />

                <OSTextField
                  fullWidth
                  id="outlined-basic"
                  label="Montant Total"
                  variant="outlined"
                  name="montantTotal"
                  type="number"
                  value={formikProps.values.montantTotal}
                  onChange={(event: any) => {
                    const newValue = parseFloat(event.target.value);
                    if (!isNaN(newValue)) {
                      formikProps.setFieldValue("montantTotal", newValue);
                    } else {
                      console.error(
                        "Invalid number input:",
                        event.target.value
                      );
                    }
                  }}
                  readOnly
                />
              </FormContainer>
            </Form>
          );
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
