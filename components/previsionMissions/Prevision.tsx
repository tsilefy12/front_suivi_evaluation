import { Check, Close, Height } from "@mui/icons-material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import {
  Box,
  Button,
  Divider,
  FormLabel,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import { axios } from "../../axios";
import { usePermitted } from "../../config/middleware";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { MissionItem } from "../../redux/features/mission/mission.interface";
import { enqueueSnackbar } from "../../redux/features/notification/notificationSlice";
import useFetchGrants from "../GrantsEnCours/hooks/getGrants";
import useFetchEmploys from "../GrantsEnCours/hooks/getResponsable";
import useFetchMissionListe from "../home/Missions/hooks/useFetchMissionListe";
import Detail from "./detail";
import Finances from "./organism/Finances/Finance";
import Techniques from "./organism/Techniques/techniques";
import PrintPdfPrevision from "./printpDFPrevision";
import { CardFooter } from "../gereRapportDeMission/GereRapportDeMission";
import Logistiques from "./organism/Logistique/Logistique";
import { updateMission } from "../../redux/features/mission";

const PrevisionDeMission = () => {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const { id }: any = router.query;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const fetchMission = useFetchMissionListe();
  const { missionListe, loading, mission, isEditing } = useAppSelector(
    (state) => state.mission
  );
  const dispatch = useAppDispatch();
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state) => state.employe);
  const fetchGrants = useFetchGrants();
  const validate = usePermitted();
  const [getVerificateurFinance, setGetVerificateurFinance] =
    React.useState<boolean>(false);
  const [getVerificateurTechnic, setGetVerificateurTechnic] =
    React.useState<boolean>(false);
  const [getValidatePaye, setGetValidatePay] = React.useState<boolean>(false);
  const [getValidateLogistique, setGetValidateLogistique] =
    React.useState<boolean>(false);

  useEffect(() => {
    fetchGrants();
    fetchEmployes();
    fetchMission();
    const mission = missionListe.find((m: MissionItem) => m.id == id);

    if (mission) {
      const {
        verifyFinancial,
        verifyTechnic,
        validateFinancial,
        validationPrevision,
        validateLogistique,
        type,
      } = mission;

      const isFinanceVerified = validationPrevision!.some(
        (v: any) =>
          v.responsableId == verifyFinancial &&
          v.missionId == id &&
          v.validation == true &&
          v.type == type
      );

      setGetVerificateurFinance(isFinanceVerified);

      //technic

      const isTechnicVerified = validationPrevision!.some(
        (v: any) =>
          v.responsableId == verifyTechnic &&
          v.missionId == id &&
          v.validation == true &&
          v.type == type
      );

      setGetVerificateurTechnic(isTechnicVerified);

      //paye

      const isFinanceValidated = validationPrevision!.some(
        (v: any) =>
          v.responsableId == validateFinancial &&
          v.missionId == id &&
          v.validation == true &&
          v.type == type
      );

      setGetValidatePay(isFinanceValidated);

      //logistique
      const isLogistiqueValidated = validationPrevision!.some(
        (v: any) =>
          v.responsableId == validateLogistique &&
          v.missionId == id &&
          v.validation == true &&
          v.type == type
      );
      setGetValidateLogistique(isLogistiqueValidated);
    }
  }, []);

  const handleValidationFinance = async (
    responsableId: string,
    missionId: string,
    validation: boolean,
    type: string
  ) => {
    try {
      await axios.post("/suivi-evaluation/validation-prevision", {
        responsableId,
        missionId,
        validation,
        type,
      });
      setGetVerificateurFinance(validation);

      dispatch(
        enqueueSnackbar({
          message: "Prévision validé avec succès",
          options: { variant: "success" },
        })
      );
      console.log("Ok");
    } catch (error) {
      console.log(error);
    }
  };

  // //validation technique
  const handleValidationTechnique = async (
    responsableId: string,
    missionId: string,
    validation: boolean,
    type: string
  ) => {
    try {
      await axios.post("/suivi-evaluation/validation-prevision", {
        responsableId,
        missionId,
        validation,
        type,
      });
      setGetVerificateurTechnic(validation);
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

  //validation paiement
  const handleValidationPaye = async (
    responsableId: string,
    missionId: string,
    validation: boolean,
    type: string
  ) => {
    try {
      await axios.post("/suivi-evaluation/validation-prevision", {
        responsableId,
        missionId,
        validation,
        type,
      });
      setGetValidatePay(validation);
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

  //validation logistique
  const handleValidateLogistique = async (
    responsableId: string,
    missionId: string,
    validation: boolean,
    type: string
  ) => {
    try {
      await axios.post("/suivi-evaluation/validation-prevision", {
        responsableId,
        missionId,
        validation,
        type,
      });
      setGetValidateLogistique(validation);
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

  //send mail to admin
  const [ref, setReference] = React.useState(0);
  const currentYear = new Date().getFullYear();

  React.useEffect(() => {
    const refer = missionListe
      .filter((f) => f.reference != null)
      .map((m: any) => m.reference);
    setReference(Math.max(...refer) + 1);
  }, []);

  // Submit the updated mission
  const updateMissionReference = async () => {
    try {
      await dispatch(
        updateMission({
          id: id,
          mission: {
            ...mission,
            reference: `${ref.toString().padStart(3, "0")}`,
          },
        })
      );
      return router.push("/missions/ListMission");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
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
              onClick={() => updateMissionReference()}
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
      <BodySection sx={{ height: "calc(100vh - 370px)", overflow: "auto" }}>
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
              <Tab label="LOGISTIQUE" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Techniques key={value} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Finances key={value} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Logistiques key={value} />
            </TabPanel>
          </Stack>
          <Stack width={{ xs: "100%", sm: "100%", md: "30%" }}>
            <CardPrevision
              key={0}
              sx={{
                height: "calc(100vh - 135px)",
                paddingTop: 1,
                overflow: "auto",
              }}
            >
              <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
                Etat des prévisions
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
                                getVerificateurFinance == true ? false : true,
                                "finance"
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
                    .filter((f: MissionItem) => f.id == id)
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
                                getVerificateurTechnic == true ? false : true,
                                "technique"
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
                            disabled={getVerificateurFinance == false}
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
                  <span>Vérifié logistiquement par : </span>
                  {missionListe
                    .filter((f: MissionItem) => f.id == id)
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
                              (e: any) => e.id === row.validateLogistique
                            )?.name as string
                          }{" "}
                          {
                            employees.find(
                              (e: any) => e.id === row.validateLogistique
                            )?.surname as string
                          }
                        </FormLabel>
                        <Stack direction={"row"} gap={4}>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<DoneIcon />}
                            onClick={() =>
                              handleValidateLogistique(
                                row.validateLogistic!,
                                id,
                                getValidateLogistique == true ? false : true,
                                "logistique"
                              )
                            }
                            // disabled={getVerificateurLogistic == false}
                          >
                            Valider Logistique
                          </Button>
                          <FormLabel
                            sx={{
                              display:
                                getValidateLogistique == true
                                  ? "none"
                                  : "block",
                            }}
                          >
                            <Close color="error" />
                          </FormLabel>
                          <FormLabel
                            sx={{
                              display:
                                getValidateLogistique == true
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
                                getValidatePaye == true ? false : true,
                                "paye"
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
                <Divider />
              </Stack>
              <Stack padding={1} width={"50%"}>
                <PrintPdfPrevision />
              </Stack>
            </CardPrevision>
          </Stack>
        </Stack>
      </BodySection>
    </>
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
  padding: "20px",
  gap: "16px",
  border: `1px solid ${theme.palette.grey[100]}`,
  width: "100%",
}));

const CardPrevision = styled("div")(({ theme }) => ({
  paddingInline: theme.spacing(3),
  background: theme.palette.grey[100],
  // paddingBottom: theme.spacing(1),
  width: "100%",
  // padding: "8px 18px",
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
