import {
  Button,
  Container,
  Dialog,
  FormControl,
  IconButton,
  Stack,
  styled,
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
import AddResumeDepense from "./add/addResumeDepense";
import KeyValue from "../../../../shared/keyValue";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../../../../config/table.config";
import useFetchResumeDepensePrevue from "./hooks/useFetchResumeDepensePrevue";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { ResumeDepensePrevueItem } from "../../../../../redux/features/resumeDepensePrevue/reumeDepensePrevue.interface";
import useFetchGrants from "../../../../GrantsEnCours/hooks/getGrants";
import useFetchBudgetLine from "../../../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchbudgetLine";
import { useConfirm } from "material-ui-confirm";
import {
  deleteResumeDepensePrevue,
  editResumeDepensePrevue,
} from "../../../../../redux/features/resumeDepensePrevue";
import formatMontant from "../../../../../hooks/format";

const ListResumeDepense = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("grant");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const fetchResumeDepensePrevue = useFetchResumeDepensePrevue();
  const { resumeDepensePrevueList } = useAppSelector(
    (state: any) => state.resumeDepensePrevue
  );
  const router = useRouter();
  const { id } = router.query;
  const fetchGrantList = useFetchGrants();
  const { grantEncoursList } = useAppSelector(
    (state: any) => state.grantEncours
  );
  const fetchligneBudgetaire = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector((state: any) => state.budgetLine);
  const confirm = useConfirm();
  const dispatch: any = useAppDispatch();

  React.useEffect(() => {
    fetchResumeDepensePrevue();
    fetchGrantList();
    fetchligneBudgetaire();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let total: any = useMemo(() => {
    let totalBudget: any = 0;
    resumeDepensePrevueList
      .filter((f: any) => f.missionId === id)
      .forEach((item: any) => {
        totalBudget += parseInt(item.budgetDepense);
      });
    return totalBudget;
  }, [resumeDepensePrevueList]);

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
      const newSelecteds = rows.map((n) => n.grant);
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
      title: "Supprimer  le resumé de depense prevue",
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
        await dispatch(deleteResumeDepensePrevue({ id }));
        fetchResumeDepensePrevue();
      })
      .catch(() => {});
  };

  const handleClickEdit = async (id: any) => {
    await dispatch(editResumeDepensePrevue({ id }));
    handleClickOpen();
  };

  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Button variant="contained" onClick={handleClickOpen}>
          Ajouter
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <AddResumeDepense handleClose={handleClose} />
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
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                  {resumeDepensePrevueList
                    .filter((f: any) => f.missionId === id)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any) => {
                      // const isItemSelected = isSelected(row.grant);
                      const labelId = `enhanced-table-checkbox-${row.id!}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.grant}
                        >
                          <TableCell padding="checkbox"></TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
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
                          <TableCell align="left">
                            {formatMontant(Number(row.depensePrevue))}
                          </TableCell>
                          <TableCell align="left">
                            {formatMontant(Number(row.budgetDepense))}
                          </TableCell>
                          <TableCell align="left">{row.remarque}</TableCell>
                          <TableCell align="left" width="20px">
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
                Total Budget : {formatMontant(Number(total))}
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

export default ListResumeDepense;

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
