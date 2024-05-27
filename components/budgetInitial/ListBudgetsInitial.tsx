import {
  Button,
  Container,
  FormControl,
  IconButton,
  MenuItem,
  Stack,
  styled,
  TextField,
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
} from "../../config/table.config";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Visibility from "@mui/icons-material/Visibility";
import useFetchBudgetInitial from "./hooks/useFetchBudgetInitial";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useRouter } from "next/router";
import useFetchGrants from "../GrantsEnCours/hooks/getGrants";
import useFetchBudgetLine from "../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchbudgetLine";
import { BudgetInitialItem } from "../../redux/features/budgetInitial/budgetInitial.interface";
import { useConfirm } from "material-ui-confirm";
import { deleteBudgetInitial } from "../../redux/features/budgetInitial";
import useFetchPeriode from "../periode/hooks/useFetchPeriode";
import formatMontant from "../../hooks/format";

const ListBudgetInitial = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("grant");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const fetchBudgetInitial = useFetchBudgetInitial();
  const { budgetInitialList } = useAppSelector((state) => state.budgetInitial);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fetchGrant = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const fetchligneBudgetaire = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector((state) => state.budgetLine);
  const confirm = useConfirm();
  const fetchPeriode = useFetchPeriode();
  const { periodelist } = useAppSelector((state) => state.periode);

  React.useEffect(() => {
    fetchBudgetInitial();
    fetchGrant();
    fetchligneBudgetaire();
    fetchPeriode();
  }, [router.query]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const listBL: { id: string }[] = [];
  const budgetLineSet = new Set<string>();
  budgetInitialList.forEach((e: any) => {
    e.ligneBudgetaire.forEach((ep: any) => {
      budgetLineSet.add(ep);
    });
  });

  budgetLineSet.forEach((id) => {
    listBL.push({ id });
  });

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
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - budgetInitialList.length)
      : 0;

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer budget initial",
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
        await dispatch(deleteBudgetInitial({ id }));
        fetchBudgetInitial();
      })
      .catch(() => {});
  };

  const handleClickEdit = async (id: any) => {
    router.push(`/grants/budgetInitial/${id}/edit`);
  };
  // console.log("ligne :", budgetInitialList)
  return (
    <Container maxWidth="xl">
      <SectionNavigation
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Stack flexDirection={"row"}>
          {/* <Link href="/grants/budgetInitial/add">
            <Button variant="contained" startIcon={<Add />}>
              Créer
            </Button>
          </Link> */}
        </Stack>
        <Typography variant="h4" color="GrayText">
          Budget initial
        </Typography>
      </SectionNavigation>
      <SectionTable sx={{ backgroundColor: "#fff" }}>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 700 }}
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
                  {budgetInitialList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: BudgetInitialItem, index: any) => {
                      // const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${row.id}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id!}
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
                                (e: any) => e.id === row?.grant
                              )?.code
                            }
                          </TableCell>
                          <TableCell sx={{ width: "300px" }} align="center">
                            {
                              periodelist.find((p) => p.id == row?.periodeId)
                                ?.periode
                            }
                          </TableCell>
                          <TableCell
                            sx={{
                              height: "10vh",
                              overflow: "auto",
                              // width: "300px",
                            }}
                            align="center"
                          >
                            <FormControl
                              sx={{
                                height:
                                  row.ligneBudgetaire!.length <= 2
                                    ? "auto"
                                    : 70,
                                overflow: "auto",
                              }}
                            >
                              {row.ligneBudgetaire?.map((lb) => {
                                return (
                                  <Stack
                                    direction="column"
                                    spacing={2}
                                    key={index}
                                  >
                                    {
                                      budgetLineList.find(
                                        (b: any) => b.id == lb
                                      )?.code
                                    }
                                  </Stack>
                                );
                              })}
                            </FormControl>
                          </TableCell>
                          <TableCell align="center">
                            {row.ligneBudgetaire?.map((lb) => {
                              return (
                                <Stack
                                  direction="column"
                                  spacing={2}
                                  key={index}
                                >
                                  {formatMontant(
                                    Number(
                                      budgetLineList.find(
                                        (b: any) => b.id == lb
                                      )?.amount
                                    )
                                  )}
                                </Stack>
                              );
                            })}
                          </TableCell>
                          <TableCell align="center">
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={budgetInitialList.length}
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

export default ListBudgetInitial;

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));
