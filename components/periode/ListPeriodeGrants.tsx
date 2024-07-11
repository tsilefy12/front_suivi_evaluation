import { ArrowBack, Edit, Search } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
import Moment from "react-moment";
import { usePermitted } from "../../config/middleware";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../config/table.config";
import formatMontant from "../../hooks/format";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { deletePeriode } from "../../redux/features/periode";
import useFetchGrants from "../GrantsEnCours/hooks/getGrants";
import useFetchPeriode from "./hooks/useFetchPeriode";
import { rows } from "./table/constante";
import EnhancedTableToolbar from "./table/EnhancedTableToolbar";
import Data, { Order } from "./table/type-variable";
import { set } from "date-fns";
import { PeriodeItem } from "../../redux/features/periode/periode.interface";

const ListBudgetsInitial = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("periode");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filtre, setFiltre] = React.useState("");
  const router = useRouter();
  const fetchPeriode = useFetchPeriode();
  const { periodelist } = useAppSelector((state) => state.periode);

  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const fetchGrants = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const validate = usePermitted();

  React.useEffect(() => {
    fetchPeriode();
    fetchGrants();
  }, []);

  const [searPeriodeGrants, setSearchPeriodeGrants] = React.useState("");
  const [dataFiltered, setDataFiltered] = React.useState<any[]>([]);

  useEffect(() => {
    if (searPeriodeGrants === "") {
      setDataFiltered(periodelist);
    } else {
      const data = periodelist.filter((p: any) => {
        return (
          p.periode!.toLowerCase().includes(searPeriodeGrants.toLowerCase()) ||
          p.notes?.toLowerCase().includes(searPeriodeGrants.toLowerCase()) ||
          p.montant
            ?.toString()
            .toLowerCase()
            .includes(searPeriodeGrants.toLowerCase())
        );
      });
      setDataFiltered(data);
    }
  }, [searPeriodeGrants, periodelist]);

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
      title: "Supprimer periode",
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
        await dispatch(deletePeriode({ id }));
        fetchPeriode();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickEdit = async (id: any) => {
    router.push(`/grants/periode/${id}/edit`);
  };
  const groupedBudgets: { [key: string]: typeof periodelist } = {};

  dataFiltered.forEach((budget) => {
    const grantCode =
      grantEncoursList.find((grant) => grant.id == budget.grant)?.code || "";
    if (!groupedBudgets[grantCode]) {
      groupedBudgets[grantCode] = [];
    }
    groupedBudgets[grantCode].push(budget);
  });
  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        {validate("Suivi période", "C") && (
          <Stack direction="row" gap={2}>
            <Link href="/">
              <Button variant="text" color="info" startIcon={<ArrowBack />}>
                Retour
              </Button>
            </Link>
            <Link href="/grants/periode/add">
              <Button variant="contained" startIcon={<Add />}>
                Créer
              </Button>
            </Link>
          </Stack>
        )}
        <Typography variant="h4" color="GrayText">
          Période Grant
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
                    <TableCell>Grants</TableCell>
                    <TableCell>Périodes</TableCell>
                    <TableCell>Début</TableCell>
                    <TableCell>Fin</TableCell>
                    <TableCell>Montant</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(groupedBudgets).map((grantCode) => {
                    const budgets = groupedBudgets[grantCode];
                    return budgets
                      .filter((item) =>
                        `${item.periode} ${item.montant}`
                          .toLowerCase()
                          .includes(filtre.toLowerCase())
                      )
                      .map((budget, index) => (
                        <TableRow
                          key={`${grantCode}-${index}`}
                          sx={{ borderBottomColor: "black" }}
                        >
                          {index === 0 && (
                            <TableCell rowSpan={budgets.length}>
                              {grantCode}
                            </TableCell>
                          )}
                          <TableCell>{budget.periode}</TableCell>
                          <TableCell>
                            <Moment format="DD/MM/yyyy">{budget.debut}</Moment>
                          </TableCell>
                          <TableCell>
                            <Moment format="DD/MM/yyyy">{budget.fin}</Moment>
                          </TableCell>
                          <TableCell>
                            {formatMontant(Number(budget.montant))}
                          </TableCell>
                          <TableCell>
                            <BtnActionContainer direction="row" gap={1}>
                              {validate("Suivi période", "C") && (
                                <Link
                                  href={`/grants/budgetInitial/${budget.id}/add`}
                                >
                                  <Button
                                    variant="outlined"
                                    color="accent"
                                    startIcon={<Add />}
                                  >
                                    Budget initial
                                  </Button>
                                </Link>
                              )}
                              {validate("Suivi période", "U") && (
                                <IconButton
                                  color="primary"
                                  aria-label="Modifier"
                                  component="span"
                                  size="small"
                                  onClick={() => {
                                    handleClickEdit(budget.id);
                                  }}
                                >
                                  <Edit />
                                </IconButton>
                              )}
                              {validate("Suivi période", "D") && (
                                <IconButton
                                  color="warning"
                                  aria-label="Supprimer"
                                  component="span"
                                  onClick={() => handleClickDelete(budget.id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              )}
                            </BtnActionContainer>
                          </TableCell>
                          {index === 0 && (
                            <TableCell
                              align="left"
                              rowSpan={budgets.length}
                              width={"auto"}
                            >
                              <Link
                                href={`/grants/budgetInitial/${budget.grant}/list`}
                              >
                                <Button
                                  variant="outlined"
                                  color="accent"
                                  startIcon={<VisibilityIcon />}
                                >
                                  Budget initial list
                                </Button>
                              </Link>
                            </TableCell>
                          )}
                        </TableRow>
                      ));
                  })}
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

export default ListBudgetsInitial;

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
