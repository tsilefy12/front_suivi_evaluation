import {
  Button,
  Grid,
  Stack,
  Divider,
  Typography,
  styled,
  Box,
  Paper,
  Dialog,
} from "@mui/material";
import Container from "@mui/material/Container";
import React from "react";
import KeyValue from "../shared/keyValue";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useRouter } from "next/router";
import Techniques from "./organism/Techniques/techniques";
import Finances from "./organism/Finances/Finance";
import Link from "next/link";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Detail from "./detail";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import AddDepositionDesRapports from "./add/addDepositionDesRapports";

const GereRapportDeMission = () => {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <NavigationContainer>
        <SectionNavigation 
         direction={{ xs: 'column', sm: 'row' }}
         spacing={{ xs: 1, sm: 2, md: 4 }}
         justifyContent="space-between"
         sx={{ mb: 2 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }}>
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
          <Typography variant="h4">Rapport de mission</Typography>
        </SectionNavigation>
        <Divider />
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
          {/* <Stack width={{xs:"100%", sm:"100%", md:"40%" }}>
            <CardBody>
              <Typography variant="h6" sx={{ textTransform: "uppercase"}}>Etat des rapports</Typography>
              <Stack spacing={1}>
                <KeyValue
                  keyName="Vérifié financièrement par"
                  value={"Nom du responsable"}
                />
                <Typography variant="caption" color="GrayText">
                  Poste du reponsable | 11/11/2222
                </Typography>
                <Divider />
                <KeyValue keyName="Elaboré par" value={"Nom du responsable"} />
                <Typography variant="caption" color="GrayText">
                  Poste du reponsable | 11/11/2222
                </Typography>
                <Divider />

                <KeyValue
                  keyName="Vérifié techniquement par"
                  value={"Nom  du responsable"}
                />
                <Typography variant="caption" color="GrayText">
                  Poste du reponsable | 11/11/2222
                </Typography>

                <Divider />

                <KeyValue keyName="Versé par" value={"Nom du responsable"} />
                <Typography variant="caption" color="GrayText">
                  Poste du reponsable | 11/11/2222
                </Typography>
              </Stack>
            </CardBody>
            <CardFooter>
              <Stack flexDirection={{xs:"column", sm:"row"}}>
                <Typography
                  variant="h6"
                  sx={{ textTransform: "uppercase", marginTop: "3px" }}
                >
                  Info sur les dépositions de Rapport
                </Typography>
                <Dialog open={open} onClose={handleClose}>
                  <AddDepositionDesRapports />
                </Dialog>
              </Stack>
              {[1, 2].map((item) => (
                <Grid key={item}>
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
                </Grid>
              ))}
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
          </Stack> */}
        </Stack>
      </BodySection>
    </Container>
  );
};

export default GereRapportDeMission;

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

export const CardFooter = styled("div")(({ theme }) => ({
  paddingInline: theme.spacing(2),
  paddingBlock: theme.spacing(1),
  borderBottomLeftRadius: theme.spacing(2),
  borderBottomRightRadius: theme.spacing(2),
  width: "100%",
  padding: "10px 22px",
  marginTop: "20px",
}));

const CardBody = styled(Stack)(({ theme }) => ({
  paddingInline: theme.spacing(3),
  background: theme.palette.grey[100],
  paddingBottom: theme.spacing(1),
  width: "100%",
  padding: "10px 14px",
  borderRadius: 14,
  gap: "32px",
  marginTop: 15,
}));

const CardMain = styled(Stack)(({ theme }) => ({
  marginTop: "10px",
  paddingBottom: theme.spacing(1),
}));
