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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import * as Yup from "yup";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close, ForkLeft } from "@mui/icons-material";
import { SectionNavigation } from "../ListPeriodeGrants";
import OSTextField from "../../shared/input/OSTextField";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useFetchGrants from "../../GrantsEnCours/hooks/getGrants";
import { useRouter } from "next/router";
import OSSelectField from "../../shared/select/OSSelectField";
import { Form, Formik } from "formik";
import { cancelEdit } from "../../../redux/features/periode/periodeSlice";
import { createPeriode, updatePeriode } from "../../../redux/features/periode";
import useFetchPeriode from "../hooks/useFetchPeriode";
import OSDatePicker from "../../shared/date/OSDatePicker";
import { useConfirm } from "material-ui-confirm";

const AddNewPeriodeGrants = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fetchGrant = useFetchGrants();
  const fetchPeriode = useFetchPeriode();
  const [open, setOpen]: any = React.useState(false);
  const { grantEncoursList } = useAppSelector((state: any) => state.grantEncours)
  const { isEditing, periode } = useAppSelector((state: any) => state.periode)

  React.useEffect(() => {
    fetchGrant();
    fetchPeriode();
  }, [router.query])

  const handleSubmit = async (values: any) => {
    const date1 = new Date(values.debut);
    const DateNumber1 = date1.getTime();
    const date2 = new Date(values.fin)
    const DateNumber2 = date2.getTime();
    
  if (DateNumber1 >= DateNumber2) {
     setOpen(true)
  }else{
    try {
      if (isEditing) {
        await dispatch(
          updatePeriode({
            id: periode.id!,
            periode: values,
          })
        );
      } else {
        await dispatch(createPeriode(values));
        fetchPeriode();
      }
      router.push("/grants/periode");
    } catch (error) {
      console.log("error", error);
    }
  }
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? periode
            : {
              periode: isEditing ? periode?.periode : "",
              montant: isEditing ? periode?.montant : "",
              grant: isEditing ? periode?.grant : "",
              debut: isEditing ? periode?.debut : new Date(),
              fin: isEditing ? periode?.fin : new Date(),
            }
        }
        validationSchema={Yup.object({
          periode: Yup.string().required("Champ obligatoire"),
          montant: Yup.number().required("Champ obligatoire"),
          grant: Yup.number().required("Champ obligatoire"),
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
                    <Link href="/grants/periode">
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

              <FormContainer sx={{ backgroundColor: "#fff" }} spacing={2}>
                <CustomStack
                  direction={{ xs: "column", sm: "column", md: "row" }}
                  spacing={{ xs: 2, sm: 2, md: 1 }}>
                  <FormControl fullWidth>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Periode"
                      variant="outlined"
                      name="periode"
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Montant"
                      variant="outlined"
                      name="montant"
                      type="number"
                    />
                  </FormControl>
                </CustomStack>
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
                <CustomStack
                  direction={{ xs: "column", sm: "column", md: "row" }}
                  spacing={{ xs: 2, sm: 2, md: 1 }}
                >
                  <OSDatePicker
                    fullWidth
                    id="outlined-basic"
                    label="Debut"
                    variant="outlined"
                    name="debut"
                    value={formikProps.values.debut}
                    onChange={(value: any) =>formikProps.setFieldValue("debut", value)}
                  />
                  <OSDatePicker
                    fullWidth
                    id="outlined-basic"
                    label="Fin"
                    variant="outlined"
                    name="fin"
                    value={formikProps.values.fin}
                    onChange={(value: any) =>formikProps.setFieldValue("fin", value)}
                  />
                </CustomStack>
              </FormContainer>
            </Form>
          )
        }}
      </Formik>
      <Dialog
      open={open}
      disablePortal={false}
      sx={styleDialog}
      >
        <DialogTitle color="red">Attention!!</DialogTitle>
        <DialogContent>
          <DialogContentText>
          La date début doit être inferieure de la date fin
          </DialogContentText>
          <DialogActions>
            <Button onClick={() =>setOpen(false)}>
              <Check color="primary"/>
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AddNewPeriodeGrants;

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
const styleDialog = {
  position: "fixed",
  //left: 150,
  top: 20,
  width: "auto",
  alignItem: "center"
}