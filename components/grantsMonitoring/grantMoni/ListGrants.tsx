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
} from "../../../config/table.config";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import useFetchGrants from "../../GrantsEnCours/hooks/getGrants";
import { GrantEncoursItem } from "../../../redux/features/grantEncours/grantEncours.interface";
import useFetchProject from "../../GrantsEnCours/hooks/getProject";
import Moment from "react-moment";
import TransportEquipmentTableHeader from "../organisme/table/TransportEquipmentTableHeader";
import useFetchEmploys from "../../GrantsEnCours/hooks/getResponsable";
import { ArrowBack, Backpack } from "@mui/icons-material";

const ListGrantsMonitoring = () => {
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

  React.useEffect(() => {
    fetchGrants();
    fetchProject();
    fetchEmployes();
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
                  {grantEncoursList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: GrantEncoursItem, index) => {
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
                          >
                            {row.code}
                          </TableCell>

                          <TableCell
                            align="center"
                            sx={{ minWidth: 200, maxWidth: 200 }}
                          >
                            {
                              projectList.find((p) => p.id === row.projectId)
                                ?.title
                            }
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ minWidth: 200, maxWidth: 200 }}
                          >
                            <Moment format="DD/MM/yyyy">{row.deadline}</Moment>
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
                            <Moment format="DD/MM/yyyy">{row.techDate}</Moment>
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ minWidth: 200, maxWidth: 200 }}
                          >
                            <Moment format="DD/MM/yyyy">
                              {row.financeDate}
                            </Moment>
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ minWidth: 200, maxWidth: 200 }}
                          >
                            {Math.ceil(
                              (new Date(row.techDate!).getTime() -
                                new Date(row.deadline!).getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ minWidth: 200, maxWidth: 200 }}
                          >
                            {Math.ceil(
                              (new Date(row.financeDate!).getTime() -
                                new Date(row.deadline!).getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ minWidth: 200, maxWidth: 200 }}
                          >
                            {employees &&
                              employees
                                .filter((e: any) =>
                                  row.responsable!.includes(e.id)
                                )
                                .map((e: any) => e.name + " " + e.surname)
                                .join(", ")}
                          </TableCell>

                          <TableCell
                            align="center"
                            sx={{ minWidth: 400, maxWidth: 400 }}
                          >
                            {row.note}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ minWidth: 200, maxWidth: 200 }}
                          >
                            {Math.ceil(
                              (new Date().getTime() -
                                new Date(row.deadline!).getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {new Date(row.deadline!).getFullYear()}
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
