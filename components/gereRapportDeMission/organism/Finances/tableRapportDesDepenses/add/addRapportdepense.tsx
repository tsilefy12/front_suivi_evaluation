import React, { useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Autocomplete,
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoIcon from "@mui/icons-material/Info";
import { Footer } from "../ListRapportDepense";
import * as Yup from "yup";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../../../../../config/table.config";
import { Form, Formik } from "formik";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import {
  createRapportDepense,
  updateRapportDepense,
} from "../../../../../../redux/features/rapportDepense";
import useFetchRapportDepense from "../hooks/useFetchRapportDepense";
import OSDatePicker from "../../../../../shared/date/OSDatePicker";
import OSTextField from "../../../../../shared/input/OSTextField";
import OSSelectField from "../../../../../shared/select/OSSelectField";
import useFetchGrants from "../../../../../GrantsEnCours/hooks/getGrants";
import useFetchBudgetLine from "../../../../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchbudgetLine";
import useFetchPrevisionDepenseList from "../../../../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchPrevisionDepense";
import Moment from "react-moment";
import { PrevisionDepenseItem } from "../../../../../../redux/features/PrevisionDepense/previsionDepense.interface";
import { cancelEdit } from "../../../../../../redux/features/rapportDepense/rapportDepenseSlice";

const AddRapportdepense = ({ handleClose }: any) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dense, setDense] = React.useState(false);
  const { isEditing, rapportDepense, rapportDepenseList } = useAppSelector(
    (state: any) => state.rapportDepense
  );
  const router = useRouter();
  const dispatch: any = useAppDispatch();
  const { id }: any = router.query;
  const fetchRapportDepense = useFetchRapportDepense();
  const fetchGrantList = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const fetchligneBudgetaire = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector((state: any) => state.budgetLine);
  const [grantValue, setGrantValue]: any = React.useState("vide");
  const fetchPrevisionDepense = useFetchPrevisionDepenseList();
  const { previsionDepenselist } = useAppSelector(
    (state: any) => state.previsonDepense
  );

  React.useEffect(() => {
    fetchRapportDepense();
    fetchGrantList();
    fetchligneBudgetaire();
    fetchPrevisionDepense();
  }, [router.query]);
  // console.log(" id :", grantValue)

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - [1, 2, 3, 4, 5].length)
      : 0;

  let total: any = useMemo(() => {
    let totalBudget: any = 0;
    previsionDepenselist
      .filter((f: any) => f.missionId === id)
      .map((p: any) => {
        if (p.imprevue === null) {
          totalBudget += p.montant;
        }
      });
    return totalBudget;
  }, [previsionDepenselist]);

  const [daty, setDaty]: any = React.useState("");
  const [lb, setLb] = React.useState("");
  const [grt, setGrt] = React.useState(0);
  const [bdg, setBdg] = React.useState(0);
  const [amt, setAmt] = React.useState(0);

  const clickUtiliser = (
    dt: Date,
    lib: string,
    grants: any,
    budget: any,
    amount: number
  ) => {
    setDaty(dt), setLb(lib), setGrt(grants), setBdg(budget), setAmt(amount);
  };
  //ajout
  const handleSubmit = async (values: any) => {
    values.missionId = id!;
    try {
      if (isEditing) {
        await dispatch(
          updateRapportDepense({
            id: rapportDepense.id!,
            rapportDepense: values,
          })
        );
      } else if (
        daty !== "" &&
        lb !== "" &&
        grt !== 0 &&
        bdg !== 0 &&
        amt !== null
      ) {
        values.date = daty;
        values.libelle = lb;
        values.grant = grt;
        values.ligneBudgetaire = bdg;
        values.montant = amt;
        return (
          await dispatch(createRapportDepense(values)),
          fetchRapportDepense(),
          handleClose()
        );
      } else {
        values.grant = grantValue;
        return (
          await dispatch(createRapportDepense(values)),
          fetchRapportDepense(),
          handleClose()
        );
      }
      fetchRapportDepense(), handleClose();
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
  const uniqueValues = new Set();

  React.useEffect(() => {
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

  const modepaiementList = [
    { id: "Virement", name: "Virement" },
    { id: "Cheque", name: "Cheque" },
    { id: " Mobile money", name: " Mobile money" },
    { id: " Taxi admin ", name: " Taxi admin " },
    { id: "Especes", name: "Especes" },
  ];
  const typeRapportList = [
    { id: "Dépense", name: "Dépense" },
    { id: "Imprévu", name: "Imprévu" },
  ];
  return (
    <Container
      maxWidth="xl"
      sx={{ backgroundColor: "#fff", pb: 5, Height: "500px", width: "580px" }}
    >
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? rapportDepense
            : {
                date: isEditing ? rapportDepense?.date : new Date(),
                libelle: isEditing ? rapportDepense?.libelle : "",
                montant: isEditing ? rapportDepense?.montant : 0,
                grant: isEditing ? rapportDepense?.grant : grantValue,
                ligneBudgetaire: isEditing
                  ? rapportDepense?.ligneBudgetaire
                  : "",
                refPiece: isEditing ? rapportDepense?.refPiece : "",
                modePaiement: isEditing ? rapportDepense?.modePaiement : "",
                typeRapport: isEditing ? rapportDepense?.typeRapport : "",
              }
        }
        validationSchema={Yup.object({
          grant: Yup.string().required("Champ obligatoire"),
          libelle: Yup.string().required("Champ obligatoire"),
          montant: Yup.string().required("Champ obligatoire"),
          ligneBudgetaire: Yup.string().required("Champ obligatoire"),
          modePaiement: Yup.string().required("Champ obligatoire"),
          refPiece: Yup.string().required("Champ obligatoire"),
          typeRapport: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps: any) => {
          return (
            <Form>
              <SectionNavigation>
                <DialogTitle>
                  {!isEditing ? "Créer" : "Modifier"} rapport de depense
                </DialogTitle>

                <DialogContent>
                  <FormContainer
                    spacing={2}
                    mt={2}
                    sx={{ display: amt !== 0 ? "none" : "block" }}
                  >
                    <OSDatePicker
                      fullWidth
                      id="outlined-basic"
                      label="Date"
                      variant="outlined"
                      name="date"
                      value={daty == "" ? formikProps.values.date : daty}
                      onChange={(value: any) =>
                        formikProps.setFieldValue("date", value)
                      }
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Libellés"
                      variant="outlined"
                      name="libelle"
                      inputProps={{ autoComplete: "off" }}
                      value={lb === "" ? formikProps.values.libelle : lb}
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Montant"
                      variant="outlined"
                      name="montant"
                      type="number"
                      inputProps={{ autoComplete: "off", min: 0 }}
                    />
                    <FormControl fullWidth>
                      <Stack spacing={2} direction="column">
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
                        <OSSelectField
                          fullWidth
                          select
                          id="outlined-basic"
                          label="Ligne budgetaire"
                          variant="outlined"
                          name="ligneBudgetaire"
                          options={BudgetLineGrantList}
                          dataKey={["code"]}
                          valueKey="id"
                          value={
                            bdg === 0 ? formikProps.values.ligneBudgetaire : bdg
                          }
                        ></OSSelectField>
                        <OSTextField
                          fullWidth
                          id="outlined-basic"
                          label="Référence de pièce"
                          variant="outlined"
                          name="refPiece"
                          inputProps={{ autoComplete: "off" }}
                          value={formikProps.values.refPiece}
                        />
                        <OSSelectField
                          fullWidth
                          id="outlined-basic"
                          label="Mode de paiement"
                          variant="outlined"
                          name="modePaiement"
                          options={modepaiementList}
                          value={formikProps.values.modePaiement}
                          dataKey={["name"]}
                          valueKey="id"
                        />
                        <OSSelectField
                          fullWidth
                          id="outlined-basic"
                          label="Type de rapport"
                          variant="outlined"
                          name="typeRapport"
                          options={typeRapportList}
                          value={formikProps.values.typeRapport}
                          dataKey={["name"]}
                          valueKey="id"
                        />
                      </Stack>
                    </FormControl>
                    {/* <Stack flexDirection="row">
                      <InfoIcon />
                      <Typography variant="subtitle2">
                        <FormLabel> Voici la liste des </FormLabel>
                        <Lien> prevision de depense pendant la prévision</Lien>,
                        vous pouvez les réutiliser pour les rapports
                      </Typography>
                    </Stack>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell align="left">Libellés</TableCell>
                          <TableCell align="left">Grant</TableCell>
                          <TableCell align="left">Budget line</TableCell>
                          <TableCell align="left">Montant</TableCell>
                        </TableRow>
                      </TableHead>
                      {previsionDepenselist
                        .filter(
                          (p: any) => p.imprevue === null && p.missionId === id
                        )
                        .map((item: PrevisionDepenseItem, index: any) => (
                          <TableRow
                            key={item.id!}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <Moment format="DD/MM/yyyy">{item.date}</Moment>
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {item.libelle}
                            </TableCell>
                            <TableCell align="left">
                              {
                                grantEncoursList.find(
                                  (e: any) => e.id === item?.grant
                                )?.code
                              }
                            </TableCell>
                            <TableCell align="left">
                              {
                                budgetLineList.find(
                                  (e: any) => e.id === item.ligneBudgetaire
                                )?.code
                              }
                            </TableCell>

                            <TableCell align="left">
                              {item.montant} Ar
                            </TableCell>
                            <TableCell align="right">
                              <Button
                                color="primary"
                                startIcon={<ContentCopyIcon />}
                                onClick={() =>
                                  clickUtiliser(
                                    item.date!,
                                    item.libelle!,
                                    item.grant!,
                                    item.ligneBudgetaire!,
                                    item.montant!
                                  )
                                }
                              >
                                Utiliser
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: (dense ? 33 : 53) * emptyRows,
                          }}
                        >
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </Table> */}
                    {/* <Footer>
                      <Typography variant="body2" align="right">
                        TOTAL BUDGET : {total} Ar
                      </Typography>
                      <Typography variant="body2" align="right">
                        Imprévu de mission(total budget-location et perdiem
                        MV(10% )) :{total / 10} Ar
                      </Typography>
                      <Typography variant="body2" align="right">
                        TOTAL GENERAL BUDGET : {total + total / 10} Ar
                      </Typography>
                    </Footer> */}
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={[1, 2, 3, 4, 5].length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      labelRowsPerPage={labelRowsPerPage}
                      labelDisplayedRows={defaultLabelDisplayedRows}
                    />
                  </FormContainer>
                </DialogContent>
                <DialogActions>
                  <Button
                    color="warning"
                    onClick={() => {
                      formikProps.resetForm();
                      setGrt(0);
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

export default AddRapportdepense;

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
const Lien = styled("span")(({ theme }) => ({
  color: theme.palette.info.main,
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.info.main,
  },
}));
