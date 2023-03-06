import {
  Button,
  Grid,
  Stack,
  Divider,
  Typography,
  styled,
  Box,
  Card,
} from "@mui/material";
import Container from "@mui/material/Container";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { Fragment } from "react";
import KeyValue from "../../../shared/keyValue";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRouter } from "next/router";
import Techniques from "./organism/Techniques/techniques";
import Finances from "./organism/Finances/Finance";
import Link from "next/link";

const BilanMission = () => {
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
      <Stack>
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
      </Stack>
      <BodySection>
        <Card>
          <ValueDetail>
            <Grid container spacing={2} alignItems={"center"}>
              <Grid item xs={12} md={4}>
                <KeyValue keyName="Ref mission" value={"MISSION_001"} />
                <KeyValue
                  keyName="Description"
                  value={"Description de la mission"}
                />
              </Grid>
              <Grid item xs={12} md={4} mb={3}>
                <KeyValue keyName="Responsable" value={"Ollie Mc"} />
              </Grid>
              <Grid item xs={12} md={4} mb={3}>
                <KeyValue keyName="Gestionnaire de budget" value={"Anna"} />
              </Grid>
            </Grid>
          </ValueDetail>
        </Card>
        {/* <Card> */}
        <BodySectionTabs>
          <Stack direction="row">
            <Grid container spacing={2}>
              <Grid item xs={12} md={9}>
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
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <BilanGeneral>
                      <Typography sx={{ mb: 2 }} variant="h5">
                        Bilan global
                      </Typography>
                      <Typography color="GrayText" variant="body2" mb={2}>
                        La comparaison des données de prévisions par rapport aux
                        données de rapport nous donne les pourcentahes suivantes
                      </Typography>
                      <Typography color="primary" variant="h6">
                        Bilan technique
                      </Typography>
                      <Typography color="primary" variant="h3">
                        90%
                      </Typography>
                      <Typography color="#2196F3" variant="h6">
                        Bilan financier
                      </Typography>
                      <Typography variant="h4" color="#2196F3">
                        +200 000 Ar
                      </Typography>
                    </BilanGeneral>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </BodySectionTabs>
        {/* </Card> */}
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
export const BodySection = styled(Box)(({}) => ({
  borderRadius: 20,
  backgroundColor: "white",
  // padding: "16px 32px",
  marginBlock: 16,
}));

export const BodySectionTabs = styled(Box)(({ theme }) => ({
  padding: "20px",
  display: "flex",
  width: "100%",
  // marginBottom: theme.spacing(3),
  borderRadius: 10,
  background: "#FFFFFF",
}));

const ValueDetail = styled(Stack)(({ theme }) => ({
  width: "100%",
  // marginBottom: theme.spacing(3),
  padding: 20,
  borderRadius: 10,
}));

const BilanGeneral = styled(Box)(({ theme }) => ({
  padding: "16px 32px",
  gap: "16px",
  borderRadius: 10,
  background: "#0000000F",
}));
