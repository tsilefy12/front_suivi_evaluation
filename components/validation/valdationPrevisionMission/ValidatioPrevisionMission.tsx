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

const ValidationPrevisionMission = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <NavigationContainer>
        <SectionNavigation direction='row'
         spacing={{ xs: 1, sm: 2, md: 4 }}
         justifyContent="space-between"
         sx={{ mb: 2 }}>
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
          <Typography variant="h4">Validation prévision de mission</Typography>
        </SectionNavigation>
      </NavigationContainer>
      <Detail />
      <BodySection>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 1, md: 2 }}
        sx={{padding:"10px", width:"100%" }}>
          <Stack width={{xs:"100%", sm:"100%", md:"60%" }}>
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
          <Stack width={{xs:"100%", sm:"100%", md:"40%" }}>
            <CardBody>
              <Typography variant="h6" sx={{ textTransform: "uppercase" }}>Etat de la prévision </Typography>
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
          </Stack>
        </Stack>
      </BodySection>
    </Container>
  );
};

export default ValidationPrevisionMission;

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
  padding: "8px 20px",
  gap: "16px",
  border: `1px solid ${theme.palette.grey[100]}`,
}));

const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));


const CardBody = styled(Stack)(({ theme }) => ({
  paddingInline: theme.spacing(3),
  background: theme.palette.grey[100],
  paddingBottom: theme.spacing(1),
  width: "100%",
  padding: "10px 30px",
  borderRadius: 14,
  gap: "32px",
  marginTop: 15,
}));
