import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyValue from "../shared/keyValue";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useFetchMissionListe from "./Missions/hooks/useFetchMissionListe";
import { MissionItem } from "../../redux/features/mission/mission.interface";
import { useConfirm } from "material-ui-confirm";
import { deleteMission, editMission } from "../../redux/features/mission";
import Recherche from "./recherch";

const ListMissions = () => {
  const router = useRouter();
  // const id: any = router.query;
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const { missionListe } = useAppSelector((state) => state.mission);
  const fetchMissionListe = useFetchMissionListe();

  useEffect(() => {
    fetchMissionListe();
  }, []);

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer le Mission",
      description: "Voulez-vous vraiment supprimer ce Mission ?",
      cancellationText: "Annuler",
      confirmationText: "Supprimer",
      cancellationButtonProps: {
        color: "warning",
      },
      confirmationButtonProps: {
        color: "error",
      },
    })
      .then(async () => {
        await dispatch(deleteMission({ id }));
        fetchMissionListe();
      })
      .catch(() => {});
  };

  const handleClickEdit = async (id: any) => {
    await dispatch(editMission({ id }));
    router.push(`/missions/add`);
  };

  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={1}>
        <Link href="/missions/add">
          <Button color="primary" variant="contained" startIcon={<Add />}>
            Créer
          </Button>
        </Link>
        <Typography variant="h4" color="GrayText">
          Missions
        </Typography>
      </SectionNavigation>
      <Divider />
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
            Liste des Missions
          </Typography>
          <Recherche />
        </Stack>

        <Grid container spacing={2} mt={2}>
          {missionListe.map((mission: MissionItem) => (
            <Grid key={mission?.id} item xs={12} md={6} lg={4}>
              <LinkContainer>
                <CardHeader
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" color="GrayText">
                    Mission {mission?.descriptionMission}
                  </Typography>
                  <Stack direction="row" spacing={{ xs: 0, sm: 0, md: 2 }}>
                    <IconButton
                      color="success"
                      aria-label="Modifier"
                      component="span"
                      size="small"
                      onClick={() => {
                        handleClickEdit(mission.id);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="warning"
                      aria-label="supprime"
                      component="span"
                      size="small"
                      onClick={() => {
                        handleClickDelete(mission.id);
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Stack>
                </CardHeader>

                <CardBody>
                  <Typography color="GrayText" my={2} variant="caption">
                    {/* Description de la mission de la mission description de la
                    mssion */}
                    {mission?.descriptionMission}
                  </Typography>
                  <Stack spacing={1}>
                    <KeyValue
                      keyName="Responsable"
                      value={[
                        `${mission?.missionManager?.name} ${mission?.missionManager?.surname}`,
                      ]}
                    />
                    <KeyValue
                      keyName="Gestionnaire "
                      value={[
                        `${mission?.budgetManager?.name} ${mission?.budgetManager?.surname}`,
                      ]}
                    />
                  </Stack>
                </CardBody>

                <CardFooter>
                  <Stack direction={{ xs: "column", sm: "row" }}>
                    <Link href={`/missions/${mission.id}/previsionDeMission`}>
                      <Button variant="text" color="info">
                        Gérer Etat de prévision
                      </Button>
                    </Link>
                    <Link href="/missions/id/bilan">
                      <Button variant="text" color="info">
                        Voir le Bilan
                      </Button>
                    </Link>
                  </Stack>
                  <Stack direction={{ xs: "column", sm: "row" }}>
                    <Link href="/missions/id/gereRapport">
                      <Button variant="text" color="info">
                        Gérer Rapport
                      </Button>
                    </Link>
                  </Stack>
                </CardFooter>
              </LinkContainer>
            </Grid>
          ))}
        </Grid>
      </SectionDetails>
    </Container>
  );
};

export default ListMissions;

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
