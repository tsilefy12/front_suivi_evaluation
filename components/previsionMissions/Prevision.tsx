import { Button, Stack, Typography, styled, Box, Paper } from "@mui/material";
import Container from "@mui/material/Container";
import React from "react";
import KeyValue from "../shared/keyValue";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Techniques from "./organism/Techniques/techniques";
import Finances from "./organism/Finances/Finance";
import Link from "next/link";
import ArrowBack from "@mui/icons-material/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import Detail from "./detail";

const PrevisionDeMission = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <NavigationContainer>
        <SectionNavigation direction="row" justifyContent="space-between">
          <Stack flexDirection="row">
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
            <CardPrevision>
              <Typography sx={{ mb: 2 }} variant="h5">
                Etat de prévision
              </Typography>
              <Stack spacing={2}>
                <KeyValue keyName="Elaboré par" value={"Nom du responsable"} />
                <KeyValue
                  keyName="Vérifié financièrement par"
                  value={"Nom du responsable"}
                />
                <KeyValue
                  keyName="Vérifié techniquement par"
                  value={"Nom  du responsable"}
                />
                <KeyValue keyName="Payé par" value={"Nom du responsable"} />
              </Stack>
            </CardPrevision>
          </CardRight>
        </Stack>
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
  borderRadius: "32px",
  marginBlock: 15,
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  padding: "8px",
  gap: "16px",
  border: `1px solid ${theme.palette.grey[100]}`,
}));

const CardPrevision = styled(Box)(({ theme }) => ({
  paddingInline: theme.spacing(3),
  background: theme.palette.grey[100],
  paddingBottom: theme.spacing(1),
  width: "396px",
  padding: "10px 14px",
  borderRadius: 14,
  gap: "32px",
  marginTop: 14,
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
  width: "396px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "32px",
  borderRadius: "10px",
}));
