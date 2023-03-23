import {
  Button,
  Grid,
  Stack,
  Divider,
  Typography,
  styled,
  Box,
  Paper,
} from "@mui/material";
import Container from "@mui/material/Container";
import React from "react";
import KeyValue from "../../shared/keyValue";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Techniques from "./organism/Techniques/techniques";
import Finances from "./organism/Finances/Finance";
import Link from "next/link";
import ArrowBack from "@mui/icons-material/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";
import Detail from "./detail";

const ValidationRapportMission = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <NavigationContainer>
        <SectionNavigation direction="row" justifyContent="space-between">
          <Link href="/">
            <Button
              color="info"
              variant="text"
              startIcon={<ArrowBack />}
              sx={{ marginInline: 3 }}
            >
              Retour
            </Button>
          </Link>
          <Typography variant="h4">Validation rapport de mission</Typography>
        </SectionNavigation>
      </NavigationContainer>
      <Detail />
      <BodySection>
        <Stack direction="row" spacing={1}>
          <CardLeft>
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
          </CardLeft>
          <CardRight>
            <CardBody>
              <Typography variant="h6">Etat du Rapport</Typography>
              <Stack spacing={1}>
                <KeyValue keyName="Elaboré par" value={"Nom du responsable"} />
                <Divider />
                <Grid>
                  <KeyValue
                    keyName="Vérifié financièrement par"
                    value={"Nom du responsable"}
                  />
                  <Button variant="contained" startIcon={<DoneIcon />}>
                    Vérifier financièrement
                  </Button>
                </Grid>
                <Divider />

                <Grid>
                  <KeyValue
                    keyName="Vérifié techniquement par"
                    value={"Nom  du responsable"}
                  />
                  <Button variant="contained" startIcon={<DoneIcon />}>
                    Vérifier Techniquement
                  </Button>
                </Grid>
                <Divider />
                <Grid>
                  <KeyValue keyName="Versé par" value={"Nom du responsable"} />
                  <Button variant="contained" startIcon={<DoneIcon />}>
                    Versé
                  </Button>
                </Grid>
              </Stack>
            </CardBody>

            <CardFooter>
              <Typography variant="body2" sx={{ textTransform: "uppercase" }}>
                Info sur les dépositions de Rapport
              </Typography>
              <CardMain>
                <KeyValue keyName="Date" value={"dd/MM/yyyy"} />
                <KeyValue
                  keyName="Activités"
                  value={"Préparation des matériels pour ...."}
                />
                <KeyValue keyName="Livrables" value={"Matériels ..."} />
                <KeyValue
                  keyName="1er responsable"
                  value={"Nom du responsable"}
                />
              </CardMain>
              <Divider />
              <CardMain>
                <KeyValue keyName="Date" value={"dd/MM/yyyy"} />
                <KeyValue
                  keyName="Activités"
                  value={"Préparation des matériels pour ...."}
                />
                <KeyValue keyName="Livrables" value={"Matériels ..."} />
                <KeyValue
                  keyName="1er responsable"
                  value={"Nom du responsable"}
                />
              </CardMain>
              <Divider />
              <CardMain>
                <KeyValue keyName="Date" value={"dd/MM/yyyy"} />
                <KeyValue
                  keyName="Activités"
                  value={"Préparation des matériels pour ...."}
                />
                <KeyValue keyName="Livrables" value={"Matériels ..."} />
                <KeyValue
                  keyName="1er responsable"
                  value={"Nom du responsable"}
                />
              </CardMain>
            </CardFooter>
          </CardRight>
        </Stack>
      </BodySection>
    </Container>
  );
};

export default ValidationRapportMission;

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
  borderRadius: "32px",
  marginBlock: 15,
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  padding: "8px",
  gap: "16px",
  border: `2px solid ${theme.palette.grey[100]}`,
}));

const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));

const CardLeft = styled(Box)(({ theme }) => ({
  display: "flex",
  borderRadius: "10px",
  flexDirection: "column",
  width: "830px",
  marginTop: 14,
}));

const CardRight = styled(Box)(({ theme }) => ({
  width: "400px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "32px",
  borderRadius: "10px",
}));

export const CardFooter = styled("div")(({ theme }) => ({
  paddingInline: theme.spacing(2),
  paddingBlock: theme.spacing(1),
  borderBottomLeftRadius: theme.spacing(2),
  borderBottomRightRadius: theme.spacing(2),
  width: "398px",
  padding: "10px 14px",
  marginTop: "10px",
}));

const CardBody = styled(Stack)(({ theme }) => ({
  paddingInline: theme.spacing(3),
  background: theme.palette.grey[100],
  paddingBottom: theme.spacing(1),
  width: "398px",
  padding: "10px 14px",
  borderRadius: 14,
  gap: "32px",
  marginTop: 15,
}));

const CardMain = styled(Stack)(({ theme }) => ({
  marginTop: "10px",
  paddingBottom: theme.spacing(1),
}));
