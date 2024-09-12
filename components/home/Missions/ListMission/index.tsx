import Add from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Autocomplete,
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
  Pagination,
  Stack,
  styled,
  TableCell,
  TablePagination,
  TableRow,
  TextField,
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
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../../../config/table.config";
import { fetchConnectedUser } from "../../../../redux/features/auth";
import useFetchStagiaire from "../../../GrantsEnCours/hooks/getStagiaire";
import useFetchPrestataire from "../../../GrantsEnCours/hooks/getPrestataire";

const ListMissions = () => {
  const router = useRouter();
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const { missionListe } = useAppSelector((state) => state.mission);
  const fetchMissionListe = useFetchMissionListe();
  const fetchEmployes = useFetchEmployes();
  const { employees } = useAppSelector((state) => state.employe);
  const fetchStagiaire = useFetchStagiaire();
  const { interns } = useAppSelector((state: any) => state.stagiaire);
  const fetchPrestataire = useFetchPrestataire();
  const { prestataireListe } = useAppSelector(
    (state: any) => state.prestataire
  );
  const [open, setOpen] = React.useState<boolean>(false);
  const [getMissionId, setGetMissionId] = React.useState<string>("");
  const validate = usePermitted();
  const { user } = useAppSelector((state) => state.auth);
  const data = async () => {
    await fetchEmployes();
    await fetchStagiaire();
    await fetchPrestataire();
    await fetchMissionListe();
  };
  useEffect(() => {
    data();
    fetchConnectedUser();
  }, []);
  console.log("id auth", user);
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
  const [searchMission, setSearchMission] = React.useState("");

  const handleClick = (event: any, id: string) => {
    setAnchorEl(event);
    setGetSelectedId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [dataMission, setDataMission] = React.useState<MissionItem[]>([]);
  useEffect(() => {
    if (searchMission !== "") {
      const filteredData = missionListe.filter((m: MissionItem) => {
        const missionManager = employees.find(
          (e: EmployeItem) => e.id === m.missionManagerId
        );
        if (!missionManager) return false;
        const missionManagerFullName = `${missionManager.name!.toLowerCase()} ${missionManager.surname!.toLowerCase()}`;
        const searchTerm = searchMission.toLowerCase();
        return missionManagerFullName.includes(searchTerm);
      });
      setDataMission([...filteredData].reverse());
    } else {
      setDataMission(
        [
          ...missionListe.filter(
            (f) =>
              new Date(f.dateFin as Date).getFullYear() ===
              new Date().getFullYear()
          ),
        ].reverse()
      );
    }
  }, [searchMission, missionListe, employees]);

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
    updateMissions();
  }, []);

  const addComplete = (idMission: string) => {
    setGetMissionId(idMission);
    setOpen(true);
  };
  const fermerDialog = () => {
    setOpen(false);
  };
  const uniqueManagers = new Set<string>();

  missionListe.forEach((option: MissionItem) => {
    const manager = employees.find(
      (e: EmployeItem) => e.id === option.missionManagerId
    );
    if (manager) {
      uniqueManagers.add(`${manager.name} ${manager.surname}`);
    }
  });
  const uniqueManagersArray: string[] = Array.from(uniqueManagers);
  const [searchMonth, setSearchMonth] = React.useState<string>("Tous");
  const [searchYear, setSearchYear] = React.useState<string>("Toutes");

  useEffect(() => {
    let filteredData = [...missionListe];

    if (searchMission === "") {
      filteredData = [
        ...missionListe.filter(
          (f) =>
            new Date(f.dateFin as Date).getFullYear() ==
            new Date().getFullYear()
        ),
      ];
    }
    if (searchMission !== "") {
      filteredData = missionListe.filter((m: MissionItem) => {
        const missionManager = employees.find(
          (e: EmployeItem) => e.id === m.missionManagerId
        );
        if (!missionManager) return false;
        const missionManagerFullName = `${missionManager.name!.toLowerCase()} ${missionManager.surname!.toLowerCase()}`;
        const searchTerm = searchMission.toLowerCase();
        return missionManagerFullName.includes(searchTerm);
      });
    }

    if (searchMonth !== "Tous") {
      filteredData = missionListe.filter((m: MissionItem) =>
        (new Date(m.dateFin as Date).getMonth() + 1)
          .toString()
          .includes(searchMonth)
      );
    }

    if (searchYear !== "Toutes") {
      filteredData = missionListe.filter((m: MissionItem) =>
        new Date(m.dateFin as Date)
          .getFullYear()
          .toString()
          .includes(searchYear)
      );
    }

    setDataMission([...filteredData].reverse());
  }, [searchMission, searchMonth, searchYear, missionListe]);

  const monthsSet: any = new Set();
  missionListe.forEach((m) => {
    const month = new Date(m.dateFin as Date).getMonth() + 1;
    monthsSet.add(month);
  });
  const months = [...monthsSet]
    .sort((a, b) => a - b)
    .map((month) => {
      return {
        value: month,
        label: new Date(2020, month - 1, 1).toLocaleString("default", {
          month: "long",
        }),
      };
    });

  const yearsSet: any = new Set();
  missionListe.forEach((m) => {
    const year = new Date(m.dateFin as Date).getFullYear();
    yearsSet.add(year);
  });
  const years = [...yearsSet].sort((a, b) => a - b);

  const handleMonthChange = (event: any) => {
    setSearchMonth(event.target.value);
  };

  const handleYearChange = (event: any) => {
    setSearchYear(event.target.value);
  };

  // Pagination state
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 4));
    setPage(0);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataMission.length) : 0;

  const formatOptions = (options: any) => {
    return options.map((option: any) => ({
      id: option.id,
      name: option.name,
      surname: option.surname,
      email: option.email,
    }));
  };

  const allOptions = [
    ...formatOptions(employees),
    ...formatOptions(interns),
    ...formatOptions(prestataireListe),
  ];
  const [getId, setGetId] = React.useState<string>("");
  useEffect(() => {
    if (user) {
      const idUser = allOptions.find(
        (option: any) => option.email === user.email
      )?.id;
      setGetId(idUser);
    }
  }, [allOptions, user]);
  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={1}>
        <Stack direction="row" gap={2} alignItems="center">
          {validate("Suivi dashboard mission", "C") && (
            <Link href="/missions/add">
              <Button color="primary" variant="contained" startIcon={<Add />}>
                Créer
              </Button>
            </Link>
          )}
          <TextField
            select
            sx={{ width: 100 }}
            size="small"
            id="month"
            label="Mois"
            variant="outlined"
            value={searchMonth}
            onChange={handleMonthChange}
          >
            <MenuItem value={"Tous"}>Tous</MenuItem>
            {months.map((month) => (
              <MenuItem key={month.value} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            sx={{ width: 100 }}
            size="small"
            id="annee"
            label="Année"
            variant="outlined"
            value={searchYear}
            onChange={handleYearChange}
          >
            <MenuItem value={"Toutes"}>Toutes</MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
        <Typography variant="h4" color="#849ba2">
          Missions
        </Typography>
      </SectionNavigation>
      <Divider />
      <SectionDetails
        sx={{
          minHeight: "100%",
          maxHeight: searchMission != "" ? "100%" : "calc(100vh - 250px)",
          overflow: "auto",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{
            flex: "1 1 100%",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 2,
          }}
        >
          <Typography variant="h4" id="tableTitle" component="div">
            Liste des missions
          </Typography>
          <Autocomplete
            sx={{ width: "25%" }}
            size="small"
            id="search"
            options={uniqueManagersArray.sort()}
            getOptionLabel={(option: string) => option}
            onChange={(event, value) => {
              setSearchMission(value || "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Recherche un responsable"
                variant="outlined"
              />
            )}
          />
        </Stack>

        <Stack
          gap={2}
          direction={"row"}
          width={"100%"}
          flexWrap={"wrap"}
          display={"flex"}
        >
          {dataMission.map((mission: MissionItem, index: any) => (
            <Grid key={index} item md={6}>
              <LinkContainer
                key={index}
                sx={{
                  backgroundColor: "#d2d5db",
                  border: 1,
                  borderRadius: 4,
                  borderColor: "#F5F5F5",
                  width: 400,
                }}
              >
                <CardHeader
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" color="#849ba2">
                    <Stack>
                      <Typography
                        color="info.main"
                        mb={1}
                        aria-label="Mission"
                        variant="h6"
                        title={mission?.descriptionMission}
                        align="center"
                        sx={{
                          cursor:
                            mission?.descriptionMission!.length > 100
                              ? "pointer"
                              : "default",
                          "&:hover": {
                            color:
                              mission?.descriptionMission!.length > 100
                                ? "grey.800"
                                : "#849ba2",
                          },
                        }}
                      >
                        Mission :{" "}
                        {mission?.descriptionMission!.length > 100
                          ? mission?.descriptionMission!.slice(0, 100) + "..."
                          : mission?.descriptionMission!}
                      </Typography>
                      <FormLabel sx={{ color: "grey.800", fontWeight: "bold" }}>
                        Status : {mission.status}
                      </FormLabel>
                      <FormLabel sx={{ color: "grey.800", fontWeight: "bold" }}>
                        {`${
                          mission.reference != null
                            ? "Référence : " + mission.reference
                            : ""
                        }`}
                      </FormLabel>
                    </Stack>
                  </Typography>
                  <div key={index}>
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
                <CardBody key={index}>
                  <Stack spacing={1} key={index}>
                    {/* <FormLabel sx={{ color: "grey.800", fontWeight: "bold" }}>
                      Référence : {"MISSION_" + mission?.reference}
                    </FormLabel> */}
                    <FormLabel sx={{ color: "grey.800", fontWeight: "bold" }}>
                      Référence budget : <span></span>
                      {mission.RefBudget}
                    </FormLabel>
                    <FormLabel sx={{ color: "grey.800", fontWeight: "bold" }}>
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
                    <FormLabel sx={{ color: "grey.800", fontWeight: "bold" }}>
                      Vérificateur financier : <span></span>
                      {
                        employees.find((e: EmployeItem) =>
                          mission.verifyFinancial?.includes(e.id as string)
                        )?.name
                      }{" "}
                      {
                        employees.find((e: EmployeItem) =>
                          mission.verifyFinancial?.includes(e.id as string)
                        )?.surname
                      }
                    </FormLabel>
                    <FormLabel sx={{ color: "grey.800", fontWeight: "bold" }}>
                      Validateur financier : <span></span>
                      {
                        employees.find((e: EmployeItem) =>
                          mission.validateFinancial?.includes(e.id as string)
                        )?.name
                      }{" "}
                      {
                        employees.find((e: EmployeItem) =>
                          mission.validateFinancial?.includes(e.id as string)
                        )?.surname
                      }
                    </FormLabel>
                    <FormLabel sx={{ color: "grey.800", fontWeight: "bold" }}>
                      Vérificateur technique : <span></span>
                      {
                        employees.find((e: EmployeItem) =>
                          mission.verifyTechnic?.includes(e.id as string)
                        )?.name
                      }{" "}
                      {
                        employees.find((e: EmployeItem) =>
                          mission.verifyTechnic?.includes(e.id as string)
                        )?.surname
                      }
                    </FormLabel>
                    <FormLabel sx={{ color: "grey.800", fontWeight: "bold" }}>
                      {mission.budgetManagerId!.length > 1
                        ? "Gestionnaires"
                        : "Gestionnaire"}{" "}
                      : <span></span>
                      {employees
                        .filter((e: EmployeItem) =>
                          mission.budgetManagerId?.includes(e.id as string)
                        )
                        .map((m: EmployeItem) => `${m.name} ${m.surname}`)
                        .join(", ")}
                    </FormLabel>
                    <FormLabel sx={{ color: "grey.800", fontWeight: "bold" }}>
                      Début :{" "}
                      <Moment format="DD/MM/yyyy">{mission.dateDebut!}</Moment>
                    </FormLabel>
                    <FormLabel sx={{ color: "grey.800", fontWeight: "bold" }}>
                      Fin :{" "}
                      <Moment format="DD/MM/yyyy">{mission.dateFin!}</Moment>
                    </FormLabel>
                  </Stack>
                </CardBody>
                <CardFooter
                  key={mission.id!}
                  sx={{
                    display: "flex",
                    paddingBottom: 4,
                    flexDirection: "row",
                    width: "100%",
                    flexWrap: "wrap",
                  }}
                >
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
                        Administration
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
                  <Stack direction={"row"} gap={2}>
                    <Link
                      href={`/validationMission/${mission.id!}/validationPrevision`}
                    >
                      <Button variant="text" color="info" disabled={!getId}>
                        Validation prévision
                      </Button>
                    </Link>
                    <Link
                      href={`/validationMission/${mission.id!}/validationRapport`}
                    >
                      <Button variant="text" color="info" disabled={!getId}>
                        Validation rapport
                      </Button>
                    </Link>
                  </Stack>
                </CardFooter>
              </LinkContainer>
            </Grid>
          ))}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: (dense ? 33 : 53) * emptyRows,
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </Stack>
        <Box sx={{ marginTop: 2 }}>
          <TablePagination
            rowsPerPageOptions={[5, 2, 25]}
            component="div"
            count={dataMission.length + emptyRows}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={labelRowsPerPage}
            labelDisplayedRows={defaultLabelDisplayedRows}
          />
        </Box>
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
  maxHeight: "calc(100vh - 200px)",
  overflow: "auto",
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
