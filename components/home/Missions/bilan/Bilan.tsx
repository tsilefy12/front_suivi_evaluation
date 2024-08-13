import {
  Button,
  Grid,
  Stack,
  Divider,
  Typography,
  Box,
  styled,
  Paper,
  FormLabel,
} from "@mui/material";
import Container from "@mui/material/Container";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import KeyValue from "../../../shared/keyValue";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { SelectChangeEvent } from "@mui/material/Select";
import { useRouter } from "next/router";
import Techniques, {
  PourcentageTechnique,
} from "./organism/Techniques/techniques";
import Finances, { Montant } from "./organism/Finances/Finance";
import Link from "next/link";
import useFetchMissionListe from "../hooks/useFetchMissionListe";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { MissionItem } from "../../../../redux/features/mission/mission.interface";
import useFetchPrevisionDepenseList from "../../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchPrevisionDepense";
import useFetchRapportDepense from "../../../gereRapportDeMission/organism/Finances/tableRapportDesDepenses/hooks/useFetchRapportDepense";
import useFetchMissionGoalListe from "../../../previsionMissions/organism/Techniques/tableObjectif/hooks/useFetchObjectifList";
import useFetchObjectifRapport from "../../../gereRapportDeMission/organism/Techniques/tableObjectif/hooks/useFetchObjectifRapport";
import useFetchExceptedResultList from "../../../previsionMissions/organism/Techniques/tableResultatAttendu/hooks/useFetchExceptedResultList";
import useFetchResultatRapport from "../../../gereRapportDeMission/organism/Techniques/tableResultatAttendu/hooks/useFetchResultatRapport";
import useFetchPlannedActivityList from "../../../previsionMissions/organism/Techniques/tableActivitésPrévues/hooks/useFetchPlannedActivityList";
import useFetchActiviteRapport from "../../../gereRapportDeMission/organism/Techniques/tableActivitésPrévues/hooks/useFetchActivityRapport";
import useFetchDeliverableList from "../../../previsionMissions/organism/Techniques/tableLivrables/hooks/useFetchDeliverableList";
import useFetchLivrableRapport from "../../../gereRapportDeMission/organism/Techniques/tableLivrables/hooks/useFetchLivrableRapport";
import useFetchMissionaryList from "../../../previsionMissions/organism/Techniques/tableMissionnaires/hooks/useFetchMissionaryList";
import useFetchMissionaryRapportList from "../../../gereRapportDeMission/organism/Techniques/tableMissionnaires/hooks/useFetchMissionaryList";
import useFetchProgrammePrevisionList from "../../../previsionMissions/organism/Techniques/tableProgramme/hooks/useFetchProgrammePrevision";
import useFetchProgrammeRapport from "../../../gereRapportDeMission/organism/Techniques/tableProgramme/hooks/useFetchProgrammeRapport";
import formatMontant from "../../../../hooks/format";
import useFetchEmploys from "../../../GrantsEnCours/hooks/getResponsable";
import { EmployeItem } from "../../../../redux/features/employe/employeSlice.interface";
import Logistiques from "./organism/Logistique/Logistique";

const BilanMission = () => {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const fetchMission = useFetchMissionListe();
  const { missionListe } = useAppSelector((state: any) => state.mission);
  const { id }: any = router.query;
  const { montant } = Montant();
  const fetchPrevisionDepense = useFetchPrevisionDepenseList();
  const fetchRapportDepense = useFetchRapportDepense();
  const { percentageTechnique }: any = PourcentageTechnique();
  //objectif
  const fetchMissionGoalList = useFetchMissionGoalListe();
  const fetchObjectifRapport = useFetchObjectifRapport();
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state) => state.employe);

  //resultat
  const fetchExceptedResultListe = useFetchExceptedResultList();
  const fetchResultatRapport = useFetchResultatRapport();

  //activity
  const fetchPlannedActivityListe = useFetchPlannedActivityList();
  const fetchActivityRapport = useFetchActiviteRapport();

  //livrable
  const fetchDeliverableListe = useFetchDeliverableList();
  const fetchLivrableRapport = useFetchLivrableRapport();

  //missionaire
  const fetchMissionaryList = useFetchMissionaryList();
  const fetchMissionaryRapportList = useFetchMissionaryRapportList();

  //programme
  const fetchProgrammePrevision = useFetchProgrammePrevisionList();
  const fetchProgrammeRapport = useFetchProgrammeRapport();

  React.useEffect(() => {
    fetchMission();
    fetchPrevisionDepense();
    fetchRapportDepense();
    fetchMissionGoalList();
    fetchObjectifRapport();
    fetchExceptedResultListe();
    fetchResultatRapport();
    fetchActivityRapport();
    fetchPlannedActivityListe();
    fetchLivrableRapport();
    fetchDeliverableListe();
    fetchMissionaryList();
    fetchMissionaryRapportList();
    fetchProgrammePrevision();
    fetchProgrammeRapport();
    fetchEmployes();
  }, [id]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const ref = new Date().getUTCFullYear();
  const references = ref.toString().slice(2);

  return (
    <Container maxWidth="xl">
      <NavigationContainer>
        <SectionNavigation
          direction="row"
          justifyContent="space-between"
          mb={1}
        >
          <Link href="/missions/ListMission">
            <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
              Retour
            </Button>
          </Link>
          <Typography variant="h4">Bilan de mission</Typography>
        </SectionNavigation>
        <Divider />
      </NavigationContainer>
      <FormContainer spacing={2}>
        {missionListe
          .filter((e: any) => e.id == id)
          .map((item: MissionItem, index: any) => (
            <Grid container key={index}>
              <Grid item xs={12} md={4}>
                <KeyValue
                  keyName="Ref mission"
                  value={`${
                    item.reference != null
                      ? "Référence : " + references + "-" + item.reference
                      : ""
                  }`}
                />
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <span>Description : </span>
                  <Typography
                    color="GrayText"
                    mb={1}
                    aria-label="Description"
                    title={item?.descriptionMission}
                    sx={{
                      cursor:
                        item?.descriptionMission!.length > 4
                          ? "pointer"
                          : "default",
                      "&:hover": {
                        color:
                          item?.descriptionMission!.length > 4
                            ? "info.main"
                            : "GrayText",
                      },
                    }}
                  >
                    {item?.descriptionMission?.slice(0, 20) + "..."}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                Responsable :
                <FormLabel>
                  {missionListe
                    .filter((f: MissionItem) => f.id === id)
                    .map((row: MissionItem) => {
                      const manager = employees.find(
                        (e: EmployeItem) => e.id === row.missionManagerId
                      );

                      return (
                        <span key={row.id}>
                          {manager
                            ? `${manager.name} ${manager.surname}`
                            : "Manager not found"}
                        </span>
                      );
                    })}
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={4}>
                {missionListe
                  .filter((mission: MissionItem) => mission.id === id)
                  .map((mission: MissionItem) => (
                    <div key={mission.id}>
                      <span>
                        {mission.budgetManagerId &&
                        mission.budgetManagerId.length > 1
                          ? "Gestionnaires"
                          : "Gestionnaire"}{" "}
                        de budget :{" "}
                      </span>
                      <FormLabel>
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
                      </FormLabel>
                    </div>
                  ))}
              </Grid>
            </Grid>
          ))}
      </FormContainer>
      <BodySection sx={{ height: "calc(100vh - 200px)" }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ padding: "10px", width: "100%" }}
        >
          <Stack width={{ xs: "100%", sm: "100%", md: "70%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
              centered
              sx={{ mb: 2 }}
            >
              <Tab label="TECHNIQUE" {...a11yProps(0)} />
              <Tab label="FINANCE" {...a11yProps(1)} />
              <Tab label="LOGISTIQUE" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Techniques />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Finances />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Logistiques />
            </TabPanel>
          </Stack>
          <Stack width={{ xs: "100%", sm: "100%", md: "30%" }}>
            <CardBody>
              <Typography variant="h5">Bilan global</Typography>
              <Typography color="secondary" variant="body2">
                La comparaison des données de prévisions par rapport aux données
                de rapport nous donne les résultats suivants
              </Typography>
              <Grid>
                <Grid>
                  <Typography color="primary" variant="h6">
                    Bilan technique
                  </Typography>
                  <Typography color="primary" variant="h3">
                    {!isNaN ? percentageTechnique : 0}%
                  </Typography>
                </Grid>
                <Grid>
                  <Typography color="#2196F3" variant="h6">
                    Bilan financier
                  </Typography>
                  <Typography variant="h4" color="#2196F3">
                    {formatMontant(Number(montant))}
                  </Typography>
                </Grid>
              </Grid>
            </CardBody>
          </Stack>
        </Stack>
      </BodySection>
    </Container>
  );
};

export default BilanMission;

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export const SectionNavigation = styled(Stack)(({}) => ({}));
const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));

export const BodySection = styled(Paper)(({ theme }) => ({
  borderRadius: "32px",
  marginBlock: 15,
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: "16px",
}));

const CardBody = styled(Stack)(({ theme }) => ({
  background: theme.palette.grey[100],
  // paddingBottom: theme.spacing(1),
  width: "100%",
  // height: "278px",
  padding: "10px 14px",
  borderRadius: 14,
  gap: "32px",
  marginTop: 15,
  border: 1,
}));
const FormContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(3),
  padding: 30,
  borderRadius: 20,
  background: "#fff",
  border: `1px solid ${theme.palette.grey[100]}`,
  height: "calc(100vh - 540px)",
  overflow: "auto",
}));
