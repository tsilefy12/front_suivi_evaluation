import {
  Button,
  Card,
  Container,
  Dialog,
  Divider,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Link from "next/link";
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
import EnhancedTableToolbar from "./table/EnhancedTableToolbar";
import EnhancedTableHead from "./table/EnhancedTableHead";
import { getComparator, stableSort } from "./table/function";
import Add from "@mui/icons-material/Add";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../../config/table.config";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBack from "@mui/icons-material/ArrowBack";
import KeyValue from "../../shared/keyValue";
import ObjectifsGeneralForm from "./add/addObjectifGeneral";

const ListObjectifGeneral = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("titre");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [open, setOpen] = React.useState(false);

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
      const newSelecteds = rows.map((n) => n.titre);
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
        <Stack flexDirection="row">
          <Link href="/plan_travail">
            <Button color="info" variant="text" startIcon={<ArrowBack />}>
              Retour
            </Button>
          </Link>
          <Button onClick={handleClickOpen} variant="contained" startIcon={<Add />}>
            Créer
          </Button>
        </Stack>
        <Typography variant="h4" color="GrayText">
          Objectifs Générale
        </Typography>
      </SectionNavigation>
      <Divider />
      <BodySection>
        <Card>
          <ValueDetail>
            <KeyValue
              keyName="Objectif Strategie"
              value={"Promouvoir l'exploitation durable équitable des espèce"}
            />
          </ValueDetail>
        </Card>
        {/* <SectionTable> */}
        <SectionTable>
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <EnhancedTableToolbar numSelected={selected.length} />
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
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.titre);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            //   onClick={(event) => handleClick(event, row.reference)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.titre}
                            selected={isItemSelected}
                          >
                            <TableCell
                              padding="checkbox"
                              onClick={(event) => handleClick(event, row.titre)}
                            ></TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {row.titre}
                            </TableCell>
                            {/* <TableCell align="center">{row.titre}</TableCell>
                          <TableCell align="center">
                            {row.responsable}
                          </TableCell> */}
                            <TableCell align="right">
                              <BtnActionContainer
                                direction="row"
                                justifyContent="right"
                              >
                                <IconButton
                                  color="accent"
                                  aria-label="Details"
                                  component="span"
                                >
                                  <VisibilityIcon />
                                </IconButton>
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
      </BodySection>
      <Dialog open={open} onClose={handleClose}>
        <ObjectifsGeneralForm />
      </Dialog>
    </Container>
  );
};

export default ListObjectifGeneral;

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
const ValueDetail = styled(Stack)(({ theme }) => ({
  width: "100%",
  // marginBottom: theme.spacing(3),
  padding: 20,
  borderRadius: 10,
}));

export const BodySection = styled(Box)(({}) => ({
  borderRadius: 20,
  backgroundColor: "white",
  marginBlock: 16,
}));
