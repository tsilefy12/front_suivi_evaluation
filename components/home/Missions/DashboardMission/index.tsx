import { ArrowBack, Search, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  InputAdornment,
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
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Moment from "react-moment";
import { usePermitted } from "../../../../config/middleware";
import formatMontant from "../../../../hooks/format";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { EmployeItem } from "../../../../redux/features/employe/employeSlice.interface";
import { GrantEncoursItem } from "../../../../redux/features/grantEncours/grantEncours.interface";
import { MissionItem } from "../../../../redux/features/mission/mission.interface";
import { MissionLocationItem } from "../../../../redux/features/missionLocation/missionLocationSlice.interface";
import { PrevisionDepenseItem } from "../../../../redux/features/PrevisionDepense/previsionDepense.interface";
import { RapportDepenseItem } from "../../../../redux/features/rapportDepense/rapportDepense.interface";
import { ResumeDepensePrevueItem } from "../../../../redux/features/resumeDepensePrevue/reumeDepensePrevue.interface";
import { UnCompleteTbbItem } from "../../../../redux/features/unCompleteTbb/unCompleteTbb.interface";
import useFetchGrants from "../../../GrantsEnCours/hooks/getGrants";
import useFetchEmploys from "../../../GrantsEnCours/hooks/getResponsable";
import useFetchPrevisionDepenseList from "../../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchPrevisionDepense";
import useFetchMissionListe from "../hooks/useFetchMissionListe";
import { da } from "date-fns/locale";
import { set } from "date-fns";
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
  const validate = usePermitted();

  React.useEffect(() => {
    fetchMissionListe();
    fetchGrants();
    fetchEmployes();
    fetchPrevisionDepense();
  }, []);
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState<any[]>([]);

  useEffect(() => {
    if (search !== "") {
      const donne = missionListe.filter(
        (m: MissionItem) =>
          m.RefBudget!.toLowerCase().includes(search.toLowerCase()) ||
          employees
            .find((e: EmployeItem) => e.id === m.missionManagerId)
            ?.name!.toLowerCase()
            .includes(search.toLowerCase()) ||
          employees
            .find((e: EmployeItem) => e.id === m.missionManagerId)
            ?.surname!.toLowerCase()
            .includes(search.toLowerCase())
      );
      setData(donne.reverse());
    } else {
      setData([...missionListe].reverse());
    }
  }, [search, missionListe]);
  return (
    <Container maxWidth="xl">
      <Link href={"/"}>
        <Button color="info" variant="text" startIcon={<ArrowBack />}>
          Retour
        </Button>
      </Link>
      <SectionDetails>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          // spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{
            flex: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" id="tableTitle" component="div">
            Tableau de bord mission
          </Typography>
          <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
            {validate("Suivi dashboard mission", "RA") && (
              <Link href={"/missions/ListMission"}>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  sx={{ minHeight: 40, maxHeight: 40 }}
                >
                  Liste des missions
                </Button>
              </Link>
            )}
            <TextField
              id="outlined-basic"
              label="Rechercher"
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search sx={{ color: "GrayText", fontSize: 20 }} />
                  </InputAdornment>
                ),
                autoComplete: "off",
              }}
            />
          </Stack>
        </Stack>
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "100%" }} align="left">
                  Réf. budget
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Type
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Responsable
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Gestionnaires
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Lieu
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Vérif. technique
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Vérif. financier
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Budgets
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Grants
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Imprevu
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Total budget
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Retenu admin
                </TableCell>
                <TableCell sx={{ minWidth: 150, maxWidth: 150 }} align="left">
                  Remis responsable total
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Moyen remise
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Remise Grants
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Dépenses admin
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Dépenses responsable
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Reliquat admin
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Reliquat responsable
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Coût mission
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Rapport technique
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Rapport financier
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Ordre de mission
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Pièces classées
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Status
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Remarque attente
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Utilisation imprevue
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Explication imprevue
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Date RF
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="left">
                  Alarme
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: MissionItem, index: any) => (
                <TableRow key={row.id}>
                  <TableCell align="left" sx={{ width: "100%" }}>
                    {row.RefBudget}
                  </TableCell>
                  <TableCell align="left" sx={{ width: "100%" }}>
                    {row.uncompleteTbbs!.map((m: UnCompleteTbbItem) => m.type)}
                  </TableCell>
                  <TableCell align="left" sx={{ width: "100%" }}>
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
                  <TableCell align="left" sx={{ width: "100%" }}>
                    {employees
                      .filter((e: EmployeItem) =>
                        row.budgetManagerId?.includes(e.id as string)
                      )
                      .map((m: EmployeItem) => (
                        <Stack
                          direction={"column"}
                          key={m.id!}
                          alignItems={"start"}
                          justifyContent={"space-between"}
                          gap={2}
                        >
                          {m.name} {m.surname}
                        </Stack>
                      ))}
                  </TableCell>
                  <TableCell align="left" sx={{ width: "100%" }}>
                    {row.missionLocation!.map(
                      (l: MissionLocationItem) => l.district!
                    )}
                  </TableCell>
                  <TableCell align="left" sx={{ width: "100%" }}>
                    {employees
                      .filter((e: EmployeItem) =>
                        row.verifyTechnic?.includes(e.id as string)
                      )
                      .map((m: EmployeItem) => `${m.name} ${" "} ${m.surname}`)}
                  </TableCell>
                  <TableCell align="left" sx={{ width: "100%" }}>
                    {employees
                      .filter((e: EmployeItem) =>
                        row.verifyFinancial?.includes(e.id as string)
                      )
                      .map((m: EmployeItem) => `${m.name} ${" "} ${m.surname}`)}
                  </TableCell>
                  <TableCell align="left" sx={{ width: "100%" }}>
                    {formatMontant(
                      row.resumeDepensePrevue
                        ?.filter((f: ResumeDepensePrevueItem) => f.grant)
                        .reduce((acc, cur) => {
                          const budget = Number(cur.budgetDepense);
                          return acc + (isNaN(budget) ? 0 : budget);
                        }, 0) || 0
                    )}
                  </TableCell>
                  <TableCell align="left" sx={{ width: "100%" }}>
                    {
                      grantEncoursList.find(
                        (g: GrantEncoursItem) =>
                          g.id === row.resumeDepensePrevue?.map((m) => m.grant)
                      )?.code
                    }
                  </TableCell>
                  <TableCell align="left" sx={{ width: "100%" }}>
                    {formatMontant(
                      row.previsionDepense
                        ?.filter((f: PrevisionDepenseItem) => f.grant)
                        .reduce((acc, cur) => {
                          const imprevu = Number(cur.imprevue);
                          return acc + (isNaN(imprevu) ? 0 : imprevu);
                        }, 0) || 0
                    )}
                  </TableCell>
                  <TableCell align="left" sx={{ width: "100%" }}>
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
                  <TableCell align="left" sx={{ width: "100%" }}>
                    {formatMontant(
                      Number(
                        row.uncompleteTbbs!.map((retenu) => retenu.retenuAdmin)
                      )
                    )}
                  </TableCell>
                  <TableCell align="left" sx={{ width: "100%" }}>
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
                  <TableCell align="left" sx={{ width: "100%" }}>
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
                  <TableCell align="left" sx={{ width: "100%" }}>
                    {formatMontant(
                      Number(row.uncompleteTbbs!.map((m) => m.depenseAdmin))
                    )}
                  </TableCell>
                  <TableCell align="left" sx={{ width: "100%" }}>
                    {formatMontant(
                      Number(row.uncompleteTbbs!.map((m) => m.depensesResp))
                    )}
                  </TableCell>
                  <TableCell align="left" sx={{ width: "100%" }}>
                    {formatMontant(
                      Number(
                        row.uncompleteTbbs!.map((retenu) => retenu.retenuAdmin)
                      ) - Number(row.uncompleteTbbs!.map((m) => m.depenseAdmin))
                    )}
                  </TableCell>
                  <TableCell align="left" sx={{ width: "100%" }}>
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
                  <TableCell align="left" sx={{ width: "100%" }}>
                    {formatMontant(
                      Number(row.uncompleteTbbs!.map((m) => m.depenseAdmin)) +
                        Number(row.uncompleteTbbs!.map((m) => m.depensesResp))
                    )}
                  </TableCell>
                  <TableCell align="left" sx={{ width: "100%" }}>
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
                  <TableCell align="left" sx={{ width: "100%" }}>
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
                  <TableCell align="left" sx={{ width: "100%" }}>
                    {row.uncompleteTbbs!.map((m) => m.ordreDeMission)}
                  </TableCell>
                  <TableCell align="left" sx={{ width: "100%" }}>
                    {row.uncompleteTbbs!.map((m) => m.piecesClassees)}
                  </TableCell>
                  <TableCell align="left" sx={{ width: "100%" }}>
                    {row.status}
                  </TableCell>
                  <TableCell align="left" sx={{ width: "100%" }}>
                    {row.uncompleteTbbs!.map((m) => m.remarqueAttente)}
                  </TableCell>
                  <TableCell align="left" sx={{ width: "100%" }}>
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

                  <TableCell align="left" sx={{ width: "100%" }}>
                    {row.uncompleteTbbs!.map((m) => m.explicationImprevu)}
                  </TableCell>
                  <TableCell align="left" sx={{ width: "100%" }}>
                    {row.uncompleteTbbs!.map((m) => (
                      <Moment format="DD/MM/yyyy" key={m.id}>
                        {m.dateRF}
                      </Moment>
                    ))}
                  </TableCell>
                  <TableCell align="left" sx={{ width: "100%" }}>
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
                    {validate("Suivi liste mission", "RA") && (
                      <Link href={`/missions/${row.id}/bilan`}>
                        <Button
                          color="accent"
                          aria-label="Details"
                          component="span"
                        >
                          <Visibility />
                        </Button>
                      </Link>
                    )}
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
  background: theme.palette.common.white,
  borderRadius: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  height: "calc(100vh - 240px)",
  overflow: "auto",
}));

export const InfoItems = styled(Stack)(({ theme }) => ({}));

export const CardFooter = styled("div")(({ theme }) => ({
  background: theme.palette.grey[100],
  paddingInline: theme.spacing(2),
  paddingBlock: theme.spacing(1),
  borderBottomleftRadius: theme.spacing(2),
  borderBottomRightRadius: theme.spacing(2),
}));
