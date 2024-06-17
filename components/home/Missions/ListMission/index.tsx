import Add from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Container,
  Dialog,
  Divider,
  FormLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Moment from "react-moment";
import { usePermitted } from "../../../../config/middleware";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { EmployeItem } from "../../../../redux/features/employe/employeSlice.interface";
import {
  deleteMission,
  editMission,
  updateMission,
} from "../../../../redux/features/mission";
import { MissionItem } from "../../../../redux/features/mission/mission.interface";
import Recherche from "../../recherch";
import AddNewCompleted from "../addCompleted/AddNewCompleted";
import useFetchEmployes from "../hooks/useFetchEmployees";
import useFetchMissionListe from "../hooks/useFetchMissionListe";

const ListMissions = () => {
  const router = useRouter();
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const { missionListe } = useAppSelector((state) => state.mission);
  const fetchMissionListe = useFetchMissionListe();
  const fetchEmployes = useFetchEmployes();
  const { employees } = useAppSelector((state) => state.employe);
  const [open, setOpen] = React.useState<boolean>(false);
  const [getMissionId, setGetMissionId] = React.useState<string>("");
  const validate = usePermitted();

  useEffect(() => {
    fetchMissionListe();
    fetchEmployes();
  }, []);
  // console.log(missionListe);
  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer la Mission",
      description: "Voulez-vous vraiment supprimer cette mission ?",
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
    router.push(`/missions/${id}/edit`);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [getSelectId, setGetSelectedId]: any = React.useState(null);

  const handleClick = (event: any, id: string) => {
    setAnchorEl(event);
    setGetSelectedId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateMissions = async () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();
    const currentYear = new Date().getFullYear();
    let promises: Promise<any>[] = [];
    missionListe.forEach((m) => {
      const startDay = new Date(m.dateDebut!).getDate();
      const startMonth = new Date(m.dateDebut!).getMonth() + 1;
      const startYear = new Date(m.dateDebut!).getFullYear();

      const endDay = new Date(m.dateFin!).getDate();
      const endMonth = new Date(m.dateFin!).getMonth() + 1;
      const endYear = new Date(m.dateFin!).getFullYear();

      if (
        m.status === "En attente" &&
        startDay === currentDay &&
        currentMonth === startMonth &&
        startYear === currentYear
      ) {
        promises.push(
          dispatch(
            updateMission({
              id: m.id!,
              mission: {
                status: "Encours",
              },
            })
          )
        );
      }
      if (
        m.status === "Encours" &&
        endDay <= currentDay &&
        endMonth <= currentMonth &&
        endYear <= currentYear
      ) {
        promises.push(
          dispatch(
            updateMission({
              id: m.id!,
              mission: {
                status: "Terminé",
              },
            })
          )
        );
      }
    });
    await Promise.all(promises);
    fetchMissionListe();
  };

  useEffect(() => {
    // const now = new Date();
    // const nextRun = new Date(
    //   now.getFullYear(),
    //   now.getMonth(),
    //   now.getDate() + 1,
    //   0,
    //   0,
    //   0
    // ); // Next midnight
    // const timeUntilNextRun = nextRun.getTime() - now.getTime();

    updateMissions();
  }, [missionListe]);

  const addComplete = (idMission: string) => {
    setGetMissionId(idMission);
    setOpen(true);
  };
  const fermerDialog = () => {
    setOpen(false);
  };
  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={1}>
        {validate("Suivi dashboard mission", "C") && (
          <Link href="/missions/add">
            <Button color="primary" variant="contained" startIcon={<Add />}>
              Créer
            </Button>
          </Link>
        )}
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

        <Grid container spacing={2} mt={-2}>
          {missionListe.map((mission: MissionItem, index: any) => (
            <Grid key={mission.id!} item xs={12} md={6} lg={4}>
              <LinkContainer key={mission.id!}>
                <CardHeader
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" color="GrayText">
                    <Stack>
                      <FormLabel>
                        {" "}
                        Mission: {mission?.descriptionMission}
                      </FormLabel>
                      <FormLabel>Status : {mission.status}</FormLabel>
                    </Stack>
                  </Typography>
                  <div>
                    <IconButton
                      onClick={(event) =>
                        handleClick(event.currentTarget, mission.id!)
                      }
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      {validate("Suivi liste mission", "U") && (
                        <MenuItem
                          onClick={() => {
                            handleClickEdit(getSelectId);
                            handleClose();
                          }}
                        >
                          <EditIcon color="primary" />
                          Modifier
                        </MenuItem>
                      )}
                      {validate("Suivi liste mission", "D") && (
                        <MenuItem
                          onClick={() => {
                            handleClickDelete(getSelectId);
                            handleClose();
                          }}
                        >
                          <DeleteIcon color="warning" />
                          Supprimer
                        </MenuItem>
                      )}
                    </Menu>
                  </div>
                </CardHeader>

                <CardBody>
                  <Stack spacing={1} key={mission.id!}>
                    <FormLabel>
                      Référence : {"MISSION_" + mission?.reference}
                    </FormLabel>
                    <FormLabel>
                      Responsable : <span></span>
                      {
                        employees.find(
                          (f: EmployeItem) => f.id === mission.missionManagerId
                        )?.name
                      }{" "}
                      {
                        employees.find(
                          (f: EmployeItem) => f.id === mission.missionManagerId
                        )?.surname
                      }
                    </FormLabel>
                    <FormLabel>
                      {mission.budgetManagerId!.length > 1
                        ? "Gestionnaires"
                        : "Gestionnaire"}{" "}
                      : <span></span>
                      {employees
                        .filter((e: EmployeItem) =>
                          mission.budgetManagerId?.includes(e.id as string)
                        )
                        .map((m: EmployeItem) => (
                          <Stack key={m.id} direction={"column"}>
                            <Stack direction={"row"} gap={1}>
                              <span>Nom et prénoms : </span>{" "}
                              <span>
                                {m.name} {m.surname}
                              </span>
                            </Stack>
                          </Stack>
                        ))}
                    </FormLabel>

                    <Stack
                      direction={"row"}
                      gap={2}
                      flexWrap={"wrap"}
                      key={mission.id!}
                    >
                      <FormLabel>
                        Début :{" "}
                        <Moment format="DD/MM/yyyy">
                          {mission.dateDebut!}
                        </Moment>
                      </FormLabel>
                      <FormLabel>
                        Fin :{" "}
                        <Moment format="DD/MM/yyyy">{mission.dateFin!}</Moment>
                      </FormLabel>
                    </Stack>
                  </Stack>
                </CardBody>
                <CardFooter>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    key={mission.id!}
                  >
                    <Stack direction={"row"} gap={2}>
                      {validate("Suivi liste mission", "RA") && (
                        <Link
                          href={`/missions/${mission.id}/previsionDeMission`}
                        >
                          <Button variant="text" color="info">
                            Prévision
                          </Button>
                        </Link>
                      )}
                      <Button
                        variant="text"
                        color="info"
                        onClick={() => addComplete(mission.id!)}
                      >
                        Admin
                      </Button>
                    </Stack>
                  </Stack>
                  <Stack direction={"row"} gap={2}>
                    {validate("Suivi liste mission", "RA") && (
                      <Link href={`/missions/${mission.id!}/gereRapport`}>
                        <Button variant="text" color="info">
                          Rapport
                        </Button>
                      </Link>
                    )}
                    {validate("Suivi liste mission", "RA") && (
                      <Link href={`/missions/${mission.id!}/bilan`}>
                        <Button variant="text" color="info">
                          Bilan
                        </Button>
                      </Link>
                    )}
                  </Stack>
                </CardFooter>
              </LinkContainer>
            </Grid>
          ))}
        </Grid>
      </SectionDetails>
      <Dialog open={open} sx={styleDialog}>
        <AddNewCompleted
          fermerDialog={fermerDialog}
          getMissionId={getMissionId}
          missionListe={missionListe}
        />
      </Dialog>
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
  paddingTop: -2,
  textAlign: "center",
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
const styleDialog = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& .MuiDialog-paper": {
    width: "200%",
    maxWidth: "none",
  },
};
