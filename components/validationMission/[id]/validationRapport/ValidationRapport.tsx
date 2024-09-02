import React, { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import useFetchGrants from "../../../GrantsEnCours/hooks/getGrants";
import useFetchEmploys from "../../../GrantsEnCours/hooks/getResponsable";
import useFetchMissionListe from "../../../home/Missions/hooks/useFetchMissionListe";
import { MissionItem } from "../../../../redux/features/mission/mission.interface";
import { axios } from "../../../../axios";
import { enqueueSnackbar } from "../../../../redux/features/notification/notificationSlice";
import {
  Button,
  Divider,
  FormLabel,
  LinearProgress,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import PrintPdf from "../../../gereRapportDeMission/printPdf";
import DoneIcon from "@mui/icons-material/Done";
import { useRouter } from "next/router";

const ValidationRapport = () => {
  const fetchMission = useFetchMissionListe();
  const { missionListe, mission } = useAppSelector((state) => state.mission);
  const dispatch = useAppDispatch();
  const fetchGrants = useFetchGrants();

  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state) => state.employe);
  const [getVerificateurFinance, setGetVerificateurFinance] =
    React.useState<boolean>(false);
  const [getVerificateurTechnic, setGetVerificateurTechnic] =
    React.useState<boolean>(false);
  const [getValidatePaye, setGetValidatePay] = React.useState<boolean>(false);
  const [getVerificateurLogistic, setGetVerificateurLogistic] =
    React.useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;
  React.useEffect(() => {
    fetchEmployes();
    fetchGrants();
    fetchMission();
    const mission = missionListe.find((f: MissionItem) =>
      f.notify!.map((n) => n.missionId).includes(id as string)
    );
    if (mission) {
      const {
        verifyFinancial,
        validationRapport,
        verifyTechnic,
        validateFinancial,
        validateLogistic,
        type,
      } = mission;

      const isFinanceVerified = validationRapport!.some(
        (v: any) =>
          v.responsableId == verifyFinancial &&
          missionListe.map((m) => m.id).includes(v.missionId) &&
          v.type == type &&
          v.validation == true
      );

      setGetVerificateurFinance(isFinanceVerified);
      const isTechnicVerified = validationRapport!.some(
        (v: any) =>
          v.responsableId == verifyTechnic &&
          missionListe.map((m) => m.id).includes(v.missionId) &&
          v.type == type &&
          v.validation == true
      );

      setGetVerificateurTechnic(isTechnicVerified);

      const isFinanceValidated = validationRapport!.some(
        (v: any) =>
          v.responsableId === validateFinancial &&
          missionListe.map((m) => m.id).includes(v.missionId) &&
          v.type == type &&
          v.validation == true
      );

      setGetValidatePay(isFinanceValidated);

      const isLogisticValidated = validationRapport!.some(
        (v: any) =>
          v.responsableId === validateLogistic &&
          missionListe.map((m) => m.id).includes(v.missionId) &&
          v.type == type &&
          v.validation == true
      );
      setGetVerificateurLogistic(isLogisticValidated);
    }
  }, []);

  const handleValidationFinance = async (
    responsableId: string,
    missionId: string,
    validation: boolean,
    type: string
  ) => {
    try {
      // Send the updated validation state to the server
      await axios.post("/suivi-evaluation/validation-rapport", {
        responsableId,
        missionId,
        validation,
        type,
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
    validation: boolean,
    type: string
  ) => {
    try {
      await axios.post("/suivi-evaluation/validation-rapport", {
        responsableId,
        missionId,
        validation,
        type,
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
    validation: boolean,
    type: string
  ) => {
    try {
      await axios.post("/suivi-evaluation/validation-rapport", {
        responsableId,
        missionId,
        validation,
        type,
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

  //validateur logistique
  const handleValidateLogistique = async (
    responsableId: string,
    missionId: string,
    validation: boolean,
    type: string
  ) => {
    try {
      await axios.post(`/suivi-evaluation/validation-rapport`, {
        responsableId,
        missionId,
        validation,
        type,
      });
      setGetVerificateurLogistic(validation);
      dispatch(
        enqueueSnackbar({
          message: " Logistique validé avec succès",
          options: { variant: "success" },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack width={{ xs: "100%", sm: "100%", md: "100%" }}>
        {missionListe.length == 0 ? (
          <LinearProgress color="success" sx={{ width: "100%" }} />
        ) : null}
        <CardBody
          sx={{
            height: "calc(100vh - 200px)",
            paddingTop: 1,
            overflow: "auto",
            border: "1px solid #E5E5E5",
          }}
        >
          <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
            Etat des rapports
          </Typography>
          <Stack gap={2}>
            <div>
              <FormLabel>Elaboré par : </FormLabel>
              {missionListe
                .filter(
                  (f: MissionItem) =>
                    f.notify!.map((n) => n.missionId).includes(id as string) &&
                    f.notify!.map((m) => m.type == "Rapport")
                )
                .map((row: MissionItem) => (
                  <span key={row.id!}>
                    {
                      employees.find((e: any) => e.id === row.missionManagerId)
                        ?.name as string
                    }{" "}
                    {
                      employees.find((e: any) => e.id === row.missionManagerId)
                        ?.surname as string
                    }
                  </span>
                ))}
            </div>
            <Divider />
            <Typography>
              <span> Vérifié financièrement par : </span>
              {missionListe
                .filter(
                  (f: MissionItem) =>
                    f.notify!.map((n) => n.missionId).includes(id as string) &&
                    f.notify!.map((m) => m.type == "Rapport")
                )
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
                        employees.find((e: any) => e.id === row.verifyFinancial)
                          ?.name as string
                      }{" "}
                      {
                        employees.find((e: any) => e.id === row.verifyFinancial)
                          ?.surname as string
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
                            row.id!,
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
                            getVerificateurFinance == true ? "none" : "block",
                        }}
                      >
                        <Close color="error" />
                      </FormLabel>
                      <FormLabel
                        sx={{
                          display:
                            getVerificateurFinance == true ? "block" : "none",
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
                .filter(
                  (f: MissionItem) =>
                    f.notify!.map((n) => n.missionId).includes(id as string) &&
                    f.notify!.map((m) => m.type == "Rapport")
                )
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
                        employees.find((e: any) => e.id === row.verifyTechnic)
                          ?.name as string
                      }{" "}
                      {
                        employees.find((e: any) => e.id === row.verifyTechnic)
                          ?.surname as string
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
                            row.id!,
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
                            getVerificateurTechnic == true ? "none" : "block",
                        }}
                        disabled={getVerificateurTechnic == false}
                      >
                        <Close color="error" />
                      </FormLabel>
                      <FormLabel
                        sx={{
                          display:
                            getVerificateurTechnic == true ? "block" : "none",
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
                .filter(
                  (f: MissionItem) =>
                    f.notify!.map((n) => n.missionId).includes(id as string) &&
                    f.notify!.map((m) => m.type == "Rapport")
                )
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
                          (e: any) => e.id === row.validateLogistic
                        )?.name as string
                      }{" "}
                      {
                        employees.find(
                          (e: any) => e.id === row.validateLogistic
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
                            row.id!,
                            getVerificateurLogistic == true ? false : true,
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
                            getVerificateurLogistic == true ? "none" : "block",
                        }}
                        // disabled={getVerificateurLogistic == false}
                      >
                        <Close color="error" />
                      </FormLabel>
                      <FormLabel
                        sx={{
                          display:
                            getVerificateurLogistic == true ? "block" : "none",
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
                .filter(
                  (f: MissionItem) =>
                    f.notify!.map((n) => n.missionId).includes(id as string) &&
                    f.notify!.map((m) => m.type == "Rapport")
                )
                .map((row: MissionItem) => (
                  <Fragment key={row.id}>
                    <span>Payé par :</span>
                    <br></br>
                    {
                      employees.find((e: any) => e.id === row.validateFinancial)
                        ?.name as string
                    }{" "}
                    {
                      employees.find((e: any) => e.id === row.validateFinancial)
                        ?.surname as string
                    }
                    <Stack direction={"row"} gap={4}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<DoneIcon />}
                        onClick={() =>
                          handleValidationPaye(
                            row.validateFinancial!,
                            row.id!,
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
                          display: getValidatePaye == true ? "none" : "block",
                        }}
                      >
                        <Close color="error" />
                      </FormLabel>
                      <FormLabel
                        sx={{
                          display: getValidatePaye == true ? "block" : "none",
                        }}
                      >
                        <Check color="primary" />
                      </FormLabel>
                    </Stack>
                  </Fragment>
                ))}
            </Typography>
          </Stack>
          <CardFooter>
            <PrintPdf />
          </CardFooter>
        </CardBody>
      </Stack>
    </>
  );
};
export default ValidationRapport;
const CardBody = styled(Stack)(({ theme }) => ({
  paddingInline: theme.spacing(3),
  background: theme.palette.grey[100],
  paddingBottom: theme.spacing(1),
  width: "100%",
  // padding: "10px 14px",
  borderRadius: 14,
  gap: "32px",
  marginTop: 15,
}));

const CardMain = styled(Stack)(({ theme }) => ({
  marginTop: "10px",
  paddingBottom: theme.spacing(1),
}));
export const CardFooter = styled("div")(({ theme }) => ({
  paddingInline: theme.spacing(2),
  paddingBlock: theme.spacing(1),
  borderBottomLeftRadius: theme.spacing(2),
  borderBottomRightRadius: theme.spacing(2),
  width: "auto",
  // padding: "10px 22px",
  marginTop: "20px",
}));
