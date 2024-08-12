import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  styled,
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
import Link from "next/link";
import React, { useEffect } from "react";
import Data, { Order } from "./table/type-variable";
import EnhancedTableToolbar from "./table/EnhancedTableToolbar";
import { Edit, Search } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/router";
import { usePermitted } from "../../config/middleware";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../config/table.config";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { deleteGrantEncours } from "../../redux/features/grantEncours";
import { GrantEncoursItem } from "../../redux/features/grantEncours/grantEncours.interface";
import useFetchEmployes from "../home/Missions/hooks/useFetchEmployees";
import useFetchReliquatGrant from "../reliquetGrant/hooks/useFetchEliquatGrant";
import useFetchGrants from "./hooks/getGrants";
import useFetchProject from "./hooks/getProject";
import TransportEquipmentTableHeader from "./organisme/table/TransportEquipmentTableHeader";
import { fi } from "date-fns/locale";
import { ReliquatGrantsItem } from "../../redux/features/reliquatGrants/reliquatGrants.interface";

const ListGrantsEnCours = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("bailleur");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filtre, setFiltre] = React.useState("");

  const router = useRouter();
  const fetchGrants = useFetchGrants();
  const { grantEncoursList } = useAppSelector(
    (state: any) => state.grantEncours
  );
  const fetchProject = useFetchProject();
  const { projectList } = useAppSelector((state: any) => state.project);
  const fetchtReliquatGrant = useFetchReliquatGrant();
  const { reliquatGrantList } = useAppSelector(
    (state: any) => state.reliquatGrant
  );
  const fetchEpmloyes = useFetchEmployes();
  const { employees } = useAppSelector((state: any) => state.employe);
  async function fetchData() {
    await fetchProject();
    await fetchEpmloyes();
    await fetchtReliquatGrant();
    await fetchGrants();
  }
  React.useEffect(() => {
    fetchData();
  }, []);
  const validate = usePermitted();

  const handleClickEdit = async (id: any) => {
    router.push(`/grants/grantsEnCours/${id}/edit`);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  // console.log("list :", grantEncoursList);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [dataGrant, setDataGrant] = React.useState<any[]>([]);
  useEffect(() => {
    if (filtre === "") {
      return setDataGrant(
        [...grantEncoursList.filter((f: any) => f.type == null)].reverse()
      );
    } else {
      const filteredData = grantEncoursList.filter((item: any) => {
        return (
          (item.type == null &&
            item.code.toLowerCase().includes(filtre.toLowerCase())) ||
          item.bailleur.toLowerCase().includes(filtre.toLowerCase()) ||
          item.amountMGA.toString().toLowerCase().includes(filtre.toLowerCase())
        );
      });
      return setDataGrant([...filteredData].reverse());
    }
  }, [filtre, grantEncoursList, reliquatGrantList]);
  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            grantEncoursList.filter((f: GrantEncoursItem) => f.type == null)
              .length
        )
      : 0;
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
      .catch(() => {});
  };

  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        {validate("Suivi grant en cours", "C") && (
          <Link href="/grants/grantsEnCours/add">
            <Button variant="contained" startIcon={<Add />}>
              Créer
            </Button>
          </Link>
        )}
        <Typography variant="h5" color="GrayText">
          Grant de mise en oeuvre
        </Typography>
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
                  {dataGrant
                    .filter(
                      (item) =>
                        !reliquatGrantList.some((rg: any) =>
                          item.id.toString().includes(rg.grant.toString())
                        )
                    )
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
                          <TableCell padding="checkbox" sx={{ width: "100px" }}>
                            {row.code}
                          </TableCell>
                          <TableCell align="left">
                            {
                              employees.find(
                                (e: any) => e.id === row.techValidator
                              )?.name
                            }{" "}
                            {
                              employees.find(
                                (e: any) => e.id === row.techValidator
                              )?.surname
                            }
                          </TableCell>
                          <TableCell align="left">
                            {
                              employees.find(
                                (e: any) => e.id === row.financeVerificator
                              )?.name
                            }{" "}
                            {
                              employees.find(
                                (e: any) => e.id === row.financeVerificator
                              )?.surname
                            }
                          </TableCell>
                          <TableCell align="left">
                            {
                              employees.find(
                                (e: any) => e.id === row.financeValidator
                              )?.name
                            }{" "}
                            {
                              employees.find(
                                (e: any) => e.id === row.financeValidator
                              )?.surname
                            }
                          </TableCell>
                          <TableCell align="left">{row.bailleur}</TableCell>
                          <TableCell
                            align="right"
                            sx={{ minWidth: 400, maxWidth: 400 }}
                          >
                            <BtnActionContainer
                              direction="row"
                              justifyContent="right"
                              gap={1}
                            >
                              <Link
                                href={`/grants/ligneBudgetaire/${row.id}/listeLignebudgetaire`}
                              >
                                <Button
                                  variant="outlined"
                                  color="accent"
                                  startIcon={<Add />}
                                >
                                  L. Budg
                                </Button>
                              </Link>
                              {validate("Suivi reliquat grant", "C") && (
                                <Link
                                  href={`/grants/reliquatGrants/${row.id}/add`}
                                >
                                  <Button
                                    variant="outlined"
                                    color="accent"
                                    startIcon={<Add />}
                                  >
                                    Reliquat
                                  </Button>
                                </Link>
                              )}
                              <Link
                                href={`/grants/grantsEnCours/${row.id}/detail`}
                              >
                                <IconButton
                                  color="accent"
                                  aria-label="Details"
                                  component="span"
                                >
                                  <VisibilityIcon />
                                </IconButton>
                              </Link>
                              {validate("Suivi grant en cours", "U") && (
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
                              )}
                              {validate("Suivi grant en cours", "D") && (
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
