import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Autocomplete,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks";
import { createPrevisionDepense, updatePrevisionDepense } from "../../../../../../redux/features/PrevisionDepense";
import useFetchPrevisionDepenseList from "../hooks/useFetchPrevisionDepense";
import { useRouter } from "next/router";
import * as Yup from "yup";
import OSDatePicker from "../../../../../shared/date/OSDatePicker";
import OSTextField from "../../../../../shared/input/OSTextField";
import OSSelectField from "../../../../../shared/select/OSSelectField";
import useFetchGrants from "../../../../../GrantsEnCours/hooks/getGrants";
import { cancelEdit } from "../../../../../../redux/features/programmePrevision/programmePrevisionSlice";
import useFetchBudgetLine from "../hooks/useFetchbudgetLine";

const AddPrevisionMission = ({ handleClose }: any) => {
  const dispatch: any = useAppDispatch()
  const { isEditing, previsionDepense } = useAppSelector((state) => state.previsonDepense)
  const fetchPrevisionDepense = useFetchPrevisionDepenseList();
  const fetchGrant = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const fetchBudgetLine = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector((state) => state.budgetLine);
  const router = useRouter()
  const { id }: any = router.query;
  const [grantValue, setGrantValue]: any = React.useState("vide");

  React.useEffect(() => {
    fetchPrevisionDepense();
    fetchGrant();
    fetchBudgetLine();
  }, [router.query])

  const grantInBudgteLine: any = []
  const BudgetLineGrantList: { id: string, name: any }[] = []

  //select budget line depends grant
  const uniqueValues = new Set();

  grantEncoursList.forEach((g: any) => {
    if (grantValue !== "vide") {
      budgetLineList.forEach((b: any) => {
        let BudgetGrant: any = b.grantId;
        console.log("id grant :", BudgetGrant)
        if (grantValue === BudgetGrant) {
          grantInBudgteLine.push(b.id);
          if (!uniqueValues.has(b.id)) {
            uniqueValues.add(b.id);
           return BudgetLineGrantList.push({ id: b.id, name: b.code });
          }
        } else {
          if (!uniqueValues.has(b.id)) {
            uniqueValues.add(b.id);
            return  [];
          }
        }
      });
    }
  });
  const handleSubmit = async (values: any) => {
    values.grant = grantValue;
    try {
      if (isEditing) {
        await dispatch(
          updatePrevisionDepense({
            id: previsionDepense.id!,
            previsionDepense: values,
          })
        );
      } else {
        await dispatch(createPrevisionDepense(values));
      }
      fetchPrevisionDepense();
      handleClose();
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
            ? previsionDepense
            : {
              date: isEditing ? previsionDepense?.date : new Date(),
              libelle: isEditing ? previsionDepense?.libelle : "",
              nombre: isEditing ? previsionDepense?.nombre : 0,
              pu: isEditing ? previsionDepense?.pu : 0,
              grant: isEditing ? previsionDepense?.grant : "",
              ligneBudgetaire: isEditing ? previsionDepense?.ligneBudgetaire : "",
              regleme: isEditing ? previsionDepense?.regleme : "",
              missionId: isEditing ? previsionDepense?.missionId : id,
              // montant: nombre * publicDecrypt,
            }
        }
        validationSchema={Yup.object({
          libelle: Yup.string().required("Champ obligatoire"),
          nombre: Yup.number().required("Champ obligatoire"),
          pu: Yup.number().required("Champ obligatoire"),
          regleme: Yup.string().required("Champ obligatoire"),
          // ligneBudgetaire: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <SectionNavigation>
                <DialogTitle> Créer/modifier prévision de dépense </DialogTitle>
                <DialogContent>
                  <FormContainer spacing={2} mt={2}>
                    <OSDatePicker
                      fullWidth
                      id="outlined-basic"
                      label="Date"
                      variant="outlined"
                      name="date"
                      value={formikProps.values.date}
                      onChange={(value: any) => formikProps.setFieldValue("date", value)}
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Libellé"
                      variant="outlined"
                      name="libelle"
                    />
                    <CustomStack
                      direction={{ xs: "column", sm: "column", md: "row" }}
                      spacing={{ xs: 2, sm: 2, md: 1 }}
                    >
                      <OSTextField
                        fullWidth
                        id="outlined-basic"
                        label="Nombre"
                        variant="outlined"
                        name="nombre"
                        type="number"
                        value={formikProps.values.nombre}
                        onChange={(event: any) => {
                          const newValue = parseInt(event.target.value);
                          formikProps.setFieldValue("nombre", newValue);
                          const newMontant = newValue * (formikProps.values.pu ?? 0);
                          formikProps.setFieldValue("montant", newMontant);
                        }}
                      />
                      <OSTextField
                        fullWidth
                        id="outlined-basic"
                        label="PU"
                        variant="outlined"
                        name="pu"
                        type="number"
                        value={formikProps.values.pu}
                        onChange={(event: any) => {
                          const newValue = parseInt(event.target.value);
                          formikProps.setFieldValue("pu", newValue);
                          const newMontant = newValue * (formikProps.values.nombre ?? 0);
                          formikProps.setFieldValue("montant", newMontant);
                        }}
                      />
                      {/* <OSTextField
                        fullWidth
                        id="outlined-basic"
                        label="Montant"
                        variant="outlined"
                        value={(formikProps.values.nombre ?? 0) * (formikProps.values.pu ?? 0)}
                        name="montant"
                        type="number"
                        min="0"
                        disabled
                      /> */}
                    </CustomStack>
                    <FormControl fullWidth>
                      <OSTextField
                        fullWidth
                        select
                        id="outlined-basic"
                        label="Grant"
                        variant="outlined"
                        name="grant"
                        value={(id) ?
                          budgetLineList.find((e: any) => e.id === previsionDepense?.grant)?.code : grantValue}
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
                    <OSSelectField
                        fullWidth
                        select
                        id="outlined-basic"
                        label="Budget Line"
                        variant="outlined"
                        name="grant"
                        options={BudgetLineGrantList}
                        dataKey={["name"]}
                        valueKey="id"
                      >
                      </OSSelectField>
                    </FormControl>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Reglème"
                      variant="outlined"
                      name="regleme"
                    />
                  </FormContainer>
                </DialogContent>
                <DialogActions>
                  <Button
                    color="warning"
                    onClick={() => {
                      formikProps.resetForm();
                      dispatch(cancelEdit());
                      handleClose();
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                  >
                    Enregistrer
                  </Button>
                </DialogActions>
              </SectionNavigation>
            </Form>
          )
        }}
      </Formik>
    </Container>
  );
};

export default AddPrevisionMission;

const FormContainer = styled(Stack)(({ theme }) => ({
  // padding: 10,
  background: "#fff",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({}));

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));
