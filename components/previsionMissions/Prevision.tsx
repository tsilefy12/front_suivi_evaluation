import {
  Button,
  Grid,
  Stack,
  Divider,
  Typography,
  styled,
  Box,
  Card,
  Paper,
} from "@mui/material";
import Container from "@mui/material/Container";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { Fragment } from "react";
// import KeyValue from "../../../shared/keyValue";
import KeyValue from "../shared/keyValue";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRouter } from "next/router";
import Techniques from "./organism/Techniques/techniques";
import Finances from "./organism/Finances/Finance";
import Link from "next/link";
import ArrowBack from "@mui/icons-material/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import Detail from "./detail";

const PrevisionDeMission = () => {
  const [value, setValue] = React.useState(0);
  const [age, setAge] = React.useState("");
  const router = useRouter();

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
        <SectionNavigation direction="row" justifyContent="space-between">
          <Stack flexDirection="row">
            <Link href="/">
              <Button color="info" variant="text" startIcon={<ArrowBack />}>
                Retour
              </Button>
            </Link>
            <Button
              variant="contained"
              size="small"
              startIcon={<DoneIcon />}
              sx={{ marginInline: 3 }}
            >
              Soumettre la prévision
            </Button>
            <Button
              variant="text"
              color="warning"
              size="small"
              startIcon={<CloseIcon />}
              sx={{ marginInline: 3 }}
            >
              Annuler la soumission
            </Button>
          </Stack>
          <Typography variant="h4">Prévision de mission</Typography>
        </SectionNavigation>
        {/* <Divider /> */}
      </NavigationContainer>
      <Detail />
      <BodySection>
        <BodySectionTabs>
          <Stack direction="row">
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
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
              </Grid>
              <Grid item xs={12} md={3}>
                <EtatPrevision>
                  <Typography sx={{ mb: 2 }} variant="h5">
                    Etat de prévision
                  </Typography>
                  <Grid mb={3}>
                    <KeyValue
                      keyName="Elaboré par"
                      value={"Nom du responsable"}
                    />
                  </Grid>
                  <Grid mb={3}>
                    <KeyValue
                      keyName="Vérifié financièrement par"
                      value={"Nom du responsable"}
                    />
                  </Grid>
                  <Grid mb={3}>
                    <KeyValue
                      keyName="Vérifié techniquement par"
                      value={"Nom  du responsable"}
                    />
                  </Grid>
                  <Grid mb={3}>
                    <KeyValue keyName="Payé par" value={"Nom du responsable"} />
                  </Grid>
                </EtatPrevision>
              </Grid>
            </Grid>
          </Stack>
        </BodySectionTabs>
      </BodySection>
    </Container>
  );
};

export default PrevisionDeMission;

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
export const BodySection = styled(Paper)(({ theme }) => ({
  borderRadius: 20,
  backgroundColor: "white",
  // padding: "16px 32px",
  marginBlock: 15,
}));

export const BodySectionTabs = styled(Box)(({ theme }) => ({
  padding: "20px",
  display: "flex",
  width: "100%",
  // marginBottom: theme.spacing(3),
  borderRadius: 10,
  background: "#FFFFFF",
}));

const EtatPrevision = styled(Box)(({ theme }) => ({
  padding: "16px 32px",
  gap: "32px",
  borderRadius: 8,
  background: "#0000000F",
  width: "432px",
  marginLeft: "20px",
}));

const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));
