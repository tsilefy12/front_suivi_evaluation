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
import useFetchVoiture from "./organism/Logistique/tableBesoinVéhicules/hooks/useFetchVoiture";

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
              paddingLeft: 30,
              paddingRight: 50,
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
                width: "80%",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                color: "#D2691E",
                fontWeight: "bold",
                backgroundColor: "rgb(223, 227, 232)",
                marginLeft: 90,
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
                  fontSize: 14,
                  paddingTop: 5,
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
                      minWidth: 475,
                      maxWidth: 475,
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
                      minWidth: 475,
                      maxWidth: 475,
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
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "50%",
                      textAlign: "left",
                      borderTop: 1,
                      borderTopColor: "grey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 14,
                      }}
                    >
                      Objectifs de la mission :{" "}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "50%",
                      borderTop: 1,
                      borderTopColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "50%",
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
                      Resultats attendus :{" "}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "50%",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "50%",
                      textAlign: "left",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                      backgroundColor: "darkgrey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 14,
                      }}
                    >
                      Activités prevues :{" "}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "50%",
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
                      fontSize: 14,
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "50%",
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
                      ></Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "50%",
                        // borderTop: 1,
                        // borderTopColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "50%",
                      textAlign: "left",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                      backgroundColor: "darkgrey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 14,
                      }}
                    >
                      Livrable :{" "}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "50%",
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
                      fontSize: 14,
                    }}
                  >
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "50%",
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
                        width: "50%",
                        // borderTop: 1,
                        // borderTopColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                {mission.missionLocation?.map((er) => (
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
                        {er.village}
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
                    ...styles.tableRow,
                    borderLeft: 1,
                    borderLeftColor: "grey",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "50%",
                      textAlign: "left",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                      backgroundColor: "darkgrey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 14,
                      }}
                    >
                      Les missionnaires(MV):{" "}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "50%",
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
                    fontSize: 14,
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
                {mission.missionary?.map((m) => (
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
                    width: "100%",
                    height: 15,
                    border: "none",
                  }}
                >
                  <Text
                    style={{
                      ...styles.tableCellHeader,
                      fontSize: 14,
                      border: "none",
                    }}
                  ></Text>
                </View>
                <View
                  style={{
                    ...styles.tableCol,
                    width: "100%",
                    height: "auto",
                    backgroundColor: "darkgrey",
                    border: "none",
                    textAlign: "center",
                  }}
                >
                  <Text
                    style={{
                      ...styles.tableCellHeader,
                      fontSize: 14,
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
                    fontSize: 14,
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "50%",
                      textAlign: "left",
                      backgroundColor: "darkgrey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 14,
                        fontStyle: "italic",
                      }}
                    >
                      Véhicules utilisés :
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "50%",
                      textAlign: "center",
                      borderTop: 1,
                      borderTopColor: "grey",
                      backgroundColor: "darkgrey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 14,
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
                    fontSize: 14,
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "50%",
                      textAlign: "left",
                      backgroundColor: "darkgrey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 14,
                      }}
                    >
                      1. Voiture interne (MV)
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "50%",
                      textAlign: "center",
                      borderTop: 1,
                      borderTopColor: "grey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 14,
                      }}
                    ></Text>
                  </View>
                </View>
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
                      width: "33.33%",
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
                      Assurance
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "33.33%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Visite technique
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "33.33%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                        fontSize: 14,
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          ...styles.tableCol,
                          width: "33.33%",
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
                          {er.insuranceVehicle}
                        </Text>
                      </View>
                      <View
                        style={{
                          ...styles.tableCol,
                          width: "33.33%",
                          borderColor: "grey",
                          textAlign: "left",
                        }}
                      >
                        <Text
                          style={{ ...styles.tableCellHeader, fontSize: 14 }}
                        >
                          {er.technicalVisitVehicle}
                        </Text>
                      </View>
                      <View
                        style={{
                          ...styles.tableCol,
                          width: "33.33%",
                          borderColor: "grey",
                          textAlign: "left",
                        }}
                      >
                        <Text
                          style={{ ...styles.tableCellHeader, fontSize: 14 }}
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
                    fontSize: 14,
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "50%",
                      textAlign: "left",
                      backgroundColor: "darkgrey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 14,
                      }}
                    >
                      2. Voiture externe (location ou partenaire)
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "50%",
                      textAlign: "center",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 14,
                      }}
                    ></Text>
                  </View>
                </View>
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
                      width: "33.33%",
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
                      Assurance
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "33.33%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Visite technique
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "33.33%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                        fontSize: 14,
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          ...styles.tableCol,
                          width: "33.33%",
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
                          {er.insuranceVehicle}
                        </Text>
                      </View>
                      <View
                        style={{
                          ...styles.tableCol,
                          width: "33.33%",
                          borderColor: "grey",
                          textAlign: "left",
                        }}
                      >
                        <Text
                          style={{ ...styles.tableCellHeader, fontSize: 14 }}
                        >
                          {er.technicalVisitVehicle}
                        </Text>
                      </View>
                      <View
                        style={{
                          ...styles.tableCol,
                          width: "33.33%",
                          borderColor: "grey",
                          textAlign: "left",
                        }}
                      >
                        <Text
                          style={{ ...styles.tableCellHeader, fontSize: 14 }}
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
                    fontSize: 14,
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "50%",
                      textAlign: "left",
                      backgroundColor: "darkgrey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 14,
                      }}
                    >
                      3. Autres
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "50%",
                      textAlign: "center",
                      // borderTop: 1,
                      // borderTopColor: "grey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 14,
                      }}
                    ></Text>
                  </View>
                </View>
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
                      width: "33.33%",
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
                      Assurance
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "33.33%",
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
                      Visite technique
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "33.33%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                        fontSize: 14,
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          ...styles.tableCol,
                          width: "33.33%",
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
                          {er.insuranceVehicle}
                        </Text>
                      </View>
                      <View
                        style={{
                          ...styles.tableCol,
                          width: "33.33%",
                          borderColor: "grey",
                          textAlign: "left",
                        }}
                      >
                        <Text
                          style={{ ...styles.tableCellHeader, fontSize: 14 }}
                        >
                          {er.technicalVisitVehicle}
                        </Text>
                      </View>
                      <View
                        style={{
                          ...styles.tableCol,
                          width: "33.33%",
                          borderColor: "grey",
                          textAlign: "left",
                        }}
                      >
                        <Text
                          style={{ ...styles.tableCellHeader, fontSize: 14 }}
                        >
                          {er.safetyBeltVehicle === true ? "OUI" : "NON"}
                        </Text>
                      </View>
                    </View>
                  ))}
                <View
                  style={{
                    ...styles.tableCol,
                    width: "100%",
                    height: "auto",
                    backgroundColor: "transparent",
                    border: "none",
                    textAlign: "left",
                    paddingTop: 8,
                    fontWeight: "bold",
                  }}
                >
                  <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                    Contact pendant la mission :
                  </Text>
                </View>
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
                      borderColor: "grey",
                      borderTop: 1,
                      borderTopColor: "grey",
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
                      borderColor: "grey",
                      textAlign: "left",
                      borderTop: 1,
                      borderTopColor: "grey",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableCellHeader,
                        fontSize: 14,
                      }}
                    >
                      Lieu/Institution
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "25%",
                      borderColor: "grey",
                      textAlign: "left",
                      borderTop: 1,
                      borderTopColor: "grey",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Numéro
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "25%",
                      borderColor: "grey",
                      textAlign: "left",
                      borderTop: 1,
                      borderTopColor: "grey",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                      fontSize: 14,
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "25%",
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
                        width: "25%",
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
                        {c.locationContact}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "25%",
                        borderColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        {c.numberContact}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "25%",
                        borderColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                      fontSize: 14,
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
                    fontSize: 14,
                    borderTop: 1,
                    width: "100%",
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
                        fontSize: 14,
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
                        fontSize: 14,
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
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      1e Responsable
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    ...styles.tableRow,
                    borderLeft: 1,
                    borderColor: "grey",
                    fontSize: 14,
                    // borderTop: 1,
                    width: "100%",
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
                          fontSize: 14,
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
                          fontSize: 14,
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
                          fontSize: 14,
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
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                      fontSize: 14,
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
                    fontSize: 14,
                    borderTop: 1,
                    width: "100%",
                    borderTopColor: "grey",
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "13.3875%",
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
                      width: "20%",
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
                      width: "7.3875%",
                      borderColor: "grey",
                      textAlign: "left",
                    }}
                  >
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                      Nb
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
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                    <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                      fontSize: 14,
                      borderTop: 1,
                      width: "100%",
                      borderTopColor: "grey",
                    }}
                  >
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "13.3875%",
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
                        {format(new Date(p.date as Date), "dd/MM/yyyy")}
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
                          fontSize: 14,
                        }}
                      >
                        {p.libelle}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "7.3875%",
                        borderColor: "grey",
                        display: "flex",
                        flexWrap: "wrap",
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 14,
                          marginBottom: 2,
                        }}
                      >
                        {p.nombre}
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
                      <Text
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 14,
                          marginBottom: 2,
                        }}
                      >
                        {formatMontant(Number(p.pu))}
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
                      <Text
                        style={{
                          ...styles.tableCellHeader,
                          fontSize: 14,
                          marginBottom: 2,
                        }}
                      >
                        {formatMontant(Number(p.montant))}
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
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        {
                          grantEncoursList.find((grant) => grant.id == p.grant)
                            ?.code
                        }
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
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                        width: "20%",
                        borderColor: "grey",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
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
                      color: "#1976d2",
                      fontWeight: 700,
                      fontSize: 14,
                      paddingBottom: 5,
                    }}
                  >
                    RÉSUMÉ DES DEPENSES PREVUES
                  </Text>
                  <View
                    style={{
                      ...styles.tableRow,
                      width: "100%",
                      borderLeft: 1,
                      borderTop: 1,
                      borderColor: "grey",
                    }}
                  >
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        Grant
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <View style={styles.flexColumn}>
                        <Text
                          style={{ ...[styles.tableCellHeader], fontSize: 14 }}
                        >
                          Ligne
                        </Text>
                        <Text
                          style={{
                            ...[styles.tableCellHeader, styles.flexEnd],
                            fontSize: 14,
                          }}
                        >
                          budgétaire
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        Dépenses prévues
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        Dépenses réalisées
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        Ecart
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        Commentaires
                      </Text>
                    </View>
                  </View>
                  {/* Table Body */}
                  {mission.resumeDepense?.map((prevue: any) => (
                    <View
                      style={{
                        ...styles.tableRow,
                        borderLeft: 1,
                        borderLeftColor: "grey",
                      }}
                      key={prevue.id}
                    >
                      <View style={{ ...styles.tableCol, width: "20%" }}>
                        <Text style={{ ...styles.tableCell, fontSize: 14 }}>
                          {
                            grantEncoursList.find(
                              (grant) => grant.id == prevue.grant
                            )?.code
                          }
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol, width: "20%" }}>
                        <Text style={{ ...styles.tableCell, fontSize: 14 }}>
                          {
                            budgetLineList.find(
                              (budgetLine) =>
                                budgetLine.id == prevue.ligneBudgetaire
                            )?.code
                          }
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol, width: "20%" }}>
                        <Text style={{ ...styles.tableCell, fontSize: 14 }}>
                          {formatMontant(Number(prevue.depensePrevue || 0))}
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol, width: "20%" }}>
                        <Text style={{ ...styles.tableCell, fontSize: 14 }}>
                          {formatMontant(Number(prevue.budgetDepense || 0))}
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol, width: "20%" }}>
                        <Text style={{ ...styles.tableCell, fontSize: 14 }}>
                          {formatMontant(
                            Number(prevue.depensePrevue - prevue.budgetDepense)
                          ) || 0}
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol, width: "20%" }}>
                        <Text style={{ ...styles.tableCell, fontSize: 14 }}>
                          {prevue.remarque}
                        </Text>
                      </View>
                    </View>
                  ))}

                  <View
                    style={{
                      ...styles.tableRow,
                      width: "100%",
                      borderLeft: 1,
                      borderColor: "grey",
                      fontSize: 14,
                    }}
                  >
                    <View style={{ ...styles.tableCol, width: "40%" }}>
                      <Text style={{ ...styles.tableCellHeader, fontSize: 14 }}>
                        Total
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text style={{ ...styles.tableCell, fontSize: 14 }}>
                        {(() => {
                          const totalDepense = mission.previsionDepense
                            ?.filter((f) => f.missionId == mission.id)
                            ?.reduce(
                              (a, b) => Number(a) + Number(b.montant),
                              0
                            );
                          return formatMontant(Number(totalDepense || 0));
                        })()}
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text style={{ ...styles.tableCell, fontSize: 14 }}>
                        {(() => {
                          const totalBudget = mission.resumeDepense
                            ?.filter((f) => f.missionId == mission.id)
                            ?.reduce(
                              (a, b) => Number(a) + Number(b.depensePrevue),
                              0
                            );
                          return formatMontant(Number(totalBudget || 0));
                        })()}
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text style={{ ...styles.tableCell, fontSize: 14 }}>
                        {(() => {
                          const totalDepense = mission.previsionDepense
                            ?.filter((f) => f.missionId == mission.id)
                            ?.reduce(
                              (a, b) => Number(a) + Number(b.montant),
                              0
                            );

                          const totalBudget = mission.resumeDepense
                            ?.filter((f) => f.missionId == mission.id)
                            ?.reduce(
                              (a, b) => Number(a) + Number(b.depensePrevue),
                              0
                            );
                          const calculTotal =
                            (totalDepense || 0) - (totalBudget || 0);
                          return formatMontant(calculTotal);
                        })()}
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text
                        style={{ ...styles.tableCell, fontSize: 14 }}
                      ></Text>
                    </View>
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
                {mission.besoinEnVehicule?.map((bv) => (
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
                {mission.calculCarburant
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
                {mission.calculCarburant
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
    padding: 50,
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
});
