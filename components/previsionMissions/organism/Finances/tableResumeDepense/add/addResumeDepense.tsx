import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Autocomplete,
  Container,
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
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { createResumeDepense, updateResumeDepense } from "../../../../../../redux/features/resumeDepense";
import useFetchResumeDepenseList from "../hooks/useFetchResumeDepense";
import OSSelectField from "../../../../../shared/select/OSSelectField";
import useFetchGrants from "../../../../../GrantsEnCours/hooks/getGrants";
import useFetchBudgetLine from "../../tablePrevision/hooks/useFetchbudgetLine";
import OSTextField from "../../../../../shared/input/OSTextField";
import { cancelEdit } from "../../../../../../redux/features/resumeDepense/resumeDepenseSlice";

const AddResumeDepense = ({ handleClose }: any) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { id }: any = router.query;
  const { isEditing, resumeDepense } = useAppSelector((state) => state.resumeDepense)
  const fetchResumeDepense = useFetchResumeDepenseList();
  const fetchGrant = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const fetchBudgetLine = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector((state) => state.budgetLine);
  const [grantValue, setGrantValue]: any = React.useState("vide");

  React.useEffect(() => {
    fetchResumeDepense();
    fetchBudgetLine();
    fetchGrant();
  }, [router.query])

  const grantInBudgteLine: any = []
  const BudgetLineGrantList: { id: string, name: any }[] = []
  let [selectedBudgetLine, setSelectedBudgetLine] = React.useState<any[]>(
    isEditing
      ? budgetLineList.filter((pg: any) =>
        Array.isArray(resumeDepense?.ligneBudgetaire) && resumeDepense?.ligneBudgetaire?.includes(pg.id)
      )
      : BudgetLineGrantList
  );

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
            BudgetLineGrantList.push({ id: b.id, name: b.code });
          }
        } else {
          if (!uniqueValues.has(b.id)) {
            uniqueValues.add(b.id);
            BudgetLineGrantList.push({ id: "", name: "" });
            selectedBudgetLine = [];
          }
        }
      });
    }
  });

  const handleSubmit = async (values: any) => {
    values.ligneBudgetaire = [...selectedBudgetLine.map((bl: any) => bl.id)];
    values.grant = grantValue;
    try {
      if (isEditing) {
        await dispatch(
          updateResumeDepense({
            id: resumeDepense.id!,
            resumeDepense: values,
          })
        );
      } else {
          await dispatch(createResumeDepense(values)), fetchResumeDepense(),
          handleClose();
      }

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
            ? resumeDepense
            : {
              grant: isEditing ? resumeDepense?.grant : "",
              depensePrevue: isEditing ? resumeDepense?.depensePrevue : "",
              ligneBudgetaire: isEditing ? resumeDepense?.ligneBudgetaire : "",
              remarque: isEditing ? resumeDepense?.remarque : "",
              budgetDepense: isEditing ? resumeDepense?.budgetDepense : "",
              missionId: isEditing ? resumeDepense?.missionId : id,
            }
        }
        validationSchema={Yup.object({
          // grant: Yup.number().required("Champ obligatoire"),
          depensePrevue: Yup.string().required("Champ obligatoire"),
          // ligneBudgetaire: Yup.number().required("Champ obligatoire"),
          remarque: Yup.string().required("Champ obligatoire"),
          budgetDepense: Yup.string().required("Champ obligatoire"),
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
                <DialogTitle>Créer/modifier résumé de dépense</DialogTitle>
                <DialogContent>
                  <FormContainer spacing={2} mt={2}>
                    <FormControl fullWidth>
                      <OSTextField
                        fullWidth
                        select
                        id="outlined-basic"
                        label="Grant"
                        variant="outlined"
                        name="grant"
                        value={(id) ?
                          budgetLineList.find((e: any) => e.id === resumeDepense?.grant)?.code : grantValue}
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
                        options={grantValue != "vide" ? BudgetLineGrantList : []}
                        getOptionLabel={(option) => option.name}
                        value={grantValue != "vide" ? selectedBudgetLine : []}
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
                      label="Dépense prévue"
                      variant="outlined"
                      name="depensePrevue"
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Budget de dépense"
                      variant="outlined"
                      name="budgetDepense"
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Rémarque"
                      variant="outlined"
                      name="remarque"
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

export default AddResumeDepense;

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
