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
import useFetchPeriode from "../../periode/hooks/useFetchPeriode";
import { PeriodeItem } from "../../../redux/features/periode/periode.interface";

const AddNewBudgetInitial = () => {
  const fetchBudgetInitial = useFetchBudgetInitial();
  const { isEditing, budgetInitial } = useAppSelector((state: any) => state.budgetInitial);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fetchGrant = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state: any) => state.grantEncours)
  const fetchligneBudgetaire = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector((state: any) => state.budgetLine);
  const fetchPeriode = useFetchPeriode();
  const { periodelist } = useAppSelector((state: any) => state.periode)
  const [grantValue, setGrantValue]: any = React.useState("vide");
  const { id }: any = router.query;
  const uniqueValues = new Set();

  React.useEffect(() => {
    fetchGrant();
    fetchligneBudgetaire();
    fetchPeriode()
  }, [router.query])

  //get grant dans periode
  const grantInPeriode: any = []
  const periodeGrantList: { id: string, name: any }[] = []
  let [selectedPeriode, setSelectedPeriode] = React.useState<any[]>(
    isEditing
      ? budgetLineList.filter((pg: any) =>
        budgetInitial?.periodeId?.includes(pg.id!)
      )
      : periodeGrantList
  );
  grantEncoursList.forEach((g: any) => {
    if (grantValue!=="vide") {
      periodelist.forEach((p: any) => {
        let periodeGrant: any = p.grant;
        if (grantValue === periodeGrant) {
          grantInPeriode.push(p.id)
          if (!uniqueValues.has(p.id)) {
            uniqueValues.add(p.id);
            return periodeGrantList.push({ id: p.id, name: p.periode })
          }else{
            return [];
          }
        }
      })
    }
  })

  //get grant dans budget
  const grantInBudgteLine: any = []
  const BudgetLineGrantList: { id: string, name: any }[] = []
  let [selectedBudgetLine, setSelectedBudgetLine] = React.useState<any[]>(
    isEditing
      ? budgetLineList.filter((pg: any) =>
        budgetInitial?.ligneBudgetaire?.includes(pg.id!)
      )
      : BudgetLineGrantList
  );

  grantEncoursList.forEach((g: any) => {
    if (grantValue !== "vide") {
      budgetLineList.forEach((b: any) => {
        let BudgetGrant: any = b.grantId;
        console.log("id grant :", BudgetGrant)
        if (grantValue === BudgetGrant) {
          grantInBudgteLine.push(b.id);
          if (!uniqueValues.has(b.id)) {
            uniqueValues.add(b.id);
            BudgetLineGrantList.push({ id: b.id, name: b.code });
          }
        }
      });
    }
  });

  const handleSubmit = async (values: any) => {
    values.periodeId = [...selectedPeriode.map((p: any) => p.id)];
    values.ligneBudgetaire = [...selectedBudgetLine.map((bl: any) =>bl.id)];
    values.grant = grantValue;
    console.log("id grant :", values.ligneBudgetaire)
    try {
      if (isEditing) {
        await dispatch(
          updateBudgetInitial({
            id: budgetInitial.id!,
            budgetInitial: values,
          })
        );
      } else {
        if (400) {
          return null;
        }
         return (await dispatch(createBudgetInitial(values)),
        fetchBudgetInitial())
      }
      router.push("/grants/budgetInitial");
    } catch (error) {
      console.log("error", error);
    }
  };


interface OSTextFieldProps {
  hyperText?: boolean;
}
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? budgetInitial
            : {
              grant: isEditing ? budgetInitial?.grant : grantValue,
              ligneBudgetaire: isEditing ? budgetInitial?.ligneBudgetaire : "",
              periodeId: isEditing ? budgetInitial?.periode : "",
              montant: isEditing ? budgetInitial?.montant : "",
            }
        }
        validationSchema={Yup.object({
          grant: Yup.string().when("grantValue", {
            is: (grantValue: any) => grantValue !== "vide",then: Yup.string().required("Champ obligatoire"),
          }),
          ligneBudgetaire: Yup.string().required("Champ obligatoire"),
          periodeId: Yup.string().required("Champ obligatoire"),
          montant: Yup.string().required("Champ obligatoire"),
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
                  name="grant"
                  value={(id) ? 
                  budgetLineList.find((e: any) =>e.id === budgetInitial?.grant)?.code: grantValue}
                  onChange={(e: any) => setGrantValue(e.target.value)}
                  hyperText={grantValue == "vide" ? false: true}
                >
                  <MenuItem value="vide">Select grant</MenuItem>
                  {
                    grantEncoursList.map((item: any) => (
                      <MenuItem value={item.id!}>{item.code!}</MenuItem>
                    ))
                  }
                </OSTextField>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={grantValue!="vide" ? BudgetLineGrantList: []}
                  getOptionLabel={(option) => option.name}
                  value={grantValue!="vide" ? selectedBudgetLine: []}
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
                  options={grantValue!="vide" ? periodeGrantList: []}
                  getOptionLabel={(option) => option.name}
                  value={grantValue!="vide" ? selectedPeriode: []}
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
                <OSTextField
                  fullWidth
                  id="outlined-basic"
                  label="montant"
                  variant="outlined"
                  name="montant"
                  type="number"
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
