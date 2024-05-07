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
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRouter } from "next/router";
import Techniques from "./organism/Techniques/techniques";
import Finances, { Montant } from "./organism/Finances/Finance";
import Link from "next/link";
import useFetchMissionListe from "../hooks/useFetchMissionListe";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { MissionItem } from "../../../../redux/features/mission/mission.interface";
import useFetchPrevisionDepenseList from "../../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchPrevisionDepense";
import useFetchRapportDepense from "../../../gereRapportDeMission/organism/Finances/tableRapportDesDepenses/hooks/useFetchRapportDepense";

const BilanMission = () => {
  const [value, setValue] = React.useState(0);
  const [age, setAge] = React.useState("");
  const router = useRouter();
  const fetchMission = useFetchMissionListe();
  const { missionListe } = useAppSelector((state: any) => state.mission);
  const { id }: any = router.query;
  const { montant} = Montant()
  const fetchPrevisionDepense = useFetchPrevisionDepenseList();
  const fetchRapportDepense = useFetchRapportDepense();

  React.useEffect(() => {
    fetchMission();
    fetchPrevisionDepense();
    fetchRapportDepense();
  }, [router.query])

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Container maxWidth="xl">
      <NavigationContainer>
        <SectionNavigation
          direction="row"
          justifyContent="space-between"
          mb={1}
        >
          <Link href="/">
            <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
              Retour
            </Button>
          </Link>
          <Typography variant="h4"> Rapport de Mission</Typography>
        </SectionNavigation>
        <Divider />
      </NavigationContainer>
      <FormContainer spacing={2}>
        {
          missionListe.filter((e: any) => e.id == id).map((item: MissionItem, index: any) => (
            <Grid container key={index}>
              <Grid item xs={12} md={4}>
                <KeyValue keyName="Ref mission" value={item.reference!} />
                <KeyValue keyName="Description" value={item.descriptionMission!} />
              </Grid>
              <Grid item xs={12} md={4}>
                Responsable :
                <FormLabel>
                  {[item.missionManager].map((mm: any) => mm.name + " " + mm.surname)}
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={4}>
                Gestionnaire de budget :
                <FormLabel>
                  {[item.budgetManager!].map((bm: any) => bm.name + " " + bm.surname)}
                </FormLabel>
              </Grid>
            </Grid>
          ))
        }
      </FormContainer>
      <BodySection>
        <Stack
          direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ padding: "10px", width: "100%" }}>
          <Stack width={{ xs: '100%', sm: '100%', md: '70%' }}>
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
            </Tabs>
            <TabPanel value={value} index={0}>
              <Techniques />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Finances />
            </TabPanel>
          </Stack>
          <Stack width={{ xs: '100%', sm: '100%', md: '30%' }}>
            <CardBody>
              <Typography variant="h5">Bilan global</Typography>
              <Typography color="secondary" variant="body2">
                La comparaison des données de prévisions par rapport aux données
                de rapport nous donne les pourcentahes suivantes
              </Typography>
              <Grid>
                <Grid>
                  <Typography color="primary" variant="h6">
                    Bilan technique
                  </Typography>
                  <Typography color="primary" variant="h3">
                    90%
                  </Typography>
                </Grid>
                <Grid>
                  <Typography color="#2196F3" variant="h6">
                    Bilan financier
                  </Typography>
                  <Typography variant="h4" color="#2196F3">
                    {montant} Ar
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

export const SectionNavigation = styled(Stack)(({ }) => ({}));
const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));

export const BodySection = styled(Paper)(({ theme }) => ({
  borderRadius: "32px",
  marginBlock: 15,
  padding: 30,
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: "16px",
  border: `1px solid ${theme.palette.grey[100]}`,
}));

const CardBody = styled(Stack)(({ theme }) => ({
  // paddingInline: theme.spacing(1),
  background: theme.palette.grey[100],
  // paddingBottom: theme.spacing(1),
  width: "100%",
  // height: "278px",
  padding: "10px 14px",
  borderRadius: 14,
  gap: "32px",
  marginTop: 15,
}));
const FormContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(3),
  padding: 30,
  borderRadius: 20,
  background: "#fff",
  border: `1px solid ${theme.palette.grey[100]}`,
}));