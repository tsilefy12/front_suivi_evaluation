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
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Autocomplete,
  Dialog,
  DialogContentText,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoIcon from "@mui/icons-material/Info";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks";
import useFetchProgrammeRapport from "../hooks/useFetchProgrammeRapport";
import { createProgrammeRapport, updateProgrammeRapport } from "../../../../../../redux/features/programmeRapport";
import OSDatePicker from "../../../../../shared/date/OSDatePicker";
import { Form, Formik } from "formik";
import useFetchEmploys from "../../../../../GrantsEnCours/hooks/getResponsable";
import { EmployeItem } from "../../../../../../redux/features/employe/employeSlice.interface";
import OSSelectField from "../../../../../shared/select/OSSelectField";
import useFetchLivrableRapport from "../../tableLivrables/hooks/useFetchLivrableRapport";
import useFetchActiviteRapport from "../../tableActivitésPrévues/hooks/useFetchActivityRapport";
import { ProgrammeRapportItem } from "../../../../../../redux/features/programmeRapport/programmeRapport.interface";
import Moment from "react-moment";
import { Check } from "@mui/icons-material";
import { cancelEdit } from "../../../../../../redux/features/programmeRapport/programmeRapportSlice";
import { format } from "date-fns";
import useFetchProgrammePrevisionList from "../../../../../previsionMissions/organism/Techniques/tableProgramme/hooks/useFetchProgrammePrevision";
import { ProgrammePrevisionItem } from "../../../../../../redux/features/programmePrevision/programmePrevision.interface";
import useFetchPlannedActivityList from "../../../../../previsionMissions/organism/Techniques/tableActivitésPrévues/hooks/useFetchPlannedActivityList";
import useFetchDeliverableList from "../../../../../previsionMissions/organism/Techniques/tableLivrables/hooks/useFetchDeliverableList";

const AddProgrammesRapport = ({ handleClose }: any) => {
  const router = useRouter();
  const dispatch: any = useAppDispatch();
  const { isEditing, programmeRapport } = useAppSelector((state: any) => state.programmeRapport);
  const fetchProgrammeRapport = useFetchProgrammeRapport();
  const { id }: any = router.query;
  const [getUtiliser, setGetUtiliser]: any = React.useState("");
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state: any) => state.employe);
  const fetchLivrable = useFetchLivrableRapport();
  const { livrableRapportlist } = useAppSelector((state: any) => state.livrableRapport);
  const fetchActivitePrevueR = useFetchActiviteRapport();
  const { activiteRapportlist } = useAppSelector((state: any) => state.activiteRapport);
  const [open, setOpen]: any = React.useState(false);
  const fetchProgrammePrevision = useFetchProgrammePrevisionList();
  const { programmePrevisionList } = useAppSelector((state: any) => state.programmePrevision)
  const [dateD, setDateD] = React.useState("01/01/2000");
  const [dateF, setDateF] = React.useState("01/01/2000");
  const [activity, setActivitty] = React.useState("");
  const [liverable, setLiverable] = React.useState("");
  const [activityRealise, setActivityRealise] = React.useState("");
  const [getId, setGetId]: any = React.useState("");

  const [respo, setRespo] = React.useState([]);
  const { plannedActivityList } = useAppSelector(
    (state: any) => state.plannedActivity
  );
  const fetchPlannedActivityListe = useFetchPlannedActivityList();
  const fetchtDeliverable = useFetchDeliverableList();
  const { deliverableList } = useAppSelector((state: any) => state.deliverable);


  React.useEffect(() => {
    fetchProgrammeRapport();
    fetchEmployes();
    fetchActivitePrevueR();
    fetchLivrable();
    fetchProgrammePrevision();
    fetchPlannedActivityListe();
    fetchtDeliverable();
  }, [router.query])

  console.log("liste programme prev :", programmePrevisionList)
  const [selectedEmployes, setSelectedEmployes] = useState<EmployeItem[]>(
    isEditing
      ? employees.filter((employee: any) =>
        programmeRapport?.responsableR?.includes(employee.id!)
      )
      : []
  );
  const ClikUtiliser = (id: any, date1: any, date2: any, activity1: any, activity2: any) => {
    setGetId(id)
    setDateD(date1);
    setDateF(date2);
    setActivitty(activity1);
    setActivityRealise(activity2);
  }

  const handleSubmit = async (values: any) => {
    // console.log("id responsable :", values.responsableR)
    values.missionId = id!;

    const date1 = new Date(values.dateDebut);
    const DateNumber1 = date1.getTime();
    const date2 = new Date(values.dateFin)
    const DateNumber2 = date2.getTime();
    if (DateNumber1 >= DateNumber2) {
      return setOpen(true);
    }
    try {
      if (isEditing) {
        await dispatch(
          updateProgrammeRapport({
            id: programmeRapport.id!,
            programmeRapport: values,
          })
        );
      }
      else {
        if (dateD !== null && dateF !== null && activity !== "" && liverable !== "" && respo.length != 0) {
          values.dateDebut = dateD;
          values.dateFin = dateF;
          values.activitePrevueR = activity;
          values.livrableR = liverable;
          values.responsableR = respo;
          return (await dispatch(createProgrammeRapport(values)),
            handleClose()
          );
        } else if (values.activitePrevueR !== "" && values.livrableR !== "") {
          values.responsableR = [...selectedEmployes.map(e => e.id)];
          return (await dispatch(createProgrammeRapport(values)),
            handleClose()
          );
        }
        fetchProgrammeRapport(),
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
            ? programmeRapport
            : {
              dateDebut: isEditing ? programmeRapport?.dateDebut : new Date(),
              dateFin: isEditing ? programmeRapport?.dateFin : new Date(),
              activitePrevueR: isEditing ? programmeRapport?.activitePrevueR : "",
              activtiteRealise: isEditing ? programmeRapport?.activtiteRealise : "",
              livrableR: isEditing ? programmeRapport?.livrableR : "",
              responsableR: isEditing ? programmeRapport?.responsableR : ""
              // missiomId: id!
            }
        }
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <SectionNavigation>
                <DialogTitle>Créer/modifier Programmes</DialogTitle>
                <DialogContent>
                  <FormContainer spacing={2} mt={2}>
                    <OSDatePicker
                      fullWidth
                      id="outlined-basic"
                      label="Date de début"
                      variant="outlined"
                      name="dateDebut"
                      value={(dateD != "01/01/2000") ? dateD : formikProps.values.dateDebut}
                      onChange={(value: any) => formikProps.setFieldValue("dateDebut", value)}
                    />
                    <OSDatePicker
                      fullWidth
                      id="outlined-basic"
                      label="Date de fin "
                      variant="outlined"
                      name="dateFin"
                      value={(dateF != "01/01/2000") ? dateF : formikProps.values.dateFin}
                      onChange={(value: any) => formikProps.setFieldValue("dateFin", value)}
                    />
                    <OSSelectField
                      fullWidth
                      id="outlined-basic"
                      label="Activités prévues "
                      variant="outlined"
                      options={plannedActivityList}
                      dataKey={activity !== "" ? activity : ["description"]}
                      valueKey="id"
                      name="activitePrevueR"
                    />
                    <OSSelectField
                      fullWidth
                      id="outlined-basic"
                      label="Activité réalisées "
                      variant="outlined"
                      options={activiteRapportlist}
                      dataKey={activityRealise !== "" ? activityRealise : ["activite"]}
                      valueKey="id"
                      name="activitePrevueR"
                    />
                    <OSSelectField
                      fullWidth
                      id="outlined-basic"
                      label="Livrable"
                      variant="outlined"
                      options={livrableRapportlist}
                      dataKey={liverable !== "" ? liverable : ["livrablee"]}
                      valueKey="id"
                      name="livrableR"
                    />
                    <FormControl fullWidth>
                      <Autocomplete
                        multiple
                        id="tags-standard"
                        options={employees}
                        getOptionLabel={(employee: any) =>
                          `${employee.name} ${employee.surname}` as string
                        }
                        value={respo.length !== 0 ? respo : selectedEmployes}
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
                    <Stack flexDirection="row">
                      <InfoIcon />
                      <Typography variant="subtitle2">
                        Voici la liste des{" "}
                        <Lien>Contact(durant la mission) pendant la prévision</Lien>,
                        vous pouvez les réutiliser pour les rapports
                      </Typography>
                    </Stack>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Date de début</TableCell>
                          <TableCell>Date fin</TableCell>
                          <TableCell align="left">Activités prévues</TableCell>
                          <TableCell align="left">Livrables</TableCell>
                          <TableCell align="left">Responsable</TableCell>
                        </TableRow>
                      </TableHead>
                      {programmePrevisionList.map((item: any) => (
                        <TableRow
                          key={item.id!}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            <Moment format="DD/MM/yyyy">{item.dateDebut}</Moment>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Moment format="DD/MM/yyyy">{item.dateFin}</Moment>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {plannedActivityList.find((e: any) => e.id === item.activitePrevue)?.description}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {deliverableList.find((e: any) => e.id === item.livrable)?.description}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {
                              (item.responsable).map((lp: any) => {
                                return (
                                  <Stack direction="column" spacing={2} height={25} overflow="auto">
                                    {employees.find((e: any) => e.id === lp)?.name}
                                    {" "}
                                    {employees.find((e: any) => e.id === lp)?.surname}
                                  </Stack>
                                )
                              })
                            }
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              color="primary"
                              startIcon={<ContentCopyIcon />}
                              onClick={() => ClikUtiliser(
                                item.id!,
                                item.dateDebut,
                                item.dateFin,
                                item.activitePrevue,
                                item.activitePrevue)}
                            >
                              Utiliser
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </Table>
                  </FormContainer>
                </DialogContent>
                <DialogActions>
                  <Button
                    color="warning"
                    onClick={() => {
                      formikProps.resetForm();
                      dispatch(cancelEdit());
                    }
                    }
                  >Annuler</Button>
                  <Button variant="contained" type="submit">
                    Enregistrer
                  </Button>
                </DialogActions>
              </SectionNavigation>
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
            </Form>
          )
        }}
      </Formik>
    </Container>
  );
};

export default AddProgrammesRapport;

const FormContainer = styled(Stack)(({ theme }) => ({
  background: "#fff",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({}));

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  // marginLeft: "100",
}));

const Lien = styled("span")(({ theme }) => ({
  color: theme.palette.info.main,
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.info.main,
  },
}));
const styleDialog = {
  position: "fixed",
  //left: 150,
  top: 20,
  width: "auto",
  alignItem: "center"
}