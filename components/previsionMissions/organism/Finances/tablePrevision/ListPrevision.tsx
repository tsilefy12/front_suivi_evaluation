import {
  Autocomplete,
  Button,
  Container,
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  MenuItem,
  Stack,
  styled,
  TableHead,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
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
  createPrevisionDepense,
  deletePrevisionDepense,
  editPrevisionDepense,
} from "../../../../../redux/features/PrevisionDepense";
import OSSelectField from "../../../../shared/select/OSSelectField";
import OSTextField from "../../../../shared/input/OSTextField";
import OSDatePicker from "../../../../shared/date/OSDatePicker";
import { Form, Formik } from "formik";
import { updateTacheEtObjectifs } from "../../../../../redux/features/tachesEtObjectifs";
import formatMontant from "../../../../../hooks/format";
import { margin } from "polished";

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

  React.useEffect(() => {
    fetchPrevisionDepense();
    fetchGrant();
    fetchLigneBudgetaire();
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
    previsionDepenselist.map((p: any) => {
      if (p.imprevue === null) {
        totalBudget += p.montant;
      }
    });
    return totalBudget;
  }, [previsionDepenselist]);

  //select budget line depends grant
  const listLigne: { id: string; name: any }[] = [];

  previsionDepenselist.forEach((b: any) => {
    if (getGrantId !== null && getGrantId === b.grant) {
      return listLigne.push({
        id: b.ligneBudgetaire,
        name: budgetLineList.find((e: any) => e.id === b.ligneBudgetaire)?.code,
      });
    } else {
      listLigne.push({ id: "", name: "" });
    }
  });

  let [selectedBudgetLine, setSelectedBudgetLine]: any = React.useState<any[]>(
    () => {
      if (isEditing) {
        return budgetLineList.filter(
          (pg: any) =>
            Array.isArray(previsionDepense?.ligneBudgetaire) &&
            previsionDepense?.ligneBudgetaire?.includes(pg.id)
        );
      } else {
        return listLigne.length > 0 ? listLigne : [];
      }
    }
  );
  // console.log(" id :", selectedBudgetLine)
  //get imprevue

  let [regle, setRegle]: any = React.useState(0);
  const [selectId, setSelecteId] = React.useState("");
  let [lib, setLibelle]: any = React.useState("");
  let [prix, setPU]: any = React.useState("");

  if (getGrantId != "" && selectedBudgetLine != "") {
    previsionDepenselist.forEach((element: any) => {
      const budgetlineId = element.ligneBudgetaire;
      if (budgetlineId === selectId) {
        regle = element.regleme;
        lib = element.libelle;
        prix = element.pu;
      }
    });
  }
  // console.log("vola :", selectId)
  const handleSubmit = async (values: any) => {
    values.missionId = id!;
    values.imprevue = total / 10;
    values.libelle = lib;
    values.grant = getGrantId;
    values.date = new Date();
    values.ligneBudgetaire = selectId;
    values.nombre = 1;
    values.montant = total / 10;
    console.log("montant :", values.montant);
    values.pu = prix;
    values.regleme = regle;
    try {
      await dispatch(createPrevisionDepense(values));
      fetchPrevisionDepense();
      handleClose();
    } catch (error) {
      console.log("error", error);
    }
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
                  {previsionDepenselist
                    .filter(
                      (e: any) => e.imprevue === null && e.missionId === id
                    )
                    .slice()
                    .map((row: PrevisionDepenseItem, index: any) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          <TableCell padding="checkbox"></TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Moment format="DD/MM/yyyy">{row.date}</Moment>
                          </TableCell>
                          <TableCell align="right">{row.libelle}</TableCell>
                          <TableCell align="right">{row.nombre}</TableCell>
                          <TableCell align="right">
                            {formatMontant(Number(row.pu))}
                          </TableCell>
                          <TableCell align="right">
                            {formatMontant(Number(row.montant))}
                          </TableCell>
                          <TableCell align="right">
                            {
                              grantEncoursList.find(
                                (e: any) => e.id === row?.grant
                              )?.code
                            }
                          </TableCell>
                          <TableCell align="center">
                            {
                              budgetLineList.find(
                                (e: any) => e.id === row.ligneBudgetaire
                              )?.code
                            }
                          </TableCell>
                          <TableCell align="right">
                            <BtnActionContainer
                              direction="row"
                              justifyContent="right"
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
                libelle: isEditing ? previsionDepense?.libelle : lib,
                nombre: isEditing ? previsionDepense?.nombre : 1,
                pu: isEditing ? previsionDepense?.pu : prix,
                grant: isEditing ? previsionDepense?.grant : getGrantId,
                ligneBudgetaire: isEditing
                  ? previsionDepense?.ligneBudgetaire
                  : selectId,
                regleme: isEditing ? previsionDepense?.regleme : regle,
                // missionId: isEditing ? previsionDepense?.missionId : id,
                montant: isEditing ? previsionDepense?.montant : total / 10,
                imprevue: isEditing ? previsionDepense?.imprevue : total / 10,
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
                            <TableCell>Imprevue</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>PU</TableCell>
                            <TableCell>Grant</TableCell>
                            <TableCell>Ligne budgetaire</TableCell>
                            <TableCell>Montant</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {previsionDepenselist
                            .filter((e: any) => e.imprevue != null)
                            .slice()
                            .map((row: PrevisionDepenseItem, index: any) => {
                              return (
                                <TableRow key={row.id!}>
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
                                    {row.libelle}
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
                                    {formatMontant(Number(row.montant))}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                      <Typography
                        variant="body2"
                        align="right"
                        sx={{ width: "100%", marginTop: 4 }}
                      >
                        <Stack direction="column" spacing={2}>
                          <Stack
                            direction="row"
                            sx={{ textAlign: "right" }}
                            gap={1}
                            top={4}
                          >
                            {/* <FormLabel>Budget line selected amount : {getAmountBudget} Ar</FormLabel> */}
                            <FormControl sx={{ maxWidth: 150 }}>
                              <OSTextField
                                fullWidth
                                id="outlined-basic"
                                label="Montant"
                                variant="outlined"
                                size="small"
                                value={formatMontant(Number(total / 10))}
                                name="montant"
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
                              <OSTextField
                                fullWidth
                                select
                                id="outlined-basic"
                                label="Grant"
                                variant="outlined"
                                size="small"
                                name="grant"
                                value={getGrantId}
                                onChange={(e: any) =>
                                  setGetGrantId(e.target.value)
                                }
                              >
                                <MenuItem value="vide">Select grant</MenuItem>
                                {
                                  // Filtrer les éléments uniques de grantEncoursList
                                  Array.from(
                                    new Set(
                                      previsionDepenselist.map(
                                        (item: any) => item.grant
                                      )
                                    )
                                  ).map((grantId: any) => {
                                    const grant = grantEncoursList.find(
                                      (e: any) => e.id === grantId
                                    );
                                    return grant ? (
                                      <MenuItem key={grantId} value={grantId}>
                                        {grant.code}
                                      </MenuItem>
                                    ) : null;
                                  })
                                }
                              </OSTextField>
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
                                <MenuItem value="vide">
                                  Select budget line
                                </MenuItem>
                                {listLigne.map((item: any) => (
                                  <MenuItem key={item.id!} value={item.name}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                              </OSTextField>
                            </FormControl>
                            <FormControl>
                              {/* <Button
                        color="warning"
                      >
                        Annuler
                      </Button> */}
                              <Button variant="contained" type="submit">
                                Enregistrer
                              </Button>
                            </FormControl>
                          </Stack>
                          <Typography variant="body2" align="right">
                            TOTAL BUDGET : {formatMontant(Number(total))}
                          </Typography>
                          <FormLabel>
                            Imprévu de mission(total budget-location et perdiem
                            MV(10% )) : {formatMontant(Number(total / 10))}
                          </FormLabel>
                        </Stack>
                      </Typography>

                      <Typography variant="body2" align="right">
                        TOTAL GENERAL BUDGET :{" "}
                        {formatMontant(Number(total + total / 10))}
                      </Typography>
                    </Footer>
                  </Form>
                );
              }}
            </Formik>
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
  marginRight: "10px",
  letterSpacing: "0.25px",
}));
