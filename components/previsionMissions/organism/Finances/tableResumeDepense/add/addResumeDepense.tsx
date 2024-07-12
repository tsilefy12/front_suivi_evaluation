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
  const [grantValue, setGrantValue]: any = React.useState(0);

  React.useEffect(() => {
    fetchResumeDepense();
    fetchBudgetLine();
    fetchGrant();
  }, [router.query]);

  const handleGrantChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGrantValue(event.target.value as number);
  };

  const handleSubmit = async (values: any) => {
    // values.ligneBudgetaire = [...selectedBudgetLine.map((bl: any) => bl.id)];
    values.grant = grantValue;
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
  let BudgetLineGrantList: any = useState<{}>([]);

  //select budget line depends grant
  const uniqueValues = new Set();
  useEffect(() => {
    grantEncoursList.filter((g) => {
      if (grantValue == g.id && grantValue !== "vide") {
        if (!uniqueValues.has(g.id)) {
          uniqueValues.add(g.id);
          return (BudgetLineGrantList = g.budgetLines!.filter(
            (e) => e.grantId == grantValue
          ));
        }
      }
      uniqueValues.add(g.id);
      return [];
    });
  }, [grantEncoursList, grantValue]);
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? resumeDepense
            : {
                grant: isEditing ? resumeDepense?.grant : 0,
                depensePrevue: isEditing ? resumeDepense?.depensePrevue : 0,
                ligneBudgetaire: isEditing
                  ? resumeDepense?.ligneBudgetaire
                  : "",
                remarque: isEditing ? resumeDepense?.remarque : "",
                budgetDepense: isEditing ? resumeDepense?.budgetDepense : 0,
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
                      <Autocomplete
                        fullWidth
                        id="outlined-basic"
                        options={grantEncoursList}
                        getOptionLabel={(option: any) => option.code}
                        value={getGrantOption(
                          formikProps.values.grant,
                          grantEncoursList
                        )}
                        onChange={(event, value) =>
                          formikProps.setFieldValue(
                            "grant",
                            value ? value.id : ""
                          )
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Grant"
                            variant="outlined"
                            error={
                              formikProps.touched.grant &&
                              Boolean(formikProps.errors.grant)
                            }
                            helperText={
                              formikProps.touched.grant &&
                              typeof formikProps.errors.grant === "string"
                                ? formikProps.errors.grant
                                : ""
                            }
                          />
                        )}
                        isOptionEqualToValue={(option: any, value: any) =>
                          option.id === value.id
                        }
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <OSSelectField
                        fullWidth
                        select
                        id="outlined-basic"
                        label="Budget line"
                        variant="outlined"
                        name="ligneBudgetaire"
                        options={BudgetLineGrantList}
                        dataKey={["code"]}
                        valueKey="id"
                      ></OSSelectField>
                    </FormControl>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Dépense prévue"
                      variant="outlined"
                      name="depensePrevue"
                      inputProps={{ autoComplete: "off", min: 0 }}
                      type="text"
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Budget de dépense"
                      variant="outlined"
                      name="budgetDepense"
                      inputProps={{ autoComplete: "off", min: 0 }}
                      type="text"
                    />
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
