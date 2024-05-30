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
import Add from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import Moment from "react-moment";
import { useRouter } from "next/router";
import { useConfirm } from "material-ui-confirm";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import useFetchMissionListe from "../hooks/useFetchMissionListe";
import {
  deleteMission,
  editMission,
  updateMission,
} from "../../../../redux/features/mission";
import { MissionItem } from "../../../../redux/features/mission/mission.interface";
import Recherche from "../../recherch";
import useFetchGrants from "../../../GrantsEnCours/hooks/getGrants";
import useFetchEmploys from "../../../GrantsEnCours/hooks/getResponsable";
import formatMontant from "../../../../hooks/format";
import useFetchPrevisionDepenseList from "../../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchPrevisionDepense";
import { Visibility } from "@mui/icons-material";

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
  }, [missionListe]);
  React.useEffect(() => {
    const dateNow = new Date().getTime();
    // console.log("ok");
    missionListe.map((m) => {
      const start = new Date(m.dateDebut!).getTime();
      const end = new Date(m.dateFin!).getTime();
      if (m.status === "En attente" && start == dateNow) {
        const values = "Encours";
        return updateMission({
          id: m.id!,
          mission: {
            status: values,
          },
        });
      } else if (m.status === "Encours" && end < dateNow) {
        const values = "Terminé";
        return updateMission({
          id: m.id!,
          mission: {
            status: values,
          },
        });
      }
    });
  }, []);

  return (
    <Container maxWidth="xl">
      <SectionDetails>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{
            flex: "1 1 100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" id="tableTitle" component="div">
            Dashboard mission
          </Typography>
          <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
            <Link href={"/missions/ListMission"}>
              <Button
                color="accent"
                aria-label="Details"
                component="span"
                sx={{ fontSize: "1.2em" }}
              >
                Liste des missions
              </Button>
            </Link>
            <Recherche />
          </Stack>
        </Stack>
        <div style={{ overflow: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  Mission
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  Grant
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  Gestionnaire de budget
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  Date debut mission
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  Date fin mission
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  Montant Prevision
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  Montant Imprevu
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  Montant depense realisé
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  Responsable
                </TableCell>
                <TableCell sx={{ minWidth: 200, maxWidth: 200 }} align="left">
                  Status
                </TableCell>
                <TableCell
                  sx={{ minWidth: 50, maxWidth: 50 }}
                  align="left"
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {missionListe.map((row: MissionItem, index: any) => (
                <TableRow key={row.id}>
                  <TableCell align="left" sx={{ minWidth: 200, maxWidth: 200 }}>
                    Mission_{row.reference}
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 200, maxWidth: 200 }}>
                    {grantEncoursList.find((g) => g.id == row.grantId)?.code}
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 200, maxWidth: 200 }}>
                    {[row.budgetManager].map(
                      (m: any) => `${m.name!} ${" "}  ${m.surname}`
                    )}
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 200, maxWidth: 200 }}>
                    <Moment format="DD/MM/yyyy">{row.dateDebut}</Moment>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 200, maxWidth: 200 }}>
                    <Moment format="DD/MM/yyyy">{row.dateFin}</Moment>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 200, maxWidth: 200 }}>
                    {formatMontant(
                      Number(
                        row.previsionDepense?.reduce(
                          (acc, curr) => acc + curr.montant!,
                          0
                        )
                      )
                    )}
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 200, maxWidth: 200 }}>
                    {formatMontant(
                      Number(
                        row.previsionDepense?.reduce(
                          (acc, cur) => acc + cur.imprevue!,
                          0
                        )
                      )
                    )}
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: 200, maxWidth: 200 }}>
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
                    {[row.missionManager].map(
                      (m: any) => `${m.name!} ${" "}  ${m.surname}`
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
  padding: theme.spacing(3),
  marginBlock: 15,
  background: theme.palette.common.white,
  borderRadius: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
}));

const LinkContainer = styled("div")(({ theme }) => ({
  borderRadius: theme.spacing(2),
  background: "#fff",
  border: `1px solid ${theme.palette.grey[100]}`,
}));

export const InfoItems = styled(Stack)(({ theme }) => ({}));

export const CardFooter = styled("div")(({ theme }) => ({
  background: theme.palette.grey[100],
  paddingInline: theme.spacing(2),
  paddingBlock: theme.spacing(1),
  borderBottomLeftRadius: theme.spacing(2),
  borderBottomRightRadius: theme.spacing(2),
}));

const CardHeader = styled(Stack)(({ theme }) => ({
  paddingInline: theme.spacing(3),
  marginTop: theme.spacing(2),
}));

const CardBody = styled(Stack)(({ theme }) => ({
  paddingInline: theme.spacing(3),
  paddingBottom: theme.spacing(1),
}));
const SectionDetailsTitle = styled(Box)(({ theme }) => ({}));
