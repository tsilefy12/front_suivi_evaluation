import React, { useEffect, useState } from "react";
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
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import {
  createResumeDepense,
  updateResumeDepense,
} from "../../../../../../redux/features/resumeDepense";
import useFetchResumeDepenseList from "../hooks/useFetchResumeDepense";
import OSSelectField from "../../../../../shared/select/OSSelectField";
import useFetchGrants from "../../../../../GrantsEnCours/hooks/getGrants";
import useFetchBudgetLine from "../../tablePrevision/hooks/useFetchbudgetLine";
import OSTextField from "../../../../../shared/input/OSTextField";
import { cancelEdit } from "../../../../../../redux/features/resumeDepense/resumeDepenseSlice";
import useFetchPrevisionDepenseList from "../../tablePrevision/hooks/useFetchPrevisionDepense";

const AddResumeDepense = ({ handleClose }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id }: any = router.query;
  const { isEditing, resumeDepense } = useAppSelector(
    (state: any) => state.resumeDepense
  );
  const fetchResumeDepense = useFetchResumeDepenseList();
  const fetchGrant = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const fetchBudgetLine = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector((state: any) => state.budgetLine);
  const [grantValue, setGrantValue] = React.useState<any>(0);
  const fetchPrevisionDepense = useFetchPrevisionDepenseList();
  const { previsionDepenselist } = useAppSelector(
    (state) => state.previsonDepense
  );
  const [depense, setDepenese] = useState<number>(0);
  const [ligneBudget, setLigneBudget] = useState<any>("");
  const [budget, setBudget] = useState<number>(0);

  React.useEffect(() => {
    fetchPrevisionDepense();
    fetchResumeDepense();
    fetchBudgetLine();
    fetchGrant();
  }, [router.query]);

  const handleGrantChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGrantValue(event.target.value as number);
  };

  const handleSubmit = async (values: any) => {
    // values.ligneBudgetaire = [...selectedBudgetLine.map((bl: any) => bl.id)];

    try {
      if (isEditing) {
        values.grant = resumeDepense?.grant;
        await dispatch(
          updateResumeDepense({
            id: resumeDepense.id!,
            resumeDepense: values,
          })
        );
      } else {
        await dispatch(createResumeDepense(values)), fetchResumeDepense();
      }
      handleClose();
      fetchResumeDepense();
    } catch (error) {
      console.log("error", error);
    }
  };
  const getGrantOption = (id: any, options: any) => {
    setGrantValue(id);
    if (!id) return null;
    return options.find((option: any) => option.id === id) || null;
  };

  useEffect(() => {
    if (grantValue != "") {
      previsionDepenselist
        .filter((f) => f.grant == grantValue)
        .map(
          (m) => (
            setLigneBudget(m.ligneBudgetaire),
            setDepenese(Number(m.montant)),
            setBudget(Number(m.montant))
          )
        );
    }
  }, [previsionDepenselist, grantValue]);
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? resumeDepense
            : {
                grant: isEditing ? resumeDepense?.grant : 0,
                depensePrevue: isEditing
                  ? resumeDepense?.depensePrevue
                  : Number(depense),
                ligneBudgetaire: isEditing
                  ? resumeDepense?.ligneBudgetaire
                  : ligneBudget,
                remarque: isEditing ? resumeDepense?.remarque : "",
                // budgetDepense: isEditing ? resumeDepense?.budgetDepense : 0,
                missionId: isEditing ? resumeDepense?.missionId : id,
              }
        }
        validationSchema={Yup.object({
          remarque: Yup.string().required("Champ obligatoire"),
          // budgetDepense: Yup.string().required("Champ obligatoire"),
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
                        value={grantValue != "" ? grantValue : ""}
                        onChange={(e: any) => setGrantValue(e.target.value)}
                      >
                        <MenuItem value={""}></MenuItem>
                        {Array.from(
                          new Map(
                            previsionDepenselist.map((p) => {
                              const foundItem = grantEncoursList.find(
                                (f) => f.id === p.grant
                              );
                              return [foundItem?.code, foundItem]; // Use code as the key
                            })
                          ).values() // Get only the values from the Map
                        ).map((item) => (
                          <MenuItem key={item?.id} value={item?.id}>
                            {item?.code}
                          </MenuItem>
                        ))}
                      </OSTextField>
                    </FormControl>
                    <FormControl fullWidth>
                      <OSTextField
                        fullWidth
                        id="outlined-basic"
                        label="Ligne budgetaire"
                        variant="outlined"
                        value={
                          budgetLineList.find((f: any) => f.id == ligneBudget)
                            ?.code
                        }
                        onChange={(e: any, ligneBudget: any) =>
                          formikProps.setFieldValue(
                            "ligneBudgetaire",
                            ligneBudget
                          )
                        }
                        name="ligneBudgetaire"
                      />
                    </FormControl>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Dépense prévue"
                      variant="outlined"
                      name="depensePrevue"
                      value={depense}
                      inputProps={{ autoComplete: "off", min: 0 }}
                      type="text"
                    />
                    {/* <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Budget de dépense"
                      variant="outlined"
                      name="budgetDepense"
                      value={budget}
                      inputProps={{ autoComplete: "off", min: 0 }}
                      type="number"
                    /> */}
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Rémarque"
                      variant="outlined"
                      name="remarque"
                      inputProps={{ autoComplete: "off" }}
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
                  <Button variant="contained" type="submit">
                    Enregistrer
                  </Button>
                </DialogActions>
              </SectionNavigation>
            </Form>
          );
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
