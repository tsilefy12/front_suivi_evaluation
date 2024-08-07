import { Form, FormikProps } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";

import { ArrowBack, Warning } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import OSTextField from "../../../../shared/input/OSTextField";
import useFetchEmploys from "../../../../GrantsEnCours/hooks/getResponsable";
import { getStatuslist } from "../../../../../redux/features/status";
import OSSelectField from "../../../../shared/select/OSSelectField";
import OSDatePicker from "../../../../shared/date/OSDatePicker";
import useFetchObjectifAnnuel from "../hooks/useFetchObjectiflAnnuel";
import useFetchTacheEtObjectifs from "../hooks/useFetchTacheEtObjectifs";
import useFetchStagiaire from "../../../../GrantsEnCours/hooks/getStagiaire";
import useFetchPrestataire from "../../../../GrantsEnCours/hooks/getPrestataire";

const NewTacheEtObjectifs = ({
  formikProps,
  valuesArticle,
  setValuesArticle,
  setIdDelete,
  selectedEmployes,
  setSelectedEmployes,
  open,
  setOpen,
}: {
  formikProps: FormikProps<any>;
  valuesArticle: any;
  setValuesArticle: any;
  setIdDelete: any;
  selectedEmployes: any;
  setSelectedEmployes: any;
  open: boolean;
  setOpen: any;
}) => {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [idValues, setIdValues] = useState<any>();

  const { statuslist } = useAppSelector((state: any) => state.status);
  const { employees } = useAppSelector((state: any) => state.employe);

  const fetchTacheCle = useFetchTacheEtObjectifs();
  const { isEditing, tacheEtObjectifList, tacheEtObjectif } = useAppSelector(
    (state) => state.tacheEtObjectifs
  );
  const fetchEmployes = useFetchEmploys();
  const router = useRouter();
  const { id }: any = router.query;
  const fetchStagiaire = useFetchStagiaire();
  const { interns } = useAppSelector((state: any) => state.stagiaire);
  const fetchPrestataire = useFetchPrestataire();
  const { prestataireListe } = useAppSelector(
    (state: any) => state.prestataire
  );
  const [valide, setValide] = useState(false);

  const fetchUtilsData = () => {
    fetchEmployes();
    dispatch(getStatuslist({}));
    fetchTacheCle();
    fetchStagiaire();
    fetchPrestataire();
  };

  useEffect(() => {
    fetchUtilsData();
  }, []);
  const getEmployeeOption = (id: any, options: any) => {
    if (!id) return null;
    return options.find((option: any) => option.id === id) || null;
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
    <Form>
      <NavigationContainer>
        <SectionNavigation>
          <Stack flexDirection={"row"}>
            <Button
              color="info"
              variant="text"
              startIcon={<ArrowBack />}
              onClick={() => {
                route.back();
                formikProps.resetForm();
              }}
            >
              Retour
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<Check />}
              sx={{ marginInline: 3 }}
              type="submit"
            >
              {isEditing ? "Modifier" : "Enregistrer"}
            </Button>
            <Button
              variant="text"
              color="warning"
              size="small"
              type="reset"
              startIcon={<Close />}
              onClick={() => {
                formikProps.resetForm();
              }}
            >
              Annuler
            </Button>
          </Stack>
          <Typography variant="h4">
            {isEditing ? "Modifier" : "Ajouter"} tâche et objectifs
          </Typography>
        </SectionNavigation>
        <Divider />
      </NavigationContainer>
      <Box>
        <FormContainer spacing={2}>
          <Stack
            direction="row"
            sx={{
              flex: "1 1 100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" id="tableTitle" component="div">
              Objectifs annuels
            </Typography>
          </Stack>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Année</TableCell>
                  <TableCell align="left">Objectif</TableCell>
                  <TableCell align="left">Indicateur</TableCell>
                  <TableCell align="left">Prévision</TableCell>
                  <TableCell align="left">Réalisation</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {valuesArticle?.map((item: any, index: any) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{item.year}</TableCell>
                    <TableCell component="th" scope="row">
                      {item.objectiveTitle}
                    </TableCell>
                    <TableCell align="left">
                      {item.indicateur ? item.indicateur : ""}
                    </TableCell>
                    <TableCell align="left">
                      {item.prevision ? item.prevision : ""}
                    </TableCell>
                    <TableCell align="left">
                      {item.realisation ? item.realisation : ""}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ width: 150, background: "#F5F5F5" }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                      >
                        <IconButton
                          color="warning"
                          aria-label="Supprimer"
                          component="span"
                          size="small"
                          onClick={() => {
                            formikProps.setFieldValue("year", item.year);
                            formikProps.setFieldValue(
                              "objectiveTitle",
                              item.objectiveTitle
                            );
                            formikProps.setFieldValue(
                              "taskAndObjectiveId",
                              item.taskAndObjectiveId
                            );
                            formikProps.setFieldValue(
                              "indicateur",
                              item.indicateur
                            );
                            formikProps.setFieldValue(
                              "prevision",
                              item.prevision
                            );
                            formikProps.setFieldValue(
                              "realisation",
                              item.realisation
                            );
                            setIdValues(item.id);
                          }}
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton
                          color="warning"
                          aria-label="Supprimer"
                          component="span"
                          size="small"
                          onClick={() => {
                            setIdDelete((prev: any[]) => {
                              let temp = [...prev];
                              temp.push({
                                id: item.id,
                              });
                              return temp;
                            });
                            setValuesArticle((prev: any[]) => {
                              let temp = [...prev];
                              temp.splice(index, 1);
                              return temp;
                            });
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow
                  key="index"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <FormControl fullWidth>
                      <OSTextField
                        id="yar"
                        label="Année"
                        name="year"
                        type="number"
                        value={formikProps.values.year}
                        onChange={(event: any) => {
                          const annee = event.target.value;
                          formikProps.setFieldValue("year", annee);

                          const data = tacheEtObjectifList
                            .filter((item) => item.planTravaileId == id)
                            .flatMap((item) => item.objectifAnnuel);
                          const ans = data.map((item) => Number(item?.year));
                          const objectifs = data.map(
                            (item) => item?.objectiveTitle
                          );

                          const objectif = formikProps.values.objectiveTitle;
                          const anneeNumber = Number(annee);
                          const found = ans.some(
                            (year, index) =>
                              year === anneeNumber &&
                              objectifs[index] === objectif
                          );

                          if (found) {
                            setOpen(true);
                            return;
                          }
                        }}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <FormControl fullWidth>
                      <OSTextField
                        id="objectiveTitle"
                        label="Titre objectifs"
                        name="objectiveTitle"
                        type="text"
                        onChange={(event: any) => {
                          const objectif = event.target.value;
                          formikProps.setFieldValue("objectiveTitle", objectif);

                          const annee = formikProps.values.year;

                          const data = tacheEtObjectifList
                            .filter((item) => item.planTravaileId == id)
                            .flatMap((item) => item.objectifAnnuel);
                          const ans = data.map((item) => Number(item?.year));
                          const objectifs = data.map(
                            (item) => item?.objectiveTitle
                          );
                          const anneeNumber = Number(annee);
                          const found = ans.some(
                            (year, index) =>
                              year === anneeNumber &&
                              objectifs[index] === objectif
                          );

                          if (found) {
                            setOpen(true);
                            return;
                          }
                        }}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <FormControl fullWidth>
                      <OSTextField
                        id="indicateur"
                        label="Indicateur"
                        name="indicateur"
                        type="number"
                        value={formikProps.values.indicateur}
                        onChange={(event: any) => {
                          const indicateur = event.target.value;
                          formikProps.setFieldValue("indicateur", indicateur);
                        }}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <FormControl fullWidth>
                      <OSTextField
                        id="prevision"
                        label="Prévision"
                        name="prevision"
                        type="number"
                        value={formikProps.values.prevision}
                        onChange={(event: any) => {
                          const prevision = event.target.value;
                          formikProps.setFieldValue("prevision", prevision);
                        }}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <FormControl fullWidth>
                      <OSTextField
                        id="realisation"
                        label="Réalisation"
                        name="realisation"
                        type="number"
                        value={formikProps.values.realisation}
                        onChange={(event: any) => {
                          const realisation = event.target.value;
                          formikProps.setFieldValue("realisation", realisation);
                        }}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ width: 150, background: "#F5F5F5" }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <IconButton
                        type="button"
                        onClick={() => {
                          const objectiveTitle =
                            formikProps.values.objectiveTitle;
                          const year = formikProps.values.year;
                          const indicateur = formikProps.values.indicateur;
                          const prevision = formikProps.values.prevision;
                          const realisation = formikProps.values.realisation;
                          if (objectiveTitle.trim()) {
                            if (idValues) {
                              setValuesArticle((prev: any[]) => {
                                let temp = [
                                  ...prev.map((ValId) => {
                                    if (ValId.id === idValues) {
                                      return {
                                        id: idValues,
                                        year,
                                        objectiveTitle,
                                        indicateur,
                                        prevision,
                                        realisation,
                                      };
                                    }
                                    return ValId;
                                  }),
                                ];
                                return temp;
                              });
                            } else {
                              setValuesArticle((prev: any[]) => {
                                let temp = [...prev];
                                temp.push({
                                  year,
                                  objectiveTitle,
                                  indicateur,
                                  prevision,
                                  realisation,
                                });
                                return temp;
                              });
                            }
                            formikProps.setFieldValue("year", 0);
                            formikProps.setFieldValue("objectiveTitle", "");
                            formikProps.setFieldValue("indicateur", 0);
                            formikProps.setFieldValue("prevision", 0);
                            formikProps.setFieldValue("realisation", 0);
                          }
                        }}
                      >
                        <Check color="primary" />
                      </IconButton>
                      <IconButton
                        type="button"
                        onClick={() => {
                          formikProps.setFieldValue("year", 0);
                          formikProps.setFieldValue("objectiveTitle", "");
                          formikProps.setFieldValue("indicateur", 0);
                          formikProps.setFieldValue("prevision", 0);
                          formikProps.setFieldValue("realisation", 0);
                        }}
                      >
                        <Close />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </FormContainer>
      </Box>
      <FormContainer spacing={2}>
        <Stack
          direction="row"
          sx={{
            flex: "1 1 100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" id="tableTitle" component="div">
            Tâche et objectifs
          </Typography>
        </Stack>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={2}>
            <OSTextField
              fullWidth
              id="outlined-basic"
              label=" Tâche clé"
              variant="outlined"
              name="keyTasks"
            />
            <OSSelectField
              fullWidth
              id="outlined-basic"
              options={statuslist}
              dataKey="status"
              valueKey="id"
              label="Status"
              variant="outlined"
              name="statusId"
            />
          </Stack>
          <FormControl fullWidth>
            <Autocomplete
              fullWidth
              id="outlined-basic"
              options={allOptions}
              getOptionLabel={(option) => `${option.name} ${option.surname}`}
              onChange={(event, newValue) => {
                formikProps.setFieldValue(
                  "responsableId",
                  newValue != null ? newValue.id : null
                );
              }}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Responsable"
                  variant="outlined"
                  name="responsableId"
                  value={
                    isEditing
                      ? allOptions.find(
                          (option) =>
                            option.id === tacheEtObjectif?.responsableId
                        )?.name +
                        " " +
                        allOptions.find(
                          (option) =>
                            option.id === tacheEtObjectif?.responsableId
                        )?.surname
                      : ""
                  }
                />
              )}
            />
          </FormControl>
          <Stack direction="row" spacing={2}>
            {/* <OSTextField
              fullWidth
              id="outlined-basic"
              label="Time frame "
              variant="outlined"
              name="timeFrame"
            /> */}
            <OSTextField
              fullWidth
              id="outlined-basic"
              label="Resultat attendus"
              variant="outlined"
              name="expectedResult"
            />
            <OSTextField
              fullWidth
              id="outlined-basic"
              label="Ressources "
              variant="outlined"
              name="resources"
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Autocomplete
              fullWidth
              multiple
              id="tags-standard"
              options={allOptions}
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
          </Stack>
          <Stack direction="row" spacing={2}>
            <OSTextField
              fullWidth
              id="outlined-basic"
              label="Notes"
              variant="outlined"
              name="notes"
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <OSDatePicker
              fullWidth
              id="outlined-basic"
              label="Date début"
              variant="outlined"
              value={formikProps.values.startDate!}
              onChange={(value: any) => {
                formikProps.setFieldValue("startDate", value);
                const dt1 = new Date(formikProps.values.startDate!).getTime();
                const dt2 = new Date(formikProps.values.endDate!).getTime();
                if (dt1 > dt2) {
                  setValide(true);
                  return;
                }
              }}
              name="startDate"
            />
            <OSDatePicker
              fullWidth
              id="outlined-basic"
              label="Date fin"
              variant="outlined"
              value={formikProps.values.endDate!}
              onChange={(value: any) => {
                formikProps.setFieldValue("endDate", value);
                const dt1 = new Date(formikProps.values.startDate!).getTime();
                const dt2 = new Date(formikProps.values.endDate!).getTime();
                if (dt1 > dt2) {
                  setValide(true);
                  return;
                }
              }}
              name="endDate"
            />
          </Stack>
        </Stack>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle color={"error"}>Information</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ alignItems: "center" }}>
              <span>
                L'objectif que vous avez saisi est déjà associé avec cette
                année.
              </span>
            </DialogContentText>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Check />
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
        <Dialog open={valide} onClose={() => setValide(false)}>
          <DialogTitle color={"error"}>Information</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ alignItems: "center" }}>
              La date de fin doit être supérieure à la date de début.
            </DialogContentText>
            <DialogActions>
              <Button
                onClick={() => {
                  setValide(false);
                }}
              >
                <Check />
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </FormContainer>
      {/* <AddNewTacheEtObjectifs selectedEmployes={selectedEmployes} /> */}
    </Form>
  );
};

export default NewTacheEtObjectifs;

const FormContainer = styled(Stack)(({ theme }) => ({
  padding: 30,
  borderRadius: 20,
  background: "#fff",
  marginBottom: 30,
}));

const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  paddingBottom: "5px",
}));
