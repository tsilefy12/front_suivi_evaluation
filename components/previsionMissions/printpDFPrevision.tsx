import React, { useEffect, useState } from "react";
import { Flare, Print } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
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
import formatMontant from "../../hooks/format";
import useFetchResumeDepenseList from "./organism/Finances/tableResumeDepense/hooks/useFetchResumeDepense";
import { format } from "date-fns";
import useFetchEmployes from "../home/Missions/hooks/useFetchEmployees";
import { MissionItem } from "../../redux/features/mission/mission.interface";

const PrintPdfPrevision = () => {
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

  useEffect(() => {
    fetchMission();
    fetchGrants();
    fetchLigneBudgetaire();
    fetchResumeDepense();
    fetchEmployes();
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
                paddingBottom: 6,
                width: "65%",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                color: "#D2691E",
                fontWeight: "bold",
                backgroundColor: "rgb(223, 227, 232)",
              }}
            >
              Prévision de mission,{" "}
              {missionListe
                .filter(
                  (f: MissionItem) =>
                    f.notify!.map((n) => n.missionId).includes(f.id) &&
                    f.notify!.map((n) => n.type).includes("Prevision")
                )
                .map((mission) => mission.reference)}
            </Text>
          </View>
          {missionListe
            .filter(
              (f: MissionItem) =>
                f.notify!.map((n) => n.missionId).includes(f.id) &&
                f.notify!.map((n) => n.type).includes("Prevision")
            )
            .map((mission) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: 35,
                  fontSize: 12,
                  paddingTop: 5,
                  border: "1px solid gray",
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
                    ...styles.tableRow,
                    borderLeft: 1,
                    borderLeftColor: "grey",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "20.6%",
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
                      Objectifs de la mission :{" "}
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
                      {mission.missionGoals
                        ?.map((er) => er.description)
                        .join(",")}
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
                      width: "20.6%",
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
                      Resultats attendus :{" "}
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
                      {mission.exceptedResults
                        ?.map((er) => er.description)
                        .join(",")}
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
                      width: "20.6%",
                      textAlign: "left",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                      backgroundColor: "grey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                      }}
                    >
                      Activités prevues :{" "}
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
                    <Text style={styles.tableCellHeader}></Text>
                  </View>
                </View>
                {mission.plannedActivities?.map((er) => (
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
                        width: "20.6%",
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
                        width: "62.5%",
                        // borderTop: 1,
                        // borderTopColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        {er.description}
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
                      width: "20.6%",
                      textAlign: "left",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                      backgroundColor: "grey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                        backgroundColor: "grey",
                      }}
                    >
                      Livrable :{" "}
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
                    <Text style={styles.tableCellHeader}></Text>
                  </View>
                </View>
                {mission.deliverables?.map((er) => (
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
                        width: "20.6%",
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
                        width: "62.5%",
                        // borderTop: 1,
                        // borderTopColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        {er.description}
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
                      width: "20.6%",
                      textAlign: "left",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                      backgroundColor: "grey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                        backgroundColor: "grey",
                      }}
                    >
                      Lieux de mission :{" "}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "20.83%",
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
                      width: "20.83%",
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
                      width: "20.83%",
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
                {mission.missionLocation?.map((er) => (
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
                        width: "20.6%",
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
                        width: "20.83%",
                        // borderTop: 1,
                        // borderTopColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        {er.village}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "20.83%",
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
                        width: "20.83%",
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
                    borderLeft: 1,
                    borderLeftColor: "grey",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "20.6%",
                      textAlign: "left",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                      backgroundColor: "grey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                        backgroundColor: "grey",
                      }}
                    >
                      Les missionnaires(MV):{" "}
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
                    <Text style={styles.tableCellHeader}></Text>
                  </View>
                </View>
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
                      width: "20.6%",
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
                      width: "20.83%",
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
                      width: "20.83%",
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
                      width: "20.83%",
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
                {mission.missionary?.map((m) => (
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
                        width: "20.6%",
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
                        {`${m.firstNameMissionary} ${m.lastNameMissionary}`}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "20.83%",
                        borderTop: 1,
                        borderTopColor: "grey",
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
                        width: "20.83%",
                        borderTop: 1,
                        borderTopColor: "grey",
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
                        width: "20.83%",
                        borderTop: 1,
                        borderTopColor: "grey",
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
                    ...styles.tableCol,
                    width: "83.1%",
                    height: 15,
                    border: "none",
                  }}
                >
                  <Text
                    style={{
                      ...styles.tableCellHeader,
                      fontSize: 9,
                      border: "none",
                    }}
                  ></Text>
                </View>
                <View
                  style={{
                    ...styles.tableCol,
                    width: "83.1%",
                    height: "auto",
                    backgroundColor: "grey",
                    border: "none",
                    textAlign: "center",
                  }}
                >
                  <Text
                    style={{
                      ...styles.tableCellHeader,
                      fontSize: 9,
                      border: "none",
                    }}
                  >
                    Autre informations importantes
                  </Text>
                </View>
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
                      width: "20.6%",
                      textAlign: "left",
                      backgroundColor: "darkgrey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                        fontStyle: "italic",
                      }}
                    >
                      Véhicules utilisés :
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "62.5%",
                      textAlign: "center",
                      borderTop: 1,
                      borderTopColor: "grey",
                      backgroundColor: "darkgrey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                      }}
                    >
                      Champs obligatoires
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    ...styles.tableRow,
                    borderLeft: 1,
                    borderColor: "grey",
                    fontSize: 8,
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "20.6%",
                      textAlign: "left",
                      backgroundColor: "darkgrey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                      }}
                    >
                      1. Voiture interne (MV)
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "62.5%",
                      textAlign: "center",
                      borderTop: 1,
                      borderTopColor: "grey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                      }}
                    ></Text>
                  </View>
                </View>
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
                      width: "20.5%",
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
                      Assurance
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "31.25%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Visite technique
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "31.25%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Disposition de sécurité
                    </Text>
                  </View>
                </View>
                {mission.vehicle
                  ?.filter((f) => f.vehicleType != "PRIVATE")
                  .map((er) => (
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
                          width: "20.5%",
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
                          {er.insuranceVehicle}
                        </Text>
                      </View>
                      <View
                        style={{
                          ...styles.tableCol,
                          width: "31.25%",
                          borderColor: "grey",
                          textAlign: "left",
                        }}
                      >
                        <Text
                          style={{ ...styles.tableCellHeader, fontSize: 9 }}
                        >
                          {er.technicalVisitVehicle}
                        </Text>
                      </View>
                      <View
                        style={{
                          ...styles.tableCol,
                          width: "31.25%",
                          borderColor: "grey",
                          textAlign: "left",
                        }}
                      >
                        <Text
                          style={{ ...styles.tableCellHeader, fontSize: 9 }}
                        >
                          {er.safetyBeltVehicle === true ? "OUI" : "NON"}
                        </Text>
                      </View>
                    </View>
                  ))}
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
                      width: "20.5%",
                      textAlign: "left",
                      backgroundColor: "darkgrey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                      }}
                    >
                      2. Voiture externe (location ou partenaire)
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "62.5%",
                      textAlign: "center",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                      }}
                    ></Text>
                  </View>
                </View>
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
                      width: "20.5%",
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
                      Assurance
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "31.25%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Visite technique
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "31.25%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Disposition de sécurité
                    </Text>
                  </View>
                </View>
                {mission.vehicle
                  ?.filter((f) => f.vehicleType == "PRIVATE")
                  .map((er) => (
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
                          width: "20.5%",
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
                          {er.insuranceVehicle}
                        </Text>
                      </View>
                      <View
                        style={{
                          ...styles.tableCol,
                          width: "31.25%",
                          borderColor: "grey",
                          textAlign: "left",
                        }}
                      >
                        <Text
                          style={{ ...styles.tableCellHeader, fontSize: 9 }}
                        >
                          {er.technicalVisitVehicle}
                        </Text>
                      </View>
                      <View
                        style={{
                          ...styles.tableCol,
                          width: "31.25%",
                          borderColor: "grey",
                          textAlign: "left",
                        }}
                      >
                        <Text
                          style={{ ...styles.tableCellHeader, fontSize: 9 }}
                        >
                          {er.safetyBeltVehicle === true ? "OUI" : "NON"}
                        </Text>
                      </View>
                    </View>
                  ))}
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
                      width: "20.6%",
                      textAlign: "left",
                      backgroundColor: "darkgrey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                      }}
                    >
                      3. Autres
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "62.5%",
                      textAlign: "center",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 9,
                      }}
                    ></Text>
                  </View>
                </View>
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
                      width: "20.5%",
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
                      Assurance
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "31.25%",
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
                      Visite technique
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "31.25%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Disposition de sécurité
                    </Text>
                  </View>
                </View>
                {mission.vehicle
                  ?.filter((f) => f.vehicleType == "OTHER")
                  .map((er) => (
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
                          width: "20.5%",
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
                          {er.insuranceVehicle}
                        </Text>
                      </View>
                      <View
                        style={{
                          ...styles.tableCol,
                          width: "31.25%",
                          borderColor: "grey",
                          textAlign: "left",
                        }}
                      >
                        <Text
                          style={{ ...styles.tableCellHeader, fontSize: 9 }}
                        >
                          {er.technicalVisitVehicle}
                        </Text>
                      </View>
                      <View
                        style={{
                          ...styles.tableCol,
                          width: "31.25%",
                          borderColor: "grey",
                          textAlign: "left",
                        }}
                      >
                        <Text
                          style={{ ...styles.tableCellHeader, fontSize: 9 }}
                        >
                          {er.safetyBeltVehicle === true ? "OUI" : "NON"}
                        </Text>
                      </View>
                    </View>
                  ))}
                <View
                  style={{
                    ...styles.tableCol,
                    width: "83.1%",
                    height: "auto",
                    backgroundColor: "transparent",
                    border: "none",
                    textAlign: "left",
                    paddingTop: 8,
                    fontWeight: "bold",
                  }}
                >
                  <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                    Contact pendant la mission :
                  </Text>
                </View>
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
                      width: "20.5%",
                      textAlign: "left",
                      borderColor: "grey",
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
                      Nom et prénoms
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "20.83%",
                      borderColor: "grey",
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
                      Lieu/Institution
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "20.83%",
                      borderColor: "grey",
                      textAlign: "left",
                      borderTop: 1,
                      borderTopColor: "grey",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Numéro
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "20.83%",
                      borderColor: "grey",
                      textAlign: "left",
                      borderTop: 1,
                      borderTopColor: "grey",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Remarques
                    </Text>
                  </View>
                </View>
                {mission.contacts?.map((c) => (
                  <View
                    style={{
                      ...styles.tableRow,
                      borderLeft: 1,
                      borderColor: "grey",
                      fontSize: 8,
                    }}
                  >
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "20.5%",
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
                        {(() => {
                          const nom = c.firstNameContact;
                          const prenom = c.lastNameContact;
                          return nom + " " + prenom;
                        })()}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "20.83%",
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
                        {c.locationContact}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "20.83%",
                        borderColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        {c.numberContact}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "20.83%",
                        borderColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        {c.noteContact}
                      </Text>
                    </View>
                  </View>
                ))}
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
                    }}
                  >
                    PROGRAMME DE LA MISSION
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
                      width: "12.5%",
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
                      Du
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
                        fontSize: 9,
                      }}
                    >
                      Au
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
                      Activtés prévues
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
                      Lieu
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
                      Livrables
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
                      1e Responsable
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    ...styles.tableRow,
                    borderLeft: 1,
                    borderColor: "grey",
                    fontSize: 8,
                    // borderTop: 1,
                    width: "83.1%",
                    // borderTopColor: "grey",
                  }}
                >
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
                      width: "12.5%",
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
                      {format(new Date(mission.dateFin as Date), "dd/MM/yyyy")}
                    </Text>
                  </View>
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
                    {mission.plannedActivities?.map((m, index) => (
                      <Text
                        key={index}
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 9,
                          marginBottom: 2,
                        }}
                      >
                        {m.description}
                      </Text>
                    ))}
                  </View>

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
                    {mission.missionLocation?.map((m) => (
                      <Text
                        key={m.id}
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 9,
                          marginBottom: 2,
                        }}
                      >
                        {m.village}
                      </Text>
                    ))}
                  </View>
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
                    {mission.deliverables?.map((m) => (
                      <Text
                        key={m.id}
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 9,
                          marginBottom: 2,
                        }}
                      >
                        {m.description}
                      </Text>
                    ))}
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
                      {(() => {
                        const nom = employees.find(
                          (e) => e.id == mission.missionManagerId
                        )?.name;
                        const prenom = employees.find(
                          (e) => e.id == mission.missionManagerId
                        )?.surname;
                        return nom + " " + prenom;
                      })()}
                    </Text>
                  </View>
                </View>

                {/*previson des depense */}
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
                    }}
                  >
                    PRÉVISION DES DÉPENSES
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
                      width: "20%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                      Nb
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
                      PU
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
                      Montant
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
                      Regleme
                    </Text>
                  </View>
                </View>
                {mission.previsionDepense?.map((p) => (
                  <View
                    key={p.id}
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
                        {format(new Date(p.date as Date), "dd/MM/yyyy")}
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
                      <Text
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 9,
                        }}
                      >
                        {p.libelle}
                      </Text>
                    </View>
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
                        {p.nombre}
                      </Text>
                    </View>

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
                        {formatMontant(Number(p.pu))}
                      </Text>
                    </View>
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
                        {formatMontant(Number(p.montant))}
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
                        {
                          grantEncoursList.find((grant) => grant.id == p.grant)
                            ?.code
                        }
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
                        {
                          budgetLineList.find(
                            (budgetLine) => budgetLine.id == p.ligneBudgetaire
                          )?.code
                        }
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
                        {p.regleme}
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
                      textAlign: "center",
                      width: "100%",
                      color: "black",
                      fontWeight: 700,
                      fontSize: 15,
                      paddingBottom: 5,
                    }}
                  >
                    RÉSUMÉ DES DEPENSES PREVUES
                  </Text>
                  <View
                    style={{
                      ...styles.tableRow,
                      width: "83.1%",
                      borderLeft: 1,
                      borderTop: 1,
                      borderColor: "grey",
                    }}
                  >
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        Grant
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <View style={styles.flexColumn}>
                        <Text
                          style={{ ...[styles.tableCellHeader], fontSize: 9 }}
                        >
                          Ligne
                        </Text>
                        <Text
                          style={{
                            ...[styles.tableCellHeader, styles.flexEnd],
                            fontSize: 9,
                          }}
                        >
                          budgétaire
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        Dépenses prévues
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        Budget de dépense
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        Ecart
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        Commentaires
                      </Text>
                    </View>
                  </View>
                  {/* Table Body */}
                  {mission.resumeDepensePrevue?.map((prevue: any) => (
                    <View style={{ ...styles.tableRow }} key={prevue.id}>
                      <View style={{ ...styles.tableCol, width: "20%" }}>
                        <Text style={{ ...styles.tableCell, fontSize: 9 }}>
                          {
                            grantEncoursList.find(
                              (grant) => grant.id == prevue.grant
                            )?.code
                          }
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol, width: "20%" }}>
                        <Text style={{ ...styles.tableCell, fontSize: 9 }}>
                          {
                            budgetLineList.find(
                              (budgetLine) =>
                                budgetLine.id == prevue.ligneBudgetaire
                            )?.code
                          }
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol, width: "20%" }}>
                        <Text style={{ ...styles.tableCell, fontSize: 9 }}>
                          {formatMontant(Number(prevue.depensePrevue))}
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol, width: "20%" }}>
                        <Text style={{ ...styles.tableCell, fontSize: 9 }}>
                          {formatMontant(Number(prevue.budgetDepense))}
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol, width: "20%" }}>
                        <Text style={{ ...styles.tableCell, fontSize: 9 }}>
                          {formatMontant(
                            Number(prevue.depensePrevue - prevue.budgetDepense)
                          )}
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol, width: "20%" }}>
                        <Text style={{ ...styles.tableCell, fontSize: 9 }}>
                          {prevue.remarque}
                        </Text>
                      </View>
                    </View>
                  ))}

                  <View
                    style={{
                      ...styles.tableRow,
                      width: "83.1%",
                      borderLeft: 1,
                      borderColor: "grey",
                      fontSize: 8,
                    }}
                  >
                    <View style={{ ...styles.tableCol, width: "40%" }}>
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        Total
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text style={{ ...styles.tableCell, fontSize: 9 }}>
                        {(() => {
                          const totalDepense = mission.resumeDepensePrevue
                            ?.filter((f) => f.missionId == mission.id)
                            ?.reduce(
                              (a, b) => Number(a) + Number(b.depensePrevue),
                              0
                            );
                          return formatMontant(Number(totalDepense || 0));
                        })()}
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text style={{ ...styles.tableCell, fontSize: 9 }}>
                        {(() => {
                          const totalBudget = mission.resumeDepensePrevue
                            ?.filter((f) => f.missionId == mission.id)
                            ?.reduce(
                              (a, b) => Number(a) + Number(b.budgetDepense),
                              0
                            );
                          return formatMontant(Number(totalBudget || 0));
                        })()}
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text style={{ ...styles.tableCell, fontSize: 9 }}>
                        {(() => {
                          const totalDepense = mission.resumeDepensePrevue
                            ?.filter((f) => f.missionId == mission.id)
                            ?.reduce(
                              (a, b) => Number(a) + Number(b.depensePrevue),
                              0
                            );

                          const totalBudget = mission.resumeDepensePrevue
                            ?.filter((f) => f.missionId == mission.id)
                            ?.reduce(
                              (a, b) => Number(a) + Number(b.budgetDepense),
                              0
                            );
                          const calculTotal =
                            (totalDepense || 0) - (totalBudget || 0);
                          return formatMontant(calculTotal);
                        })()}
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text style={{ ...styles.tableCell, fontSize: 9 }}></Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      width: "100%",
                      color: "black",
                      fontWeight: "bold",
                      fontSize: 15,
                      paddingBottom: 10,
                      paddingTop: 15,
                    }}
                  >
                    VALIDATION
                  </Text>
                </View>
                <View style={{ width: "83.1%" }}>
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
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        Poste
                      </Text>
                    </View>
                    <View
                      style={[styles.tableCol, styles.colSingleTBValidated]}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        Signature
                      </Text>
                    </View>
                    <View
                      style={[styles.tableCol, styles.colSingleTBValidated]}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
                        Date
                      </Text>
                    </View>
                    <View
                      style={[styles.tableCol, styles.colSingleTBValidated]}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 9 }}>
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
                        style={{ ...styles.tableCellTBValidated, fontSize: 9 }}
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
                        style={{ ...styles.tableCellTBValidated, fontSize: 9 }}
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
                        style={{ ...styles.tableCellTBValidated, fontSize: 9 }}
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
                        style={{ ...styles.tableCellTBValidated, fontSize: 9 }}
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
    downloadLink.download = "Prevision.pdf";
    downloadLink.click();
    console.log("pdf blob", resumeDepenseList);
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

export default PrintPdfPrevision;

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
    borderColor: "grey",
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
