import { Button, Container, IconButton, Stack, styled, Typography } from "@mui/material";
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
// import { rows } from "./table/constante";
import EnhancedTableToolbar from "./table/EnhancedTableToolbar";
import EnhancedTableHead from "./table/EnhancedTableHead";
// import { getComparator, stableSort } from "./table/function";
import Add from "@mui/icons-material/Add";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../config/table.config";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GrantEncoursItem } from "../../redux/features/grantEncours/grantEncours.interface";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useFetchGrants from "./hooks/getGrants";
import { useRouter } from "next/router";
import TransportEquipmentTableHeader from "./organisme/table/TransportEquipmentTableHeader";
import useFetchProject from "./hooks/getProject";
import useFetchEmploys from "./hooks/getResponsable";
import { Edit } from "@mui/icons-material";
import { useConfirm } from "material-ui-confirm";
import { deletePostAnalytic } from "../../redux/features/postAnalytique";
import { deleteGrantEncours } from "../../redux/features/grantEncours";

const ListGrantsEnCours = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("bailleur");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const router = useRouter();
  const fetchGrants = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state: any) => state.grantEncours)
  const fetchProject = useFetchProject();
  const { projectList } = useAppSelector((state: any) => state.project)
  React.useEffect(() => {
    fetchGrants();
    fetchProject();
  }, [router.query])

  const handleClickEdit = async (id: any) => {
    router.push(`/grants/grantsEnCours/${id}/edit`);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  console.log("list :", grantEncoursList)
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - grantEncoursList.length) : 0;
  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer le grant",
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
        await dispatch(deleteGrantEncours({ id }));
        fetchGrants();
      })
      .catch(() => { });
  };
  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Link href="/grants/grantsEnCours/add">
          <Button variant="contained" startIcon={<Add />}>
            Créer
          </Button>
        </Link>
        <Typography variant="h5" color="GrayText">
          GRANTS en Cours
        </Typography>
      </SectionNavigation>
      <SectionTable sx={{ backgroundColor: '#fff' }}>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <TransportEquipmentTableHeader />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                  {grantEncoursList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: GrantEncoursItem, index: any) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          //   onClick={(event) => handleClick(event, row.reference)}
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          <TableCell
                            padding="checkbox"
                          >
                            {row.code}
                          </TableCell>
                          <TableCell align="left">{row.bailleur}</TableCell>
                          <TableCell align="left">
                            {projectList.find((e: any) => e.id === row?.projectId)?.titleFr}
                          </TableCell>
                          <TableCell align="left">
                            {projectList.find((e: any) => e.id === row?.projectId)?.titleEn}
                          </TableCell>
                          <TableCell align="right">
                            <BtnActionContainer
                              direction="row"
                              justifyContent="right"
                            >
                              <Link href={`/grants/ligneBudgetaire/${row.id}/add`}>
                                <Button variant="contained" startIcon={<Add />}>
                                  Ajouter ligne budgetaire
                                </Button>
                              </Link>
                              <Link href={`/grants/grantsEnCours/${row.id}/detail`}>
                                <IconButton
                                  color="accent"
                                  aria-label="Details"
                                  component="span"
                                >
                                  <VisibilityIcon />
                                </IconButton>
                              </Link>
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

export default ListGrantsEnCours;

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
