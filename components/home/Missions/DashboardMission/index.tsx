import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import Moment from "react-moment";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import useFetchMissionListe from "../hooks/useFetchMissionListe";
import { updateMission } from "../../../../redux/features/mission";
import { MissionItem } from "../../../../redux/features/mission/mission.interface";
import useFetchGrants from "../../../GrantsEnCours/hooks/getGrants";
import useFetchEmploys from "../../../GrantsEnCours/hooks/getResponsable";
import formatMontant from "../../../../hooks/format";
import useFetchPrevisionDepenseList from "../../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchPrevisionDepense";
import { Visibility } from "@mui/icons-material";
import { EmployeItem } from "../../../../redux/features/employe/employeSlice.interface";
import { UnCompleteTbbItem } from "../../../../redux/features/unCompleteTbb/unCompleteTbb.interface";
import { LieuxRapportItem } from "../../../../redux/features/lieuxRapport/lieuxRapport.interface";
import { GrantEncoursItem } from "../../../../redux/features/grantEncours/grantEncours.interface";
import { PrevisionDepenseItem } from "../../../../redux/features/PrevisionDepense/previsionDepense.interface";
import { MissionLocationItem } from "../../../../redux/features/missionLocation/missionLocationSlice.interface";
import { ResumeDepensePrevueItem } from "../../../../redux/features/resumeDepensePrevue/reumeDepensePrevue.interface";
import { RapportDepenseItem } from "../../../../redux/features/rapportDepense/rapportDepense.interface";
const DashboardMission = () => {
  const router = useRouter();
  // const id: any = router.query;
  const { missionListe } = useAppSelector((state) => state.mission);
  const fetchMissionListe = useFetchMissionListe();
  const fetchGrants = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state) => state.employe);
  const fetchPrevisionDepense = useFetchPrevisionDepenseList();

  React.useEffect(() => {
    fetchMissionListe();
    fetchGrants();
    fetchEmployes();
    fetchPrevisionDepense();
  }, []);
  return (
    <Container maxWidth="xl">
      <SectionDetails>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{
            flex: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            id="tableTitle"
            component="div"
            sx={{ paddingcenter: 2 }}
          >
            Dashboard mission
          </Typography>
          <Stack
            direction={"row"}
            gap={2}
            flexWrap={"wrap"}
            sx={{ paddingRight: 2 }}
          >
            <Link href={"/missions/ListMission"}>
              <Button color="primary" variant="contained">
                Liste des missions
              </Button>
            </Link>
          </Stack>
        </Stack>
        <div style={{ overflow: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Réf. budget
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Type
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Responsable
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Gestionnaires
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Lieu
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Vérif. technique
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Vérif. financier
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Budgets
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Grants
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Imprevu
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Total budget
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Retenu admin
                </TableCell>
                <TableCell sx={{ minWidth: 150, maxWidth: 150 }} align="center">
                  Remis responsable total
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Moyen remise
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Remise Grants
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  DépensesAdmin
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Dépenses responsable
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Reliquat admin
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Reliquat responsable
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Coût mission
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Rapport technique
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Rapport financier
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Ordre de mission
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Pièces classées
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Status
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Remarque attente
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Utilisation imprevue
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Explication imprevue
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Date RF
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Alarme
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {missionListe.map((row: MissionItem, index: any) => (
                <TableRow key={row.id}>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {row.RefBudget}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {row.uncompleteTbbs!.map((m: UnCompleteTbbItem) => m.type)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200, alignItems: "start" }}
                  >
                    {`${
                      employees.find(
                        (e: EmployeItem) => e.id === row.missionManagerId
                      )?.name as string
                    } ${" "}
                      ${
                        employees.find(
                          (e: EmployeItem) => e.id === row.missionManagerId
                        )?.surname as string
                      } `}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {employees
                      .filter((e: EmployeItem) =>
                        row.budgetManagerId?.includes(e.id as string)
                      )
                      .map((m: EmployeItem) => (
                        <Stack
                          direction={"column"}
                          key={m.id!}
                          alignItems={"start"}
                          justifyContent={"left"}
                          paddingLeft={2}
                        >
                          {m.name} {m.surname}
                        </Stack>
                      ))}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {row.missionLocation!.map(
                      (l: MissionLocationItem) => l.district!
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {employees
                      .filter((e: EmployeItem) =>
                        row.verifyTechnic?.includes(e.id as string)
                      )
                      .map((m: EmployeItem) => (m.name, m.surname))
                      .join(", ")}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 120, maxWidth: 120 }}
                  >
                    {employees
                      .filter((e: EmployeItem) =>
                        row.verifyFinancial?.includes(e.id as string)
                      )
                      .map((m: EmployeItem) => m.name)
                      .join(", ")}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 120, maxWidth: 120 }}
                  >
                    {formatMontant(
                      row.resumeDepensePrevue
                        ?.filter((f: ResumeDepensePrevueItem) => f.grant)
                        .reduce((acc, cur) => {
                          const budget = Number(cur.budgetDepense);
                          return acc + (isNaN(budget) ? 0 : budget);
                        }, 0) || 0
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 120, maxWidth: 120 }}
                  >
                    {
                      grantEncoursList.find(
                        (g: GrantEncoursItem) =>
                          g.id === row.resumeDepensePrevue?.map((m) => m.grant)
                      )?.code
                    }
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {formatMontant(
                      row.previsionDepense
                        ?.filter((f: PrevisionDepenseItem) => f.grant)
                        .reduce((acc, cur) => {
                          const imprevu = Number(cur.imprevue);
                          return acc + (isNaN(imprevu) ? 0 : imprevu);
                        }, 0) || 0
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {formatMontant(
                      (row.resumeDepensePrevue
                        ?.filter((f: ResumeDepensePrevueItem) => f.grant)
                        .reduce((acc, cur) => {
                          const budget = Number(cur.budgetDepense);
                          return acc + (isNaN(budget) ? 0 : budget);
                        }, 0) || 0) +
                        (row.previsionDepense
                          ?.filter((f: PrevisionDepenseItem) => f.grant)
                          .reduce((acc, cur) => {
                            const imprevu = Number(cur.imprevue);
                            return acc + (isNaN(imprevu) ? 0 : imprevu);
                          }, 0) || 0)
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {formatMontant(
                      Number(
                        row.uncompleteTbbs!.map((retenu) => retenu.retenuAdmin)
                      )
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {formatMontant(
                      (row.resumeDepensePrevue
                        ?.filter((f: ResumeDepensePrevueItem) => f.grant)
                        .reduce((acc, cur) => {
                          const budget = Number(cur.budgetDepense);
                          return acc + (isNaN(budget) ? 0 : budget);
                        }, 0) || 0) +
                        (row.previsionDepense
                          ?.filter((f: PrevisionDepenseItem) => f.grant)
                          .reduce((acc, cur) => {
                            const imprevu = Number(cur.imprevue);
                            return acc + (isNaN(imprevu) ? 0 : imprevu);
                          }, 0) || 0) -
                        Number(
                          row.uncompleteTbbs!.map(
                            (retenu) => retenu.retenuAdmin
                          )
                        )
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {row.uncompleteTbbs!.map((m) => m.moyenRemise)}
                  </TableCell>
                  <TableCell>
                    {
                      grantEncoursList.find(
                        (g: any) =>
                          g.id ==
                          row.rapportDepense!.map(
                            (m: RapportDepenseItem) => m.grant
                          )
                      )?.code
                    }
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {formatMontant(
                      Number(row.uncompleteTbbs!.map((m) => m.depenseAdmin))
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {formatMontant(
                      Number(row.uncompleteTbbs!.map((m) => m.depensesResp))
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {formatMontant(
                      Number(
                        row.uncompleteTbbs!.map((retenu) => retenu.retenuAdmin)
                      ) - Number(row.uncompleteTbbs!.map((m) => m.depenseAdmin))
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {formatMontant(
                      (row.resumeDepensePrevue
                        ?.filter((f: ResumeDepensePrevueItem) => f.grant)
                        .reduce((acc, cur) => {
                          const budget = Number(cur.budgetDepense);
                          return acc + (isNaN(budget) ? 0 : budget);
                        }, 0) || 0) +
                        (row.previsionDepense
                          ?.filter((f: PrevisionDepenseItem) => f.grant)
                          .reduce((acc, cur) => {
                            const imprevu = Number(cur.imprevue);
                            return acc + (isNaN(imprevu) ? 0 : imprevu);
                          }, 0) || 0) -
                        Number(
                          row.uncompleteTbbs!.map(
                            (retenu) => retenu.retenuAdmin
                          )
                        ) -
                        Number(row.uncompleteTbbs!.map((m) => m.depensesResp))
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {formatMontant(
                      Number(row.uncompleteTbbs!.map((m) => m.depenseAdmin)) +
                        Number(row.uncompleteTbbs!.map((m) => m.depensesResp))
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {(() => {
                      const validateTechnic = row.verifyTechnic;
                      if (row.validationRapport) {
                        const isOk = row.validationRapport.some(
                          (rapport) =>
                            rapport.responsableId === validateTechnic &&
                            rapport.validation === true
                        );

                        if (isOk) {
                          return "Ok";
                        }
                      }

                      return "En attente";
                    })()}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {(() => {
                      const validateFinancial = row.verifyFinancial;
                      if (row.validationRapport) {
                        const isOk = row.validationRapport.some(
                          (rapport) =>
                            rapport.responsableId === validateFinancial &&
                            rapport.validation === true
                        );

                        if (isOk) {
                          return "Ok";
                        }
                      }

                      return "En attente";
                    })()}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {row.uncompleteTbbs!.map((m) => m.ordreDeMission)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {row.uncompleteTbbs!.map((m) => m.piecesClassees)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {row.status}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {row.uncompleteTbbs!.map((m) => m.remarqueAttente)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {(() => {
                      // Calcul du total des dépenses administratives et des dépenses responsables
                      const totalDepenseAdmin = row.uncompleteTbbs!.reduce(
                        (acc, m) => acc + Number(m.depenseAdmin),
                        0
                      );
                      const totalDepenseResp = row.uncompleteTbbs!.reduce(
                        (acc, m) => acc + Number(m.depensesResp),
                        0
                      );
                      const totalCouMission =
                        totalDepenseAdmin + totalDepenseResp;

                      // Calcul du total des budgets
                      const totalBudgets =
                        row.resumeDepensePrevue
                          ?.filter((f) => f.grant)
                          .reduce((acc, cur) => {
                            const budget = Number(cur.budgetDepense);
                            return acc + (isNaN(budget) ? 0 : budget);
                          }, 0) || 0;

                      // Calcul du total des imprévus
                      const totalImprevue =
                        row.previsionDepense
                          ?.filter((f) => f.grant)
                          .reduce((acc, cur) => {
                            const imprevu = Number(cur.imprevue);
                            return acc + (isNaN(imprevu) ? 0 : imprevu);
                          }, 0) || 0;

                      // Éviter la division par zéro
                      const resultat =
                        totalImprevue !== 0
                          ? (totalCouMission - totalBudgets) / totalImprevue
                          : 0;

                      return resultat.toFixed(2) + " %";
                    })()}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {row.uncompleteTbbs!.map((m) => m.explicationImprevu)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {row.uncompleteTbbs!.map((m) => (
                      <Moment format="DD/MM/yyyy" key={m.id}>
                        {m.dateRF}
                      </Moment>
                    ))}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {(() => {
                      const dates = row
                        .uncompleteTbbs!.map((m) => m.dateRF)
                        .filter(Boolean);
                      const date = dates.length > 0 ? dates[0] : "";
                      if (!date) {
                        return "Alarme";
                      } else {
                        const dateRF = new Date(date);
                        const dateFin = new Date(row.dateFin as Date);
                        if (dateRF.getTime() > dateFin.getTime()) {
                          return "Retard";
                        } else {
                          return "Ok";
                        }
                      }
                    })()}
                  </TableCell>

                  <TableCell>
                    <Link href={`/missions/${row.id}/bilan`}>
                      <Button
                        color="accent"
                        aria-label="Details"
                        component="span"
                      >
                        <Visibility />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionDetails>
    </Container>
  );
};

export default DashboardMission;

export const SectionNavigation = styled(Stack)(({}) => ({}));

const SectionDetails = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  marginBlock: 15,
  background: theme.palette.common.white,
  borderRadius: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
}));

export const InfoItems = styled(Stack)(({ theme }) => ({}));

export const CardFooter = styled("div")(({ theme }) => ({
  background: theme.palette.grey[100],
  paddingInline: theme.spacing(2),
  paddingBlock: theme.spacing(1),
  borderBottomcenterRadius: theme.spacing(2),
  borderBottomRightRadius: theme.spacing(2),
}));
