import { Check, Close } from "@mui/icons-material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import {
  Button,
  Container,
  Divider,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  createCurrency,
  updateCurrency,
} from "../../../../redux/features/currency";
import { cancelEdit } from "../../../../redux/features/currency/currencySlice";
import OSTextField from "../../../shared/input/OSTextField";
import OSSelectField from "../../../shared/select/OSSelectField";
import useFetchCurrencyListe from "../hooks/useFetchCurrency";

const CurrencyForm = () => {
  const { isEditing, currency }: any = useAppSelector(
    (state) => state.currency
  );
  const dispatch = useAppDispatch();
  const fetchCurrencyListe = useFetchCurrencyListe();

  const symbolePosition = [
    { id: "BEFORE", name: "BEFORE", desc: "Avant" },
    { id: "AFTER", name: "AFTER", desc: "Après" },
  ];
  const router = useRouter();
  const { idFile, year }: any = router.query;

  const initialValue = {
    iso: "",
    symbol: "",
    name: "",
    // rate: 0,
    decimalPlaces: 0,
    symbolPosition: "BEFORE",
    thousandSeparator: "",
  };
  const editValue = {
    iso: currency.iso,
    symbol: currency.symbol,
    name: currency.name,
    decimalPlaces: currency.decimalPlaces,
    symbolPosition: currency.symbolPosition,
    thousandSeparator: currency.thousandSeparator,
  };

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        // set empty values to null
        Object.keys(values).forEach((key) => {
          if (values[key] === "") {
            values[key] = null;
          }
        });
        await dispatch(updateCurrency({ id: currency.id!, currency: values }));
        router.push(`/configurations/devise`);
      } else {
        // set empty values to null
        Object.keys(values).forEach((key) => {
          if (values[key] === "") {
            values[key] = null;
          }
        });
        await dispatch(createCurrency(values));
        router.push(`/configurations/devise`);
      }
      fetchCurrencyListe();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <Formik
        enableReinitialize
        initialValues={isEditing ? editValue : initialValue}
        validationSchema={Yup.object({
          iso: Yup.string().required("Champ obligatoire"),
          symbol: Yup.string().required("Champ obligatoire"),
          name: Yup.string().required("Champ obligatoire"),
          decimalPlaces: Yup.number().required("champ obligatoire"),
          symbolPosition: Yup.string().required("champ obligatoire"),
          thousandSeparator: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={async (value: any, action) => {
          await handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => (
          <Form>
            <NavigationContainer>
              <SectionNavigation>
                <Stack flexDirection={"row"}>
                  <Button
                    color="info"
                    variant="text"
                    startIcon={<ArrowBack />}
                    onClick={() => {
                      formikProps.resetForm();
                      dispatch(cancelEdit());
                      router.back();
                    }}
                  >
                    Retour
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
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
                    type="reset"
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
                <Typography variant="h4">
                  {isEditing ? "Modifier" : "Ajouter"} devise
                </Typography>
              </SectionNavigation>
              <Divider />
            </NavigationContainer>

            <FormContainer spacing={2}>
              <OSTextField
                fullWidth
                id="iso"
                label="ISO"
                variant="outlined"
                name="iso"
              />
              <OSTextField
                fullWidth
                id="symbol"
                label="Symbole"
                variant="outlined"
                name="symbol"
              />
              <OSTextField
                fullWidth
                id="name"
                label="Nom"
                variant="outlined"
                name="name"
              />
              <OSTextField
                fullWidth
                id="decimalPlaces"
                label="Nombre de chiffre aprés virgule"
                variant="outlined"
                name="decimalPlaces"
                type="number"
              />
              <OSSelectField
                id="symbolPosition"
                name="symbolPosition"
                label="Position de signe"
                options={symbolePosition}
                dataKey="desc"
                valueKey="id"
              />
              <OSTextField
                fullWidth
                id="thousandSeparator"
                label="Séparateur de millier"
                variant="outlined"
                name="thousandSeparator"
              />
            </FormContainer>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CurrencyForm;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const FormContainer = styled(Stack)(({ theme }) => ({
  padding: 30,
  // border: "1px solid #E0E0E0",
  borderRadius: 20,
  background: "#fff",
}));

const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  paddingBottom: "5px",
}));
