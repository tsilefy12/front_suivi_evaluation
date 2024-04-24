import {
  Button,
  Container,
  styled,
  Typography,
  Stack,
  FormControl,
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

const BudgetEngagedForm  = ({formikProps}: {formikProps: FormikProps<any>}) => {
  const dispatch = useAppDispatch();
  const router = useRouter()
  const { grantEncoursList } = useAppSelector( (state) => state.grantEncours);
  const { budgetLineList } = useAppSelector( (state) => state.budgetLine);
  const { isEditing } = useAppSelector((state) => state.budgetsEngaged);

  const fetchUtilsData = () => {
    dispatch(getGrantEncoursList({}));
    dispatch(getBudgetLineList({}));
  };

  useEffect(() => {
      fetchUtilsData();
  }, []);
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
                onClick={ () => router.back()}
              >
                Retour
              </Button>
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
              >
                Annuler
              </Button>
            </Stack>
            <Typography variant="h5">{isEditing ? "Modifier" :"Créer"} Budget Engagés</Typography>
          </SectionNavigation>
        </NavigationContainer>

        <FormContainer spacing={2}>
          <FormControl fullWidth>
              <OSDatePicker
                  fullWidth
                  id="outlined-basic"
                  label="Date"
                  variant="outlined"
                  value = {formikProps.values.date}
                  onChange = {(value: any) =>formikProps.setFieldValue("date", value)}
              />
          </FormControl>
          <FormControl fullWidth>
              <OSSelectField
                  id="outlined-basic"
                  label="Grants"
                  name="grantsId"
                  options={grantEncoursList}
                  dataKey="code"
                  valueKey="id"
              />
          </FormControl>
          <FormControl fullWidth>
              <OSSelectField
                  id="outlined-basic"
                  label="LB"
                  name="budgetLineId"
                  options={budgetLineList}
                  dataKey="code"
                  valueKey="id"
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
              type = "number"
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
