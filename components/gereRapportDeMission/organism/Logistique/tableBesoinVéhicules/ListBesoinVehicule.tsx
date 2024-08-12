import {
  Button,
  Container,
  Dialog,
  FormControl,
  IconButton,
  Stack,
  styled,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../../../../config/table.config";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import Moment from "react-moment";
import { useConfirm } from "material-ui-confirm";
import useFetchEmploys from "../../../../GrantsEnCours/hooks/getResponsable";
import {
  deleteBesoinVehiculeRapport,
  editBesoinVehiculeRapport,
} from "../../../../../redux/features/besoinVehiculeRapport";
import AddbesoinVehiculeRapport from "./add/addBesoinVehicule";
import { BesoinvehiculeRapportItem } from "../../../../../redux/features/besoinVehiculeRapport/besoinVehiculeRapport.interface";
import useFetchBesoinEnVehiculeRapportList from "./hooks/useFetchBesoinEnVehicule";
import useFetchVoiture from "../../../../previsionMissions/organism/Logistique/tableBesoinVéhicules/hooks/useFetchVoiture";
import useFetchMissionaryRapportList from "../../Techniques/tableMissionnaires/hooks/useFetchMissionaryList";
import { MissionairesItem } from "../../../../../redux/features/missionaires/missionaires.interface";

const ListbesoinVehiculeRapportRapport = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("dateDébut");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filtre, setFiltre] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { besoinVehiculeRapportList } = useAppSelector(
    (state) => state.besoinVehiculeRapport
  );
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state: any) => state.employe);
  const router = useRouter();
  const { id } = router.query;
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const fetchBesoinEnVehiculeRapportList =
    useFetchBesoinEnVehiculeRapportList();
  const fetchVoiture = useFetchVoiture();
  const { transportationEquipments } = useAppSelector(
    (state: any) => state.transportation
  );
  const fetchMissionaryRapportList = useFetchMissionaryRapportList();
  const { missionaireslist } = useAppSelector(
    (state: any) => state.missionaires
  );
  const data = async () => {
    await fetchVoiture();
    await fetchMissionaryRapportList();
    await fetchBesoinEnVehiculeRapportList();
  };
  React.useEffect(() => {
    data();
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
        await dispatch(deleteBesoinVehiculeRapport({ id }));
        fetchBesoinEnVehiculeRapportList();
      })
      .catch(() => {});
  };
  const handleClickEdit = async (id: any) => {
    await dispatch(editBesoinVehiculeRapport({ id }));
    handleClickOpen();
  };

  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Button variant="contained" onClick={handleClickOpen}>
          Ajouter
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <AddbesoinVehiculeRapport handleClose={handleClose} />
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
                  {besoinVehiculeRapportList
                    .filter((f: any) => f.missionId === id)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: BesoinvehiculeRapportItem, index: any) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          <TableCell padding="checkbox"></TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            <Moment format="DD/MM/yyyy">{row.dateDebut}</Moment>
                          </TableCell>
                          <TableCell align="left">
                            <Moment format="DD/MM/yyyy">{row.dateFin}</Moment>
                          </TableCell>
                          <TableCell align="left">
                            {`${
                              transportationEquipments.find(
                                (e: any) => e.id === row.vehicule
                              )?.brand
                            } ${"-"}${
                              transportationEquipments.find(
                                (e: any) => e.id === row.vehicule
                              )?.registration
                            }`}
                          </TableCell>
                          <TableCell align="left">{row.trajet}</TableCell>
                          <TableCell align="left">
                            <FormControl
                              sx={{
                                minWidth: 150,
                                maxWidth: 150,
                                height:
                                  row.responsable!.length <= 2 ? "auto" : 70,
                                overflow: "auto",
                              }}
                            >
                              {row.responsable!.map((lp: any) => {
                                return (
                                  <Stack
                                    direction="column"
                                    spacing={2}
                                    key={lp}
                                  >
                                    {
                                      missionaireslist
                                        .filter(
                                          (f: MissionairesItem) =>
                                            f.missionId == id
                                        )
                                        .find(
                                          (e: MissionairesItem) => e.id === lp
                                        )?.lastNameMissionary
                                    }{" "}
                                    {
                                      missionaireslist
                                        .filter(
                                          (f: MissionairesItem) =>
                                            f.missionId == id
                                        )
                                        .find(
                                          (e: MissionairesItem) => e.id === lp
                                        )?.firstNameMissionary
                                    }
                                  </Stack>
                                );
                              })}
                            </FormControl>
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{ minWidth: 50, maxWidth: 50 }}
                          >
                            {row.nombreJour}
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{ minWidth: 50, maxWidth: 50 }}
                          >
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
        </Box>
      </SectionTable>
    </Container>
  );
};

export default ListbesoinVehiculeRapportRapport;

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
