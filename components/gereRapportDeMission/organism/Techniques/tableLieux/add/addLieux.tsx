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
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoIcon from "@mui/icons-material/Info";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import * as Yup from "yup";
import useFetchLieuxRapport from "../hooks/useFetchLieuxRapport";
import {
  createLieuxRapport,
  updateLieuxRapport,
} from "../../../../../../redux/features/lieuxRapport";
import { Form, Formik } from "formik";
import OSTextField from "../../../../../shared/input/OSTextField";
import { cancelEdit } from "../../../../../../redux/features/lieuxRapport/lieuxSlice";
import useFetchMissionLocationListe from "../../../../../previsionMissions/organism/Techniques/tableLieux/hooks/useFetchMissionLocationList";
import { MissionLocationItem } from "../../../../../../redux/features/missionLocation/missionLocationSlice.interface";

const AddLieux = ({ handleClose }: any) => {
  const { isEditing, lieuxRapport } = useAppSelector(
    (state: any) => state.lieuxRapport
  );
  const dispatch: any = useAppDispatch();
  const router = useRouter();
  const fetchLieuxRapport = useFetchLieuxRapport();
  const { id }: any = router.query;
  const { missionLocationList } = useAppSelector(
    (state: any) => state.missionLocation
  );
  const fetchMissionLocationListe = useFetchMissionLocationListe();
  const [getId, setGetId]: any = React.useState("");
  const [getFokontany, setGetFokontany]: any = React.useState("");
  const [getCommune, setGetCommune]: any = React.useState("");
  const [getDisctrict, setGetDistrict]: any = React.useState("");

  React.useEffect(() => {
    fetchLieuxRapport();
    fetchMissionLocationListe();
  }, [router.query]);

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        values.missionId = id!;
        await dispatch(
          updateLieuxRapport({
            id: lieuxRapport.id!,
            lieuxRapport: values,
          })
        );
      } else {
        if (getId != "") {
          values.fokontany = getFokontany;
          values.commune = getCommune;
          values.district = getDisctrict;
          values.missionId = id!;
          return dispatch(createLieuxRapport(values)), handleClose();
        } else if (
          values.fokontany != "" &&
          values.commune !== "" &&
          values.district !== ""
        ) {
          values.missionId = id!;
          return await dispatch(createLieuxRapport(values)), handleClose();
        }
      }
      fetchLieuxRapport(), handleClose();
    } catch (error) {
      console.log("error", error);
    }
  };

  const ClickHandler = (
    id: any,
    FokontanyValue: any,
    CommuneValue: any,
    DistrictValue: any
  ) => {
    setGetId(id);
    setGetFokontany(FokontanyValue);
    setGetCommune(CommuneValue);
    setGetDistrict(DistrictValue);
  };
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? lieuxRapport
            : {
                fokontany: isEditing ? lieuxRapport?.fokontany : "",
                commune: isEditing ? lieuxRapport?.commune : "",
                district: isEditing ? lieuxRapport?.district : "",
                // missiomId: id!
              }
        }
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <SectionNavigation>
                <DialogTitle>Créer/modifier lieux</DialogTitle>
                <DialogContent>
                  <FormContainer spacing={2} mt={2}>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Fokontany"
                      variant="outlined"
                      name="fokontany"
                      value={
                        getId != ""
                          ? getFokontany
                          : formikProps.values.fokontany
                      }
                      disabled={
                        !!missionLocationList.find(
                          (e: any) =>
                            e.village === formikProps.values.fokontany &&
                            isEditing
                        )
                      }
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Commune"
                      variant="outlined"
                      name="commune"
                      value={
                        getId != "" ? getCommune : formikProps.values.commune
                      }
                      disabled={
                        !!missionLocationList.find(
                          (e: any) =>
                            e.commune === formikProps.values.commune &&
                            isEditing
                        )
                      }
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Disctrict"
                      variant="outlined"
                      name="district"
                      value={
                        getId != "" ? getDisctrict : formikProps.values.district
                      }
                      disabled={
                        !!missionLocationList.find(
                          (e: any) =>
                            e.district === formikProps.values.district &&
                            isEditing
                        )
                      }
                    />
                    <Stack flexDirection="row">
                      <InfoIcon />
                      <Typography variant="subtitle2">
                        Voici la liste des{" "}
                        <Lien>Lieux pendant la prévision</Lien>, vous pouvez les
                        réutiliser pour les rapports
                      </Typography>
                    </Stack>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      {missionLocationList
                        .filter((f: any) => f.missionId === id)
                        .map((item: MissionLocationItem, index: any) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {item.village}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {item.commune}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {item.district}
                            </TableCell>
                            <TableCell align="right">
                              <Button
                                color="primary"
                                startIcon={<ContentCopyIcon />}
                                onClick={() =>
                                  ClickHandler(
                                    item.id,
                                    item.village,
                                    item.commune,
                                    item.district
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
                      !!missionLocationList.find(
                        (e: any) =>
                          e.district === formikProps.values.district &&
                          isEditing
                      ) &&
                      !!missionLocationList.find(
                        (e: any) =>
                          e.commune === formikProps.values.commune && isEditing
                      ) &&
                      !!missionLocationList.find(
                        (e: any) =>
                          e.district === formikProps.values.district &&
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

export default AddLieux;

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
