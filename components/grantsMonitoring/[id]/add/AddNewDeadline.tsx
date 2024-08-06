import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import useFetchDeadlinelist from "../../hooks/useFetchDeadline";
import {
  createDeadline,
  updateDeadline,
} from "../../../../redux/features/deadline";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { SectionNavigation } from "../..";
import { ArrowBack, Check, Close } from "@mui/icons-material";
import { cancelEdit } from "../../../../redux/features/deadline/deadlineSlice";
import OSTextField from "../../../shared/input/OSTextField";
import OSDatePicker from "../../../shared/date/OSDatePicker";
import useFetchEmploys from "../../../GrantsEnCours/hooks/getResponsable";
import useFetchStagiaire from "../../../GrantsEnCours/hooks/getStagiaire";
import useFetchPrestataire from "../../../GrantsEnCours/hooks/getPrestataire";

const AddNewDeadline = ({ handelClose }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isEditing, deadlines } = useAppSelector(
    (state: any) => state.deadline
  );
  const fetchDeadline = useFetchDeadlinelist();
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state: any) => state.employe);
  const fetchStagiaire = useFetchStagiaire();
  const { interns } = useAppSelector((state: any) => state.stagiaire);
  const fetchPrestataire = useFetchPrestataire();
  const { prestataireListe } = useAppSelector(
    (state: any) => state.prestataire
  );
  const [open, setOpen] = useState(false);
  const { id } = router.query;
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchEmployes();
        await fetchStagiaire();
        await fetchPrestataire();
        await fetchDeadline();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (values: any) => {
    values.grantId = Number(id);
    try {
      if (isEditing) {
        await dispatch(updateDeadline({ id: deadlines.id!, deadline: values }));
      } else {
        await dispatch(createDeadline(values));
      }
      fetchDeadline();
      handelClose();
    } catch (error) {
      console.log("error", error);
    }
  };

  const formatOptions = (options: any) => {
    return options.map((option: any) => ({
      id: option.id,
      name: option.name,
      surname: option.surname,
    }));
  };

  const allOptions = [
    ...formatOptions(employees),
    ...formatOptions(interns),
    ...formatOptions(prestataireListe),
  ];

  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={{
          deadline: isEditing ? deadlines?.deadline : new Date(),
          startDate: isEditing ? deadlines?.startDate : new Date(),
          endDate: isEditing ? deadlines?.endDate : new Date(),
          dateTech: isEditing ? deadlines?.dateTech : new Date(),
          dateFinance: isEditing ? deadlines?.dateFinance : new Date(),
          notes: isEditing ? deadlines?.notes : "",
          responsable: isEditing ? deadlines?.responsable : "",
        }}
        validationSchema={Yup.object({
          // responsable: Yup.string().required("Champ obligatoire"),
          notes: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={(values: any, actions: any) => {
          handleSubmit(values);
          actions.resetForm();
        }}
      >
        {(formikProps) => (
          <Form>
            <NavigationContainer>
              <SectionNavigation
                direction={"row"}
                sx={{ paddingBottom: 2 }}
                justifyContent="space-between"
              >
                <Stack flexDirection={"row"}>
                  <Button
                    color="info"
                    variant="text"
                    startIcon={<ArrowBack />}
                    onClick={handelClose}
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
                      handelClose();
                    }}
                  >
                    Annuler
                  </Button>
                </Stack>
                <Typography variant="h5">
                  {isEditing ? "Modifier" : "Créer"} deadline
                </Typography>
              </SectionNavigation>
            </NavigationContainer>
            <Stack direction={"column"} gap={2}>
              <OSDatePicker
                fullWidth
                id="outlined-basic"
                label="Date de début"
                variant="outlined"
                name="startDate"
                value={formikProps.values.startDate}
                onChange={(value: any) => {
                  formikProps.setFieldValue("startDate", value);
                  const date = new Date(value).getTime();
                  const fin = new Date(formikProps.values.endDate).getTime();

                  if (date > fin) {
                    setOpen(true);
                  }
                }}
              />
              <OSDatePicker
                fullWidth
                id="outlined-basic"
                label="Date de fin"
                variant="outlined"
                name="endDate"
                value={formikProps.values.endDate}
                onChange={(value: any) => {
                  formikProps.setFieldValue("endDate", value);
                  const date = new Date(value).getTime();
                  const debut = new Date(
                    formikProps.values.startDate
                  ).getTime();

                  if (date < debut) {
                    setOpen(true);
                  }
                }}
              />
              {isEditing && (
                <OSDatePicker
                  fullWidth
                  id="outlined-basic"
                  label="Technical submitted"
                  variant="outlined"
                  name="dateTech"
                  value={formikProps.values.dateTech}
                  onChange={(value: any) => {
                    formikProps.setFieldValue("dateTech", value);
                  }}
                  disabled={!isEditing}
                />
              )}
              {isEditing && (
                <OSDatePicker
                  fullWidth
                  id="outlined-basic"
                  label="Financial submitted"
                  variant="outlined"
                  name="dateFinance"
                  value={formikProps.values.dateFinance}
                  onChange={(value: any) => {
                    formikProps.setFieldValue("dateFinance", value);
                  }}
                />
              )}
              <FormControl fullWidth>
                <Autocomplete
                  fullWidth
                  id="outlined-basic"
                  options={allOptions}
                  getOptionLabel={(option) =>
                    `${option.name} ${option.surname}`
                  }
                  onChange={(event, newValue) => {
                    formikProps.setFieldValue(
                      "responsable",
                      newValue != null ? newValue.id : null
                    );
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value?.id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Responsable"
                      variant="outlined"
                      name="responsable"
                      value={
                        isEditing
                          ? allOptions.find(
                              (option) => option.id === deadlines?.responsable
                            )?.name +
                            " " +
                            allOptions.find(
                              (option) => option.id === deadlines?.responsable
                            )?.surname
                          : ""
                      }
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <OSTextField
                  fullWidth
                  multiline
                  id="outlined-basic"
                  label="Notes"
                  variant="outlined"
                  name="notes"
                  rows={3}
                  value={formikProps.values.notes}
                  onChange={formikProps.handleChange}
                />
              </FormControl>
            </Stack>
          </Form>
        )}
      </Formik>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle color={"error"} alignItems={"start"}>
          Information
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            La date de fin doit être supérieure à la date de début
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>
              <Check color="success" />
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AddNewDeadline;

export const CustomStack = styled(Stack)(({ theme }) => ({
  flexWrap: "wrap",
}));

const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: 2,
  flex: 1,
  width: "100%",
}));
