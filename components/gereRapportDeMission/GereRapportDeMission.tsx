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
  MenuItem,
} from "@mui/material";
import Container from "@mui/material/Container";
import React, { Fragment, useEffect } from "react";
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
import { Check, Close, Print } from "@mui/icons-material";
import { axios } from "../../axios";
import { enqueueSnackbar } from "../../redux/features/notification/notificationSlice";
import useFetchGrants from "../GrantsEnCours/hooks/getGrants";
import useFetchEmploys from "../GrantsEnCours/hooks/getResponsable";
import { MissionItem } from "../../redux/features/mission/mission.interface";
import Moment from "react-moment";
import PrintPdf from "./printPdf";

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
  const fetchGrants = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state) => state.employe);
  const [getVerificateurFinance, setGetVerificateurFinance] =
    React.useState<boolean>(false);
  const [getVerificateurTechnic, setGetVerificateurTechnic] =
    React.useState<boolean>(false);
  const [getValidatePaye, setGetValidatePay] = React.useState<boolean>(false);

  React.useEffect(() => {
    fetchEmployes();
    fetchGrants();
    fetchMission();
    const mission = missionListe.find((m: MissionItem) => m.id == id);

    if (mission) {
      const {
        verifyFinancial,
        validationRapport,
        verifyTechnic,
        validateFinancial,
      } = mission;

      const isFinanceVerified = validationRapport!.some(
        (v: any) =>
          v.responsableId == verifyFinancial &&
          v.missionId == id &&
          v.validation == true
      );

      setGetVerificateurFinance(isFinanceVerified);
      const isTechnicVerified = validationRapport!.some(
        (v: any) =>
          v.responsableId == verifyTechnic &&
          v.missionId == id &&
          v.validation == true
      );

      setGetVerificateurTechnic(isTechnicVerified);

      const isFinanceValidated = validationRapport!.some(
        (v: any) =>
          v.responsableId === validateFinancial &&
          v.missionId == id &&
          v.validation == true
      );

      setGetValidatePay(isFinanceValidated);
    }
  }, []);
  const handleValidationFinance = async (
    responsableId: string,
    missionId: string,
    validation: boolean
  ) => {
    try {
      // Send the updated validation state to the server
      await axios.post("/suivi-evaluation/validation-rapport", {
        responsableId,
        missionId,
        validation,
      });
      setGetVerificateurFinance(validation);
      dispatch(
        enqueueSnackbar({
          message: "Rapport validé avec succès",
          options: { variant: "success" },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleValidationTechnique = async (
    responsableId: string,
    missionId: string,
    validation: boolean
  ) => {
    try {
      await axios.post("/suivi-evaluation/validation-rapport", {
        responsableId,
        missionId,
        validation,
      });
      setGetVerificateurTechnic(validation);
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

  //paye
  const handleValidationPaye = async (
    responsableId: string,
    missionId: string,
    validation: boolean
  ) => {
    try {
      await axios.post("/suivi-evaluation/validation-rapport", {
        responsableId,
        missionId,
        validation,
      });
      setGetValidatePay(validation);
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
  // console.log(valueGetPaye);
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
            <Link href="/missions/ListMission">
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
              Soumettre le rapport
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
      <BodySection sx={{ height: "calc(100vh - 380px)", overflow: "auto" }}>
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
                <div>
                  <FormLabel>Elaboré par : </FormLabel>
                  {missionListe
                    .filter((f: any) => f.id === id)
                    .map((row: MissionItem) => (
                      <span key={row.id!}>
                        {
                          employees.find(
                            (e: any) => e.id === row.missionManagerId
                          )?.name as string
                        }{" "}
                        {
                          employees.find(
                            (e: any) => e.id === row.missionManagerId
                          )?.surname as string
                        }
                      </span>
                    ))}
                </div>
                <Divider />
                <Typography>
                  <span> Vérifié financièrement par : </span>
                  {missionListe
                    .filter((f: MissionItem) => f.id === id)
                    .map((row: MissionItem) => (
                      <Stack
                        direction={"column"}
                        gap={2}
                        justifyContent={"space-between"}
                        alignItems={"start"}
                        key={row.id!}
                      >
                        <FormLabel>
                          {" "}
                          {
                            employees.find(
                              (e: any) => e.id === row.verifyFinancial
                            )?.name as string
                          }{" "}
                          {
                            employees.find(
                              (e: any) => e.id === row.verifyFinancial
                            )?.surname as string
                          }
                        </FormLabel>
                        <Stack direction={"row"} gap={4}>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<DoneIcon />}
                            onClick={() =>
                              handleValidationFinance(
                                row.verifyFinancial!,
                                id,
                                getVerificateurFinance == true ? false : true
                              )
                            }
                          >
                            Vérifier financièrement
                          </Button>
                          <FormLabel
                            sx={{
                              display:
                                getVerificateurFinance == true
                                  ? "none"
                                  : "block",
                            }}
                          >
                            <Close color="error" />
                          </FormLabel>
                          <FormLabel
                            sx={{
                              display:
                                getVerificateurFinance == true
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <Check color="primary" />
                          </FormLabel>
                        </Stack>
                      </Stack>
                    ))}
                </Typography>
                <Divider />
                <Typography>
                  <span>Vérifié techniquement par : </span>
                  {missionListe
                    .filter((f: MissionItem) => f.id === id)
                    .map((row: MissionItem) => (
                      <Stack
                        direction={"column"}
                        gap={2}
                        justifyContent={"space-between"}
                        alignItems={"start"}
                        key={row.id!}
                      >
                        <FormLabel>
                          {
                            employees.find(
                              (e: any) => e.id === row.verifyTechnic
                            )?.name as string
                          }{" "}
                          {
                            employees.find(
                              (e: any) => e.id === row.verifyTechnic
                            )?.surname as string
                          }
                        </FormLabel>
                        <Stack direction={"row"} gap={4}>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<DoneIcon />}
                            onClick={() =>
                              handleValidationTechnique(
                                row.verifyTechnic!,
                                id,
                                getVerificateurTechnic == true ? false : true
                              )
                            }
                            disabled={getVerificateurFinance == false}
                          >
                            Vérifier Techniquement
                          </Button>
                          <FormLabel
                            sx={{
                              display:
                                getVerificateurTechnic == true
                                  ? "none"
                                  : "block",
                            }}
                            disabled={getVerificateurTechnic == false}
                          >
                            <Close color="error" />
                          </FormLabel>
                          <FormLabel
                            sx={{
                              display:
                                getVerificateurTechnic == true
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <Check color="primary" />
                          </FormLabel>
                        </Stack>
                      </Stack>
                    ))}
                </Typography>
                <Divider />
                <Typography>
                  {missionListe
                    .filter((f: MissionItem) => f.id === id)
                    .map((row: MissionItem) => (
                      <Fragment key={row.id}>
                        <span>Payé par :</span>
                        <br></br>
                        {
                          employees.find(
                            (e: any) => e.id === row.validateFinancial
                          )?.name as string
                        }{" "}
                        {
                          employees.find(
                            (e: any) => e.id === row.validateFinancial
                          )?.surname as string
                        }
                        <Stack direction={"row"} gap={4}>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<DoneIcon />}
                            onClick={() =>
                              handleValidationPaye(
                                row.validateFinancial!,
                                id,
                                getValidatePaye == true ? false : true
                              )
                            }
                            disabled={getVerificateurTechnic == false}
                          >
                            Vérsé
                          </Button>
                          <FormLabel
                            sx={{
                              display:
                                getValidatePaye == true ? "none" : "block",
                            }}
                          >
                            <Close color="error" />
                          </FormLabel>
                          <FormLabel
                            sx={{
                              display:
                                getValidatePaye == true ? "block" : "none",
                            }}
                          >
                            <Check color="primary" />
                          </FormLabel>
                        </Stack>
                      </Fragment>
                    ))}
                </Typography>
              </Stack>
            </CardBody>
            <CardFooter>
              <PrintPdf />
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
  padding: "8px 20px 60px",
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
