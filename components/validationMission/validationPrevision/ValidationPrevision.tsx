import React, { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useFetchGrants from "../../GrantsEnCours/hooks/getGrants";
import useFetchEmploys from "../../GrantsEnCours/hooks/getResponsable";
import useFetchMissionListe from "../../home/Missions/hooks/useFetchMissionListe";
import { MissionItem } from "../../../redux/features/mission/mission.interface";
import { axios } from "../../../axios";
import { enqueueSnackbar } from "../../../redux/features/notification/notificationSlice";
import {
  Button,
  Divider,
  FormLabel,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import PrintPdfPrevision from "../../previsionMissions/printpDFPrevision";
import DoneIcon from "@mui/icons-material/Done";
import useFetchNotify from "../hooks/useFetchNotify";

const ValidationPrevision = () => {
  const fetchMission = useFetchMissionListe();
  const { missionListe, mission } = useAppSelector((state) => state.mission);
  const dispatch = useAppDispatch();
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state) => state.employe);
  const fetchGrants = useFetchGrants();
  const [getVerificateurFinance, setGetVerificateurFinance] =
    React.useState<boolean>(false);
  const [getVerificateurTechnic, setGetVerificateurTechnic] =
    React.useState<boolean>(false);
  const [getValidatePaye, setGetValidatePay] = React.useState<boolean>(false);
  const [getValidateLogistique, setGetValidateLogistique] =
    React.useState<boolean>(false);
  const fetchNotify = useFetchNotify();
  const { notifyList, notify } = useAppSelector((state) => state.notify);
  useEffect(() => {
    fetchGrants();
    fetchEmployes();
    fetchMission();
    fetchNotify();

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
          missionListe.map((m) => m.id).includes(v.missionId) &&
          v.validation == true &&
          v.type == type
      );

      setGetVerificateurFinance(isFinanceVerified);

      //technic

      const isTechnicVerified = validationPrevision!.some(
        (v: any) =>
          v.responsableId == verifyTechnic &&
          v.missionId == missionListe.map((m) => m.id) &&
          v.validation == true &&
          v.type == type
      );

      setGetVerificateurTechnic(isTechnicVerified);

      //paye

      const isFinanceValidated = validationPrevision!.some(
        (v: any) =>
          v.responsableId == validateFinancial &&
          missionListe.map((m) => m.id).includes(v.missionId) &&
          v.validation == true &&
          v.type == type
      );

      setGetValidatePay(isFinanceValidated);

      //logistique
      const isLogistiqueValidated = validationPrevision!.some(
        (v: any) =>
          v.responsableId == validateLogistique &&
          missionListe.map((m) => m.id).includes(v.missionId) &&
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
  return (
    <>
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
                .filter((f: MissionItem) =>
                  f.notify!.map((n) => n.missionId).includes(f.id)
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
                .filter((f: MissionItem) =>
                  f.notify!.map((n: any) => n.type).includes("Prevision")
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
                .filter((f: MissionItem) =>
                  f.notify!.map((n: any) => n.type).includes("Prevision")
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
                        disabled={getVerificateurFinance == false}
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
                .filter((f: MissionItem) =>
                  f.notify!.map((n: any) => n.type).includes("Prevision")
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
                            row.id!,
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
                            getValidateLogistique == true ? "none" : "block",
                        }}
                      >
                        <Close color="error" />
                      </FormLabel>
                      <FormLabel
                        sx={{
                          display:
                            getValidateLogistique == true ? "block" : "none",
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
                .filter((f: MissionItem) =>
                  f.notify!.map((n: any) => n.type).includes("Prevision")
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
            <Divider />
          </Stack>
          <Stack padding={1} width={"50%"}>
            <PrintPdfPrevision />
          </Stack>
        </CardPrevision>
      </Stack>
    </>
  );
};
export default ValidationPrevision;
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
