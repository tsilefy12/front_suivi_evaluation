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
import { ResumeDepenseItem } from "../../../../redux/features/resumeDepense/reumeDepense.interface";
import { GrantEncoursItem } from "../../../../redux/features/grantEncours/grantEncours.interface";
import { PrevisionDepenseItem } from "../../../../redux/features/PrevisionDepense/previsionDepense.interface";
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
                  RéfBudget
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
                  VérifTechnique
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  VérifFinancier
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
                  TotalBudget
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  $RetenuAdmin
                </TableCell>
                <TableCell sx={{ minWidth: 150, maxWidth: 150 }} align="center">
                  $RemisResponsable total
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  MoyenRemise1
                </TableCell>
                <TableCell sx={{ minWidth: 150, maxWidth: 150 }} align="center">
                  $RemisResponsable1
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  $RemisGrant1
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  MoyenRemise2
                </TableCell>
                <TableCell sx={{ minWidth: 150, maxWidth: 150 }} align="center">
                  $RemisResponsable2
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  $RemisGrant2
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  MoyenRemise3
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  DépensesAdmin
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  DépensesResp
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  ReliquatAdmin
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  ReliquatResp
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  CoûtMission
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  RapTechnique
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  RapFinancier
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  OrdreDeMission
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  PiècesClassées
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Status
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  Remarque_Attente
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  UtilisationImprevu
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="center">
                  ExplicationImprevu
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
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {
                      employees.find(
                        (e: EmployeItem) => e.id === row.missionManagerId
                      )?.name as string
                    }
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {employees
                      .filter((e: EmployeItem) =>
                        row.budgetManagerId?.includes(e.id as string)
                      )
                      .map((m: EmployeItem) => m.name)
                      .join(", ")}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {row.lieux!.map((l: LieuxRapportItem) => l.district!)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {employees
                      .filter((e: EmployeItem) =>
                        row.verifyTechnic?.includes(e.id as string)
                      )
                      .map((m: EmployeItem) => m.name)
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
                      row.resumeDepense
                        ?.filter((f: ResumeDepenseItem) => f.grant)
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
                          g.id === row.resumeDepense?.map((m) => m.grant)
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
                      (row.resumeDepense
                        ?.filter((f: ResumeDepenseItem) => f.grant)
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
