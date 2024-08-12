import { Download } from "@mui/icons-material";
import { Button } from "@mui/material";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import useFetchGrants from "../../../GrantsEnCours/hooks/getGrants";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { useEffect } from "react";
import { DeadlineItem } from "../../../../redux/features/deadline/deadline.interface";
import { format } from "date-fns";
import useFetchDeadlinelist from "../../hooks/useFetchDeadline";
import { GrantEncoursItem } from "../../../../redux/features/grantEncours/grantEncours.interface";
import { useRouter } from "next/router";
import useFetchProject from "../../../GrantsEnCours/hooks/getProject";
import useFetchEmploys from "../../../GrantsEnCours/hooks/getResponsable";
import useFetchStagiaire from "../../../GrantsEnCours/hooks/getStagiaire";
import useFetchPrestataire from "../../../GrantsEnCours/hooks/getPrestataire";

const PrintPDF = () => {
  const fetchGrants = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const fetchDeadline = useFetchDeadlinelist();
  const { deadlinelist } = useAppSelector((state) => state.deadline);
  const router = useRouter();
  const { id } = router.query;
  const fetchProject = useFetchProject();
  const { projectList } = useAppSelector((state) => state.project);
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state) => state.employe);
  const fetchStagiaire = useFetchStagiaire();
  const { interns } = useAppSelector((state: any) => state.stagiaire);
  const fetchPrestataire = useFetchPrestataire();
  const { prestataireListe } = useAppSelector(
    (state: any) => state.prestataire
  );
  const data = async () => {
    await fetchGrants();
    await fetchProject();
    await fetchEmployes();
    await fetchStagiaire();
    await fetchPrestataire();
    await fetchDeadline();
  };
  useEffect(() => {
    data();
  }, []);

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
                      {row.notes}
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
  return (
    <>
      <Button
        onClick={clickPDF}
        color="primary"
        variant="contained"
        startIcon={<Download />}
      >
        PDF
      </Button>
    </>
  );
};
export default PrintPDF;
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
