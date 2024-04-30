import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoIcon from "@mui/icons-material/Info";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import useFetchContactMissionRapport from "../hooks/useFetchContactMissionRapport";
import { updateContact } from "../../../../../../redux/features/contact";
import { createMissionRapport, updateMissionRapport } from "../../../../../../redux/features/missionRapport";
import { Form, Formik } from "formik";
import OSTextField from "../../../../../shared/input/OSTextField";
import { MissionRapportItem } from "../../../../../../redux/features/missionRapport/missionRapport.interface";
import { cancelEdit } from "../../../../../../redux/features/missionRapport/missionRapportSlice";
import useFetchContactListe from "../../../../../previsionMissions/organism/Techniques/tableContactPendantMission/hooks/useFetchContactList";
import { ContactItem } from "../../../../../../redux/features/contact/contactSlice.interface";

const AddContactPendantMission = ({ handleClose }: any) => {
  const { isEditing, missionRapport, missionRapportList } = useAppSelector((state: any) => state.missionRapport);
  const dispatch: any = useAppDispatch();
  const router = useRouter();
  const fetchContactMissionRapport = useFetchContactMissionRapport();
  const { id }: any = router.query;
  const { contactList } = useAppSelector((state) => state.contact);
  const fetchContactList = useFetchContactListe();
  const [getId, setGetId]: any = React.useState("");
  const [getNom, setGetNom]: any = React.useState("");
  const [getLieu, setGetLieu]: any = React.useState("");
  const [getNumero, setGetNumero]: any = React.useState("");
  const [getNote, setGetNote]: any = React.useState("");

  React.useEffect(() => {
    fetchContactMissionRapport();
    fetchContactList();
  }, [router.query])

  const handleSubmit = async (values: any) => {
    values.missionId = id!;
    try {
      if (isEditing) {
        await dispatch(
          updateMissionRapport({
            id: missionRapport.id!,
            missionRapport: values,
          })
        );
      } else {
         if (getId!="") {
          values.missionId = id!;
          values.nomPrenom = getNom;
          values.lieuInstitution = getLieu;
          values.numero = getNumero;
          values.remarque = getNote;

          return  (await dispatch(createMissionRapport(values)), fetchContactMissionRapport(),
          handleClose());
         }
         return  (await dispatch(createMissionRapport(values)), fetchContactMissionRapport(),
         handleClose());
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const ClickHandler = ((id: any, nom: any, lieu: any, num: any, note: any) =>{
        setGetId(id); setGetNom(nom); setGetLieu(lieu); setGetNumero(num); setGetNote(note);
  })
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? missionRapport
            : {
              nomPrenom: isEditing ? missionRapport?.nomPrenom : "",
              lieuInstitution: isEditing ? missionRapport?.lieuInstitution : "",
              numero: isEditing ? missionRapport?.numero : "",
              remarque: isEditing ? missionRapport?.remarque : "",
              // missiomId: id!
            }
        }
        // validationSchema={Yup.object({
        //   nomPrenom: Yup.string().required("Champ obligatoire"),
        //   lieuInstitution: Yup.string().required("Champ obligatoire"),
        //   numero: Yup.string().required("Champ obligatoire"),
        //   remarque: Yup.string().required("Champ obligatoire"),
        // })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <SectionNavigation>
                <DialogTitle variant="h5">
                  Créer/modifier contact pendant la mission
                </DialogTitle>
                <DialogContent>
                  <FormContainer spacing={2} mt={2}>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Nom et prénoms"
                      variant="outlined"
                      name="nomPrenom"
                      type="text"
                      value={getId != "" ? getNom : formikProps.values.nomPrenom}
                      disabled={!!contactList.find((e: any) => (e.firstNameContact + " " +e.lastNameContact) === formikProps.values.nomPrenom && isEditing)}
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Lieu et institution"
                      variant="outlined"
                      name="lieuInstitution"
                      type="text"
                      value={getId != "" ? getLieu : formikProps.values.lieuInstitution}
                      disabled={!!contactList.find((e: any) => e.locationContact === formikProps.values.lieuInstitution && isEditing)}
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Numéro "
                      variant="outlined"
                      name="numero"
                      type="text"
                      value={getId != "" ? getNumero : formikProps.values.numero}
                      disabled={!!contactList.find((e: any) => e.numberContact === formikProps.values.numero && isEditing)}
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Remarques"
                      variant="outlined"
                      name="remarque"
                      type="text"
                      value={getId != "" ? getNote : formikProps.values.remarque}
                      disabled={!!contactList.find((e: any) => e.noteContact === formikProps.values.remarque && isEditing)}
                    />
                    <Stack flexDirection="row">
                      <InfoIcon />
                      <Typography variant="subtitle2">
                        Voici la liste des <Lien>Contact pendant la prévision</Lien>,
                        vous pouvez les réutiliser pour les rapports
                      </Typography>
                    </Stack>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Nom et prénoms</TableCell>
                          <TableCell>Lieu / Institution</TableCell>
                          <TableCell align="left">Numero</TableCell>
                          <TableCell align="left">Remarques</TableCell>
                        </TableRow>
                      </TableHead>
                      {contactList.map((item: ContactItem, index: any) => (
                        <TableRow
                          key={item.id!}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {item.firstNameContact}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {item.locationContact}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {item.numberContact}
                          </TableCell>
                          <TableCell component="th" scope="row">
                          {item.noteContact}
                          </TableCell>
                          <TableCell align="right">
                            <Button 
                            color="primary" 
                            startIcon={<ContentCopyIcon />}
                            onClick={() =>ClickHandler(
                              item.id, (item.firstNameContact +" " +item.lastNameContact),
                              item.locationContact, 
                              item.numberContact,
                              item.noteContact
                            )}
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
                      dispatch(cancelEdit())
                    }}
                    disabled={isEditing}
                  >Annuler</Button>
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

export default AddContactPendantMission;

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
