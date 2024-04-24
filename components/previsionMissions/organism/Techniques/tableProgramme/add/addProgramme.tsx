import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  styled,
  Select,
  TextField,
  Dialog,
  DialogContentText,
  Autocomplete,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks";
import { createProgrammePrevision, updateProgrammePrevision } from "../../../../../../redux/features/programmePrevision";
import useFetchProgrammePrevisionList from "../hooks/useFetchProgrammePrevision";
import * as Yup from "yup";
import OSDatePicker from "../../../../../shared/date/OSDatePicker";
import OSTextField from "../../../../../shared/input/OSTextField";
import { cancelEdit } from "../../../../../../redux/features/programmePrevision/programmePrevisionSlice";
import OSSelectField from "../../../../../shared/select/OSSelectField";
import useFetchDeliverableList from "../../tableLivrables/hooks/useFetchDeliverableList";
import { useRouter } from "next/router";
import { Check } from "@mui/icons-material";
import useFetchEmploys from "../../../../../GrantsEnCours/hooks/getResponsable";
import { EmployeItem } from "../../../../../../redux/features/employe/employeSlice.interface";

const AddProgrammes = ({ handleClose }: any) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { id }: any = router.query;
  const [open, setOpen] = React.useState(false)
  const { isEditing, programmePrevision } = useAppSelector((state) => state.programmePrevision)
  const fetchProgrammePrevision = useFetchProgrammePrevisionList();
  const fetchDeliverableListe = useFetchDeliverableList();
  const { deliverableList } = useAppSelector((state) => state.deliverable);
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state: any) =>state.employe)

  React.useEffect(() => {
    fetchProgrammePrevision();
    fetchDeliverableListe();
    fetchEmployes();
  }, [router.query])

  const [selectedEmployes, setSelectedEmployes] = useState<EmployeItem[]>(
    isEditing
      ? employees.filter((employee: any) =>
        programmePrevision?.responsable?.includes(employee.id!)
      )
      : []
  );
  const handleSubmit = async (values: any) => {
    values.responsable = [...selectedEmployes.map((item) => item.id)];
    const date1 = new Date(values.dateDebut);
    const DateNumber1 = date1.getTime();
    const date2 = new Date(values.dateFin)
    const DateNumber2 = date2.getTime();

    // console.log("test")
    if (DateNumber1 >= DateNumber2) {
      setOpen(true)
    } else {
      try {
        if (isEditing) {
          await dispatch(
            updateProgrammePrevision({
              id: programmePrevision.id!,
              programmePrevision: values,
            })
          );
        } else {
          await dispatch(createProgrammePrevision(values));
        }
        fetchProgrammePrevision();
        handleClose();
      } catch (error) {
        console.log("error", error);
      }
    }

  };
 
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? programmePrevision
            : {
              dateDebut: isEditing ? programmePrevision?.dateDebut : new Date(),
              dateFin: isEditing ? programmePrevision?.dateFin : new Date(),
              activitePrevue: isEditing ? programmePrevision?.activitePrevue : "",
              livrable: isEditing ? programmePrevision?.livrable : "",
              responsable: isEditing ? programmePrevision?.responsable : "",
              missionId: isEditing ? programmePrevision?.missionId : id,
            }
        }
        validationSchema={Yup.object({
          activitePrevue: Yup.string().required("Champ obligatoire"),
          livrable: Yup.string().required("Champ obligatoire"),
          responsable: Yup.string().required("Champ obligatoire"),
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
                <DialogTitle>Créer/modifier contact pendant la mission</DialogTitle>
                <DialogContent>
                  <FormContainer spacing={2} mt={2}>
                    <OSDatePicker
                      fullWidth
                      id="outlined-basic"
                      label="Date de début"
                      variant="outlined"
                      name="dateDebut"
                      value={formikProps.values.dateDebut}
                      onChange={(value: any) => formikProps.setFieldValue("dateDebut", value)}
                    />
                    <OSDatePicker
                      fullWidth
                      id="outlined-basic"
                      label="Date de fin "
                      variant="outlined"
                      name="dateFin"
                      value={formikProps.values.dateFin}
                      onChange={(value: any) => formikProps.setFieldValue("dateFin", value)}
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Activités prévues "
                      variant="outlined"
                      name="activitePrevue"
                    />
                    <OSSelectField
                      fullWidth
                      id="outlined-basic"
                      label="Livrable"
                      variant="outlined"
                      name="livrable"
                      options={deliverableList}
                      dataKey={["description"]}
                      valueKey="id"
                    />
                    <FormControl fullWidth>
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
                        label="Sélectionnez participant"
                        variant="outlined"
                      />
                    )}
                  />
                    </FormControl>
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
                      <Button onClick={() => setOpen(false)}>
                        <Check color="primary" />
                      </Button>
                    </DialogActions>
                  </DialogContent>
                </Dialog>
              </SectionNavigation>
            </Form>
          )
        }}
      </Formik>
    </Container>
  );
};

export default AddProgrammes;

const FormContainer = styled(Stack)(({ theme }) => ({
  // padding: 10,
  background: "#fff",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({}));

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  // marginLeft: "100",
}));
const styleDialog = {
  position: "fixed",
  //left: 150,
  top: 20,
  width: "auto",
  alignItem: "center"
}