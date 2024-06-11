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
            sx={{ paddingLeft: 2 }}
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
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  RéfBudget
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  Type
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  Responsable
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  Gestionnaires
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  Lieu
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  VérifTechnique
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
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
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  TotalBudget
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  $RetenuAdmin
                </TableCell>
                <TableCell sx={{ minWidth: 150, maxWidth: 150 }} align="left">
                  $RemisResponsable total
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  MoyenRemise1
                </TableCell>
                <TableCell sx={{ minWidth: 150, maxWidth: 150 }} align="left">
                  $RemisResponsable1
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  $RemisGrant1
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  MoyenRemise2
                </TableCell>
                <TableCell sx={{ minWidth: 150, maxWidth: 150 }} align="left">
                  $RemisResponsable2
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  $RemisGrant2
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  MoyenRemise3
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  DépensesAdmin
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  DépensesResp
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  ReliquatAdmin
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  ReliquatResp
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  CoûtMission
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  RapTechnique
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  RapFinancier
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  OrdreDeMission
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  PiècesClassées
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  Status
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  Remarque_Attente
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  UtilisationImprevu
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  ExplicationImprevu
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  Date RF
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  Alarme
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {missionListe.map((row: MissionItem, index: any) => (
                <TableRow key={row.id}>
                  <TableCell align="left" sx={{ minWidth: 200, maxWidth: 200 }}>
                    {row.RefBudget}
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 200, maxWidth: 200 }}>
                    {grantEncoursList.find((g) => g.id == row.grantId)?.code}
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 200, maxWidth: 200 }}>
                    {
                      employees.find(
                        (e: EmployeItem) => e.id === row.missionManagerId
                      )?.name as string
                    }
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 200, maxWidth: 200 }}>
                    {employees
                      .filter((e: EmployeItem) =>
                        row.budgetManagerId?.includes(e.id as string)
                      )
                      .map((m: EmployeItem) => m.name)
                      .join(", ")}
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 200, maxWidth: 200 }}>
                    <Moment format="DD/MM/yyyy">{row.dateDebut}</Moment>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 200, maxWidth: 200 }}>
                    <Moment format="DD/MM/yyyy">{row.dateFin}</Moment>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 120, maxWidth: 120 }}
                  >
                    {formatMontant(
                      Number(
                        row.previsionDepense?.reduce(
                          (acc, curr) => acc + curr.montant!,
                          0
                        )
                      )
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 120, maxWidth: 120 }}
                  >
                    {formatMontant(
                      Number(
                        row.previsionDepense?.reduce(
                          (acc, cur) => acc + cur.imprevue!,
                          0
                        )
                      )
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 120, maxWidth: 120 }}
                  >
                    {formatMontant(
                      Number(
                        row.rapportDepense?.reduce(
                          (acc, curr) => acc + curr.montant!,
                          0
                        )
                      )
                    )}
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 200, maxWidth: 200 }}>
                    {row.status}
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
  borderBottomLeftRadius: theme.spacing(2),
  borderBottomRightRadius: theme.spacing(2),
}));
