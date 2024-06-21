import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  TextField,
  Table,
  TableCell,
  Typography,
  TableRow,
  TableHead,
  Radio,
  RadioGroup,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoIcon from "@mui/icons-material/Info";
import { useRouter } from "next/router";
import * as Yup from "yup";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import useFetchAutreInfoRapport from "../hooks/useFetchAutreInfoRaport";
import {
  createAutreInfoRapport,
  updateAutreInfoRapport,
} from "../../../../../../redux/features/autreInfoRapport";
import { Field, Form, Formik } from "formik";
import OSTextField from "../../../../../shared/input/OSTextField";
import useFetchVehicleList from "../../../../../previsionMissions/organism/Techniques/tableAutreInfoAuto/hooks/useFetchVehicleList";
import { cancelEdit } from "../../../../../../redux/features/autreInfoRapport/autreInfoRapportSlice";

const AddAutreInfoAutoRapport = ({ handleClose }: any) => {
  const router = useRouter();
  const { id }: any = router.query;
  const dispatch: any = useAppDispatch();
  const fetchAutreInfoRapport = useFetchAutreInfoRapport();
  const { autreInfoRapport, isEditing, autreInfoRapportList } = useAppSelector(
    (state: any) => state.autreInfoRapport
  );

  const { vehicleList } = useAppSelector((state: any) => state.vehicle);
  const fetchVehicleListe = useFetchVehicleList();
  const [getId, setGetId]: any = React.useState("");
  const [getAssurance, setGetAssurance]: any = React.useState("");
  const [getVisite, setGetVisite]: any = React.useState("");
  const [getTypeVehicule, setGetTypeVehicule]: any = React.useState("");
  const [getCenture, setGetCenture]: any = React.useState(false);

  React.useEffect(() => {
    fetchAutreInfoRapport();
    fetchVehicleListe();
  }, [router.query]);

  const handleSubmit = async (values: any) => {
    values.missionId = id!;
    try {
      if (isEditing) {
        await dispatch(
          updateAutreInfoRapport({
            id: autreInfoRapport.id!,
            autreInfoRapport: values,
          })
        );
      } else {
        if (getId !== "") {
          values.missionId = id!;
          values.assurance = getAssurance;
          values.visiteTechnic = getVisite;
          values.voiture = getTypeVehicule;
          values.centureSecurite = getCenture;

          return (
            dispatch(createAutreInfoRapport(values)),
            useFetchAutreInfoRapport(),
            handleClose()
          );
        } else if (
          values.assurance != "" &&
          values.visiteTechnic !== "" &&
          values.voiture !== ""
        ) {
          return (
            dispatch(createAutreInfoRapport(values)),
            useFetchAutreInfoRapport(),
            handleClose()
          );
        }
      }
      fetchAutreInfoRapport();
      handleClose();
    } catch (error) {
      console.log("error", error);
    }
  };

  const ClickHandler = (
    id: any,
    ass: any,
    visity: any,
    type: any,
    centure: boolean
  ) => {
    setGetId(id);
    setGetAssurance(ass);
    setGetTypeVehicule(type);
    setGetVisite(visity);
    setGetCenture(centure);
  };
  console.log("type :", getTypeVehicule);
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? autreInfoRapport
            : {
                assurance: isEditing ? autreInfoRapport?.assurance : "",
                visiteTechnic: isEditing
                  ? autreInfoRapport?.visiteTechnic
                  : "OUI",
                voiture: isEditing ? autreInfoRapport?.voiture : "OTHER",
                centureSecurite: isEditing
                  ? autreInfoRapport?.centureSecurite
                  : true,
                // missionId: isEditing ? autreInfoRapport?.missionId: id,
              }
        }
        validationSchema={Yup.object({
          // assurance: Yup.string().required("Veuillez choisir type d'operation "),
          voiture: Yup.string()
            .oneOf(
              ["OTHER", "RENTAL", "PRIVATE"],
              "Veuillez choisier type d'operation"
            )
            .required("Veuillez choisir type d'operation "),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <SectionNavigation>
                <DialogTitle>Créer/modifier Information importante</DialogTitle>
                <DialogContent>
                  <FormContainer spacing={2} mt={2}>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Assurance"
                      variant="outlined"
                      name="assurance"
                      inputProps={{ autoComplete: "off" }}
                      value={
                        getId != ""
                          ? getAssurance
                          : formikProps.values.assurance
                      }
                      disabled={
                        !!vehicleList.find(
                          (e: any) =>
                            e.insuranceVehicle ===
                              formikProps.values.assurance && isEditing
                        )
                      }
                    />
                    <CustomStack
                      direction={{ xs: "column", sm: "column", md: "row" }}
                      spacing={{ xs: 2, sm: 2, md: 1 }}
                    >
                      <FormControlLabel
                        control={
                          <Switch
                            defaultChecked={
                              getId != ""
                                ? getVisite
                                : formikProps.values.visiteTechnic == "OUI"
                            }
                          />
                        }
                        label="Visite technique"
                        name="visiteTechnic"
                        onChange={(e, c) =>
                          formikProps.setFieldValue(
                            "visiteTechnic",
                            c ? "OUI" : "NON"
                          )
                        }
                        disabled={
                          !!vehicleList.find(
                            (e: any) =>
                              e.insuranceVehicle ===
                                formikProps.values.assurance && isEditing
                          )
                        }
                      />
                      <FormControlLabel
                        control={<Switch defaultChecked={getCenture == true} />}
                        label="Ceinture de sécurité"
                        name="centureSecurite"
                        onChange={(e, c) =>
                          formikProps.setFieldValue("centureSecurite", c)
                        }
                        disabled={
                          !!vehicleList.find(
                            (e: any) =>
                              e.insuranceVehicle ===
                                formikProps.values.assurance && isEditing
                          )
                        }
                      />
                    </CustomStack>
                    <CustomStack
                      direction={{ xs: "column", sm: "column", md: "row" }}
                      spacing={{ xs: 2, sm: 2, md: 1 }}
                    >
                      <Field as={RadioGroup} row name="OperationType">
                        <FormControlLabel
                          value="OTHER"
                          control={
                            <Radio
                              defaultChecked={getTypeVehicule === "OTHER"}
                            />
                          }
                          label="Autre de location"
                          name="voiture"
                          disabled={
                            !!vehicleList.find(
                              (e: any) =>
                                e.insuranceVehicle ===
                                  formikProps.values.assurance && isEditing
                            )
                          }
                        />
                        <FormControlLabel
                          value="RENTAL"
                          control={
                            <Radio
                              defaultChecked={getTypeVehicule === "RENTAL"}
                            />
                          }
                          label="Voiture de location"
                          name="voiture"
                          disabled={
                            !!vehicleList.find(
                              (e: any) =>
                                e.insuranceVehicle ===
                                  formikProps.values.assurance && isEditing
                            )
                          }
                        />
                        <FormControlLabel
                          value="PRIVATE"
                          control={
                            <Radio
                              defaultChecked={getTypeVehicule === "PRIVATE"}
                            />
                          }
                          label="Voiture privée"
                          name="voiture"
                          disabled={
                            !!vehicleList.find(
                              (e: any) =>
                                e.insuranceVehicle ===
                                  formikProps.values.assurance && isEditing
                            )
                          }
                        />
                      </Field>
                    </CustomStack>
                    <Stack flexDirection="row">
                      <InfoIcon />
                      <Typography variant="subtitle2">
                        Voici la liste des{" "}
                        <Lien>Lieux pendant la prévision</Lien>, vous pouvez les
                        réutiliser pour les rapports
                      </Typography>
                    </Stack>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Assurance</TableCell>
                          <TableCell align="left">Visite technique</TableCell>
                          <TableCell align="left">
                            Voiture de location ou privée
                          </TableCell>
                          <TableCell align="left">
                            Ceinture de securité
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      {vehicleList
                        .filter((f: any) => f.missionId === id)
                        .map((item: any) => (
                          <TableRow
                            key={item.id!}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {item.insuranceVehicle}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {item.technicalVisitVehicle}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {item.vehicleType}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {item.safetyBeltVehicle ? "OUI" : "NON"}
                            </TableCell>
                            <TableCell align="right">
                              <Button
                                color="primary"
                                startIcon={<ContentCopyIcon />}
                                onClick={() =>
                                  ClickHandler(
                                    item.id!,
                                    item.insuranceVehicle,
                                    item.technicalVisitVehicle,
                                    item.vehicleType,
                                    item.safetyBeltVehicle!
                                  )
                                }
                                disabled={isEditing}
                              >
                                Utiliser
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </Table>
                  </FormContainer>
                </DialogContent>
                <DialogActions>
                  <Button
                    color="warning"
                    onClick={() => {
                      formikProps.resetForm();
                      dispatch(cancelEdit());
                      handleClose();
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={
                      !!vehicleList.find(
                        (e: any) =>
                          e.insuranceVehicle === formikProps.values.assurance &&
                          isEditing
                      )
                    }
                  >
                    Enregistrer
                  </Button>
                </DialogActions>
              </SectionNavigation>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default AddAutreInfoAutoRapport;

const FormContainer = styled(Stack)(({ theme }) => ({
  background: "#fff",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({}));

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const Lien = styled("span")(({ theme }) => ({
  color: theme.palette.info.main,
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.info.main,
  },
}));
