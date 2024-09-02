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
import useFetchVoiture from "../previsionMissions/organism/Logistique/tableBesoinVéhicules/hooks/useFetchVoiture";
import { ResumeDepensePrevueItem } from "../../redux/features/resumeDepensePrevue/reumeDepensePrevue.interface";
import { PrevisionDepenseItem } from "../../redux/features/PrevisionDepense/previsionDepense.interface";

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
  const fetchVoiture = useFetchVoiture();
  const { transportationEquipments } = useAppSelector(
    (state: any) => state.transportation
  );

  useEffect(() => {
    fetchVoiture();
    fetchMission();
    fetchGrants();
    fetchLigneBudgetaire();
    fetchResumeDepense();
    fetchEmployes();
    fetchResumeDepensePrevue();
  }, [id]);

  const pdfDocument = (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={{ width: "95%" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              paddingRight: 50,
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
                  fontSize: 14,
                  paddingTop: 10,
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
                    fontSize: 14,
                  }}
                >
                  <Text>RESPONSABLE DE MISSION</Text>
                  <Text
                    style={{
                      border: 1.5,
                      padding: 4,
                      minWidth: 530,
                      maxWidth: 530,
                      marginLeft: 4,
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
                    fontSize: 14,
                  }}
                >
                  <Text>GESTIONNAIRE DU BUDGET</Text>
                  <Text
                    style={{
                      border: 1.5,
                      padding: 4,
                      minWidth: 530,
                      maxWidth: 530,
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
                  }}
                >
                  <Text
                    style={{
                      ...styles.tableCellHeader,
                      fontSize: 14,
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
                    fontSize: 14,
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
                        fontSize: 14,
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
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                      fontSize: 14,
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
                          fontSize: 14,
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
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        {mission.missionResponsabilityMissionary}
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
                      rowGap: mission.lieux!.length + 1,
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 14,
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
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                      fontSize: 14,
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
                          fontSize: 14,
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
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        {er.district}
                      </Text>
                    </View>
                  </View>
                ))}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    borderRight: 1.5,
                    borderRightColor: "grey",
                    borderBottom: 1.5,
                    borderBottomColor: "grey",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                      borderLeft: 1,
                      borderLeftColor: "grey",
                    }}
                  >
                    <View
                      style={{
                        ...styles.tableCol,
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 14,
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
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        <Text
                          style={{
                            ...styles.tableCellHeader,
                            fontSize: 14,
                          }}
                        >
                          {er.description}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <View style={{ width: "50%" }}>
                    <View
                      style={{
                        ...styles.tableCol,
                        textAlign: "left",
                        width: "100%",

                        borderRight: "none",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        Résultats obtenus
                      </Text>
                    </View>
                    {mission.resultats?.map((er, index) => (
                      <View
                        key={`expected-result-${index}`}
                        style={{
                          ...styles.tableCol,
                          textAlign: "left",
                          width: "100%",
                          borderRight: "none",
                        }}
                      >
                        <Text
                          style={{
                            ...styles.tableCellHeader,
                            fontSize: 14,
                          }}
                        >
                          {er.resultat}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    borderRight: 1.5,
                    borderRightColor: "grey",
                    borderBottom: 1.5,
                    borderBottomColor: "grey",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                      borderLeft: 1,
                      borderLeftColor: "grey",
                    }}
                  >
                    <View
                      style={{
                        ...styles.tableCol,
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 14,
                        }}
                      >
                        Activités prévues
                      </Text>
                    </View>
                    {mission.plannedActivities?.map((er, index) => (
                      <View
                        key={`expected-result-${index}`}
                        style={{
                          ...styles.tableCol,
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        <Text
                          style={{
                            ...styles.tableCellHeader,
                            fontSize: 14,
                          }}
                        >
                          {er.description}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <View
                    style={{
                      width: "50%",
                    }}
                  >
                    <View
                      style={{
                        ...styles.tableCol,
                        textAlign: "left",
                        width: "100%",

                        borderRight: "none",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        Activités réalisées
                      </Text>
                    </View>
                    {mission.activites?.map((er, index) => (
                      <View
                        key={`expected-result-${index}`}
                        style={{
                          ...styles.tableCol,
                          textAlign: "left",
                          width: "100%",
                          borderRight: "none",
                        }}
                      >
                        <Text
                          style={{
                            ...styles.tableCellHeader,
                            fontSize: 14,
                          }}
                        >
                          {er.activite}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    borderRight: 1.5,
                    borderRightColor: "grey",
                    borderBottom: 1.5,
                    borderBottomColor: "grey",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                      borderLeft: 1,
                      borderLeftColor: "grey",
                    }}
                  >
                    <View
                      style={{
                        ...styles.tableCol,
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 14,
                        }}
                      >
                        Livrables prévues
                      </Text>
                    </View>
                    {mission.deliverables?.map((er, index) => (
                      <View
                        key={`expected-result-${index}`}
                        style={{
                          ...styles.tableCol,
                          textAlign: "left",
                          width: "100%",
                          borderBottom: 1,
                        }}
                      >
                        <Text
                          style={{
                            ...styles.tableCellHeader,
                            fontSize: 14,
                          }}
                        >
                          {er.description}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <View style={{ width: "50%", borderTop: "1px solid grey" }}>
                    <View
                      style={{
                        ...styles.tableCol,
                        textAlign: "left",
                        width: "100%",

                        borderRight: "none",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        Livrables obtenus
                      </Text>
                    </View>
                    {mission.livrables?.map((er, index) => (
                      <View
                        key={`expected-result-${index}`}
                        style={{
                          ...styles.tableCol,
                          textAlign: "left",
                          width: "100%",
                          borderRight: "none",
                        }}
                      >
                        <Text
                          style={{
                            ...styles.tableCellHeader,
                            fontSize: 14,
                          }}
                        >
                          {er.livrablee}
                        </Text>
                      </View>
                    ))}
                  </View>
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
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      textAlign: "left",
                      borderTop: 1,
                      borderTopColor: "grey",
                      width: "14.29%",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 14,
                      }}
                    >
                      Du
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      borderTop: 1,
                      borderTopColor: "grey",
                      textAlign: "left",
                      width: "14.29%",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Au
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      borderTop: 1,
                      borderTopColor: "grey",
                      textAlign: "left",
                      width: "14.29%",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Activités prévues
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      borderTop: 1,
                      borderTopColor: "grey",
                      textAlign: "left",
                      width: "14.29%",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Lieu
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      borderTop: 1,
                      borderTopColor: "grey",
                      textAlign: "left",
                      width: "14.29%",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Livrables prévues
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      borderTop: 1,
                      borderTopColor: "grey",
                      textAlign: "left",
                      width: "14.29%",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Livrables déposés
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      borderTop: 1,
                      borderTopColor: "grey",
                      textAlign: "left",
                      width: "14.29%",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Commentaires
                    </Text>
                  </View>
                </View>
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
                      textAlign: "left",
                      borderTop: 1,
                      borderTopColor: "grey",
                      width: "14.29%",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 14,
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
                      borderTop: 1,
                      borderTopColor: "grey",
                      textAlign: "left",
                      width: "14.29%",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      {format(new Date(mission.dateFin as Date), "dd/MM/yyyy")}
                    </Text>
                  </View>

                  <View
                    style={{
                      ...styles.tableCol,
                      borderTop: 1,
                      borderTopColor: "grey",
                      textAlign: "left",
                      width: "14.29%",
                    }}
                  >
                    {mission.plannedActivities?.map((pa) => (
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        {pa.description}
                      </Text>
                    ))}
                  </View>

                  <View
                    style={{
                      ...styles.tableCol,
                      borderTop: 1,
                      borderTopColor: "grey",
                      textAlign: "left",
                      width: "14.29%",
                    }}
                  >
                    {mission.lieux?.map((l) => (
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        {l.fokontany}
                      </Text>
                    ))}
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      borderTop: 1,
                      borderTopColor: "grey",
                      textAlign: "left",
                      width: "14.29%",
                    }}
                  >
                    {mission.deliverables?.map((d) => (
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        {d.description}
                      </Text>
                    ))}
                  </View>

                  <View
                    style={{
                      ...styles.tableCol,
                      borderTop: 1,
                      borderTopColor: "grey",
                      textAlign: "left",
                      width: "14.29%",
                    }}
                  >
                    {mission.livrables?.map((l) => (
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        {l.livrablee}
                      </Text>
                    ))}
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      borderTop: 1,
                      borderTopColor: "grey",
                      textAlign: "left",
                      width: "14.29%",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                      fontSize: 14,
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
                    fontSize: 14,
                    borderTop: 1,
                    width: "100%",
                    borderTopColor: "grey",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,

                      textAlign: "left",
                      borderColor: "grey",
                      width: "12.5%",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 14,
                      }}
                    >
                      Réf.PJ
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "12.5%",
                      textAlign: "left",
                      borderColor: "grey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 14,
                      }}
                    >
                      Date
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "12.5%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 14,
                      }}
                    >
                      Libellés
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "12.5%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Montant prévu
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "12.5%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Montant réalisé
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "12.5%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Grant
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "12.5%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Ligne budgétaire
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "12.5%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Règleme
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    ...styles.tableRow,
                    borderLeft: 1,
                    borderColor: "grey",
                    fontSize: 14,
                    borderTop: 1,
                    borderTopColor: "grey",
                    width: "100%",
                  }}
                >
                  {mission.rapportDepense?.map((rd) => (
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "12.5%",
                        textAlign: "left",
                        borderColor: "grey",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 14,
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
                        width: "12.5%",
                        textAlign: "left",
                        borderColor: "grey",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 14,
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
                        width: "12.5%",
                        borderColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 14,
                        }}
                      >
                        {rd.libelle}
                      </Text>
                    </View>
                  ))}

                  <View
                    style={{
                      ...styles.tableCol,
                      borderColor: "grey",
                      display: "flex",
                      flexWrap: "wrap",
                      textAlign: "left",
                      width: "12.5%",
                    }}
                  >
                    {mission.previsionDepense?.map((pd) => (
                      <Text
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 14,
                          marginBottom: 2,
                        }}
                      >
                        {pd.montant}
                      </Text>
                    ))}
                  </View>
                  {mission.rapportDepense?.map((rd) => (
                    <View
                      style={{
                        ...styles.tableCol,
                        borderColor: "grey",
                        display: "flex",
                        flexWrap: "wrap",
                        textAlign: "left",
                        width: "12.5%",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 14,
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
                        borderColor: "grey",
                        display: "flex",
                        flexWrap: "wrap",
                        textAlign: "left",
                        width: "12.5%",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 14,
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
                        borderColor: "grey",
                        textAlign: "left",
                        width: "12.5%",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                        width: "12.5%",
                        borderColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        {rd.modePaiement}
                      </Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    ...styles.tableRow,
                    borderLeft: 1,
                    borderColor: "grey",
                    fontSize: 14,
                    borderTop: 1,
                    width: "100%",
                    borderTopColor: "grey",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,

                      textAlign: "left",
                      borderColor: "grey",
                      width: "37.5%",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 14,
                      }}
                    >
                      TOTAL DES DEPENSES
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "12.5%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      {(() => {
                        const totalPrevue = mission.previsionDepense
                          ?.filter((f) => f.missionId == mission.id)
                          .reduce(
                            (acc: any, curr: any) => acc + curr.montant,
                            0
                          );
                        return formatMontant(Number(totalPrevue || 0));
                      })()}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "12.5%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      {(() => {
                        const totalRealise = mission.rapportDepense
                          ?.filter((f: any) => f.missionId == mission.id)
                          .reduce(
                            (acc: any, curr: any) => acc + curr.montant,
                            0
                          );
                        return formatMontant(Number(totalRealise || 0));
                      })()}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "37.5%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text
                      style={{ ...styles.tableCellHeader, fontSize: 14 }}
                    ></Text>
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
                      fontSize: 14,
                    }}
                  >
                    RÉSUMÉ DES DEPENSES PRÉVUES
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.tableRow,
                    width: "100%",
                    borderTop: 1,
                    borderTopColor: "grey",
                    borderLeft: 1,
                    borderLeftColor: "grey",
                  }}
                >
                  <View style={{ ...styles.tableCol, width: "16.67%" }}>
                    <Text style={styles.tableCellHeader}>Grant</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "16.67%" }}>
                    <View style={styles.flexColumn}>
                      <Text style={[styles.tableCellHeader]}>Ligne</Text>
                      <Text style={[styles.tableCellHeader, styles.flexEnd]}>
                        budgétaire
                      </Text>
                    </View>
                  </View>
                  <View style={{ ...styles.tableCol, width: "16.67%" }}>
                    <Text style={styles.tableCellHeader}>Dépenses prévues</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "16.67%" }}>
                    <Text style={styles.tableCellHeader}>
                      Dépenses réalisées
                    </Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "16.67%" }}>
                    <Text style={styles.tableCellHeader}>Différence</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "16.67%" }}>
                    <Text style={styles.tableCellHeader}>Remarques</Text>
                  </View>
                </View>

                <View
                  style={{
                    ...styles.tableRow,
                    width: "100%",
                    borderTop: 1,
                    borderTopColor: "grey",
                    borderLeft: 1,
                    borderLeftColor: "grey",
                  }}
                >
                  <View style={{ ...styles.tableCol, width: "16.67%" }}>
                    {mission.resumeDepensePrevue?.map((rd) => (
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        {
                          grantEncoursList.find((grant) => grant.id == rd.grant)
                            ?.code
                        }
                      </Text>
                    ))}
                  </View>
                  <View style={{ ...styles.tableCol, width: "16.67%" }}>
                    {mission.resumeDepensePrevue?.map((rd) => (
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        {
                          budgetLineList.find(
                            (budgetLine) => budgetLine.id == rd.ligneBudgetaire
                          )?.code
                        }
                      </Text>
                    ))}
                  </View>
                  <View style={{ ...styles.tableCol, width: "16.67%" }}>
                    {mission.resumeDepense
                      ?.filter((f) => f.missionId === mission.id)
                      .map((m, index) => (
                        <Text
                          key={index}
                          style={{ ...styles.tableCellHeader, fontSize: 14 }}
                        >
                          {formatMontant(Number(m.depensePrevue))}
                        </Text>
                      ))}
                  </View>
                  <View style={{ ...styles.tableCol, width: "16.67%" }}>
                    {mission.resumeDepensePrevue
                      ?.filter((f) => f.missionId === mission.id)
                      .map((m, index) => (
                        <Text
                          key={index}
                          style={{ ...styles.tableCellHeader, fontSize: 14 }}
                        >
                          {formatMontant(Number(m.depensePrevue))}
                        </Text>
                      ))}
                  </View>
                  <View style={{ ...styles.tableCol, width: "16.67%" }}>
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      {(() => {
                        const prevueSum =
                          mission.resumeDepense
                            ?.filter((f) => f.missionId === mission.id)
                            .reduce(
                              (sum, m) => sum + Number(m.depensePrevue),
                              0
                            ) || 0;

                        const rapportSum =
                          mission.resumeDepensePrevue
                            ?.filter((f) => f.missionId === mission.id)
                            .reduce(
                              (sum, m) => sum + Number(m.depensePrevue),
                              0
                            ) || 0;

                        return formatMontant(prevueSum - rapportSum);
                      })()}
                    </Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "16.67%" }}>
                    {mission.resumeDepensePrevue
                      ?.filter((f) => f.missionId === mission.id)
                      .map((m) => (
                        <Text
                          style={{ ...styles.tableCellHeader, fontSize: 14 }}
                        >
                          {m.remarque}
                        </Text>
                      ))}
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
                      fontSize: 14,
                    }}
                  >
                    CALCUL DES RELIQUATS
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.tableRow,
                    width: "100%",
                    borderTop: 1,
                    borderTopColor: "grey",
                    borderLeft: 1,
                    borderLeftColor: "grey",
                  }}
                >
                  <View style={{ ...styles.tableCol, width: "33,33%" }}>
                    <Text style={styles.tableCellHeader}>
                      Total des dépenses en espèces
                    </Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "33,33%" }}>
                    <Text style={styles.tableCellHeader}>
                      Total des reliquats en espèces
                    </Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "33.33%" }}>
                    <Text style={styles.tableCellHeader}>Balance</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "33.33%" }}>
                    <Text style={styles.tableCellHeader}>Remarques</Text>
                  </View>
                </View>
                <View
                  style={{
                    ...styles.tableRow,
                    width: "100%",
                    borderTop: 1,
                    borderTopColor: "grey",
                    borderLeft: 1,
                    borderLeftColor: "grey",
                  }}
                >
                  <View style={{ ...styles.tableCol, width: "33.33%" }}>
                    <Text style={styles.tableCellHeader}>
                      {(() => {
                        const total = mission.rapportDepense
                          ?.filter(
                            (f) =>
                              f.missionId == mission.id &&
                              f.modePaiement == "Especes"
                          )
                          .reduce((acc, curr) => acc + curr.montant!, 0);
                        return formatMontant(Number(total || 0));
                      })()}
                    </Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "33.33%" }}>
                    <Text style={styles.tableCellHeader}>
                      {(mission.resumeDepensePrevue
                        ?.filter(
                          (f: ResumeDepensePrevueItem) =>
                            f.missionId == mission.id
                        )
                        .reduce(
                          (acc, cur) => acc + (Number(cur.depensePrevue) || 0),
                          0
                        ) || 0) +
                        (mission.previsionDepense
                          ?.filter(
                            (f: PrevisionDepenseItem) =>
                              f.missionId == mission.id
                          )
                          .reduce(
                            (acc, cur) => acc + (Number(cur.imprevue) || 0),
                            0
                          ) || 0) -
                        Number(
                          mission.uncompleteTbbs?.map(
                            (retenu) => retenu.retenuAdmin
                          ) || 0
                        ) -
                        Number(
                          mission.uncompleteTbbs?.map((m) => m.depensesResp) ||
                            0
                        )}
                    </Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "33.33%" }}>
                    <Text style={styles.tableCellHeader}>
                      {(() => {
                        const total = mission.rapportDepense
                          ?.filter(
                            (f) =>
                              f.missionId == mission.id &&
                              f.modePaiement == "Especes"
                          )
                          .reduce((acc, curr) => acc + curr.montant!, 0);
                        const valeur =
                          (mission.resumeDepensePrevue
                            ?.filter(
                              (f: ResumeDepensePrevueItem) =>
                                f.missionId == mission.id
                            )
                            .reduce(
                              (acc, cur) =>
                                acc + (Number(cur.depensePrevue) || 0),
                              0
                            ) || 0) +
                          (mission.previsionDepense
                            ?.filter(
                              (f: PrevisionDepenseItem) =>
                                f.missionId == mission.id
                            )
                            .reduce(
                              (acc, cur) => acc + (Number(cur.imprevue) || 0),
                              0
                            ) || 0) -
                          Number(
                            mission.uncompleteTbbs?.map(
                              (retenu) => retenu.retenuAdmin
                            ) || 0
                          ) -
                          Number(
                            mission.uncompleteTbbs?.map(
                              (m) => m.depensesResp
                            ) || 0
                          );

                        return formatMontant(Number(total ?? 0 - valeur ?? 0));
                      })()}
                    </Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "33.33%" }}>
                    <Text style={styles.tableCellHeader}>-</Text>
                  </View>
                </View>
                {/*besoin en vehicule*/}
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
                      fontSize: 14,
                    }}
                  >
                    SUIVI LOGISTIQUE
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.tableCol,
                    height: "auto",
                    backgroundColor: "darkgrey",
                    border: "none",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      ...styles.tableCellHeader,
                      fontSize: 14,
                      border: "none",
                    }}
                  >
                    BESOIN EN VEHICULE
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.tableRow,
                    borderTop: 1,
                    borderTopColor: "grey",
                    borderLeft: 1,
                    borderLeftColor: "grey",
                  }}
                >
                  <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Du
                    </Text>
                  </View>
                  <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Au
                    </Text>
                  </View>
                  <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Nbre de jours
                    </Text>
                  </View>
                  <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Véhicule utilisé
                    </Text>
                  </View>
                  <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Trajets
                    </Text>
                  </View>
                  <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Commentaires
                    </Text>
                  </View>
                </View>
                {mission.besoinVehiculeRapport?.map((bv) => (
                  <View
                    style={{
                      ...styles.tableRow,
                      borderTop: 1,
                      borderTopColor: "grey",
                      borderLeft: 1,
                      borderLeftColor: "grey",
                    }}
                  >
                    <View
                      style={[styles.tableCol, styles.colSingleTBValidated]}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        {format(new Date(bv.dateDebut as Date), "dd/MM/yyyy")}
                      </Text>
                    </View>
                    <View
                      style={[styles.tableCol, styles.colSingleTBValidated]}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        {format(new Date(bv.dateFin as Date), "dd/MM/yyyy")}
                      </Text>
                    </View>
                    <View
                      style={[styles.tableCol, styles.colSingleTBValidated]}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        {bv.nombreJour}
                      </Text>
                    </View>
                    <View
                      style={[styles.tableCol, styles.colSingleTBValidated]}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        {
                          transportationEquipments.find(
                            (f: any) => f.id == bv.vehicule
                          )?.registration
                        }
                      </Text>
                    </View>
                    <View
                      style={[styles.tableCol, styles.colSingleTBValidated]}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        {bv.trajet}
                      </Text>
                    </View>
                  </View>
                ))}
                <View
                  style={{
                    ...styles.tableCol,
                    height: "auto",
                    backgroundColor: "darkgrey",
                    border: "none",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      ...styles.tableCellHeader,
                      fontSize: 14,
                      border: "none",
                    }}
                  >
                    CONSOMMATION EN CARBURANT-Gasoil
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.tableRow,
                    borderTop: 1,
                    borderTopColor: "grey",
                    borderLeft: 1,
                    borderLeftColor: "grey",
                  }}
                >
                  <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Consommation/100Km
                    </Text>
                  </View>
                  <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Trajet
                    </Text>
                  </View>
                  <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Distance parcourue(Km)
                    </Text>
                  </View>
                  <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Total Gasoil(L)
                    </Text>
                  </View>
                </View>
                {mission.calculCarburantRapport
                  ?.filter((f) => f.typeCarburant == "Gasoil")
                  .map((c) => (
                    <View
                      style={{
                        ...styles.tableRow,
                        borderTop: 1,
                        borderTopColor: "grey",
                        borderLeft: 1,
                        borderLeftColor: "grey",
                      }}
                    >
                      <View
                        style={[styles.tableCol, styles.colSingleTBValidated]}
                      >
                        <Text
                          style={{ ...styles.tableCellHeader, fontSize: 14 }}
                        >
                          {c.consommationKilo}
                        </Text>
                      </View>
                      <View
                        style={[styles.tableCol, styles.colSingleTBValidated]}
                      >
                        <Text
                          style={{ ...styles.tableCellHeader, fontSize: 14 }}
                        >
                          {c.trajet}
                        </Text>
                      </View>
                      <View
                        style={[styles.tableCol, styles.colSingleTBValidated]}
                      >
                        <Text
                          style={{ ...styles.tableCellHeader, fontSize: 14 }}
                        >
                          {c.distanceTotal}
                        </Text>
                      </View>
                      <View
                        style={[styles.tableCol, styles.colSingleTBValidated]}
                      >
                        <Text
                          style={{ ...styles.tableCellHeader, fontSize: 14 }}
                        >
                          {(Number(c.distanceTotal || 0) *
                            Number(c.consommationKilo || 0)) /
                            100}
                        </Text>
                      </View>
                    </View>
                  ))}
                <View
                  style={{
                    ...styles.tableCol,
                    height: "auto",
                    backgroundColor: "darkgrey",
                    border: "none",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      ...styles.tableCellHeader,
                      fontSize: 14,
                      border: "none",
                    }}
                  >
                    CONSOMMATION EN CARBURANT-Essence
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.tableRow,
                    borderTop: 1,
                    borderTopColor: "grey",
                    borderLeft: 1,
                    borderLeftColor: "grey",
                  }}
                >
                  <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Consommation/100Km
                    </Text>
                  </View>
                  <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Trajet
                    </Text>
                  </View>
                  <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Distance parcourue(Km)
                    </Text>
                  </View>
                  <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Total Gasoil(L)
                    </Text>
                  </View>
                </View>
                {mission.calculCarburantRapport
                  ?.filter((f) => f.typeCarburant == "Essence")
                  .map((c) => (
                    <View
                      style={{
                        ...styles.tableRow,
                        borderTop: 1,
                        borderTopColor: "grey",
                        borderLeft: 1,
                        borderLeftColor: "grey",
                      }}
                    >
                      <View
                        style={[styles.tableCol, styles.colSingleTBValidated]}
                      >
                        <Text
                          style={{ ...styles.tableCellHeader, fontSize: 14 }}
                        >
                          {c.consommationKilo}
                        </Text>
                      </View>
                      <View
                        style={[styles.tableCol, styles.colSingleTBValidated]}
                      >
                        <Text
                          style={{ ...styles.tableCellHeader, fontSize: 14 }}
                        >
                          {c.trajet}
                        </Text>
                      </View>
                      <View
                        style={[styles.tableCol, styles.colSingleTBValidated]}
                      >
                        <Text
                          style={{ ...styles.tableCellHeader, fontSize: 14 }}
                        >
                          {c.distanceTotal}
                        </Text>
                      </View>
                      <View
                        style={[styles.tableCol, styles.colSingleTBValidated]}
                      >
                        <Text
                          style={{ ...styles.tableCellHeader, fontSize: 14 }}
                        >
                          {(Number(c.distanceTotal || 0) *
                            Number(c.consommationKilo || 0)) /
                            100}
                        </Text>
                      </View>
                    </View>
                  ))}
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#1976d2",
                      fontWeight: "bold",
                      fontSize: 14,
                      paddingBottom: 10,
                      paddingTop: 15,
                    }}
                  >
                    VALIDATION
                  </Text>
                </View>
                <View style={{ width: "100%" }}>
                  <View
                    style={{
                      ...styles.tableRow,
                      borderTop: 1,
                      borderTopColor: "grey",
                      borderLeft: 1,
                      borderLeftColor: "grey",
                    }}
                  >
                    <View
                      style={[styles.tableCol, styles.colSingleTBValidated]}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        Poste
                      </Text>
                    </View>
                    <View
                      style={[styles.tableCol, styles.colSingleTBValidated]}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        Signature
                      </Text>
                    </View>
                    <View
                      style={[styles.tableCol, styles.colSingleTBValidated]}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        Date
                      </Text>
                    </View>
                    <View
                      style={[styles.tableCol, styles.colSingleTBValidated]}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        Lieu
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
                      style={[styles.tableCol, styles.colMergedTBValidated]}
                    >
                      <Text
                        style={{ ...styles.tableCellTBValidated, fontSize: 14 }}
                      >
                        Élaboré par :{" "}
                        {(() => {
                          const nom = employees.find(
                            (e: any) => e.id === mission.missionManagerId
                          )?.name as string;

                          const prenom = employees.find(
                            (e: any) => e.id === mission.missionManagerId
                          )?.surname as string;
                          return nom + " " + prenom;
                        })()}
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
                  <View
                    style={{
                      ...styles.tableRow,
                      borderLeft: 1,
                      borderLeftColor: "grey",
                    }}
                  >
                    <View
                      style={[styles.tableCol, styles.colMergedTBValidated]}
                    >
                      <Text
                        style={{ ...styles.tableCellTBValidated, fontSize: 14 }}
                      >
                        Vérificateur financier :{" "}
                        {(() => {
                          const nom = employees.find(
                            (e: any) => e.id === mission.verifyFinancial
                          )?.name as string;
                          const prenom = employees.find(
                            (e: any) => e.id === mission.verifyFinancial
                          )?.surname as string;
                          return nom + " " + prenom;
                        })()}
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
                  <View
                    style={{
                      ...styles.tableRow,
                      borderLeft: 1,
                      borderLeftColor: "grey",
                    }}
                  >
                    <View
                      style={[styles.tableCol, styles.colMergedTBValidated]}
                    >
                      <Text
                        style={{ ...styles.tableCellTBValidated, fontSize: 14 }}
                      >
                        Vérificateur technique :{" "}
                        {(() => {
                          const nom = employees.find(
                            (e: any) => e.id === mission.verifyTechnic
                          )?.name as string;
                          const prenom = employees.find(
                            (e: any) => e.id === mission.verifyTechnic
                          )?.surname as string;
                          return nom + " " + prenom;
                        })()}
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
                  <View
                    style={{
                      ...styles.tableRow,
                      borderLeft: 1,
                      borderLeftColor: "grey",
                    }}
                  >
                    <View
                      style={[styles.tableCol, styles.colMergedTBValidated]}
                    >
                      <Text
                        style={{ ...styles.tableCellTBValidated, fontSize: 14 }}
                      >
                        Payé par :{" "}
                        {(() => {
                          const nom = employees.find(
                            (e: any) => e.id === mission.validateFinancial
                          )?.name as string;
                          const prenom = employees.find(
                            (e: any) => e.id === mission.validateFinancial
                          )?.surname as string;

                          return nom + " " + prenom;
                        })()}
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
                </View>
              </View>
            ))}
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
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 20,
    paddingTop: 20,
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
    // Ajustement pour correspondre à la longueur souhaitée
    // borderStyle: "solid",
    borderWidth: "1px solid grey",
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 14,
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
  colSingle: {},
  colMergedTBValidated: {
    width: "100%", // 20% * 2
  },
  colSingleTBValidated: {
    width: "100%",
  },
  colSingleTBValidatedBody: {
    width: "100%",
    minHeight: 60,
    maxHeight: 60,
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
  header: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    textAlign: "center",
  },
  content: {
    marginTop: 60,
  },
});
