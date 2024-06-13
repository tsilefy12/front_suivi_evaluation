import {
  Button,
  Stack,
  Typography,
  styled,
  Box,
  Paper,
  Divider,
  FormLabel,
  Grid,
} from "@mui/material";
import Container from "@mui/material/Container";
import React, { Fragment } from "react";
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
import useFetchEmploys from "../GrantsEnCours/hooks/getResponsable";
import { MissionItem } from "../../redux/features/mission/mission.interface";
import Moment from "react-moment";
import useFetchGrants from "../GrantsEnCours/hooks/getGrants";
import { boolean } from "yup";
import { EmployeItem } from "../../redux/features/employe/employeSlice.interface";

const PrevisionDeMission = () => {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const { id }: any = router.query;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const fetchMission = useFetchMissionListe();
  const { missionListe } = useAppSelector((state) => state.mission);
  const dispatch = useAppDispatch();
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state) => state.employe);
  const fetchGrants = useFetchGrants();
  const [getVerificateurFinance, setGetVerificateurFinance] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    fetchEmployes();
    fetchMission();
    fetchGrants();
  }, [missionListe]);

  React.useEffect(() => {
    const verifyFinanceId = missionListe
      .filter((m: MissionItem) => m.id === id)
      .map((m: MissionItem) => {
        m.verifyFinancial;
      });
    const verifyMissionId = missionListe
      .filter((m: MissionItem) => m.id === id)
      .map((m: MissionItem) => {
        m.id;
      });
    const validatePrevue = missionListe
      .filter((m: MissionItem) => m.id == id)
      .map((m: MissionItem) => {
        m.validationPrevision;
      });
    console.log(" validation :", validatePrevue!);
    // if (
    //   verifyFinanceId == validatePrevue!.map((m: any) => m.responsableId) &&
    //   verifyMissionId == validatePrevue!.map((m: any) => m.missionId)
    // ) {
    //   const verifyed = validatePrevue!.map((v) => v.validation as boolean);
    //   return setGetVerificateurFinance(verifyed as boolean);
    // }
  }, [missionListe]);
  // console.log("verify finance :", getVerificateurFinance);

  const handleValidationFinance = async (
    responsableId: string,
    missionId: string,
    validation: boolean
  ) => {
    try {
      // Send the updated validation state to the server
      await axios.post("/suivi-evaluation/validation-prevision", {
        responsableId,
        missionId,
        validation,
      });

      dispatch(
        enqueueSnackbar({
          message: "Prévision validé avec succès",
          options: { variant: "success" },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // //validation technique
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
          message: " Prévision validé avec succès",
          options: { variant: "success" },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

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
          message: " Prévision validé avec succès",
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
          paddingBottom={10}
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
          sx={{ padding: "0px", width: "100%" }}
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
                            (e: EmployeItem) => e.id === row.missionManagerId
                          )?.name as string
                        }{" "}
                        {
                          employees.find(
                            (e: EmployeItem) => e.id === row.missionManagerId
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
                              (e: EmployeItem) => e.id === row.verifyFinancial
                            )?.name as string
                          }{" "}
                          {
                            employees.find(
                              (e: EmployeItem) => e.id === row.verifyFinancial
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
                                false
                              )
                            }
                          >
                            Vérifier financièrement
                          </Button>
                          {/* <FormLabel
                          sx={{
                            display: valueGetFV == true ? "none" : "block",
                          }}
                        >
                          <Close color="error" />
                        </FormLabel>
                        <FormLabel
                          sx={{
                            display: valueGetFV == true ? "block" : "none",
                          }}
                        >
                          <Check color="primary" />
                        </FormLabel> */}
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
                              (e: EmployeItem) => e.id === row.verifyTechnic
                            )?.name as string
                          }{" "}
                          {
                            employees.find(
                              (e: EmployeItem) => e.id === row.verifyTechnic
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
                                id,
                                row.verifyTechnic!,
                                true
                              )
                            }
                          >
                            Vérifier Techniquement
                          </Button>
                          {/* <FormLabel
                          sx={{
                            display: valueGetTechnic == true ? "none" : "block",
                          }}
                          disabled={valueGetFV == false}
                        >
                          <Close color="error" />
                        </FormLabel>
                        <FormLabel
                          sx={{
                            display: valueGetTechnic == true ? "block" : "none",
                          }}
                        >
                          <Check color="primary" />
                        </FormLabel> */}
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
                            (e: EmployeItem) => e.id === row.validateFinancial
                          )?.name as string
                        }{" "}
                        {
                          employees.find(
                            (e: EmployeItem) => e.id === row.validateFinancial
                          )?.surname as string
                        }
                        <Stack direction={"row"} gap={4}>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<DoneIcon />}
                            onClick={() =>
                              handleValidationPaye(
                                id,
                                row.validateFinancial!,
                                true
                              )
                            }
                          >
                            Vérsé
                          </Button>
                          {/* <FormLabel
                          sx={{
                            display: valueGetPaye == true ? "none" : "block",
                          }}
                        >
                          <Close color="error" />
                        </FormLabel>
                        <FormLabel
                          sx={{
                            display: valueGetPaye == true ? "block" : "none",
                          }}
                        >
                          <Check color="primary" />
                        </FormLabel> */}
                        </Stack>
                      </Fragment>
                    ))}
                </Typography>
                <Divider />
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
