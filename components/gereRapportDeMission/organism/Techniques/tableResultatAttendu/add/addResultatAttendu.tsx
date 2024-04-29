import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Box,
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  Table,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoIcon from "@mui/icons-material/Info";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks";
import useFetchResultatRapport from "../hooks/useFetchResultatRapport";
import { createResultatAttendu, updateResultRapport } from "../../../../../../redux/features/resultatAttendu";
import OSTextField from "../../../../../shared/input/OSTextField";
import { ResultatRapportItem } from "../../../../../../redux/features/resultatAttendu/resultatRapport.interface";
import { cancelEdit } from "../../../../../../redux/features/resultatAttendu/resultatRapportSlice";
import useFetchExceptedResultList from "../../../../../previsionMissions/organism/Techniques/tableResultatAttendu/hooks/useFetchExceptedResultList";
import { ExceptedResultItem } from "../../../../../../redux/features/exceptedResult/exceptedResultSlice.interface";

const AddResultatAttendu = ({ handleClose }: any) => {
  const router = useRouter();
  const dispatch: any = useAppDispatch();
  const { resultatRapport, isEditing, resultatRapportlist } = useAppSelector((state: any) => state.resultatRapport);
  const fetchRapport = useFetchResultatRapport();
  const { id }: any = router.query;
  const [getUtiliser, setGetUtiliser]: any = React.useState("")
  const [getId, setGetId]: any = React.useState("");
  const { exceptedResultList } = useAppSelector(
    (state: any) => state.exceptedResult
  );
  const fetchExceptedResultListe = useFetchExceptedResultList();

  React.useEffect(() => {
    fetchRapport();
    fetchExceptedResultListe();
  }, [router.query])

  const handleSubmit = async (values: any) => {
    values.missionId = id!;
    try {
      if (isEditing) {
        await dispatch(
          updateResultRapport({
            id: resultatRapport.id!,
            resultatAttendu: values,
          })
        );
      } else {
        if (getUtiliser !== "") {
          values.resultat = getId;
          return (await dispatch(createResultatAttendu(values)),
            handleClose()
          );
        } else if (values.resultat != "") {
          console.log("mandalo ato io")
          return (await dispatch(createResultatAttendu(values)),
            handleClose()
          );
        }
      }
      fetchRapport(),
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
            ? resultatRapport
            : {
              resultat: isEditing ? resultatRapport?.resultat : "",
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
                <DialogTitle>Créer/modifier résultat</DialogTitle>
                <DialogContent>
                  <FormContainer spacing={2} mt={2}>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Résultat"
                      variant="outlined"
                      name="resultat"
                      value={getUtiliser != "" ? getUtiliser : formikProps.values.resultat}
                      disabled={!!exceptedResultList.find((e: any) => e.id===formikProps.values.resultat && isEditing)}
                    />
                    <Stack flexDirection="row">
                      <InfoIcon />
                      <Typography variant="subtitle2">
                        Voici la liste des <Lien>Resultat pendant la prévision</Lien>,
                        vous pouvez les réutiliser pour les rapports
                      </Typography>
                    </Stack>
                    <FormContainer sx={{height: 200, overflow: "auto"}}>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      {exceptedResultList.map((item: ExceptedResultItem, index: any) => (
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
                              onClick={() => ClikUtiliser(item.id, item.description)}
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
                disabled={isEditing}
                >
                Annuler</Button>
                <Button
                  variant="contained"
                  type="button"
                  onClick={formikProps.submitForm}
                >
                  Enregistrer
                </Button>
              </DialogActions>
            </SectionNavigation>
            </Form>
      )
        }}
    </Formik>
    </Container >
  );
};

export default AddResultatAttendu;

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
