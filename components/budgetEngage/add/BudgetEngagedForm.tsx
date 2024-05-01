import {
  Button,
  Container,
  styled,
  Typography,
  Stack,
  FormControl,
  MenuItem,
  TextField,
  Autocomplete,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import { SectionNavigation } from "../ListBudgetsEngage";
import { Form, FormikProps } from "formik";
import OSDatePicker from "../../shared/date/OSDatePicker";
import OSSelectField from "../../shared/select/OSSelectField";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { getGrantEncoursList } from "../../../redux/features/grantEncours";
import { getBudgetLineList } from "../../../redux/features/budgetLine";
import OSTextField from "../../shared/input/OSTextField";
import { useRouter } from "next/router";
import { createBudgetEngaged, updateBudgetEngaged } from "../../../redux/features/budgetEngaged/budgetEngagedSlice";

const BudgetEngagedForm = ({ formikProps }: { formikProps: FormikProps<any> }) => {
  const dispatch = useAppDispatch();
  const router = useRouter()
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const { budgetLineList } = useAppSelector((state) => state.budgetLine);
  const { isEditing, budgetEngaged } = useAppSelector((state) => state.budgetsEngaged);
  const [grantValue, setGrantValue]: any = React.useState("vide");
  const uniqueValues = new Set();
  const { id }: any= router.query;

  const fetchUtilsData = () => {
    dispatch(getGrantEncoursList({}));
    dispatch(getBudgetLineList({}));
  };

  useEffect(() => {
    fetchUtilsData();
  }, []);

  //get grant dans budget
  const grantInBudgteLine: any = []
  const BudgetLineGrantList: { id: string, name: any }[] = []
  let [selectedBudgetLine, setSelectedBudgetLine] = React.useState<any[]>(
    isEditing
      ? budgetLineList.filter((pg: any) =>
        Array.isArray(budgetEngaged?.budgetLineId) && budgetEngaged?.budgetLineId?.includes(pg.id!)
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
    values.ligneBudgetaire = [...selectedBudgetLine.map((bl: any) =>bl.id)];
    values.grant = grantValue;
    // console.log("id grant :", values.ligneBudgetaire)
    try {
      if (isEditing) {
        await dispatch(
          updateBudgetEngaged({
            id: budgetEngaged.id!,
            budgetEngageData: values,
          })
        );
      } else {
        if (400) {
          return null;
        }
         return (await dispatch(createBudgetEngaged(values)),
        fetchUtilsData())
      }
      router.push("/grants/budgetInitial");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Form>
      <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
        <NavigationContainer>
          <SectionNavigation
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Stack flexDirection={"row"}>
              <Button color="info" variant="text" startIcon={<ArrowBack />}
                onClick={() => router.back()}
              >
                Retour
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<Check />}
                sx={{ marginInline: 3 }}
                type="button"
                onClick={() =>handleSubmit(formikProps.submitForm)}
              >
                Enregistrer
              </Button>
              <Button
                variant="text"
                color="warning"
                size="small"
                startIcon={<Close />}
                sx={{ marginInline: 3 }}
              >
                Annuler
              </Button>
            </Stack>
            <Typography variant="h5">{isEditing ? "Modifier" : "Créer"} Budget Engagés</Typography>
          </SectionNavigation>
        </NavigationContainer>

        <FormContainer spacing={2}>
          <FormControl fullWidth>
            <OSDatePicker
              fullWidth
              id="outlined-basic"
              label="Date"
              variant="outlined"
              value={formikProps.values.date}
              onChange={(value: any) => formikProps.setFieldValue("date", value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <OSTextField
              fullWidth
              select
              id="outlined-basic"
              label="Grant"
              variant="outlined"
              name="grantsId"
              value={(id) ?
                budgetLineList.find((e: any) => e.id === budgetEngaged?.grantsId)?.code : grantValue}
              onChange={(e: any) => setGrantValue(e.target.value)}
              hyperText={grantValue == "vide" ? false : true}
            >
              <MenuItem value="vide">Select grant</MenuItem>
              {
                grantEncoursList.map((item: any) => (
                  <MenuItem value={item.id!}>{item.code!}</MenuItem>
                ))
              }
            </OSTextField>
          </FormControl>
          <FormControl fullWidth>
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
          </FormControl>
          <OSTextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            label="Libellé"
            name="libelle"
          />
          <OSTextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            label="Montant"
            name="amount"
            type="number"
          />
        </FormContainer>
      </Container>
    </Form>
  );
};

export default BudgetEngagedForm;

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
