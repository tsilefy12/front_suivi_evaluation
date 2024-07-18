import { Add, ArrowBack } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Container,
  FormControl,
  IconButton,
  Stack,
  styled,
  TableHead,
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
import { usePermitted } from "../../../../config/middleware";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../../../config/table.config";
import formatMontant from "../../../../hooks/format";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { deleteBudgetInitial } from "../../../../redux/features/budgetInitial";
import useFetchGrants from "../../../GrantsEnCours/hooks/getGrants";
import useFetchPeriode from "../../../periode/hooks/useFetchPeriode";
import useFetchBudgetLine from "../../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchbudgetLine";
import useFetchBudgetInitial from "../../hooks/useFetchBudgetInitial";
import { rows } from "../../table/constante";
import EnhancedTableToolbar from "../../table/EnhancedTableToolbar";
import Data, { Order } from "../../table/type-variable";
import { BudgetInitialItem } from "../../../../redux/features/budgetInitial/budgetInitial.interface";
import AddNewBudgetInitial from "../../add/AddNewBudgetInitial";

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
  const { idEdit } = router.query;
  const dispatch = useAppDispatch();
  const fetchGrant = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const fetchligneBudgetaire = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector((state) => state.budgetLine);
  const confirm = useConfirm();
  const fetchPeriode = useFetchPeriode();
  const { periodelist } = useAppSelector((state) => state.periode);
  const validate = usePermitted();

  React.useEffect(() => {
    fetchBudgetInitial();
    fetchGrant();
    fetchligneBudgetaire();
    fetchPeriode();
  }, []);

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
  const handleClickEdit = async (id: any, budgetId: any, idLigneBudg: any) => {
    router.push(`/grants/budgetInitial/${budgetId}/${id}/${idLigneBudg}/edit`);
  };
  const [filtre, setFiltre] = React.useState("");
  const [dataFiltered, setDataFiltered] = React.useState<any[]>([]);

  useEffect(() => {
    if (filtre == "") {
      return setDataFiltered(
        budgetInitialList.filter((p: any) => p.grant == idEdit)
      );
    } else {
      const data = budgetInitialList.filter((p: any) => {
        return (
          p.periodes?.periode!.toLowerCase().includes(filtre.toLowerCase()) ||
          p
            .grantsMonitorings!.map((g: any) => g.montant)
            .toString()
            .toLowerCase()
            .includes(filtre.toLowerCase()) ||
          p
            .grantsMonitorings!.map((g: any) => {
              budgetLineList.find((b: any) => b.id == g.ligneBudgetaire)?.code;
            })
            .toString()
            .toLowerCase()
            .includes(filtre.toLowerCase())
        );
      });
      return setDataFiltered(data);
    }
  }, [filtre, budgetInitialList]);

  const groupedBudgets: { [key: string]: typeof budgetInitialList } = {};

  dataFiltered
    .filter((f: any) => f.grant == idEdit)
    .forEach((budget) => {
      const grantCode =
        grantEncoursList.find((grant) => grant.id == budget.grant)?.code || "";
      if (!groupedBudgets[grantCode]) {
        groupedBudgets[grantCode] = [];
      }
      groupedBudgets[grantCode].push(budget);
    });
  return (
    <Container maxWidth="xl">
      <SectionNavigation
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="space-between"
      >
        <Stack flexDirection={"row"}>
          <Link href="/grants/periode">
            <Button variant="text" color="info" startIcon={<ArrowBack />}>
              Retour
            </Button>
          </Link>
        </Stack>
        <Typography variant="h4" color="GrayText">
          Budget initial
        </Typography>
      </SectionNavigation>
      <SectionTable
        sx={{
          backgroundColor: "#fff",
          height: "calc(100vh - 230px)",
          overflow: "auto",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%" }}>
            <EnhancedTableToolbar
              numSelected={selected.length}
              filtre={filtre}
              setFiltre={setFiltre}
            />
            <TableContainer>
              <Table
                sx={{
                  minWidth: "100%",
                  maxWidth: "100%",
                }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Grants</TableCell>
                    <TableCell>Périodes</TableCell>
                    <TableCell>Ligne budgetaire</TableCell>
                    <TableCell>Montant</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(groupedBudgets).map((grantCode) => {
                    const budgets = groupedBudgets[grantCode];
                    return budgets.map((budget, index) => (
                      <TableRow
                        key={`${grantCode}-${index}`}
                        sx={{ borderBottomColor: "black" }}
                      >
                        {index === 0 && (
                          <TableCell rowSpan={budgets.length}>
                            {grantCode}
                          </TableCell>
                        )}

                        <TableCell sx={{ width: "300px" }} align="left">
                          {
                            periodelist.find((p) => p.id == budget?.periodeId)
                              ?.periode
                          }
                        </TableCell>
                        <TableCell align="left">
                          <FormControl>
                            <Stack direction="column" spacing={2}>
                              {budget.grantsMonitorings?.map((lb) => (
                                <Box key={lb.id}>
                                  {
                                    budgetLineList.find(
                                      (b) => b.id == lb.ligneBudgetaire
                                    )?.code
                                  }
                                </Box>
                              ))}
                            </Stack>
                          </FormControl>
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ height: "2vh", overflow: "auto" }}
                        >
                          <Stack direction="column" spacing={2}>
                            {budget.grantsMonitorings?.map((lb) => (
                              <Box key={lb.id}>
                                {formatMontant(Number(lb.montant))}
                              </Box>
                            ))}
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          <Stack direction="column" spacing={2}>
                            {budget.grantsMonitorings?.map((lb) => (
                              <BtnActionContainer
                                direction="row"
                                justifyContent="left"
                                key={lb.id}
                              >
                                {validate("Suivi période", "U") && (
                                  <IconButton
                                    color="primary"
                                    aria-label="Modifier"
                                    component="span"
                                    onClick={() =>
                                      handleClickEdit(
                                        budget.id,
                                        budget.grant,
                                        lb.id!
                                      )
                                    }
                                  >
                                    <EditIcon />
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
                            ))}
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ));
                  })}
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
