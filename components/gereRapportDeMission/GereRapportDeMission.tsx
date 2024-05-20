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
  FormLabel,
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
import useFetchMissionListe from "../home/Missions/hooks/useFetchMissionListe";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Check, Close } from "@mui/icons-material";
import { axios } from "../../axios";
import { enqueueSnackbar } from "../../redux/features/notification/notificationSlice";

const GereRapportDeMission = () => {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const { id }: any = router.query;

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

  const fetchMission = useFetchMissionListe();
  const { missionListe } = useAppSelector((state) => state.mission);
  const dispatch = useAppDispatch();
  const [validate, setValidate]: any = React.useState(false);

  React.useEffect(() => {
    fetchMission();
  }, [router.query]);

  React.useEffect(() => {
    const V = missionListe.flatMap((m) =>
      m.validationRapport.filter((v) => v.missionId === m.id)
    );
    setValidate(V);
  }, [missionListe]);
  console.log(validate[0]);

  const handleValidationFinance = async (
    responsableId: string,
    missionId: string,
    index: number
  ) => {
    try {
      const newValidationState = !validate[0];
      await axios.post("/suivi-evaluation/validation-rapport", {
        responsableId,
        missionId,
        validation: newValidationState,
      });
      setValidate((prev: any) =>
        prev.map((val: any, i: any) => (i === index ? newValidationState : val))
      );
      dispatch(
        enqueueSnackbar({
          message: " Rapport validé avec succès",
          options: { variant: "success" },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  //validation technique
  const handleValidationTechnique = async (
    responsableId: string,
    missionId: string,
    index: number
  ) => {
    try {
      const newValidationState = !validate[index];
      await axios.post("/suivi-evaluation/validation-rapport", {
        responsableId,
        missionId,
        validation: newValidationState,
      });
      setValidate((prev: any) =>
        prev.map((val: any, i: any) => (i === index ? newValidationState : val))
      );
      dispatch(
        enqueueSnackbar({
          message: " Rapport validé avec succès",
          options: { variant: "success" },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  //validation paye
  const handleValidationPaye = async (
    responsableId: string,
    missionId: string,
    index: number
  ) => {
    try {
      const newValidationState = !validate[index];
      await axios.post("/suivi-evaluation/validation-rapport", {
        responsableId,
        missionId,
        validation: newValidationState,
      });
      setValidate((prev: any) =>
        prev.map((val: any, i: any) => (i === index ? newValidationState : val))
      );
      dispatch(
        enqueueSnackbar({
          message: " Rapport validé avec succès",
          options: { variant: "success" },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container maxWidth="xl">
      <NavigationContainer>
        <SectionNavigation
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Stack direction={{ xs: "column", sm: "row" }}>
            <Link href="/missions">
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
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 1, md: 2 }}
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
            </Tabs>
            <TabPanel value={value} index={0}>
              <Techniques />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Finances />
            </TabPanel>
          </Stack>
          <Stack width={{ xs: "100%", sm: "100%", md: "30%" }}>
            <CardBody>
              <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
                Etat des rapports
              </Typography>
              <Stack spacing={2}>
                <KeyValue keyName="Elaboré par" value={"Nom du responsable"} />
                <Divider />
                <Typography>
                  Vérifié financièrement par :
                  <Stack
                    direction={"column"}
                    gap={2}
                    justifyContent={"space-between"}
                    alignItems={"start"}
                  >
                    <FormLabel>Nom du responsable</FormLabel>
                    <Stack direction={"row"} gap={4}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<DoneIcon />}
                        onClick={() => handleValidationFinance(id, id, 0)}
                      >
                        Vérifier financièrement
                      </Button>
                      <FormLabel
                        sx={{
                          display: validate[0] == true ? "none" : "block",
                        }}
                      >
                        <Close color="error" />
                      </FormLabel>
                      <FormLabel
                        sx={{
                          display: validate[0] == true ? "block" : "none",
                        }}
                      >
                        <Check color="primary" />
                      </FormLabel>
                    </Stack>
                  </Stack>
                </Typography>
                <Divider />
                <Typography>
                  Vérifié techniquement par :
                  <Stack
                    direction={"column"}
                    gap={2}
                    justifyContent={"space-between"}
                    alignItems={"start"}
                  >
                    <FormLabel>Nom du responsable</FormLabel>
                    <Stack direction={"row"} gap={4}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<DoneIcon />}
                        onClick={() => handleValidationTechnique(id, id, 0)}
                      >
                        Vérifier Techniquement
                      </Button>
                      <FormLabel
                        sx={{
                          display: validate[0] == true ? "none" : "block",
                        }}
                      >
                        <Close color="error" />
                      </FormLabel>
                      <FormLabel
                        sx={{
                          display: validate[0] == true ? "block" : "none",
                        }}
                      >
                        <Check color="primary" />
                      </FormLabel>
                    </Stack>
                  </Stack>
                </Typography>
                <Divider />
                <Typography>
                  <KeyValue keyName="Payé par" value={"Nom du responsable"} />
                  <Stack direction={"row"} gap={4}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<DoneIcon />}
                      onClick={() => handleValidationPaye(id, id, 0)}
                    >
                      Vérsé
                    </Button>
                    <FormLabel
                      sx={{
                        display: validate[0] == true ? "none" : "block",
                      }}
                    >
                      <Close color="error" />
                    </FormLabel>
                    <FormLabel
                      sx={{
                        display: validate[0] == true ? "block" : "none",
                      }}
                    >
                      <Check color="primary" />
                    </FormLabel>
                  </Stack>
                </Typography>
              </Stack>
            </CardBody>
            <CardFooter>
              <Stack flexDirection={{ xs: "column", sm: "row" }}>
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
          </Stack>
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
