import {
  Autocomplete,
  Button,
  Container,
  Dialog,
  FormControl,
  FormLabel,
  IconButton,
  MenuItem,
  Stack,
  styled,
  TableHead,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Data, { Order } from "./table/type-variable";
import { rows } from "./table/constante";
import EnhancedTableHead from "./table/EnhancedTableHead";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPrevisionMission from "./add/addPrevision";
import useFetchPrevisionDepenseList from "./hooks/useFetchPrevisionDepense";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { PrevisionDepenseItem } from "../../../../../redux/features/PrevisionDepense/previsionDepense.interface";
import Moment from "react-moment";
import useFetchGrants from "../../../../GrantsEnCours/hooks/getGrants";
import useFetchBudgetLine from "./hooks/useFetchbudgetLine";
import { useConfirm } from "material-ui-confirm";
import {
  deletePrevisionDepense,
  editPrevisionDepense,
} from "../../../../../redux/features/PrevisionDepense";
import OSTextField from "../../../../shared/input/OSTextField";
import { Form, Formik } from "formik";
import formatMontant from "../../../../../hooks/format";
import { Check } from "@mui/icons-material";
import { axios } from "../../../../../axios";
import { enqueueSnackbar } from "../../../../../redux/features/notification/notificationSlice";
import useFetchImprevuePrevision from "./hooks/useFetchImprevuePrevision";

const ListPrevision = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("date");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const fetchPrevisionDepense = useFetchPrevisionDepenseList();
  const { previsionDepenselist, isEditing, previsionDepense }: any =
    useAppSelector((state: any) => state.previsonDepense);
  const { grantEncoursList }: any = useAppSelector(
    (state: any) => state.grantEncours
  );
  const fetchGrant: any = useFetchGrants();
  const { budgetLineList }: any = useAppSelector(
    (state: any) => state.budgetLine
  );
  const fetchLigneBudgetaire = useFetchBudgetLine();
  const confirm = useConfirm();
  const dispatch: any = useAppDispatch();
  const [getGrantId, setGetGrantId]: any = React.useState(0);
  const { id }: any = router.query;
  const fetchImprevuePrevision = useFetchImprevuePrevision();
  const { imprevuePrevisionlist }: any = useAppSelector(
    (state: any) => state.imprevuePrevision
  );

  React.useEffect(() => {
    fetchPrevisionDepense();
    fetchGrant();
    fetchLigneBudgetaire();
    fetchImprevuePrevision();
  }, [router.query]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.date);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer prévision de depense",
      description: "Voulez-vous vraiment supprimer ?",
      cancellationText: "Annuler",
      confirmationText: "Supprimer",
      cancellationButtonProps: {
        color: "warning",
      },
      confirmationButtonProps: {
        color: "error",
      },
    })
      .then(async () => {
        await dispatch(deletePrevisionDepense({ id }));
        fetchPrevisionDepense();
      })
      .catch(() => {});
  };
  const handleClickEdit = async (id: any) => {
    await dispatch(editPrevisionDepense({ id }));
    handleClickOpen();
  };

  let total: any = useMemo(() => {
    let totalBudget: any = 0;
    previsionDepenselist
      .filter((f) => f.missionId == id)
      .map((p: any) => {
        totalBudget += p.montant;
      });
    return totalBudget;
  }, [previsionDepenselist]);

  const listLigne: { id: string; name: any }[] = [];

  previsionDepenselist
    .filter((f) => f.missionId == id)
    .forEach((b: any) => {
      if (getGrantId !== null && getGrantId === b.grant) {
        const budgetLineNames = budgetLineList
          .filter(
            (f: any) => f.grantId == getGrantId && f.id == b.ligneBudgetaire
          )
          .map((e: any) => e.code);

        listLigne.push({
          id: b.ligneBudgetaire,
          name: budgetLineNames,
        });
      } else {
        listLigne.push({ id: "", name: "" });
      }
    });

  const [selectedBudgetLine, setSelectedBudgetLine] = React.useState<any[]>(
    () => {
      if (isEditing) {
        const uniqueBudgetLines = new Set(
          budgetLineList.filter(
            (pg: any) =>
              Array.isArray(previsionDepense?.ligneBudgetaire) &&
              previsionDepense?.ligneBudgetaire?.includes(pg.id)
          )
        );
        return Array.from(uniqueBudgetLines);
      } else {
        return listLigne.length > 0 ? listLigne : [];
      }
    }
  );

  let [regle, setRegle]: any = React.useState("");
  const [selectId, setSelecteId] = React.useState(0);
  let [lib, setLibelle]: any = React.useState("");
  let [prix, setPU]: any = React.useState(0);
  useEffect(() => {
    if (getGrantId) {
      previsionDepenselist.map((element: PrevisionDepenseItem) => {
        const budgetlineId = element.ligneBudgetaire;
        if (Number(budgetlineId) == Number(selectId)) {
          setPU(element.pu);
          setLibelle(element.libelle);
          setRegle(element.regleme);
        }
      });
    }
  }, [getGrantId, selectId]);

  const handleSubmit = async (values: any) => {
    console.log("values", selectId, getGrantId, regle, lib, prix);
    (values.imprevue = total / 10),
      (values.grant = getGrantId),
      (values.date = new Date()),
      (values.ligneBudgetaire = Number(selectId)),
      (values.nombre = 1),
      (values.idMission = id!),
      (values.pu = prix),
      (values.regleme = regle),
      (values.libelle = lib);
    try {
      await axios.post("/suivi-evaluation/imprevue-prevision", {
        ...values,
      });
      dispatch(
        enqueueSnackbar({
          message: "L'imprévu de la prévision a été créé avec succès",
          options: { variant: "success" },
        })
      );
      fetchImprevuePrevision();
    } catch (error) {
      console.log(error);
    }
  };
  const [data, setData] = React.useState<any[]>([]);
  useEffect(() => {
    setData(
      [...previsionDepenselist.filter((f) => f.missionId == id)].reverse()
    );
  }, [previsionDepenselist]);
  const getGrantOption = (id: any, options: any) => {
    setGetGrantId(id);
    if (!id) return null;
    return options.find((option: any) => option.id == id) || null;
  };
  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Button variant="contained" onClick={handleClickOpen}>
          Ajouter
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <AddPrevisionMission handleClose={handleClose} />
        </Dialog>
      </SectionNavigation>
      <SectionTable>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {data.slice().map((row: PrevisionDepenseItem, index: any) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell padding="checkbox"></TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Moment format="DD/MM/yyyy">{row.date}</Moment>
                        </TableCell>
                        <TableCell align="left">{row.libelle}</TableCell>
                        <TableCell
                          align="left"
                          sx={{ minWidth: 10, maxWidth: 10 }}
                        >
                          {row.nombre}
                        </TableCell>
                        <TableCell align="left">
                          {formatMontant(Number(row.pu))}
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ minWidth: 150, maxWidth: 150 }}
                        >
                          {formatMontant(Number(row.montant))}
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ maxWidth: 150, minWidth: 150 }}
                        >
                          {
                            grantEncoursList.find(
                              (e: any) => e.id === row?.grant
                            )?.code
                          }
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ minWidth: 150, maxWidth: 150 }}
                        >
                          {
                            budgetLineList.find(
                              (e: any) => e.id === row.ligneBudgetaire
                            )?.code
                          }
                        </TableCell>
                        <TableCell align="left">
                          <BtnActionContainer
                            direction="row"
                            justifyContent="left"
                          >
                            <IconButton
                              color="primary"
                              aria-label="Modifier"
                              component="span"
                              onClick={() => handleClickEdit(row.id)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="warning"
                              aria-label="Supprimer"
                              component="span"
                              onClick={() => {
                                handleClickDelete(row.id);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </BtnActionContainer>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Formik
              enableReinitialize={isEditing ? true : false}
              initialValues={{
                date: new Date(),
                nombre: isEditing ? previsionDepense?.nombre : 1,
                pu: isEditing ? previsionDepense?.pu : prix,
                grant: isEditing ? previsionDepense?.grant : getGrantId,
                ligneBudgetaire: isEditing
                  ? previsionDepense?.ligneBudgetaire
                  : Number(selectId),
                idMission: isEditing ? previsionDepense?.idMission : id!,
                imprevue: isEditing ? previsionDepense?.imprevue : total / 10,
                libelle: isEditing ? previsionDepense?.libelle : lib,
                regleme: isEditing ? previsionDepense?.regleme : regle,
              }}
              onSubmit={(value: any, action: any) => {
                handleSubmit(value);
                action.resetForm();
              }}
            >
              {(formikProps) => {
                return (
                  <Form>
                    <Footer sx={{ marginTop: 2 }}>
                      <Table>
                        <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
                          <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>PU</TableCell>
                            <TableCell>Grant</TableCell>
                            <TableCell>Ligne budgetaire</TableCell>
                            <TableCell>Montant imprévu</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {imprevuePrevisionlist
                            .filter((f: any) => f.idMission == id)
                            .slice()
                            .map((row: PrevisionDepenseItem, index: any) => {
                              return (
                                <TableRow key={index}>
                                  <TableCell
                                    align="left"
                                    scope="row"
                                    sx={{ paddingLeft: 2 }}
                                  >
                                    <Moment format="DD/MM/yyyy">
                                      {row.date}
                                    </Moment>
                                  </TableCell>
                                  <TableCell align="left">
                                    {row.nombre}
                                  </TableCell>
                                  <TableCell align="left">
                                    {formatMontant(Number(row.pu))}
                                  </TableCell>
                                  <TableCell align="left">
                                    {
                                      grantEncoursList.find(
                                        (e: any) => e.id === row?.grant
                                      )?.code
                                    }
                                  </TableCell>
                                  <TableCell align="left">
                                    {
                                      budgetLineList.find(
                                        (e: any) => e.id === row.ligneBudgetaire
                                      )?.code
                                    }
                                  </TableCell>

                                  <TableCell align="left">
                                    {formatMontant(Number(row.imprevue))}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                      <Typography
                        variant="body2"
                        align="left"
                        sx={{ width: "100%", marginTop: 4 }}
                      >
                        <Stack direction="column" spacing={2}>
                          <Stack
                            direction="row"
                            sx={{ textAlign: "left" }}
                            gap={1}
                            top={4}
                          >
                            {/* <FormLabel>Budget line selected amount : {getAmountBudget} Ar</FormLabel>  */}
                            <FormControl sx={{ maxWidth: 150 }}>
                              <OSTextField
                                fullWidth
                                id="outlined-basic"
                                label="Imprevue"
                                variant="outlined"
                                size="small"
                                value={formatMontant(Number(total / 10))}
                                name="imprevue"
                              />
                            </FormControl>
                            <FormControl sx={{ maxWidth: 100 }}>
                              <OSTextField
                                id="outlined-basic"
                                label="Nombre"
                                variant="outlined"
                                size="small"
                                name="nombre"
                                value={1}
                                disabled
                              />
                            </FormControl>
                            <FormControl
                              sx={{ flex: "1", textAlign: "left" }}
                              fullWidth
                            >
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
                                      typeof formikProps.errors.grant ===
                                        "string"
                                        ? formikProps.errors.grant
                                        : ""
                                    }
                                  />
                                )}
                                isOptionEqualToValue={(
                                  option: any,
                                  value: any
                                ) => option.id === value.id}
                                size="small"
                              />
                            </FormControl>
                            <FormControl sx={{ flex: "1", textAlign: "left" }}>
                              <OSTextField
                                fullWidth
                                select
                                id="outlined-basic"
                                label="Ligne budgetaire"
                                variant="outlined"
                                size="small"
                                name="ligneBudgetaire"
                                value={selectedBudgetLine}
                                key={selectId}
                                onChange={(e: any) => {
                                  setSelectedBudgetLine(e.target.value);
                                  const selectedItem = listLigne.find(
                                    (item: any) => item.name === e.target.value
                                  );
                                  if (selectedItem) {
                                    setSelecteId(selectedItem.id);
                                  }
                                }}
                              >
                                {listLigne.map((item: any) => (
                                  <MenuItem key={item.id!} value={item.id}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                              </OSTextField>
                            </FormControl>
                            <FormControl>
                              <Button
                                variant="contained"
                                type="submit"
                                startIcon={<Check />}
                              >
                                Valider
                              </Button>
                            </FormControl>
                          </Stack>
                        </Stack>
                      </Typography>
                    </Footer>
                  </Form>
                );
              }}
            </Formik>
            <Typography
              variant="body2"
              align="left"
              sx={{ width: "100%", marginTop: 4 }}
            >
              TOTAL BUDGET : {formatMontant(Number(total))}
            </Typography>
            <FormLabel sx={{ width: "100%", align: "right" }}>
              Imprévu de mission(total budget-location et perdiem MV(10% )) :{" "}
              {formatMontant(Number(total / 10))}
            </FormLabel>
            <Typography variant="body2" align="left" sx={{ width: "100%" }}>
              TOTAL GENERAL BUDGET : {formatMontant(Number(total + total / 10))}
            </Typography>
          </Paper>
        </Box>
      </SectionTable>
    </Container>
  );
};

export default ListPrevision;

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));

export const Footer = styled(Stack)(({ theme }) => ({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "400px",
  fontSize: "14px",
  marginleft: "10px",
  letterSpacing: "0.25px",
}));
