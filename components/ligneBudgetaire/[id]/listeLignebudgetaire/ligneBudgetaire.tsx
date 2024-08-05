import {
  Button,
  Container,
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
import Data, { Order } from "../../table/type-variable";
// import { rows } from "./table/constante";
import EnhancedTableToolbar from "../../table/EnhancedTableToolbar";
import EnhancedTableHead from "../../table/EnhancedTableHead";
// import { getComparator, stableSort } from "./table/function";
import Add from "@mui/icons-material/Add";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../../../config/table.config";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import TransportEquipmentTableHeader from "../../organisme/table/TransportEquipmentTableHeader";
import { ArrowBack, Edit } from "@mui/icons-material";
import { useConfirm } from "material-ui-confirm";
import useFetchBudgetLine from "../../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchbudgetLine";
import useFetchGrants from "../../../GrantsEnCours/hooks/getGrants";
import { BudgetLineItem } from "../../../../redux/features/budgetLine/budgetLine.interface";
import { deleteBudgetLine } from "../../../../redux/features/budgetLine";
import { getOrganisation } from "../../../../redux/features/organisation";
import { getLineBudget } from "../../../../redux/features/lineBudget";
import { getType } from "../../../../redux/features/type";
import formatMontant from "../../../../hooks/format";

const ListBudgetLine = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("bailleur");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const router = useRouter();
  const { id }: any = router.query;
  const { budgetLineList } = useAppSelector((state: any) => state.budgetLine);
  const fetchBudgetLine = useFetchBudgetLine();
  const fetchGrants = useFetchGrants();
  const { grantEncoursList } = useAppSelector(
    (state: any) => state.grantEncours
  );
  const { organisationList } = useAppSelector(
    (state: any) => state.organisations
  );
  const { lineBudgetList } = useAppSelector((state: any) => state.lineBudget);
  const { typeList } = useAppSelector((state: any) => state.types);

  React.useEffect(() => {
    fetchGrants();
    fetchBudgetLine();
    dispatch(getOrganisation({}));
    dispatch(getLineBudget({}));
    dispatch(getType({}));
  }, [router.query]);

  const handleClickEdit = async (id: any) => {
    router.push(`/grants/ligneBudgetaire/${id}/edit`);
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - budgetLineList.length)
      : 0;
  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer ligne budgetaire",
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
        await dispatch(deleteBudgetLine({ id }));
        fetchBudgetLine();
      })
      .catch(() => {});
  };

  const [filtre, setFiltre] = React.useState("");
  const [dataFilter, setDataFilter] = React.useState<any[]>([]);
  React.useEffect(() => {
    if (filtre !== "") {
      const filteredData = budgetLineList.filter(
        (f: BudgetLineItem) =>
          f.grantId == id &&
          (f.code!.toString().toLowerCase().includes(filtre.toLowerCase()) ||
            f.amount!.toString().toLowerCase().includes(filtre.toLowerCase()))
      );
      setDataFilter([...filteredData].reverse());
    } else {
      setDataFilter(
        [...budgetLineList.filter((e: any) => e.grantId == id)].reverse()
      );
    }
  }, [filtre, budgetLineList]);
  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Stack direction="row" alignItems="left" gap={1}>
          <Link href={`/grants/grantsEnCours`}>
            <Button variant="text" startIcon={<ArrowBack />} color="info">
              Retour
            </Button>
          </Link>
          <Link href={`/grants/ligneBudgetaire/${id}/add`}>
            <Button variant="contained" startIcon={<Add />}>
              Créer
            </Button>
          </Link>
        </Stack>
      </SectionNavigation>
      <SectionTable sx={{ backgroundColor: "#fff" }}>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2, ml: 4 }}>
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
                <TransportEquipmentTableHeader />
                <TableBody>
                  {dataFilter
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: BudgetLineItem, index: any) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          //   onClick={(event) => handleClick(event, row.reference)}
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          <TableCell padding="checkbox" sx={{ width: "auto" }}>
                            {row.code}
                          </TableCell>
                          <TableCell align="left">
                            {
                              grantEncoursList.find(
                                (e: any) => e.id === row.grantId
                              )?.code
                            }
                          </TableCell>

                          <TableCell align="left">
                            {
                              lineBudgetList.find(
                                (e: any) => e.id === row.configBudgetLineId
                              )?.name
                            }
                          </TableCell>
                          <TableCell align="left">
                            {
                              typeList.find(
                                (e: any) => e.id === row.budgetTypeId
                              )?.name
                            }
                          </TableCell>
                          <TableCell align="left">
                            {
                              organisationList.find(
                                (e: any) => e.id === row.configOrganisationId
                              )?.name
                            }
                          </TableCell>
                          <TableCell align="left">
                            {formatMontant(Number(row.amount))}
                          </TableCell>
                          {/* <TableCell align="left">
                            <BtnActionContainer
                              direction="row"
                              justifyContent="left"
                            >
                              <IconButton
                                  color="primary"
                                  aria-label="Modifier"
                                  component="span"
                                  size="small"
                                  onClick={() => {
                                    handleClickEdit(row.id);
                                  }}
                                >
                                  <Edit />
                                  </IconButton>
                              <IconButton
                                color="warning"
                                aria-label="Supprimer"
                                component="span"
                                onClick={() =>handleClickDelete(row.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </BtnActionContainer>
                          </TableCell> */}
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
              count={grantEncoursList.length}
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

export default ListBudgetLine;

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
