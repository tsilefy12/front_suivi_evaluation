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
import { Check, Close } from "@mui/icons-material";
import useFetchMissionListe from "../hooks/useFetchMissionListe";
import { useAppSelector } from "../../../../hooks/reduxHooks";
  
  const RapportMission = () => {
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
            <Link href="#">
            <Button variant="contained" startIcon={<Check />}>
                Soumettre le rapport
            </Button>
            </Link>
            <Link href="#">
            <Button color="warning" variant="text" startIcon={<Close />}>
              Annuler la soumission
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
                    <EtatRapport>
                      <Typography sx={{ mb: 2 }} variant="h5">
                        Etat du Rapport
                      </Typography>
                      <Grid mb={2}>
                        <KeyValue
                          keyName="Vérifié financièrement par"
                          value={"Nom du responsable"}
                        />
                        <Typography sx={{ mb: 2 }}>
                        Poste du responsable | 11/11/2222
                        </Typography>
                      </Grid>
                      <Grid mb={2}>
                        <KeyValue
                          keyName="Elaboré par"
                          value={"Nom du responsable"}
                        />
                        <Typography sx={{ mb: 2 }}>
                        Poste du responsable | 11/11/2222
                        </Typography>
                      </Grid>
                      <Grid mb={2}>
                        <KeyValue
                          keyName="Vérifié techniquement par"
                          value={"Nom du responsable"}
                        />
                        <Typography sx={{ mb: 2 }}>
                        Poste du responsable | 11/11/2222
                        </Typography>
                      </Grid>
                      <Grid>
                        <KeyValue
                          keyName="Versé par"
                          value={"Nom du responsable"}
                        />
                        <Typography sx={{ mb: 2 }}>
                        Poste du responsable | 11/11/2222
                        </Typography>
                      </Grid>
                    </EtatRapport>

                    <InfoDepositions>
                      <Typography sx={{ mb: 2 }} variant="h5">
                        INFO SUR LES DEPOSITIONS DE RAPPORT
                        <Link href="/">
                        <Button color="info" variant="text" >
                        Ajouter
                        </Button>
                        </Link>
                      </Typography>
                      <Grid mb={2}>
                        <KeyValue
                          keyName="Date"
                          value={"dd/MM/yyyy"}
                        />
                      </Grid>
                      <Grid mb={2}>
                        <KeyValue
                          keyName="Activites"
                          value={"Preparation des materiels pour ..."}
                        />
                      </Grid>
                      <Grid mb={2}>
                        <KeyValue
                          keyName="Livrables"
                          value={"Materiels..."}
                        />
                      </Grid>
                      <Grid  mb={2}>
                        <KeyValue
                          keyName="1er responsable"
                          value={"Nom du responsable"}
                        />
                      </Grid>
                      <Grid  mb={2}>
                        <Link href="#">
                            <Button color="success" variant="text" >
                            Editer
                            </Button>
                            </Link>
                            <Link href="#">
                            <Button color="warning" variant="text" >
                            Supprimer
                            </Button>
                            </Link>
                        </Grid>
                    <Divider />
                    <Grid mb={2}>
                        <KeyValue
                          keyName="Date"
                          value={"dd/MM/yyyy"}
                        />
                      </Grid>
                      <Grid mb={2}>
                        <KeyValue
                          keyName="Activites"
                          value={"Preparation des materiels pour ..."}
                        />
                      </Grid>
                    </InfoDepositions>
                      
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
  
  export default RapportMission;
  
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
  
  const EtatRapport = styled(Box)(({ theme }) => ({
    padding: "16px 32px",
    gap: "16px",
    borderRadius: 10,
    background: "#0000000F",
  }));

  const InfoDepositions = styled(Box)(({ theme }) => ({
    padding: "16px 32px",
    gap: "16px",
    borderRadius: 10,
  }));