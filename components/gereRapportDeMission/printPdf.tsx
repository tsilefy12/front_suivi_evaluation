import React, { useEffect } from "react";
import { Flare, Print } from "@mui/icons-material";
import { Button } from "@mui/material";
import {
  Document,
  StyleSheet,
  Page,
  pdf,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
import { useRouter } from "next/router";
import useFetchMissionListe from "../home/Missions/hooks/useFetchMissionListe";
import { useAppSelector } from "../../hooks/reduxHooks";
import useFetchGrants from "../GrantsEnCours/hooks/getGrants";
import useFetchLigneBudgetaire from "../budgetInitial/hooks/useFetchLigneBudgetaire";
import useFetchResumeDepenseList from "../previsionMissions/organism/Finances/tableResumeDepense/hooks/useFetchResumeDepense";
import useFetchEmployes from "../home/Missions/hooks/useFetchEmployees";
import { format } from "date-fns";
import useFetchResumeDepensePrevue from "./organism/Finances/tableResumeDepense/hooks/useFetchResumeDepensePrevue";
import formatMontant from "../../hooks/format";
import { ResumeDepenseItem } from "../../redux/features/resumeDepense/reumeDepense.interface";

const PrintPdf = () => {
  const router = useRouter();
  const { id } = router.query;
  const fetchMission = useFetchMissionListe();
  const { missionListe } = useAppSelector((state) => state.mission);
  const fetchGrants = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const fetchLigneBudgetaire = useFetchLigneBudgetaire();
  const { budgetLineList } = useAppSelector((state) => state.budgetLine);
  const fetchResumeDepense = useFetchResumeDepenseList();
  const { resumeDepenseList } = useAppSelector((state) => state.resumeDepense);
  const fetchEmployes = useFetchEmployes();
  const { employees } = useAppSelector((state) => state.employe);
  const fetchResumeDepensePrevue = useFetchResumeDepensePrevue();
  const { resumeDepensePrevueList } = useAppSelector(
    (state: any) => state.resumeDepensePrevue
  );

  useEffect(() => {
    fetchMission();
    fetchGrants();
    fetchLigneBudgetaire();
    fetchResumeDepense();
    fetchEmployes();
    fetchResumeDepensePrevue();
  }, [id]);

  const pdfDocument = (
    <Document>
      <Page size="A4">
        <View>
          <View
            style={{
              paddingTop: 40,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              paddingLeft: 10,
              paddingRight: 20,
            }}
          >
            <Image
              style={styles.logo}
              src={`/logistique/images/logo/MV_logo.png`}
            />
            <Text
              style={{
                border: 1.5,
                paddingTop: 5,
                paddingBottom: 13,
                width: "65%",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                color: "#D2691E",
                fontWeight: "bold",
                backgroundColor: "rgb(164, 199, 84)",
              }}
            >
              Validation rapport de mission
            </Text>
          </View>
          {missionListe
            .filter((f) => f.id == id)
            .map((mission) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: 35,
                  fontSize: 12,
                  paddingTop: 20,
                }}
                key={mission.id}
              >
                <Text style={{ paddingBottom: 3 }}>
                  Titre : Prévision de mission
                </Text>
                <Text style={{ paddingBottom: 3 }}>
                  Type : {mission.uncompleteTbbs?.map((type) => type.type)}
                </Text>
                <Text style={{ paddingBottom: 3 }}>
                  Référence budget : {mission.RefBudget}
                </Text>
                <Text style={{ paddingBottom: 3 }}>
                  {mission.budgetManagerId!.length > 0
                    ? "Gestionnaires :"
                    : "Gestionnaire :"}{" "}
                  {mission
                    .budgetManagerId!.map((managerId) => {
                      const manager = employees.find(
                        (employee) => employee.id === managerId
                      );
                      return manager
                        ? `${manager.name} ${manager.surname}`
                        : "";
                    })
                    .filter((manager) => manager)
                    .join(", ")}
                </Text>
                <Text style={{ paddingBottom: 3 }}>
                  Du {format(new Date(mission.dateDebut as Date), "dd/MM/yyyy")}
                  . au {format(new Date(mission.dateFin as Date), "dd/MM/yyyy")}
                </Text>
                <Text>Description : {mission.descriptionMission}</Text>
              </View>
            ))}
        </View>
        <View
          style={{
            paddingTop: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              width: "100%",
              color: "black",
              fontWeight: "bold",
              fontSize: 15,
              paddingBottom: 5,
            }}
          >
            RÉSUMÉ DES DEPENSES PREVUES
          </Text>
          <View style={{ paddingLeft: 35, paddingRight: 35 }}>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellHeader}>Grant</Text>
                </View>
                <View style={styles.tableCol}>
                  <View style={styles.flexColumn}>
                    <Text style={[styles.tableCellHeader]}>Ligne</Text>
                    <Text style={[styles.tableCellHeader, styles.flexEnd]}>
                      budgétaire
                    </Text>
                  </View>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellHeader}>Dépenses prévues</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellHeader}>Budget de dépense</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellHeader}>Différence</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellHeader}>Remarques</Text>
                </View>
              </View>
              {/* Table Body */}
              {resumeDepensePrevueList
                .filter((f) => f.missionId == id)
                .map((prevue: any) => (
                  <View style={styles.tableRow} key={prevue.id}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {
                          grantEncoursList.find(
                            (e: any) => e.id == prevue.grant
                          )?.code
                        }
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {
                          budgetLineList.find(
                            (e: any) => e.id == prevue.ligneBudgetaire
                          )?.code
                        }
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {formatMontant(Number(prevue.depensePrevue))}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {formatMontant(Number(prevue.budgetDepense))}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {(() => {
                          const totalResumeDepense = resumeDepenseList
                            .filter(
                              (f) =>
                                f.missionId == id &&
                                f.grant == prevue.grant &&
                                f.ligneBudgetaire == prevue.ligneBudgetaire
                            )
                            .reduce(
                              (acc, resume: ResumeDepenseItem) =>
                                acc + Number(resume.budgetDepense),
                              0
                            );

                          return formatMontant(
                            totalResumeDepense - Number(prevue.budgetDepense)
                          );
                        })()}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{prevue.remarque}</Text>
                    </View>
                  </View>
                ))}
              {/* Calcul des totaux */}
              {(() => {
                const totalBudgetRecu = resumeDepensePrevueList
                  .filter((f) => f.missionId == id)
                  .reduce(
                    (acc, prevue: any) => acc + Number(prevue.budgetDepense),
                    0
                  );

                const totalDepensePrevue = resumeDepensePrevueList
                  .filter((f) => f.missionId == id)
                  .reduce(
                    (acc, prevue: any) => acc + Number(prevue.depensePrevue),
                    0
                  );

                const totalBudgetPrevue = resumeDepenseList
                  .filter((f) => f.missionId == id)
                  .reduce(
                    (acc, resume: ResumeDepenseItem) =>
                      acc + Number(resume.budgetDepense),
                    0
                  );
                const depensePrevue = resumeDepenseList
                  .filter((f) => f.missionId == id)
                  .reduce(
                    (acc, resume: ResumeDepenseItem) =>
                      acc + Number(resume.depensePrevue),
                    0
                  );
                const reste = depensePrevue - totalDepensePrevue;
                const diffrence = totalBudgetPrevue - totalBudgetRecu;
                const diffrenceDepense = depensePrevue - totalDepensePrevue;
                const resteBudget = totalBudgetPrevue - totalBudgetRecu;
                return (
                  <>
                    {/* TOTAL BUDGET REÇU */}
                    <View style={styles.tableRow} key={1}>
                      <View style={[styles.tableCol, styles.colMerged]}>
                        <Text style={styles.tableCellColaps}>
                          TOTAL BUDGET REÇU
                        </Text>
                      </View>
                      <View style={[styles.tableCol, styles.colSingle]}>
                        <Text style={styles.tableCell}>-</Text>
                      </View>
                      <View style={[styles.tableCol, styles.colSingle]}>
                        <Text style={styles.tableCell}>
                          {formatMontant(totalBudgetRecu)}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, styles.colSingle]}>
                        <Text style={styles.tableCell}>
                          {formatMontant(diffrence)}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, styles.colSingle]}>
                        <Text style={styles.tableCell}>-</Text>
                      </View>
                    </View>

                    {/* DÉPENSE TOTAL */}
                    <View style={styles.tableRow} key={2}>
                      <View style={[styles.tableCol, styles.colMerged]}>
                        <Text style={styles.tableCellColaps}>
                          DÉPENSE TOTAL
                        </Text>
                      </View>
                      <View style={[styles.tableCol, styles.colSingle]}>
                        <Text style={styles.tableCell}>
                          {formatMontant(totalDepensePrevue)}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, styles.colSingle]}>
                        <Text style={styles.tableCell}>-</Text>
                      </View>
                      <View style={[styles.tableCol, styles.colSingle]}>
                        <Text style={styles.tableCell}>
                          {formatMontant(diffrenceDepense)}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, styles.colSingle]}>
                        <Text style={styles.tableCell}>-</Text>
                      </View>
                    </View>

                    {/* RESTE */}
                    <View style={styles.tableRow} key={3}>
                      <View style={[styles.tableCol, styles.colMerged]}>
                        <Text style={styles.tableCellColaps}>RESTE</Text>
                      </View>
                      <View style={[styles.tableCol, styles.colSingle]}>
                        <Text style={styles.tableCell}>
                          {formatMontant(reste)}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, styles.colSingle]}>
                        <Text style={styles.tableCell}>-</Text>
                      </View>
                      <View style={[styles.tableCol, styles.colSingle]}>
                        <Text style={styles.tableCell}>
                          {formatMontant(resteBudget)}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, styles.colSingle]}>
                        <Text style={styles.tableCell}>-</Text>
                      </View>
                    </View>
                  </>
                );
              })()}
            </View>
          </View>
        </View>
        <View style={{ paddingTop: 10 }}>
          <Text
            style={{
              textAlign: "center",
              width: "100%",
              color: "black",
              fontWeight: "bold",
              fontSize: 15,
              paddingBottom: 5,
            }}
          >
            VALIDATION
          </Text>
          <View style={{ paddingLeft: 35, paddingRight: 35 }}>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCellHeader}>Poste</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCellHeader}>Signature</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCellHeader}>Date</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCellHeader}>Lieu</Text>
                </View>
              </View>
              {/* Table Body */}
              {missionListe
                .filter((mission) => mission.id == id)
                .map((m) => (
                  <View style={styles.tableRow} key={m.id}>
                    <View
                      style={[styles.tableCol, styles.colMergedTBValidated]}
                    >
                      <Text style={styles.tableCellTBValidated}>
                        Élaboré par :{" "}
                        {
                          employees.find(
                            (e: any) => e.id === m.missionManagerId
                          )?.name as string
                        }{" "}
                        {
                          employees.find(
                            (e: any) => e.id === m.missionManagerId
                          )?.surname as string
                        }
                      </Text>
                    </View>
                  </View>
                ))}
              <View style={styles.tableRow}>
                <View
                  style={[styles.tableCol, styles.colSingleTBValidatedBody]}
                >
                  <Text style={styles.tableCell}></Text>
                </View>
                <View
                  style={[styles.tableCol, styles.colSingleTBValidatedBody]}
                >
                  <Text style={styles.tableCell}></Text>
                </View>
                <View
                  style={[styles.tableCol, styles.colSingleTBValidatedBody]}
                >
                  <Text style={styles.tableCell}></Text>
                </View>
                <View
                  style={[styles.tableCol, styles.colSingleTBValidatedBody]}
                >
                  <Text style={styles.tableCell}></Text>
                </View>
              </View>
              {/* Table Body */}
              <View style={styles.tableRow}>
                {missionListe
                  .filter((mission) => mission.id == id)
                  .map((m) => (
                    <View
                      style={[styles.tableCol, styles.colMergedTBValidated]}
                      key={m.id}
                    >
                      <Text style={styles.tableCellTBValidated}>
                        Vérificateur financier :{" "}
                        {
                          employees.find((e: any) => e.id === m.verifyFinancial)
                            ?.name as string
                        }{" "}
                        {
                          employees.find((e: any) => e.id === m.verifyFinancial)
                            ?.surname as string
                        }
                      </Text>
                    </View>
                  ))}
              </View>
              <View style={styles.tableRow}>
                <View
                  style={[styles.tableCol, styles.colSingleTBValidatedBody]}
                >
                  <Text style={styles.tableCell}></Text>
                </View>
                <View
                  style={[styles.tableCol, styles.colSingleTBValidatedBody]}
                >
                  <Text style={styles.tableCell}></Text>
                </View>
                <View
                  style={[styles.tableCol, styles.colSingleTBValidatedBody]}
                >
                  <Text style={styles.tableCell}></Text>
                </View>
                <View
                  style={[styles.tableCol, styles.colSingleTBValidatedBody]}
                >
                  <Text style={styles.tableCell}></Text>
                </View>
              </View>
              {/* Table Body */}
              <View style={styles.tableRow}>
                {missionListe
                  .filter((mission) => mission.id == id)
                  .map((m) => (
                    <View
                      style={[styles.tableCol, styles.colMergedTBValidated]}
                      key={m.id}
                    >
                      <Text style={styles.tableCellTBValidated}>
                        Vérificateur technique :{" "}
                        {
                          employees.find((e: any) => e.id === m.verifyTechnic)
                            ?.name as string
                        }{" "}
                        {
                          employees.find((e: any) => e.id === m.verifyTechnic)
                            ?.surname as string
                        }
                      </Text>
                    </View>
                  ))}
              </View>
              <View style={styles.tableRow}>
                <View
                  style={[styles.tableCol, styles.colSingleTBValidatedBody]}
                >
                  <Text style={styles.tableCell}></Text>
                </View>
                <View
                  style={[styles.tableCol, styles.colSingleTBValidatedBody]}
                >
                  <Text style={styles.tableCell}></Text>
                </View>
                <View
                  style={[styles.tableCol, styles.colSingleTBValidatedBody]}
                >
                  <Text style={styles.tableCell}></Text>
                </View>
                <View
                  style={[styles.tableCol, styles.colSingleTBValidatedBody]}
                >
                  <Text style={styles.tableCell}></Text>
                </View>
              </View>

              {/* Table Body */}
              <View style={styles.tableRow}>
                {missionListe
                  .filter((mission) => mission.id == id)
                  .map((m) => (
                    <View
                      style={[styles.tableCol, styles.colMergedTBValidated]}
                      key={m.id}
                    >
                      <Text style={styles.tableCellTBValidated}>
                        Payé par :{" "}
                        {
                          employees.find(
                            (e: any) => e.id === m.validateFinancial
                          )?.name as string
                        }{" "}
                        {
                          employees.find(
                            (e: any) => e.id === m.validateFinancial
                          )?.surname as string
                        }
                      </Text>
                    </View>
                  ))}
              </View>
              <View style={styles.tableRow}>
                <View
                  style={[styles.tableCol, styles.colSingleTBValidatedBody]}
                >
                  <Text style={styles.tableCell}></Text>
                </View>
                <View
                  style={[styles.tableCol, styles.colSingleTBValidatedBody]}
                >
                  <Text style={styles.tableCell}></Text>
                </View>
                <View
                  style={[styles.tableCol, styles.colSingleTBValidatedBody]}
                >
                  <Text style={styles.tableCell}></Text>
                </View>
                <View
                  style={[styles.tableCol, styles.colSingleTBValidatedBody]}
                >
                  <Text style={styles.tableCell}></Text>
                </View>
              </View>
              {/* Add more rows as needed */}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  const clickPDF = async () => {
    const pdfBlob = await pdf(pdfDocument).toBlob();
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = "Rapport.pdf";
    downloadLink.click();
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Print />}
        onClick={clickPDF}
      >
        Imprimer
      </Button>
    </>
  );
};

export default PrintPdf;

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    textAlign: "center",
  },
  tableCol: {
    width: "20%", // Ajustement pour correspondre à la longueur souhaitée
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  tableCellColaps: {
    margin: 5,
    fontSize: 10,
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  colMerged: {
    width: "40%", // 16.6% * 2
  },
  colSingle: {
    width: "20%",
  },
  colMergedTBValidated: {
    width: "100%", // 20% * 2
  },
  colSingleTBValidated: {
    width: "100%",
  },
  colSingleTBValidatedBody: {
    width: "100%",
    minHeight: 40,
    maxHeight: 40,
  },
  tableCellTBValidated: {
    margin: 5,
    fontSize: 10,
    textAlign: "left",
  },
  flexEnd: {
    marginTop: -4,
  },
  logo: {
    width: 75,
    height: 80,
  },
});
