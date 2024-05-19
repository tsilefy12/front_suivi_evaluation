import {
  Button,
  Stack,
  Typography,
  styled,
  Box,
  Paper,
  Divider,
  FormLabel,
} from "@mui/material";
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
import { Check, Close } from "@mui/icons-material";
import { axios } from "../../axios";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { enqueueSnackbar } from "../../redux/features/notification/notificationSlice";
import useFetchMissionListe from "../home/Missions/hooks/useFetchMissionListe";
import { useRouter } from "next/router";

const PrevisionDeMission = () => {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const { id }: any = router.query;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const fetchMission = useFetchMissionListe();
  const { missionListe } = useAppSelector((state) => state.mission);
  React.useEffect(() => {
    fetchMission();
  }, [missionListe]);

  console.log(
    missionListe.find((m) => m.validationPrevision?.find((v) => v.validation!))
  );
  const [changeFinance, setChangeFinance] = React.useState(true);
  const [changeTechnique, setChangeTechnique] = React.useState(true);
  const [changePaye, setChangePaye] = React.useState(true);
  const dispatch = useAppDispatch();

  const handleValidationFinance = async (
    responsableId: string,
    missionId: string,
    validation: boolean
  ) => {
    console.log("Ok");
    try {
      await axios.post("/suivi-evaluation/validation-prevision", {
        responsableId,
        missionId,
        validation,
      });
      dispatch(
        enqueueSnackbar({
          message: "Validation financière de la prevision créée avec succès",
          options: { variant: "success" },
        })
      );
    } catch (error) {
      console.log(error);
    }
    if (changeFinance) {
      setChangeFinance(false);
    } else {
      setChangeFinance(true);
    }
  };

  //validation technic
  const handleValidationTechnique = async (
    responsableId: string,
    missionId: string,
    validation: boolean
  ) => {
    try {
      await axios.post("/suivi-evaluation/validation-prevision", {
        responsableId,
        missionId,
        validation,
      });
      dispatch(
        enqueueSnackbar({
          message: "Validation technique de la prevision créée avec succès",
          options: { variant: "success" },
        })
      );
    } catch (error) {
      console.log(error);
    }

    if (changeTechnique) {
      setChangeTechnique(false);
    } else {
      setChangeTechnique(true);
    }
  };
  //validation paiement
  const handleValidationPaye = async (
    responsableId: string,
    missionId: string,
    validation: boolean
  ) => {
    try {
      await axios.post("/suivi-evaluation/validation-prevision", {
        responsableId,
        missionId,
        validation,
      });
      dispatch(
        enqueueSnackbar({
          message: "Validation du paiement de la prevision créée avec succès",
          options: { variant: "success" },
        })
      );
    } catch (error) {
      console.log(error);
    }
    if (changePaye) {
      setChangePaye(false);
    } else {
      setChangePaye(true);
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
          <Typography variant="h4">Prévision de mission</Typography>
        </SectionNavigation>
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
              <Techniques key={value} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Finances key={value} />
            </TabPanel>
          </Stack>
          <Stack width={{ xs: "100%", sm: "100%", md: "30%" }}>
            <CardPrevision key={0}>
              <Typography sx={{ mb: 2 }} variant="h5">
                Etat de prévision
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
                        onClick={() =>
                          handleValidationFinance(
                            id,
                            id,
                            changeFinance ? true : false
                          )
                        }
                      >
                        Vérifier financièrement
                      </Button>
                      <FormLabel
                        sx={{ display: changeFinance ? "block" : "none" }}
                      >
                        <Close color="error" />
                      </FormLabel>
                      <FormLabel
                        sx={{ display: changeFinance ? "none" : "block" }}
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
                        onClick={() =>
                          handleValidationTechnique(id, id, changeTechnique)
                        }
                      >
                        Vérifier Techniquement
                      </Button>
                      <FormLabel
                        sx={{ display: changeTechnique ? "block" : "none" }}
                      >
                        <Close color="error" />
                      </FormLabel>
                      <FormLabel
                        sx={{ display: changeTechnique ? "none" : "block" }}
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
                      onClick={() => handleValidationPaye(id, id, changePaye)}
                    >
                      Vérsé
                    </Button>
                    <FormLabel sx={{ display: changePaye ? "block" : "none" }}>
                      <Close color="error" />
                    </FormLabel>
                    <FormLabel sx={{ display: changePaye ? "none" : "block" }}>
                      <Check color="primary" />
                    </FormLabel>
                  </Stack>
                </Typography>
              </Stack>
            </CardPrevision>
          </Stack>
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
  alignItems: "flex-start",
  padding: "8px 20px",
  gap: "16px",
  border: `1px solid ${theme.palette.grey[100]}`,
  width: "100%",
}));

const CardPrevision = styled("div")(({ theme }) => ({
  paddingInline: theme.spacing(3),
  background: theme.palette.grey[100],
  paddingBottom: theme.spacing(1),
  width: "100%",
  padding: "8px 18px",
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
