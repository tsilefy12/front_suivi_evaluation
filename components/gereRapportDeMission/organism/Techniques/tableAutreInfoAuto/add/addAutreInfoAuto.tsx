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
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks";
import useFetchAutreInfoRapport from "../hooks/useFetchAutreInfoRaport";
import { createAutreInfoRapport, updateAutreInfoRapport } from "../../../../../../redux/features/autreInfoRapport";
import { Field, Form, Formik } from "formik";
import OSTextField from "../../../../../shared/input/OSTextField";

const AddAutreInfoAutoRapport = ({ handleClose }: any) => {
  const router = useRouter();
  const { id }: any = router.query;
  const dispatch: any = useAppDispatch();
  const fetchAutreInfoRapport = useFetchAutreInfoRapport();
  const { autreInfoRapport, isEditing, autreInfoRapportList } = useAppSelector((state: any) => state.autreInfoRapport);

  React.useEffect(() => {
    fetchAutreInfoRapport();
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
        await dispatch(createAutreInfoRapport(values));
        useFetchAutreInfoRapport();
        handleClose();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? autreInfoRapport
            : {
              assurance: isEditing ? autreInfoRapport?.assurance : "",
              visiteTechnique: isEditing ? autreInfoRapport?.visiteTechnique : "OUI",
              voiture: isEditing ? autreInfoRapport?.voiture : "OTHER",
              centureSecurite: isEditing ? autreInfoRapport?.centureSecurite: true,
              // missionId: isEditing ? autreInfoRapport?.missionId: id,
            }
        }
        validationSchema={Yup.object({
          assurance: Yup.string().required("Veuillez choisir type d'operation "),
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
                    />
                    <CustomStack
                      direction={{ xs: "column", sm: "column", md: "row" }}
                      spacing={{ xs: 2, sm: 2, md: 1 }}
                    >
                      <FormControlLabel
                        control={<Switch defaultChecked={formikProps.values.visiteTechnique=="OUI"} />}
                        label="Visite technique"
                        name="visiteTechnique"
                        onChange={(e,c) =>formikProps.setFieldValue("visiteTechnique", c ? "OUI": "NON")}
                      />
                      <FormControlLabel
                        control={<Switch defaultChecked={formikProps.values.centureSecurite=="OUI"} />}
                        label="Ceinture de sécurité"
                        name="centureSecurite"
                        onChange={(e,c) =>formikProps.setFieldValue("centureSecurite", c ? "OUI": "NON")}
                      />
                    </CustomStack>
                    <CustomStack
                      direction={{ xs: "column", sm: "column", md: "row" }}
                      spacing={{ xs: 2, sm: 2, md: 1 }}
                    >
                      <Field as={RadioGroup} row name="OperationType">
                          <FormControlLabel
                            value="OTHER"
                            control={<Radio />}
                            label="Autre de location"
                            name="voiture"
                          />
                          <FormControlLabel
                            value="RENTAL"
                            control={<Radio />}
                            label="Voiture de location"
                            name="voiture"
                          />
                          <FormControlLabel
                            value="PRIVATE"
                            control={<Radio />}
                            label="Voiture privé"
                            name="voiture"
                          />
                        </Field>
                    </CustomStack>
                    <Stack flexDirection="row">
                      <InfoIcon />
                      <Typography variant="subtitle2">
                        Voici la liste des <Lien>Lieux pendant la prévision</Lien>, vous
                        pouvez les réutiliser pour les rapports
                      </Typography>
                    </Stack>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Assurance</TableCell>
                          <TableCell align="left">Visite technique</TableCell>
                          <TableCell align="left">
                            Voiture de location ou privé?
                          </TableCell>
                          <TableCell align="left">Ceinture de securite</TableCell>
                        </TableRow>
                      </TableHead>
                      {[1, 2].map((item) => (
                        <TableRow
                          key={item}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            HAVANA
                          </TableCell>
                          <TableCell component="th" scope="row">
                            Oui
                          </TableCell>
                          <TableCell component="th" scope="row">
                            Non
                          </TableCell>
                          <TableCell component="th" scope="row">
                            Oui
                          </TableCell>
                          <TableCell align="right">
                            <Button color="primary" startIcon={<ContentCopyIcon />}>
                              Utiliser
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </Table>
                  </FormContainer>
                </DialogContent>
                <DialogActions>
                  <Button color="warning">Annuler</Button>
                  <Button 
                  variant="contained" 
                  type="submit"
                  >
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
