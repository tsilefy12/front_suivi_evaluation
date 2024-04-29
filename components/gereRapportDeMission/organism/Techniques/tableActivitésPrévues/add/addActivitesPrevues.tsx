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
  TableRow,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoIcon from "@mui/icons-material/Info";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks";
import useFetchActiviteRapport from "../hooks/useFetchActivityRapport";
import { createActiviteRapport, updateActiviteRapport } from "../../../../../../redux/features/activitesRapport";
import OSTextField from "../../../../../shared/input/OSTextField";
import { ActiviteRapportItem } from "../../../../../../redux/features/activitesRapport/activiteRapport.interface";
import { cancelEdit } from "../../../../../../redux/features/activitesRapport/activiteRapportSlice";
import useFetchPlannedActivityList from "../../../../../previsionMissions/organism/Techniques/tableActivitésPrévues/hooks/useFetchPlannedActivityList";
import { PlannedActivityItem } from "../../../../../../redux/features/plannedActivity/plannedActivitySlice.interface";

const AddActivitesPrevues = ({ handleClose }: any) => {
  const router = useRouter();
  const dispatch: any = useAppDispatch();
  const fetchActivityRapport = useFetchActiviteRapport();
  const { activiteRapport, isEditing, activiteRapportlist } = useAppSelector((state: any) =>state.activiteRapport);
  const [getUtiliser, setGetUtiliser] = React.useState("");
  const [getId, setGetId]: any = React.useState("");
  const { id }: any = router.query;
  const { plannedActivityList } = useAppSelector(
    (state: any) => state.plannedActivity
  );
  const fetchPlannedActivityListe = useFetchPlannedActivityList();
  
  React.useEffect(() =>{
    fetchActivityRapport();
    fetchPlannedActivityListe();
  }, [router.query])

  const handleSubmit = async (values: any) => {
    values.missionId = id!;
    try {
      if (isEditing) {
        await dispatch(
          updateActiviteRapport({
            id: activiteRapport.id!,
            activiteRapport: values,
          })
        );
      } else {
        if (getUtiliser !== "") {
          values.activite = getId;
          return (await dispatch(createActiviteRapport(values)),
            handleClose()
          );
        } else if (values.activite != "") {
          return (await dispatch(createActiviteRapport(values)),
            handleClose()
          );
        }
      }
      fetchActivityRapport(),
        handleClose();
    } catch (error) {
      console.log("error", error);
    }
  };

  const ClikUtiliser = (id: any, valeur: any) => {
    if (!isEditing) {
      setGetUtiliser(valeur);
      setGetId(id)
    }
  }
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? activiteRapport
            : {
              activite: isEditing ? activiteRapport?.activite : "",
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
                <DialogTitle>Créer/modifier activité prévus</DialogTitle>
                <DialogContent>
                  <FormContainer spacing={2} mt={2}>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Activités"
                      variant="outlined"
                      name="activite"
                      value={getUtiliser != "" ? getUtiliser : formikProps.values.activite}
                      disabled={!!plannedActivityList.find((e: any) => e.id===formikProps.values.activite && isEditing)}
                      />
                    <Stack flexDirection="row">
                      <InfoIcon />
                      <Typography variant="subtitle2">
                        Voici la liste des{" "}
                        <Lien>activites prevus pendant la prévision</Lien>, vous pouvez
                        les réutiliser pour les rapports
                      </Typography>
                    </Stack>
                    <FormContainer sx={{height: 200, overflow: "auto"}}>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      {plannedActivityList.map((item: PlannedActivityItem, index: any) => (
                        <TableRow
                          key={index}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {item.description}
                          </TableCell>
                          <TableCell align="right">
                            <Button 
                            color="primary" 
                            startIcon={<ContentCopyIcon />}
                            onClick={() =>ClikUtiliser(item.id, item.description)}
                            disabled = {isEditing}
                            >
                              Utiliser
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </Table>
                    </FormContainer>
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
                  >Annuler
                  </Button>
                  <Button variant="contained" type="submit">
                    Enregistrer
                  </Button>
                </DialogActions>
              </SectionNavigation>
            </Form>
          )
        }}
      </Formik>
    </Container>
  );
};

export default AddActivitesPrevues;

const FormContainer = styled(Stack)(({ theme }) => ({
  // padding: 10,
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
