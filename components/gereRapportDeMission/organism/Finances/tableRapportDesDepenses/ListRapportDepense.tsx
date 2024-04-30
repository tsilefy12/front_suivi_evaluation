import {
  Button,
  Container,
  Dialog,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
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
import { useAppDispatch, useAppSelector } from "../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { useConfirm } from "material-ui-confirm";
import { RapportDepenseItem } from "../../../../../redux/features/rapportDepense/rapportDepense.interface";
import Moment from "react-moment";

const ListRapportDepenses = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("dpj");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const dispatch: any = useAppDispatch();
  const confirm = useConfirm();
  const fetchRapportDepense = useFetchRapportDepense();
  const { rapportDepenseList } = useAppSelector((state: any) =>state.rapportDepense);

  React.useEffect(() =>{
    fetchRapportDepense();
  }, [router.query])

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
      const newSelecteds = rows.map((n) => n.dpj);
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

  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Button variant="contained" onClick={handleClickOpen}>
          Ajouter
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <AddRapportdepense handleClose={handleClose}/>
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
                  rowCount={rapportDepenseList.length}
                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                  {rapportDepenseList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: RapportDepenseItem, index: any) => {
                      // const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          //   onClick={(event) => handleClick(event, row.reference)}
                          role="checkbox"
                          // aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          // selected={isItemSelected}
                        >
                          <TableCell
                            padding="checkbox"
                            // onClick={(event) => handleClick(event, row.dpj)}
                          ></TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.id}
                          </TableCell>
                          <TableCell align="right">
                            <Moment format="DD/MM/yyyy">{row.date}</Moment>
                          </TableCell>
                          <TableCell align="right">{row.libelle}</TableCell>
                          <TableCell align="right">{row.montant}</TableCell>
                          <TableCell align="right">{row.grant}</TableCell>
                          <TableCell align="right">{row.ligneBudgetaire}</TableCell>
                          <TableCell align="right">
                            <BtnActionContainer
                              direction="row"
                              justifyContent="right"
                            >
                              <IconButton
                                color="primary"
                                aria-label="Modifier"
                                component="span"
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="warning"
                                aria-label="Supprimer"
                                component="span"
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
            <Footer>
              <Typography variant="body2" align="right">
                TOTAL BUDGET : 30000
              </Typography>
              <Typography variant="body2" align="right">
                Imprévu de mission(total budget-location et perdiem MV(10% )) :
                10000
              </Typography>
              <Typography variant="body2" align="right">
                TOTAL GENERAL BUDGET : 40000
              </Typography>
            </Footer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={labelRowsPerPage}
              labelDisplayedRows={defaultLabelDisplayedRows}
            />
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
