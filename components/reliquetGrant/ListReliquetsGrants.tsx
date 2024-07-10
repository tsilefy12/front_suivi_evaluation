import Add from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  styled,
  TableHead,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useConfirm } from "material-ui-confirm";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { usePermitted } from "../../config/middleware";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../config/table.config";
import formatMontant from "../../hooks/format";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { deleteReliquatGrant } from "../../redux/features/reliquatGrants";
import { ReliquatGrantsItem } from "../../redux/features/reliquatGrants/reliquatGrants.interface";
import useFetchGrants from "../GrantsEnCours/hooks/getGrants";
import useFetchReliquatGrant from "./hooks/useFetchEliquatGrant";
import { rows } from "./table/constante";
import EnhancedTableHead from "./table/EnhancedTableHead";
import EnhancedTableToolbar from "./table/EnhancedTableToolbar";
import Data, { Order } from "./table/type-variable";
import { ArrowBack, Search } from "@mui/icons-material";
import { da } from "date-fns/locale";

const ListReliquetsGrants = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("caisse");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const fetchReliquatGrant = useFetchReliquatGrant();
  const { reliquatGrantList } = useAppSelector(
    (state: any) => state.reliquatGrant
  );
  const fetchGrant = useFetchGrants();
  const { grantEncoursList } = useAppSelector(
    (state: any) => state.grantEncours
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const { id }: any = router.query;

  React.useEffect(() => {
    fetchReliquatGrant();
    fetchGrant();
  }, []);

  const [filtre, setFiltre] = React.useState<string>("");
  React.useState<string>("");
  const [dataFiltered, setDataFiltered] = React.useState<any[]>([]);
  useEffect(() => {
    if (filtre === "") {
      return setDataFiltered(reliquatGrantList);
    } else {
      const filteredData = reliquatGrantList.filter((item: any) => {
        return (
          item.soldeCaisse
            .toString()
            .toLowerCase()
            .includes(filtre.toLowerCase()) ||
          item.soldeBank.toString().includes(filtre.toLowerCase()) ||
          item.montantTotal.toString().includes(filtre.toLowerCase())
        );
      });
      return setDataFiltered(filteredData);
    }
  }, [filtre, reliquatGrantList]);

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
      const newSelecteds = rows.map((n) => n.grants);
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
  const validate = usePermitted();
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
      title: "Supprimer reliquate grant",
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
        await dispatch(deleteReliquatGrant({ id }));
        fetchReliquatGrant();
      })
      .catch(() => {});
  };

  const handleClickEdit = async (id: any) => {
    router.push(`/grants/reliquatGrants/${id}/edit`);
  };
  // Group data by grant
  const [dataGrouped, setDataGrouped] = React.useState<any>({});
  useEffect(() => {
    const groupedData = dataFiltered.reduce((acc: any, item: any) => {
      const { grant } = item;
      if (!acc[grant]) {
        acc[grant] = [];
      }
      acc[grant].push(item);
      return acc;
    }, {});
    setDataGrouped(groupedData);
  }, [dataFiltered]);

  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        {validate("Suivi reliquat grant", "C") && (
          <Stack direction="row" alignItems="left" gap={2}>
            <Link href={"/grants/grantEncours/"}>
              <Button variant="text" startIcon={<ArrowBack />} color="info">
                Retour
              </Button>
            </Link>
            <Link href={`/grants/reliquatGrants/${id != "" ? id : ""}/add`}>
              <Button variant="contained" startIcon={<Add />}>
                Créer
              </Button>
            </Link>
          </Stack>
        )}
        <Typography variant="h4" color="GrayText">
          Reliquats Grants
        </Typography>
      </SectionNavigation>
      <SectionTable sx={{ backgroundColor: "#fff" }}>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar
              numSelected={selected.length}
              filtre={filtre}
              setFiltre={setFiltre}
            />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Grants</TableCell>
                    <TableCell align="left">Solde caisse</TableCell>
                    <TableCell align="left">Solde banque</TableCell>
                    <TableCell align="left">Montant total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(dataGrouped).map((grant, grantIndex) =>
                    dataGrouped[grant]
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row: ReliquatGrantsItem, rowIndex: any) => {
                        const labelId = `enhanced-table-checkbox-${grantIndex}-${rowIndex}`;
                        return (
                          <TableRow hover tabIndex={-1} key={row.id}>
                            {rowIndex === 0 && (
                              <TableCell
                                rowSpan={dataGrouped[grant].length}
                                sx={{ minWidth: 120, maxWidth: 120 }}
                                align="left"
                              >
                                {
                                  grantEncoursList.find(
                                    (e: any) => e.id == row.grant
                                  )?.code
                                }
                              </TableCell>
                            )}
                            <TableCell align="left">
                              {formatMontant(Number(row.soldeCaisse))}
                            </TableCell>
                            <TableCell align="left">
                              {formatMontant(Number(row.soldeBank))}
                            </TableCell>
                            <TableCell align="left">
                              {formatMontant(Number(row.montantTotal))}
                            </TableCell>
                            <TableCell align="left">
                              <BtnActionContainer
                                direction="row"
                                justifyContent="left"
                              >
                                {validate("Suivi reliquat grant", "U") && (
                                  <IconButton
                                    color="primary"
                                    aria-label="Modifier"
                                    component="span"
                                    onClick={() => handleClickEdit(row.id)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                )}
                                {validate("Suivi reliquat grant", "D") && (
                                  <IconButton
                                    color="warning"
                                    aria-label="Supprimer"
                                    component="span"
                                    onClick={() => handleClickDelete(row.id)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                )}
                              </BtnActionContainer>
                            </TableCell>
                          </TableRow>
                        );
                      })
                  )}
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

export default ListReliquetsGrants;

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
