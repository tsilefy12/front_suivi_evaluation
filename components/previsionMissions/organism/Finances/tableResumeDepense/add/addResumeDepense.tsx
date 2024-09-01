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
  MenuItem,
  styled,
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
  const [grantValue, setGrantValue] = useState<any>(0);
  const fetchPrevisionDepense = useFetchPrevisionDepenseList();
  const { previsionDepenselist } = useAppSelector(
    (state) => state.previsonDepense
  );
  const [depense, setDepense] = useState<number>(0);
  const [ligneBudget, setLigneBudget] = useState<any>([]);

  useEffect(() => {
    fetchPrevisionDepense();
    fetchResumeDepense();
    fetchBudgetLine();
    fetchGrant();
  }, [router.query]);

  useEffect(() => {
    if (grantValue !== "") {
      const uniqueValues = new Set();
      const ligneBudgetaires = previsionDepenselist
        .filter((f) => f.grant === grantValue)
        .map((m) => {
          if (!uniqueValues.has(m.ligneBudgetaire)) {
            uniqueValues.add(m.ligneBudgetaire);
            return m.ligneBudgetaire;
          }
          return null;
        })
        .filter(Boolean);
      setLigneBudget(ligneBudgetaires);
    }
  }, [previsionDepenselist, grantValue]);

  const handleGrantChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGrantValue(event.target.value as number);
  };

  const handleSubmit = async (values: any) => {
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
        await dispatch(createResumeDepense(values));
        fetchResumeDepense();
      }
      handleClose();
      fetchResumeDepense();
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <Formik
        enableReinitialize={!!isEditing}
        initialValues={
          isEditing
            ? resumeDepense
            : {
                grant: 0,
                depensePrevue: 0,
                ligneBudgetaire: [],
                remarque: "",
                missionId: id,
              }
        }
        validationSchema={Yup.object({
          remarque: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.resetForm();
        }}
      >
        {(formikProps) => (
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
                      value={grantValue !== "" ? grantValue : ""}
                      onChange={handleGrantChange}
                    >
                      <MenuItem value={""}></MenuItem>
                      {Array.from(
                        new Map(
                          previsionDepenselist.map((p) => {
                            const foundItem = grantEncoursList.find(
                              (f) => f.id === p.grant
                            );
                            return [foundItem?.code, foundItem];
                          })
                        ).values()
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
                      select
                      id="outlined-basic"
                      label="Ligne budgetaire"
                      variant="outlined"
                      value={
                        budgetLineList.find((f: any) =>
                          ligneBudget.includes(f.id)
                        )?.code || ""
                      }
                      onChange={(e: any) => {
                        formikProps.setFieldValue(
                          "ligneBudgetaire",
                          e.target.value
                        );
                      }}
                      name="ligneBudgetaire"
                    >
                      <MenuItem value={""}></MenuItem>
                      {Array.from(
                        new Map(
                          ligneBudget.map((p) => {
                            const foundItem = budgetLineList.find(
                              (f) => f.id === p
                            );
                            return [foundItem?.code, foundItem];
                          })
                        ).values()
                      ).map((item) => (
                        <MenuItem key={item?.id} value={item?.id}>
                          {item?.code}
                        </MenuItem>
                      ))}
                    </OSTextField>
                  </FormControl>
                  <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Dépense prévue"
                    variant="outlined"
                    name="depensePrevue"
                    value={depense}
                    inputProps={{ autoComplete: "off", min: 0 }}
                    type="number"
                    onChange={(e: any) => setDepense(e.target.value)}
                  />
                  <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Remarque"
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
        )}
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
