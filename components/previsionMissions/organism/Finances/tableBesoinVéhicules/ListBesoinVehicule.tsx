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
import AddBesoinVehicule from "./add/addBesoinVehicule";
import useFetchBesoinEnVehiculeList from "./hooks/useFetchBesoinEnVehicule";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { BesoinvehiculeItem } from "../../../../../redux/features/besoinVehicule/besoinVehicule.interface";
import Moment from "react-moment";
import { useConfirm } from "material-ui-confirm";
import {
  deleteBesoinVehicule,
  editBesoinVehicule,
} from "../../../../../redux/features/besoinVehicule";
import useFetchVehicleList from "../../Techniques/tableAutreInfoAuto/hooks/useFetchVehicleList";
import useFetchEmploys from "../../../../GrantsEnCours/hooks/getResponsable";
import useFetchVoiture from "./hooks/useFetchVoiture";

const ListBesoinVehicule = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("dateDébut");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const fetchBesoinEnVehicule = useFetchBesoinEnVehiculeList();
  const { besoinVehiculeList } = useAppSelector(
    (state) => state.besoinVehicule
  );
  const fetchVehicule = useFetchVehicleList();
  const { vehicleList } = useAppSelector((state: any) => state.vehicle);
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state: any) => state.employe);
  const router = useRouter();
  const { id } = router.query;
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const fetchVoiture = useFetchVoiture();
  const { transportationEquipments } = useAppSelector(
    (state: any) => state.transportation
  );

  React.useEffect(() => {
    fetchBesoinEnVehicule();
    fetchVehicule();
    fetchEmployes();
    fetchVoiture();
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
      const newSelecteds = rows.map((n) => n.dateDébut);
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
      title: "Supprimer besoin véhicule",
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
        await dispatch(deleteBesoinVehicule({ id }));
        fetchBesoinEnVehicule();
      })
      .catch(() => {});
  };
  const handleClickEdit = async (id: any) => {
    await dispatch(editBesoinVehicule({ id }));
    handleClickOpen();
  };

  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Button variant="contained" onClick={handleClickOpen}>
          Ajouter
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <AddBesoinVehicule handleClose={handleClose} />
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
                  {besoinVehiculeList
                    .filter((f: any) => f.missionId === id)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: BesoinvehiculeItem, index: any) => {
                      // const isItemSelected = isSelected(row.dateDébut);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          //   onClick={(event) => handleClick(event, row.reference)}
                          role="checkbox"
                          // aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={index}
                          // selected={isItemSelected}
                        >
                          <TableCell
                            padding="checkbox"
                            // onClick={(event) =>
                            //   handleClick(event, row.dateDébut)
                            // }
                          ></TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            <Moment format="DD/MM/yyyy">{row.dateDebut}</Moment>
                          </TableCell>
                          <TableCell>
                            <Moment format="DD/MM/yyyy">{row.dateFin}</Moment>
                          </TableCell>
                          <TableCell sx={{ minWidth: 150, maxWidth: 150 }}>
                            {`${
                              transportationEquipments.find(
                                (e: any) => e.id === row.vehicule
                              )?.brand
                            } ${"-"}${
                              transportationEquipments.find(
                                (e: any) => e.id === row.vehicule
                              )?.registration
                            } `}
                          </TableCell>
                          <TableCell sx={{ minWidth: 50, maxWidth: 50 }}>
                            {row.trajet}
                          </TableCell>
                          <TableCell sx={{ minWidth: 250, maxWidth: 250 }}>
                            <FormControl>
                              {row.responsable!.map((lp: any, index: any) => {
                                return (
                                  <Stack
                                    direction="column"
                                    gap={2}
                                    height={25}
                                    overflow="auto"
                                    key={index}
                                    sx={{ minWidth: 250, maxWidth: 250 }}
                                  >
                                    -
                                    {
                                      employees.find((e: any) => e.id == lp)
                                        ?.name
                                    }{" "}
                                    {
                                      employees.find((e: any) => e.id == lp)
                                        ?.surname
                                    }
                                  </Stack>
                                );
                              })}
                            </FormControl>
                          </TableCell>
                          <TableCell align="center">{row.nombreJour}</TableCell>
                          <TableCell>
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
                                onClick={() => handleClickDelete(row.id)}
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
    </Container>
  );
};

export default ListBesoinVehicule;

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
