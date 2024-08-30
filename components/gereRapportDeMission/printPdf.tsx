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
import { MissionItem } from "../../redux/features/mission/mission.interface";

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
        <View style={{ width: "83.1%" }}>
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
            <Text>SUR LA MISSION</Text>
          </View>
          {missionListe
            .filter(
              (f: MissionItem) =>
                f.notify!.map((n) => n.missionId).includes(f.id) &&
                f.notify!.map((n) => n.type).includes("Rapport")
            )
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
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                    paddingBottom: 5,
                    fontSize: 8,
                  }}
                >
                  <Text>RESPONSABLE DE MISSION</Text>
                  <Text
                    style={{
                      border: 1.5,
                      padding: 4,
                      minWidth: 350,
                      maxWidth: 350,
                    }}
                  >
                    {
                      employees.find((e) => e.id === mission.missionManagerId)
                        ?.name as string
                    }{" "}
                    {
                      employees.find((e) => e.id === mission.missionManagerId)
                        ?.surname as string
                    }
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                    paddingBottom: 5,
                    fontSize: 8,
                  }}
                >
                  <Text>GESTIONNAIRE DU BUDGET</Text>
                  <Text
                    style={{
                      border: 1.5,
                      padding: 4,
                      minWidth: 350,
                      maxWidth: 350,
                    }}
                  >
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
                </View>
                <View
                  style={{
                    ...styles.tableCol,
                    width: "100%",
                    textAlign: "left",
                    border: "none",
                    // borderTop: 1,
                    // borderTopColor: "grey",
                    backgroundColor: "darkgrey",
                  }}
                >
                  <Text
                    style={{
                      ...styles.tableCellHeader,
                      fontSize: 9,
                    }}
                  >
                    Les missionnaires:{" "}
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.tableRow,
                    borderLeft: 1,
                    borderLeftColor: "grey",
                    fontSize: 8,
                    borderTop: 1,
                    borderTopColor: "grey",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "25%",
                      textAlign: "left",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                      }}
                    >
                      Nom et prénoms
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "25%",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Date de départ
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "25%",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Date de retour
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "25%",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Responsabilité pendant la mission
                    </Text>
                  </View>
                </View>
                {mission.missionaireRapport?.map((m) => (
                  <View
                    style={{
                      ...styles.tableRow,
                      borderLeft: 1,
                      borderLeftColor: "grey",
                      fontSize: 8,
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "25%",
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 9,
                        }}
                      >
                        {`${m.firstNameMissionary} ${m.lastNameMissionary}`}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "25%",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        {format(new Date(m.startDateMissionary!), "dd/MM/yyyy")}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "25%",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        {format(
                          new Date(m.returnDateMissionary!),
                          "dd/MM/yyyy"
                        )}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "25%",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        {(() => {
                          const nom = employees.find(
                            (f) => f.id == m.missionResponsabilityMissionary
                          )?.name;
                          const prenom = employees.find(
                            (f) => f.id == m.missionResponsabilityMissionary
                          )?.surname;

                          return nom + " " + prenom;
                        })()}
                      </Text>
                    </View>
                  </View>
                ))}
                <View
                  style={{
                    ...styles.tableRow,
                    borderLeft: 1,
                    borderLeftColor: "grey",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "25%",
                      textAlign: "left",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                      backgroundColor: "darkgrey",
                      rowGap: mission.lieux!.length + 1,
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                      }}
                    >
                      Lieux de mission :{" "}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "25%",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Fokontany
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "25%",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Commune
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "25%",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      District
                    </Text>
                  </View>
                </View>
                {mission.lieux?.map((er) => (
                  <View
                    style={{
                      ...styles.tableRow,
                      borderLeft: 1,
                      borderLeftColor: "grey",
                      fontSize: 8,
                    }}
                  >
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "25%",
                        textAlign: "left",
                        // borderTop: 1,
                        // borderTopColor: "grey",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 9,
                          backgroundColor: "grey",
                        }}
                      ></Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "25%",
                        // borderTop: 1,
                        // borderTopColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        {er.fokontany}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "25%",
                        // borderTop: 1,
                        // borderTopColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        {er.commune}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "25%",
                        // borderTop: 1,
                        // borderTopColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        {er.district}
                      </Text>
                    </View>
                  </View>
                ))}
                <View
                  style={{
                    ...styles.tableRow,
                    borderLeftWidth: 1,
                    borderLeftColor: "grey",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "50%",
                      textAlign: "left",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                      }}
                    >
                      Résultats attendus
                    </Text>
                  </View>
                   {mission.exceptedResults?.map((er, index) => (
                    <View
                      key={`expected-result-${index}`}
                      style={{
                        ...styles.tableCol,
                        width: "50%",
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.tableCell,
                          fontSize: 9,
                        }}
                      >
                        {er.description}
                      </Text>
                    </View>
                  ))}
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "50%",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Résultats obtenus
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    ...styles.tableRow,
                    borderLeftWidth: 1,
                    borderLeftColor: "grey",
                    width: "100%",
                  }}
                >
                  {mission.exceptedResults?.map((er, index) => (
                    <View
                      key={`expected-result-${index}`}
                      style={{
                        ...styles.tableCol,
                        width: "50%",
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.tableCell,
                          fontSize: 9,
                        }}
                      >
                        {er.description}
                      </Text>
                    </View>
                  ))}

                  {mission.resultats?.map((ro, index) => (
                    <View
                      key={`result-${index}`}
                      style={{
                        ...styles.tableCol,
                        width: "50%",
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.tableCell,
                          fontSize: 9,
                        }}
                      >
                        {ro.resultat}
                      </Text>
                    </View>
                  ))}
                </View>

                <View
                  style={{
                    ...styles.tableRow,
                    borderLeft: 1,
                    borderLeftColor: "grey",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "25%",
                      textAlign: "left",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                      }}
                    >
                      Activités prévues
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "62.5%",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Activités réalisées
                    </Text>
                  </View>
                </View>
                {mission.activites?.map((r) => (
                  <View
                    style={{
                      ...styles.tableRow,
                      borderLeft: 1,
                      borderLeftColor: "grey",
                    }}
                  >
                    {missionListe
                      .filter(
                        (f: MissionItem) =>
                          f.notify!.map((n) => n.missionId).includes(f.id) &&
                          f.notify!.map((n) => n.type).includes("Prevision")
                      )
                      .flatMap((rp) => rp.plannedActivities)
                      .map((er) => (
                        <View
                          style={{
                            ...styles.tableCol,
                            width: "25%",
                            textAlign: "left",
                            // borderTop: 1,
                            // borderTopColor: "grey",
                          }}
                        >
                          <Text
                            style={{
                              ...styles.tableCellHeader,
                              fontSize: 9,
                            }}
                          >
                            {er?.description}
                          </Text>
                        </View>
                      ))}
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "62.5%",
                        // borderTop: 1,
                        // borderTopColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        {r.activite}
                      </Text>
                    </View>
                  </View>
                ))}
                <View
                  style={{
                    ...styles.tableRow,
                    borderLeft: 1,
                    borderLeftColor: "grey",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "25%",
                      textAlign: "left",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                      }}
                    >
                      Livrables prévues
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "62.5%",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Livrables obtenus
                    </Text>
                  </View>
                </View>
                {mission.livrables?.map((r) => (
                  <View
                    style={{
                      ...styles.tableRow,
                      borderLeft: 1,
                      borderLeftColor: "grey",
                    }}
                  >
                    {missionListe
                      .filter(
                        (f: MissionItem) =>
                          f.notify!.map((n) => n.missionId).includes(f.id) &&
                          f.notify!.map((n) => n.type).includes("Prevision")
                      )
                      .flatMap((rp) => rp.deliverables)
                      .map((er) => (
                        <View
                          style={{
                            ...styles.tableCol,
                            width: "25%",
                            textAlign: "left",
                            // borderTop: 1,
                            // borderTopColor: "grey",
                          }}
                        >
                          <Text
                            style={{
                              ...styles.tableCellHeader,
                              fontSize: 9,
                            }}
                          >
                            {er?.description}
                          </Text>
                        </View>
                      ))}
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "62.5%",
                        // borderTop: 1,
                        // borderTopColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        {r.livrablee}
                      </Text>
                    </View>
                  </View>
                ))}
                <View
                  style={{
                    paddingTop: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      height: "auto",
                      backgroundColor: "darkgrey",
                      border: "none",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    LIVRABLES TECHNIQUES
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.tableRow,
                    borderLeft: 1,
                    borderLeftColor: "grey",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "25%",
                      textAlign: "left",
                      borderTop: 1,
                      borderTopColor: "grey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                      }}
                    >
                      Du
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "62.5%",
                      borderTop: 1,
                      borderTopColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Au
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "62.5%",
                      borderTop: 1,
                      borderTopColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Activités prévues
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "62.5%",
                      borderTop: 1,
                      borderTopColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Lieu
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "62.5%",
                      borderTop: 1,
                      borderTopColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Livrables prévues
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "62.5%",
                      borderTop: 1,
                      borderTopColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Livrables déposés
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "62.5%",
                      borderTop: 1,
                      borderTopColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Commentaires
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    ...styles.tableRow,
                    borderLeft: 1,
                    borderLeftColor: "grey",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "25%",
                      textAlign: "left",
                      borderTop: 1,
                      borderTopColor: "grey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                      }}
                    >
                      {format(
                        new Date(mission.dateDebut as Date),
                        "dd/MM/yyyy"
                      )}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "62.5%",
                      borderTop: 1,
                      borderTopColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      {format(new Date(mission.dateFin as Date), "dd/MM/yyyy")}
                    </Text>
                  </View>
                  {mission.plannedActivities?.map((pa) => (
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "62.5%",
                        borderTop: 1,
                        borderTopColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        {pa.description}
                      </Text>
                    </View>
                  ))}
                  {mission.lieux?.map((l) => (
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "62.5%",
                        borderTop: 1,
                        borderTopColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        {l.fokontany}
                      </Text>
                    </View>
                  ))}
                  {mission.deliverables?.map((d) => (
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "62.5%",
                        borderTop: 1,
                        borderTopColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        {d.description}
                      </Text>
                    </View>
                  ))}
                  {mission.livrables?.map((l) => (
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "62.5%",
                        borderTop: 1,
                        borderTopColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        {l.livrablee}
                      </Text>
                    </View>
                  ))}
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "62.5%",
                      borderTop: 1,
                      borderTopColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Commentaires
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    textAlign: "center",
                    paddingTop: 15,
                    paddingBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#1976d2",
                      fontSize: 9,
                    }}
                  >
                    RAPPORT DES DÉPENSES
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.tableRow,
                    borderLeft: 1,
                    borderColor: "grey",
                    fontSize: 8,
                    borderTop: 1,
                    width: "83.1%",
                    borderTopColor: "grey",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "10.3875%",
                      textAlign: "left",
                      borderColor: "grey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                      }}
                    >
                      Réf.PJ
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "10.3875%",
                      textAlign: "left",
                      borderColor: "grey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                      }}
                    >
                      Date
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "20%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                      }}
                    >
                      Libellés
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "10.3875%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Montant prévu
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "20%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Montant réalisé
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "20%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Grant
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "20%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Ligne budgétaire
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "20%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Règleme
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    ...styles.tableRow,
                    borderLeft: 1,
                    borderColor: "grey",
                    fontSize: 8,
                    borderTop: 1,
                    width: "83.1%",
                    borderTopColor: "grey",
                  }}
                >
                  {mission.rapportDepense?.map((rd) => (
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "10.3875%",
                        textAlign: "left",
                        borderColor: "grey",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 9,
                        }}
                      >
                        {rd.refPiece}
                      </Text>
                    </View>
                  ))}
                  {mission.rapportDepense?.map((rd) => (
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "10.3875%",
                        textAlign: "left",
                        borderColor: "grey",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 9,
                        }}
                      >
                        {format(new Date(rd.date as Date), "dd/MM/yyyy")}
                      </Text>
                    </View>
                  ))}
                  {mission.rapportDepense?.map((rd) => (
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "20%",
                        borderColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 9,
                        }}
                      >
                        {rd.libelle}
                      </Text>
                    </View>
                  ))}
                  {mission.previsionDepense?.map((pd) => (
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "10.3875%",
                        borderColor: "grey",
                        display: "flex",
                        flexWrap: "wrap",
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 9,
                          marginBottom: 2,
                        }}
                      >
                        {pd.montant}
                      </Text>
                    </View>
                  ))}
                  {mission.rapportDepense?.map((rd) => (
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "20%",
                        borderColor: "grey",
                        display: "flex",
                        flexWrap: "wrap",
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 9,
                          marginBottom: 2,
                        }}
                      >
                        {formatMontant(Number(rd.montant))}
                      </Text>
                    </View>
                  ))}
                  {mission.rapportDepense?.map((rd) => (
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "20%",
                        borderColor: "grey",
                        display: "flex",
                        flexWrap: "wrap",
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 9,
                          marginBottom: 2,
                        }}
                      >
                        {grantEncoursList.find((f) => f.id == rd.grant)?.code}
                      </Text>
                    </View>
                  ))}
                  {mission.rapportDepense?.map((rd) => (
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "20%",
                        borderColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        {
                          budgetLineList.find(
                            (bg) => bg.id == rd.ligneBudgetaire
                          )?.code
                        }
                      </Text>
                    </View>
                  ))}

                  {mission.rapportDepense?.map((rd) => (
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "20%",
                        borderColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        {rd.modePaiement}
                      </Text>
                    </View>
                  ))}
                </View>
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
