import {
  Button,
  Container,
  Dialog,
  FormControl,
  IconButton,
  Stack,
  styled,
  TableHead,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Data, { Order } from "./table/type-variable";
import { rows } from "./table/constante";
import EnhancedTableHead from "./table/EnhancedTableHead";
import { getComparator, stableSort } from "./table/function";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../../../../config/table.config";
import AddRapportdepense from "./add/addRapportdepense";
import useFetchRapportDepense from "./hooks/useFetchRapportDepense";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { useConfirm } from "material-ui-confirm";
import { RapportDepenseItem } from "../../../../../redux/features/rapportDepense/rapportDepense.interface";
import Moment from "react-moment";
import useFetchGrants from "../../../../GrantsEnCours/hooks/getGrants";
import useFetchBudgetLine from "../../../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchbudgetLine";
import {
  deleteRapportDepense,
  editRapportDepense,
} from "../../../../../redux/features/rapportDepense";
import formatMontant from "../../../../../hooks/format";

const ListRapportDepenses = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("date");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { id } = router.query;
  const dispatch: any = useAppDispatch();
  const confirm = useConfirm();
  const fetchRapportDepense = useFetchRapportDepense();
  const { rapportDepenseList } = useAppSelector(
    (state: any) => state.rapportDepense
  );
  const fetchGrantList = useFetchGrants();
  const { grantEncoursList } = useAppSelector(
    (state: any) => state.grantEncours
  );
  const fetchligneBudgetaire = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector((state: any) => state.budgetLine);

  React.useEffect(() => {
    fetchRapportDepense();
    fetchGrantList();
    fetchligneBudgetaire();
  }, []);

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

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer  le rapport de depense",
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
        await dispatch(deleteRapportDepense({ id }));
        fetchRapportDepense();
      })
      .catch(() => {});
  };

  const handleClickEdit = async (id: any) => {
    await dispatch(editRapportDepense({ id }));
    handleClickOpen();
  };

  let total: any = useMemo(() => {
    let totalBudget: any = 0;
    rapportDepenseList
      .filter((f: any) => f.missionId === id)
      .forEach((item: any) => {
        totalBudget += item.montant;
      });
    return totalBudget;
  }, [rapportDepenseList]);
  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Button variant="contained" onClick={handleClickOpen}>
          Ajouter
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <AddRapportdepense handleClose={handleClose} />
        </Dialog>
      </SectionNavigation>
      <SectionTable>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                {/* <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rapportDepenseList.length}
                /> */}
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Libellés</TableCell>
                    <TableCell align="left">Grant</TableCell>
                    <TableCell align="left">Ligne budgetaire</TableCell>
                    <TableCell align="left">Référence de pièce</TableCell>
                    <TableCell align="left">Mode de paiement</TableCell>
                    <TableCell align="left">Montant</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rapportDepenseList
                    .filter((f: any) => f.missionId === id)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: RapportDepenseItem, index: any) => {
                      // const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          <TableCell align="left">
                            <Moment format="DD/MM/yyyy">{row.date}</Moment>
                          </TableCell>
                          <TableCell align="left">{row.libelle}</TableCell>
                          <TableCell align="left" sx={{ minWidth: 100 }}>
                            {
                              grantEncoursList.find(
                                (e: any) => e.id === row.grant
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
                          <TableCell align="left">{row.refPiece}</TableCell>
                          <TableCell align="left">{row.modePaiement}</TableCell>
                          <TableCell align="left">
                            {formatMontant(Number(row.montant))}
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
                                onClick={() => handleClickEdit(row.id!)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="warning"
                                aria-label="Supprimer"
                                component="span"
                                onClick={() => handleClickDelete(row.id!)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </BtnActionContainer>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Footer sx={{ paddingTop: 2 }}>
              <Typography variant="body2" align="left">
                TOTAL BUDGET : {formatMontant(Number(total))}
              </Typography>
              <Typography variant="body2" align="left">
                Imprévu de mission(total budget-location et perdiem MV(10% )) :
                {formatMontant(Number(total / 10))}
              </Typography>
              <Typography variant="body2" align="left">
                TOTAL GENERAL BUDGET :{" "}
                {formatMontant(Number(total + total / 10))}
              </Typography>
            </Footer>
            {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={labelRowsPerPage}
              labelDisplayedRows={defaultLabelDisplayedRows}
            /> */}
          </Paper>
          {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
        </Box>
      </SectionTable>
    </Container>
  );
};

export default ListRapportDepenses;

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
export const Footer = styled(Stack)(({ theme }) => ({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "400px",
  fontSize: "14px",
  letterSpacing: "0.25px",
}));
