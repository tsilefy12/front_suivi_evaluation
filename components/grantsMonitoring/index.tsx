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
import { Add, Download } from "@mui/icons-material";
import { EmployeFormItem } from "../../redux/features/employe/employeSlice.interface";
import { CurrencyItem } from "../../redux/features/currency/currencyinterface";
import { PeriodeItem } from "../../redux/features/periode/periode.interface";
import * as XLSX from "xlsx";
import { format } from "date-fns";

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
  const { currencyListe } = useAppSelector((state: any) => state.currency);

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
  const handleExportExcel = () => {
    const data = grantEncoursList.map((row: GrantEncoursItem) => ({
      "Grant code": row.code,
      Bailleur: row.bailleur,
      "Project title": projectList.find(
        (p: PeriodeItem) => p.id === row.projectId
      )?.descriptionEn,
      "Titre du projet": projectList.find(
        (p: PeriodeItem) => p.id === row.projectId
      )?.descriptionFr,
      Start: format(new Date(row.startDate as string), "dd/MM/yyyy"),
      End: format(new Date(row.endDate as string), "dd/MM/yyyy"),
      Amount: row.amount,
      Currency: currencyListe.find((f: CurrencyItem) => f.id === row.currencyId)
        ?.name,
      Statut: row.status,
      "MV Lead": "",
      "VALIDATION TECHNIQUE": `${
        employees.find((f: any) => f.id === row.techValidator)?.name
      } ${employees.find((f) => f.id === row.techValidator)?.surname}`,
      "VERIFICATION FINANCIERE": `${
        employees.find((f: any) => f.id === row.financeVerificator)?.name
      } ${employees.find((f) => f.id === row.financeVerificator)?.surname}`,
      "VALIDATION FINANCIERE": `${
        employees.find((f: any) => f.id === row.financeValidator)?.name
      } ${employees.find((f) => f.id === row.financeValidator)?.surname}`,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wscols = [
      { wpx: 80 }, // deadline
      { wpx: 80 }, // Grant code
      { wpx: 80 }, // Bailleur
      { wpx: 80 }, // Project title
      { wpx: 80 }, // Titre du projet
      { wpx: 80 }, // Start
      { wpx: 80 }, // End
      { wpx: 80 }, // Amount
      { wpx: 80 }, // Currency
      { wpx: 80 }, // Statut
      { wpx: 150 }, // VALIDATION TECHNIQUE
      { wpx: 150 }, // VERIFICATION FINANCIERE
      { wpx: 150 }, // VALIDATION FINANCIERE
    ];
    ws["!cols"] = wscols;

    // Centrer le texte pour chaque cellule
    Object.keys(ws).forEach((key) => {
      if (key[0] !== "!") {
        ws[key].s = {
          alignment: {
            vertical: "center",
            horizontal: "center",
          },
        };
      }
    });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "GrantsList");

    XLSX.writeFile(wb, "GrantsList.xlsx");
  };
  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4" color="GrayText">
          Grant monitoring
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Download />}
          onClick={handleExportExcel}
        >
          Excel
        </Button>
      </SectionNavigation>
      <SectionTable sx={{ backgroundColor: "#fff" }}>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2, position: "flex", left: 0 }}>
            <TableContainer
              sx={{
                width: "100%",
                minHeight: "100%",
                maxHeight: "100%",
                paddingBottom: 4,
                overflow: "auto",
              }}
            >
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ width: "100%" }}>
                      Deadline
                    </TableCell>
                    <TableCell align="center" sx={{ width: "100%" }}>
                      Grant
                    </TableCell>
                    <TableCell align="center" sx={{ width: "100%" }}>
                      Bailleur
                    </TableCell>
                    <TableCell align="center" sx={{ width: "100%" }}>
                      Project title
                    </TableCell>
                    <TableCell align="center" sx={{ width: "100%" }}>
                      Titre du projet
                    </TableCell>
                    <TableCell align="center" sx={{ width: "100%" }}>
                      Début
                    </TableCell>
                    <TableCell align="center" sx={{ width: "100%" }}>
                      Fin
                    </TableCell>
                    <TableCell align="center" sx={{ width: "100%" }}>
                      Montant
                    </TableCell>
                    <TableCell align="center" sx={{ width: "100%" }}>
                      Devise
                    </TableCell>
                    <TableCell align="center" sx={{ width: "100%" }}>
                      Statut
                    </TableCell>
                    <TableCell align="center" sx={{ width: "100%" }}>
                      MV Lead
                    </TableCell>
                    <TableCell align="center" sx={{ width: "100%" }}>
                      VALIDATION TECHNIQUE
                    </TableCell>
                    <TableCell align="center" sx={{ width: "100%" }}>
                      VERIFICATION FINANCIERE
                    </TableCell>
                    <TableCell align="center" sx={{ width: "100%" }}>
                      VALIDATION FINANCIERE
                    </TableCell>
                    {/* <TableCell
                      align="center"
                 sx={{ width:  "100%" }}
                    >
                      NOTES
                    </TableCell> */}
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
                          <TableCell align="center" sx={{ width: "100%" }}>
                            <Link
                              href={`/grants/grantMonitoring/${row.id}/grantMoni`}
                            >
                              <Button
                                variant="outlined"
                                color="accent"
                                sx={{
                                  "&:hover": {
                                    backgroundColor: "info.main",
                                    color: "white",
                                  },
                                }}
                              >
                                Deadline
                              </Button>
                            </Link>
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            align="center"
                            sx={{ width: "100%" }}
                          >
                            {row.code}
                          </TableCell>
                          <TableCell align="center" sx={{ width: "100%" }}>
                            {row.bailleur}
                          </TableCell>
                          <TableCell align="center" sx={{ width: "100%" }}>
                            {
                              projectList.find(
                                (p: any) => p.id === row.projectId
                              )?.descriptionEn
                            }
                          </TableCell>
                          <TableCell align="center" sx={{ width: "100%" }}>
                            {
                              projectList.find(
                                (p: any) => p.id === row.projectId
                              )?.descriptionFr
                            }
                          </TableCell>
                          <TableCell align="center" sx={{ width: "100%" }}>
                            <Moment format="DD/MM/yyyy">{row.startDate}</Moment>
                          </TableCell>
                          <TableCell align="center" sx={{ width: "100%" }}>
                            <Moment format="DD/MM/yyyy">{row.endDate}</Moment>
                          </TableCell>
                          <TableCell align="center" sx={{ width: "100%" }}>
                            {formatMontant(Number(row.amount))}
                          </TableCell>
                          <TableCell align="center" sx={{ width: "100%" }}>
                            {
                              currencyListe.find(
                                (f: any) => f.id === row.currencyId
                              )?.name
                            }
                          </TableCell>
                          <TableCell align="center" sx={{ width: "100%" }}>
                            {(row.status === "IN_PROGRESS" && "En cours") ||
                              (row.status === "COMPLETED" && "Terminé") ||
                              (row.status === "" && "Annulé") ||
                              (row.status === "PENDING" && "En attente")}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ width: "100%" }}
                          ></TableCell>
                          <TableCell align="center" sx={{ width: "100%" }}>
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
                          <TableCell align="center" sx={{ width: "100%" }}>
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
                          <TableCell align="center" sx={{ width: "100%" }}>
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

                          {/* <TableCell
                            align="center"
                            sx={{ minWidth: 400, maxWidth: 400 }}
                          >
                            {row.note}
                          </TableCell> */}
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
