import {
  Button,
  Container,
  Dialog,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
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
import { Add, ArrowBack, Download, Edit } from "@mui/icons-material";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { ProjectItem } from "../../../../redux/features/project/project.interface";
import AddNewDeadline from "../add/AddNewDeadline";
import { padding } from "polished";
import useFetchDeadlinelist from "../../hooks/useFetchDeadline";
import { DeadlineItem } from "../../../../redux/features/deadline/deadline.interface";
import { ro } from "date-fns/locale";
import { usePermitted } from "../../../../config/middleware";
import { editDeadline } from "../../../../redux/features/deadline";
import useFetchStagiaire from "../../../GrantsEnCours/hooks/getStagiaire";
import useFetchPrestataire from "../../../GrantsEnCours/hooks/getPrestataire";

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
  const fetchDeadline = useFetchDeadlinelist();
  const { deadlinelist } = useAppSelector((state) => state.deadline);
  const fetchStagiaire = useFetchStagiaire();
  const { interns } = useAppSelector((state: any) => state.stagiaire);
  const fetchPrestataire = useFetchPrestataire();
  const { prestataireListe } = useAppSelector(
    (state: any) => state.prestataire
  );
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProject();
        await fetchGrants();
        await fetchEmployes();
        await fetchStagiaire();
        await fetchPrestataire();
        await fetchDeadline();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handelClose = () => {
    setOpen(false);
  };
  const validate = usePermitted();
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
  // console.log(deadlinelist);
  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const groupedBudgets: { [key: string]: typeof deadlinelist } = {};

  deadlinelist
    .filter((g: DeadlineItem) => g.grantId == id)
    .forEach((budget: DeadlineItem) => {
      const grantCode =
        grantEncoursList.find(
          (grant: GrantEncoursItem) => grant.id == budget.grantId
        )?.code || "";
      if (!groupedBudgets[grantCode]) {
        groupedBudgets[grantCode] = [];
      }
      groupedBudgets[grantCode].push(budget);
    });
  const formatOptions = (options: any) => {
    return options.map((option: any) => ({
      id: option.id,
      name: option.name,
      surname: option.surname,
    }));
  };

  const allOptions = [
    ...formatOptions(employees),
    ...formatOptions(interns),
    ...formatOptions(prestataireListe),
  ];
  const exportToExcel = () => {
    const dataToExport = Object.keys(groupedBudgets).flatMap((grantCode) => {
      return groupedBudgets[grantCode].map((row: DeadlineItem) => {
        const projectId = grantEncoursList.find(
          (f: GrantEncoursItem) => f.id == id
        )?.projectId;
        const projectTitle = projectList.find(
          (p: any) => p.id == projectId
        )?.title;

        return {
          "Grant code": grantCode,
          "Project Title": projectTitle,
          Deadline: format(new Date(row.deadline as Date), "dd/MM/yyyy"),
          "Période start": format(
            new Date(row.startDate as Date),
            "dd/MM/yyyy"
          ),
          "Période end": format(new Date(row.endDate as Date), "dd/MM/yyyy"),
          "Technical submitted": format(
            new Date(row.dateTech as Date),
            "dd/MM/yyyy"
          ),
          "Financial submitted": format(
            new Date(row.dateFinance as Date),
            "dd/MM/yyyy"
          ),
          "Technical delay":
            (new Date(row.dateTech as Date).getTime() -
              new Date(row.deadline as Date).getTime()) /
            (24 * 60 * 60 * 1000),
          "Finance delay":
            (new Date(row.dateFinance as Date).getTime() -
              new Date(row.deadline as Date).getTime()) /
            (24 * 60 * 60 * 1000),
          Responsable: `${
            employees.find((e: any) => e.id == row.responsable)?.name
          } ${employees.find((e: any) => e.id == row.responsable)?.surname}`,
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
    XLSX.writeFile(workbook, "Deadline.xlsx");
  };

  const pdfDocument = (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.section}>
          <Text style={styles.text}>
            GRANT CODE :{" "}
            {grantEncoursList
              .filter((g: GrantEncoursItem) => g.id == id)
              .map((m) => m.code!)}
          </Text>
          <Text style={styles.text}>
            PROJECT TITLE :{" "}
            {
              projectList.find(
                (p: any) =>
                  p.id ==
                  grantEncoursList
                    .filter((f: any) => f.id == id)
                    ?.map((m) => m.projectId)
              )?.descriptionEn
            }
          </Text>
          <Text style={styles.textDate}>
            Date : {format(new Date(), "dd/MM/yyyy")}
          </Text>
        </View>
        <View style={styles.sectionTableau}>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    ...styles.tableCell,
                    textAlign: "left",
                    marginLeft: 8,
                    fontSize: 15,
                  }}
                >
                  Deadline
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    ...styles.tableCell,
                    textAlign: "left",
                    marginLeft: 8,
                    fontSize: 15,
                  }}
                >
                  Periode start
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    ...styles.tableCell,
                    textAlign: "left",
                    marginLeft: 8,
                    fontSize: 15,
                  }}
                >
                  Periode end
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    ...styles.tableCell,
                    textAlign: "left",
                    marginLeft: 8,
                    fontSize: 15,
                  }}
                >
                  Technical submitted
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    ...styles.tableCell,
                    textAlign: "left",
                    marginLeft: 8,
                    fontSize: 15,
                  }}
                >
                  Financial submitted
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    ...styles.tableCell,
                    textAlign: "left",
                    marginLeft: 8,
                    fontSize: 15,
                  }}
                >
                  Technical delay
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    ...styles.tableCell,
                    textAlign: "left",
                    marginLeft: 8,
                    fontSize: 15,
                  }}
                >
                  Financial delay
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    ...styles.tableCell,
                    textAlign: "left",
                    marginLeft: 8,
                    fontSize: 15,
                  }}
                >
                  Responsable
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    ...styles.tableCell,
                    textAlign: "left",
                    marginLeft: 8,
                    fontSize: 15,
                  }}
                >
                  Notes
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    ...styles.tableCell,
                    textAlign: "left",
                    marginLeft: 8,
                    fontSize: 15,
                  }}
                >
                  Days left
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    ...styles.tableCell,
                    textAlign: "left",
                    marginLeft: 8,
                    fontSize: 15,
                  }}
                >
                  Year
                </Text>
              </View>
            </View>
            {/* Table Row */}
            {Object.keys(groupedBudgets).map((grantCode) => {
              const budgets = groupedBudgets[grantCode];
              return budgets.map((row: DeadlineItem) => (
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text
                      style={{
                        ...styles.tableCell,
                        textAlign: "left",
                        marginLeft: 8,
                      }}
                    >
                      {format(new Date(row.deadline as Date), "dd/MM/yyyy")}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text
                      style={{
                        ...styles.tableCell,
                        textAlign: "left",
                        marginLeft: 8,
                      }}
                    >
                      {format(new Date(row.startDate as Date), "dd/MM/yyyy")}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text
                      style={{
                        ...styles.tableCell,
                        textAlign: "left",
                        marginLeft: 8,
                      }}
                    >
                      {format(new Date(row.endDate as Date), "dd/MM/yyyy")}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text
                      style={{
                        ...styles.tableCell,
                        textAlign: "left",
                        marginLeft: 8,
                      }}
                    >
                      {format(new Date(row.dateTech as Date), "dd/MM/yyyy")}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text
                      style={{
                        ...styles.tableCell,
                        textAlign: "left",
                        marginLeft: 8,
                      }}
                    >
                      {format(new Date(row.dateFinance as Date), "dd/MM/yyyy")}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text
                      style={{
                        ...styles.tableCell,
                        textAlign: "left",
                        marginLeft: 8,
                      }}
                    >
                      {(new Date(row.dateTech as Date).getTime() -
                        new Date(row.deadline as Date).getTime()) /
                        (24 * 60 * 60 * 1000)}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text
                      style={{
                        ...styles.tableCell,
                        textAlign: "left",
                        marginLeft: 8,
                      }}
                    >
                      {(new Date(row.dateFinance as Date).getTime() -
                        new Date(row.deadline as Date).getTime()) /
                        (24 * 60 * 60 * 1000)}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text
                      style={{
                        ...styles.tableCell,
                        textAlign: "left",
                        marginLeft: 8,
                      }}
                    >
                      {(() => {
                        const responsiblePerson = allOptions.find(
                          (e: any) => e.id === row.responsable
                        );
                        return responsiblePerson
                          ? `${responsiblePerson.name} ${responsiblePerson.surname}`
                          : "";
                      })()}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text
                      style={{
                        ...styles.tableCell,
                        textAlign: "left",
                        marginLeft: 8,
                      }}
                    >
                      {/* {row.notes} */}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text
                      style={{
                        ...styles.tableCell,
                        textAlign: "left",
                        marginLeft: 8,
                      }}
                    >
                      {Math.ceil(
                        (new Date().getTime() -
                          new Date(row.deadline as Date).getTime()) /
                          (24 * 60 * 60 * 1000)
                      )}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text
                      style={{
                        ...styles.tableCell,
                        textAlign: "left",
                        marginLeft: 8,
                      }}
                    >
                      {new Date(row.deadline as Date).getFullYear()}
                    </Text>
                  </View>
                </View>
              ));
            })}
          </View>
        </View>
      </Page>
    </Document>
  );

  const clickPDF = async () => {
    const pdfBlob = await pdf(pdfDocument).toBlob();
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = "Deadline.pdf";
    downloadLink.click();
  };
  const handleClickEdit = async (id: any) => {
    await dispatch(editDeadline({ id }));
    setOpen(true);
  };

  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Stack direction={"row"} gap={2}>
            <Link href="/grants/grantMonitoring">
              <Button color="info" startIcon={<ArrowBack />}>
                Retour
              </Button>
            </Link>
            <Button
              color="primary"
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpen(true)}
            >
              Créer
            </Button>
          </Stack>
        </Stack>
        <Stack direction={"row"} gap={2} padding={2}>
          <Button
            onClick={clickPDF}
            color="primary"
            variant="contained"
            startIcon={<Download />}
          >
            PDF
          </Button>
          <Button
            onClick={exportToExcel}
            color="primary"
            variant="contained"
            startIcon={<Download />}
          >
            Excel
          </Button>
          <Typography variant="h4" color="GrayText">
            Deadline list
          </Typography>
        </Stack>
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
                    return budgets.map((row: DeadlineItem, index: any) => (
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
                          <Moment format="DD/MM/yyyy">{row.startDate}</Moment>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ minWidth: 150, maxWidth: 150 }}
                        >
                          <Moment format="DD/MM/yyyy">{row.endDate}</Moment>
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ minWidth: 50, maxWidth: 50 }}
                        >
                          <Moment format="DD/MM/yyyy">{row.dateTech}</Moment>
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
                          {Math.ceil(
                            (new Date(row.dateTech as Date).getTime() -
                              new Date(row.deadline as Date).getTime()) /
                              (24 * 60 * 60 * 1000)
                          )}
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ minWidth: 50, maxWidth: 50 }}
                        >
                          {Math.ceil(
                            (new Date(row.dateFinance as Date).getTime() -
                              new Date(row.deadline as Date).getTime()) /
                              (24 * 60 * 60 * 1000)
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ minWidth: 200, maxWidth: 200 }}
                        >
                          {(() => {
                            const responsiblePerson = allOptions.find(
                              (e: any) => e.id === row.responsable
                            );
                            return responsiblePerson
                              ? `${responsiblePerson.name} ${responsiblePerson.surname}`
                              : "";
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
                          {new Date(row.deadline as Date).getFullYear()}
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                      </TableRow>
                    ));
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Dialog
              open={open}
              disablePortal={false}
              PaperProps={{
                style: {
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  padding: 6,
                },
              }}
            >
              <AddNewDeadline handelClose={handelClose} />
            </Dialog>
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
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    paddingTop: 40,
    paddingLeft: 60,
  },
  sectionTableau: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    padding: 10,
  },
  textDate: {
    paddingLeft: 10,
    paddingTop: 40,
  },
  table: {
    display: "flex",
    width: "auto",
    border: "1px solid black",
    textAlign: "left",
  },
  tableRow: {
    flexDirection: "row",
    borderColor: "black",
    borderBottomColor: "0.3px solid black",
  },
  tableCol: {
    width: "100%",
    border: "0.5px solid black",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
});
const styleDialog = {
  top: 20,
  width: "auto",
  alignItem: "center",
  padding: 4,
};
