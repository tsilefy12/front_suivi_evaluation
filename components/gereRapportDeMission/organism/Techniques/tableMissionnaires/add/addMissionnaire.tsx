import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Autocomplete,
  Box,
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  TextField,
} from "@mui/material";
import OSTextField from "../../../../../shared/input/OSTextField";
import { useRouter } from "next/router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { cancelEdit } from "../../../../../../redux/features/missionary/missionarySlice";
import useFetchMissionaryList from "../hooks/useFetchMissionaryList";
import useFetchEmploys from "../../../../../GrantsEnCours/hooks/getResponsable";
import { EmployeItem } from "../../../../../../redux/features/employe/employeSlice.interface";
import { createMissionaryRapport, updateMissionaryRapport } from "../../../../../../redux/features/missionaires";
import OSDatePicker from "../../../../../shared/date/OSDatePicker";


const AddMissionnaireRapport = ({ handleClose }: any) => {
  const router = useRouter();
  const { id }= router.query;
  const dispatch = useAppDispatch();

  const { missionaires, isEditing } = useAppSelector(
    (state: any) => state.missionaires);
  const fetchMissionaryList = useFetchMissionaryList();
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state: any) => state.employe);

  useEffect(() => {
    fetchMissionaryList();
    fetchEmployes();
  }, [router.query]);

  const [selectedEmployes, setSelectedEmployes] = useState<EmployeItem[]>(
    isEditing
      ? employees.filter((employee: any) =>
        missionaires?.missionResponsabilityMissionary?.includes(employee.id!)
      )
      : []
  );
  const handleSubmit = async (values: any) => {
    values.missionResponsabilityMissionary = [...selectedEmployes.map(e => e.id)];
    try {
      if (isEditing) {
        await dispatch(
          updateMissionaryRapport({
            id: missionaires.id!,
            missionaires: values,
          })
        );
      } else {
        await dispatch(createMissionaryRapport(values));
      }
      handleClose();
      fetchMissionaryList();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Box>
      <Formik
        enableReinitialize
        initialValues={
          isEditing
            ? missionaires
            : {
                lastNameMissionary: isEditing ? missionaires?.lastNameMissionary : "",
                firstNameMissionary: isEditing ? missionaires?.firstNameMissionary : "",
                startDateMissionary: isEditing ? missionaires?.startDateMissionary : "",
                returnDateMissionary: isEditing ? missionaires?.returnDateMissionary : "",
                missionResponsabilityMissionary: isEditing ? missionaires?.missionResponsabilityMissionary : "",
                missionId: isEditing ? missionaires?.missionId: id,
              }
        }
        validationSchema={Yup.object({
          lastNameMissionary: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
                <SectionNavigation>
                  <DialogTitle>
                    {isEditing ? "Modifier" : "Formulaire"} Missionnaire
                  </DialogTitle>
                  <DialogContent>
                    <FormContainer spacing={2} mt={2}>
                      <OSTextField
                        id="outlined-basic"
                        label="Nom"
                        name="lastNameMissionary"
                        inputProps={{ autoComplete: "off" }}
                      />
                      <OSTextField
                        id="outlined-basic"
                        label="Prénom"
                        name="firstNameMissionary"
                        inputProps={{ autoComplete: "off" }}
                      />
                      <OSDatePicker
                        fullWidth
                        label="Date de debut"
                        value={formikProps.values.startDateMissionary}
                        onChange={(value: any) =>
                          formikProps.setFieldValue("startDateMissionary", value)
                        }
                      />
                      <OSDatePicker
                        fullWidth
                        label="Date de retour"
                        value={formikProps.values.returnDateMissionary}
                        onChange={(value: any) =>
                          formikProps.setFieldValue("returnDateMissionary", value)
                        }
                      />
                       <Autocomplete
                        multiple
                        id="tags-standard"
                        options={employees}
                        getOptionLabel={(employee: any) =>
                          `${employee.name} ${employee.surname}` as string
                        }
                        value={selectedEmployes}
                        onChange={(event, newValue) => {
                          setSelectedEmployes(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            id="outlined-basic"
                            label="Responsable de mission"
                            variant="outlined"
                          />
                        )}
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
              </Container>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AddMissionnaireRapport;

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
