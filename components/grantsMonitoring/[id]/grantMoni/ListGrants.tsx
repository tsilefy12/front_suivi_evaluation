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
import { ArrowBack, Backpack } from "@mui/icons-material";
import useFetchPeriode from "../../../periode/hooks/useFetchPeriode";
import { PeriodeItem } from "../../../../redux/features/periode/periode.interface";

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
  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Link href="/grants/grantMonitoring">
          <Button color="info" startIcon={<ArrowBack />}>
            Retour
          </Button>
        </Link>
        <Typography variant="h4" color="GrayText">
          DEADLINE LIST
        </Typography>
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
