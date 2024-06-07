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
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../../../config/table.config";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import useFetchGrants from "../../../GrantsEnCours/hooks/getGrants";
import { GrantEncoursItem } from "../../../../redux/features/grantEncours/grantEncours.interface";
import useFetchProject from "../../../GrantsEnCours/hooks/getProject";
import Moment from "react-moment";
import TransportEquipmentTableHeader from "../../organisme/table/TransportEquipmentTableHeader";
import useFetchEmploys from "../../../GrantsEnCours/hooks/getResponsable";
import { ArrowBack, Backpack, Download } from "@mui/icons-material";
import useFetchPeriode from "../../../periode/hooks/useFetchPeriode";
import { PeriodeItem } from "../../../../redux/features/periode/periode.interface";
import * as XLSX from "xlsx";
import { format } from "date-fns";

const ListGrantsMonitoring = () => {
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const fetchGrants = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const fetchProject = useFetchProject();
  const { projectList } = useAppSelector((state) => state.project);
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state) => state.employe);
  const fetchPeriode = useFetchPeriode();
  const { periodelist } = useAppSelector((state) => state.periode);

  React.useEffect(() => {
    fetchGrants();
    fetchProject();
    fetchEmployes();
    fetchPeriode();
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
  const groupedBudgets: { [key: string]: typeof periodelist } = {};

  periodelist
    .filter((g: PeriodeItem) => g.grant == id)
    .forEach((budget) => {
      const grantCode =
        grantEncoursList.find((grant) => grant.id == budget.grant)?.code || "";
      if (!groupedBudgets[grantCode]) {
        groupedBudgets[grantCode] = [];
      }
      groupedBudgets[grantCode].push(budget);
    });
  const exportToExcel = () => {
    const dataToExport = Object.keys(groupedBudgets).flatMap((grantCode) => {
      return groupedBudgets[grantCode].map((row: PeriodeItem) => {
        const projectId = grantEncoursList.find(
          (f: GrantEncoursItem) => f.id == id
        )?.projectId;
        const projectTitle = projectList.find(
          (p: any) => p.id == projectId
        )?.title;
        const employeeId = grantEncoursList.find(
          (f: GrantEncoursItem) => f.id == id
        )?.responsable;
        const employee = employees.find((e: any) => e.id == employeeId);
        const employeeName = `${employee?.name ?? ""} ${
          employee?.surname ?? ""
        }`;

        return {
          "Grant code": grantCode,
          "Project Title": projectTitle,
          Deadline: format(new Date(row.deadline as Date), "dd/MM/yyyy"),
          "Période start": format(new Date(row.debut as Date), "dd/MM/yyyy"),
          "Période end": format(new Date(row.fin as Date), "dd/MM/yyyy"),
          "Technical submitted": format(
            new Date(row.dateTechnic as Date),
            "dd/MM/yyyy"
          ),
          "Financial submitted": format(
            new Date(row.dateFinance as Date),
            "dd/MM/yyyy"
          ),
          "Technical delay":
            (new Date(row.dateTechnic as Date).getTime() -
              new Date(row.deadline as Date).getTime()) /
            (24 * 60 * 60 * 1000),
          "Finance delay":
            (new Date(row.dateFinance as Date).getTime() -
              new Date(row.deadline as Date).getTime()) /
            (24 * 60 * 60 * 1000),
          Responsable: employeeName,
          Notes: row.notes,
          "Days left": Math.ceil(
            (new Date().getTime() - new Date(row.deadline as Date).getTime()) /
              (24 * 60 * 60 * 1000)
          ),
          Year: new Date(row.deadline as Date).getFullYear(),
        };
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const wscols = [
      { wpx: 100 }, // code
      { wpx: 200 }, // project title
      { wpx: 100 }, // deadline
      { wpx: 100 }, // debut
      { wpx: 100 }, // fin
      { wpx: 100 }, // date tech
      { wpx: 100 }, // date finance
      { wpx: 60 }, // tech delay
      { wpx: 30 }, // finance delay
      { wpx: 150 }, // responsable
      { wpx: 200 }, // notes
      { wpx: 100 }, // days lest
      { wpx: 30 }, // year
    ];
    worksheet["!cols"] = wscols;
    // Centrer le texte pour chaque cellule
    Object.keys(worksheet).forEach((key) => {
      if (key[0] !== "!") {
        worksheet[key].s = {
          alignment: {
            vertical: "center",
            horizontal: "center",
          },
        };
      }
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Deadine");
    XLSX.writeFile(workbook, "Grants_Monitoring.xlsx");
  };
  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Stack direction={"row"} gap={2}>
          <Link href="/grants/grantMonitoring">
            <Button color="info" startIcon={<ArrowBack />}>
              Retour
            </Button>
          </Link>
          <Typography variant="h4" color="GrayText">
            DEADLINE LIST
          </Typography>
        </Stack>
        <Button
          onClick={exportToExcel}
          color="primary"
          variant="contained"
          startIcon={<Download />}
        >
          Excel
        </Button>
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
                <TransportEquipmentTableHeader />
                <TableBody>
                  {Object.keys(groupedBudgets).map((grantCode) => {
                    const budgets = groupedBudgets[grantCode];
                    return budgets.map((row: PeriodeItem, index: any) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {index === 0 && (
                          <TableCell
                            rowSpan={budgets.length}
                            align="center"
                            sx={{ minWidth: 200, maxWidth: 200 }}
                          >
                            {grantCode}
                          </TableCell>
                        )}
                        <TableCell
                          align="center"
                          sx={{ minWidth: 200, maxWidth: 200 }}
                        >
                          {(() => {
                            const projectId = grantEncoursList.find(
                              (f: GrantEncoursItem) => f.id == id
                            )?.projectId;
                            return projectList.find(
                              (p: any) => p.id == projectId
                            )?.title;
                          })()}
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ minWidth: 50, maxWidth: 50 }}
                        >
                          <Moment format="DD/MM/yyyy">{row.deadline}</Moment>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ minWidth: 150, maxWidth: 150 }}
                        >
                          <Moment format="DD/MM/yyyy">{row.debut}</Moment>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ minWidth: 150, maxWidth: 150 }}
                        >
                          <Moment format="DD/MM/yyyy">{row.fin}</Moment>
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ minWidth: 50, maxWidth: 50 }}
                        >
                          <Moment format="DD/MM/yyyy">{row.dateTechnic}</Moment>
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ minWidth: 50, maxWidth: 50 }}
                        >
                          <Moment format="DD/MM/yyyy">{row.dateFinance}</Moment>
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ minWidth: 50, maxWidth: 50 }}
                        >
                          {(new Date(row.dateTechnic as Date).getTime() -
                            new Date(row.deadline as Date).getTime()) /
                            (24 * 60 * 60 * 1000)}
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ minWidth: 50, maxWidth: 50 }}
                        >
                          {(new Date(row.dateFinance as Date).getTime() -
                            new Date(row.deadline as Date).getTime()) /
                            (24 * 60 * 60 * 1000)}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ minWidth: 200, maxWidth: 200 }}
                        >
                          {(() => {
                            const employeeId = grantEncoursList.find(
                              (f: GrantEncoursItem) => f.id == id
                            )?.responsable;
                            const employee = employees.find(
                              (e: any) => e.id == employeeId
                            );
                            return `${employee?.name ?? ""} ${
                              employee?.surname ?? ""
                            }`;
                          })()}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ minWidth: 300, maxWidth: 300 }}
                        >
                          {row.notes}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ minWidth: 150, maxWidth: 150 }}
                        >
                          {Math.ceil(
                            (new Date().getTime() -
                              new Date(row.deadline as Date).getTime()) /
                              (24 * 60 * 60 * 1000)
                          )}
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ minWidth: 50, maxWidth: 50 }}
                        >
                          {new Date(
                            periodelist.find(
                              (p: PeriodeItem) => p.grant == id
                            )?.deadline!
                          ).getFullYear()}
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

export default ListGrantsMonitoring;

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
