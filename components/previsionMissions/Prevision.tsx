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
  const [validate, setValidate]: any = React.useState(false);
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state) => state.employe);
  const fetchGrants = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const [getVF, setGetVerificateurFinance] = React.useState<
    { id: string; nom: string }[]
  >([]);
  const [getVT, setGetVerificateurTechnique] = React.useState<
    { id: string; nom: string }[]
  >([]);
  const [getFV, setGetFinanceValidator] = React.useState<
    { id: string; nom: string }[]
  >([]);

  React.useEffect(() => {
    fetchEmployes();
    fetchMission();
    fetchGrants();
  }, [missionListe]);
  console.log(employees);
  React.useEffect(() => {
    const getGrantId = missionListe
      .filter((m) => m.id === id)
      .map((m) => m.grantId);

    //get finance verificator
    const tableauFinanceVerificateur: { id: string; nom: string }[] = [];
    const validateurFinance = grantEncoursList
      .filter((g) => g.id == getGrantId[0])
      .map((g) => g.financeVerificator);

    const idFinanceVerificator = employees.find(
      (e) => e.id === validateurFinance[0]
    );
    const financeVerify: string = idFinanceVerificator
      ? `${idFinanceVerificator.name} ${idFinanceVerificator.surname}`
      : "Employee not found";

    tableauFinanceVerificateur.push({
      id: idFinanceVerificator?.id!,
      nom: financeVerify!,
    });

    setGetVerificateurFinance(tableauFinanceVerificateur);

    //get validator technique
    const tableauTechniqueVerificateur: { id: any; nom: string }[] = [];
    const validateurTechnique = grantEncoursList
      .filter((g) => g.id == getGrantId[0])
      .map((g) => g.techValidator);

    const idValidatorTechnique = employees.find(
      (e) => e.id === validateurTechnique[0]
    );
    const verifyTechnic: string = idValidatorTechnique
      ? `${idValidatorTechnique.name} ${idValidatorTechnique.surname}`
      : "Employee not found";
    tableauTechniqueVerificateur.push({
      id: idValidatorTechnique?.id!,
      nom: verifyTechnic!,
    });

    setGetVerificateurTechnique(tableauTechniqueVerificateur);
    //get finance validator
    const tableauFinanceValidateur: { id: any; nom: string }[] = [];
    const financeValidateur = grantEncoursList
      .filter((g) => g.id == getGrantId[0])
      .map((g) => g.financeValidator);

    const idFinanceValidator = employees.find(
      (e) => e.id === financeValidateur[0]
    );
    const financeValidator: string = idFinanceValidator
      ? `${idFinanceValidator.name} ${idFinanceValidator.surname}`
      : "Employee not found";

    tableauFinanceValidateur.push({
      id: idFinanceValidator?.id,
      nom: financeValidator,
    });

    setGetFinanceValidator(tableauFinanceValidateur);
  }, [missionListe]);

  const [getValidationVF, setGetValidationVF]: any = React.useState<string[]>(
    []
  );
  const [getValidationPaye, setGetValidationPay]: any = React.useState<
    string[]
  >([]);
  React.useEffect(() => {
    const VF = getVF.map((vf) => vf.id);
    // console.log(test[0]);
    const VFF = missionListe.flatMap((m) =>
      m.validationPrevision!.filter(
        (v) => v.missionId === m.id && v.responsableId == VF[0]
      )
    );
    const valeurBool: any = VFF.map((v) => v.validation!);
    setGetValidationVF(valeurBool);

    const VT = getVT.map((vf) => vf.id);
    // console.log(test[0]);
    const VTT = missionListe.flatMap((m) =>
      m.validationPrevision!.filter(
        (v) => v.missionId === m.id && v.responsableId == VT[0]
      )
    );
    const valeurBoolTech: any = VTT.map((v) => v.validation!);

    setGetValidationT(valeurBoolTech);

    const VP = getFV.map((vf) => vf.id);
    // console.log(test[0]);
    const VPP = missionListe.flatMap((m) =>
      m.validationPrevision!.filter(
        (v) => v.missionId === m.id && v.responsableId == VP[0]
      )
    );
    const valeurBoolPaye: any = VPP.map((v) => v.validation!);

    setGetValidationPay(valeurBoolPaye);
  }, [missionListe]);

  const valueGetFV =
    getValidationVF.length > 0 ? getValidationVF[0] : "Array is empty";

  const handleValidationFinance = async (
    responsableId: string,
    missionId: string,
    validation: number
  ) => {
    try {
      const newValidationState =
        !getValidationVF[0] || getValidationVF[0] === "false";

      // Send the updated validation state to the server
      await axios.post("/suivi-evaluation/validation-prevision", {
        responsableId,
        missionId,
        validation: newValidationState,
      });

      setGetValidationVF([newValidationState ? true : false]);

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

  //validation technique
  const [getValidationT, setGetValidationT]: any = React.useState<string[]>([]);
  const valueGetTechnic =
    getValidationT.length > 0 ? getValidationT[0] : "Array is empty";
  const handleValidationTechnique = async (
    responsableId: string,
    missionId: string,
    validation: number
  ) => {
    try {
      const newValidationState =
        !getValidationT[0] || getValidationT[0] === false;
      await axios.post("/suivi-evaluation/validation-prevision", {
        responsableId,
        missionId,
        validation: newValidationState,
      });
      setGetValidationT([newValidationState ? true : false]);

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

  //validation paye
  const valueGetPaye =
    getValidationPaye.length > 0 ? getValidationPaye[0] : "Array is empty";
  const handleValidationPaye = async (
    responsableId: string,
    missionId: string,
    index: number
  ) => {
    try {
      const newValidationState =
        !getValidationPaye[0] || getValidationPaye[0] === false;
      await axios.post("/suivi-evaluation/validation-prevision", {
        responsableId,
        missionId,
        validation: newValidationState,
      });
      setGetValidationPay(newValidationState ? true : false);
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
                      <span>
                        {row.missionManager.name} {row.missionManager.surname}
                      </span>
                    ))}
                </div>
                <Divider />
                <Typography>
                  Vérifié financièrement par :
                  {getVF.map((row: any, index: number) => (
                    <Stack
                      direction={"column"}
                      gap={2}
                      justifyContent={"space-between"}
                      alignItems={"start"}
                      key={row.id!}
                    >
                      <FormLabel>{row.nom}</FormLabel>
                      <Stack direction={"row"} gap={4}>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<DoneIcon />}
                          onClick={() =>
                            handleValidationFinance(row.id, id, index)
                          }
                        >
                          Vérifier financièrement
                        </Button>
                        <FormLabel
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
                        </FormLabel>
                      </Stack>
                    </Stack>
                  ))}
                </Typography>

                <Divider />
                <Typography>
                  Vérifié techniquement par :
                  {getVT.map((row: any) => (
                    <Stack
                      direction={"column"}
                      gap={2}
                      justifyContent={"space-between"}
                      alignItems={"start"}
                      key={row.id!}
                    >
                      <FormLabel>{row.nom}</FormLabel>
                      <Stack direction={"row"} gap={4}>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<DoneIcon />}
                          onClick={() =>
                            handleValidationTechnique(row.id, id, 0)
                          }
                          disabled={valueGetFV == false}
                        >
                          Vérifier Techniquement
                        </Button>
                        <FormLabel
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
                        </FormLabel>
                      </Stack>
                    </Stack>
                  ))}
                </Typography>
                <Divider />
                <Typography>
                  {getFV.map((row: any) => (
                    <Fragment key={row.id}>
                      Payé par :<br></br>
                      {row.nom}
                      <Stack direction={"row"} gap={4}>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<DoneIcon />}
                          onClick={() => handleValidationPaye(row.id, id, 0)}
                          disabled={valueGetTechnic == false}
                        >
                          Vérsé
                        </Button>
                        <FormLabel
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
                        </FormLabel>
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
