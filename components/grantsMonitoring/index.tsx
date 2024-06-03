import {
  Button,
  Container,
  IconButton,
  Stack,
  styled,
  TableHead,
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
import { useRouter } from "next/router";
import Moment from "react-moment";
import formatMontant from "../../hooks/format";
import useFetchCurrency from "../GrantsEnCours/hooks/getCurrency";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useFetchGrants from "../GrantsEnCours/hooks/getGrants";
import useFetchProject from "../GrantsEnCours/hooks/getProject";
import useFetchEmploys from "../GrantsEnCours/hooks/getResponsable";
import { GrantEncoursItem } from "../../redux/features/grantEncours/grantEncours.interface";
import { Add } from "@mui/icons-material";

const GrantsList = () => {
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fetchGrants = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const fetchProject = useFetchProject();
  const { projectList } = useAppSelector((state) => state.project);
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state) => state.employe);
  const fetchCurrency = useFetchCurrency();
  const { currencylist } = useAppSelector((state) => state.currency);

  React.useEffect(() => {
    fetchGrants();
    fetchProject();
    fetchEmployes();
    fetchCurrency();
  }, [router.query]);

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

  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4" color="GrayText">
          GRANTS LIST
        </Typography>
        <Link href="/grants/grantMonitoring/grantMoni">
          <Button variant="contained">Deadline</Button>
        </Link>
      </SectionNavigation>
      <SectionTable sx={{ backgroundColor: "#fff" }}>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2, ml: 2 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{ minWidth: 200, maxWidth: 200 }}
                    >
                      Grant code
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ minWidth: 200, maxWidth: 200 }}
                    >
                      Bailleur
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ minWidth: 200, maxWidth: 200 }}
                    >
                      Project title
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ minWidth: 200, maxWidth: 200 }}
                    >
                      Titre du projet
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ minWidth: 200, maxWidth: 200 }}
                    >
                      Start
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ minWidth: 200, maxWidth: 200 }}
                    >
                      End
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ minWidth: 200, maxWidth: 200 }}
                    >
                      Amount
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ minWidth: 200, maxWidth: 200 }}
                    >
                      Currency
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ minWidth: 200, maxWidth: 200 }}
                    >
                      Statut
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ minWidth: 200, maxWidth: 200 }}
                    >
                      MV Lead
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ minWidth: 200, maxWidth: 200 }}
                    >
                      VALIDATION TECHNIQUE
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ minWidth: 200, maxWidth: 200 }}
                    >
                      VERIFICATION FINANCIERE
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ minWidth: 200, maxWidth: 200 }}
                    >
                      VALIDATION FINANCIERE
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ minWidth: 200, maxWidth: 200 }}
                    >
                      NOTES
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {grantEncoursList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: GrantEncoursItem, index: any) => {
                      // const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          //   onClick={(event) => handleClick(event, row.reference)}
                          role="checkbox"
                          // aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          // selected={isItemSelected}
                        >
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            align="center"
                            sx={{ minWidth: 200, maxWidth: 200 }}
                          >
                            {row.code}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ minWidth: 200, maxWidth: 200 }}
                          >
                            {row.bailleur}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ minWidth: 200, maxWidth: 200 }}
                          >
                            {
                              projectList.find(
                                (p: any) => p.id === row.projectId
                              )?.descriptionEn
                            }
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ minWidth: 200, maxWidth: 200 }}
                          >
                            {
                              projectList.find(
                                (p: any) => p.id === row.projectId
                              )?.descriptionFr
                            }
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ minWidth: 200, maxWidth: 200 }}
                          >
                            <Moment format="DD/MM/yyyy">{row.startDate}</Moment>
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ minWidth: 200, maxWidth: 200 }}
                          >
                            <Moment format="DD/MM/yyyy">{row.endDate}</Moment>
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ minWidth: 200, maxWidth: 200 }}
                          >
                            {formatMontant(Number(row.amount))}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ minWidth: 200, maxWidth: 200 }}
                          >
                            {
                              currencylist.find(
                                (f: any) => f.id === row.currencyId
                              )?.name
                            }
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ minWidth: 200, maxWidth: 200 }}
                          >
                            {row.status}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ minWidth: 200, maxWidth: 200 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            sx={{ minWidth: 200, maxWidth: 200 }}
                          >
                            {`${
                              employees.find(
                                (f: any) => f.id === row.techValidator
                              )?.name
                            } ${" "} ${
                              employees.find(
                                (f: any) => f.id === row.techValidator
                              )?.surname
                            }`}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ minWidth: 200, maxWidth: 200 }}
                          >
                            {`${
                              employees.find(
                                (f: any) => f.id === row.financeVerificator
                              )?.name
                            } ${" "} ${
                              employees.find(
                                (f: any) => f.id === row.financeVerificator
                              )?.surname
                            }`}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ minWidth: 200, maxWidth: 200 }}
                          >
                            {`${
                              employees.find(
                                (f: any) => f.id === row.financeValidator
                              )?.name
                            } ${" "} ${
                              employees.find(
                                (f: any) => f.id === row.financeValidator
                              )?.surname
                            }`}
                          </TableCell>

                          <TableCell
                            align="center"
                            sx={{ minWidth: 400, maxWidth: 400 }}
                          >
                            {row.note}
                          </TableCell>
                        </TableRow>
                      );
                    })}
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

export default GrantsList;

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
