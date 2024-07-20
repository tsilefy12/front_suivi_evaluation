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
  TableRow,
  Typography,
} from "@mui/material";
import OSTextField from "../../../../../shared/input/OSTextField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import InfoIcon from "@mui/icons-material/Info";
import { useRouter } from "next/router";
import useFetchlivrableRapport from "../../tableActivitésPrévues/hooks/useFetchActivityRapport";
import {
  createLivrableRapport,
  updateLivrableRapport,
} from "../../../../../../redux/features/LivrableRapport";
import { cancelEdit } from "../../../../../../redux/features/LivrableRapport/livrableRapportSlice";
import useFetchDeliverableList from "../../../../../previsionMissions/organism/Techniques/tableLivrables/hooks/useFetchDeliverableList";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { DeliverableItem } from "../../../../../../redux/features/deliverable/deliverableSlice.interface";

const AddlivrableRapport = ({ handleClose }: any) => {
  const { isEditing, livrableRapport } = useAppSelector(
    (state: any) => state.livrableRapport
  );
  const dispatch: any = useAppDispatch();
  const router = useRouter();
  const fetchlivrableRapport = useFetchlivrableRapport();
  const { id }: any = router.query;
  const { deliverableList } = useAppSelector((state) => state.deliverable);
  const fetchDeliverableListe = useFetchDeliverableList();

  React.useEffect(() => {
    fetchlivrableRapport();
    fetchDeliverableListe();
  }, [router.query]);

  const handleSubmit = async (values: any) => {
    values.missionId = id!;
    try {
      if (isEditing) {
        await dispatch(
          updateLivrableRapport({
            id: livrableRapport.id!,
            livrableRapport: values,
          })
        );
      } else {
        if (getUtiliser !== "") {
          values.livrablee = getUtiliser;
          return await dispatch(createLivrableRapport(values)), handleClose();
        } else if (values.livrablee != "") {
          return await dispatch(createLivrableRapport(values)), handleClose();
        }
      }
      fetchlivrableRapport(), handleClose();
      getUtiliser("");
    } catch (error) {
      console.log("error", error);
    }
  };
  const [getUtiliser, setGetUtiliser]: any = React.useState("");
  const ClikUtiliser = (valeur: any) => {
    setGetUtiliser(valeur);
  };
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? livrableRapport
            : {
                livrablee: isEditing ? livrableRapport?.livrablee : "",
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
                <DialogTitle>Créer/modifier livrableRapports</DialogTitle>
                <DialogContent>
                  <FormContainer spacing={2} mt={2}>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Livrable de rapport"
                      variant="outlined"
                      name="livrablee"
                      value={
                        getUtiliser !== "" && !isEditing
                          ? getUtiliser
                          : formikProps.values.livrablee
                      }
                      disabled={
                        !!deliverableList.find(
                          (e: any) =>
                            e.description === formikProps.values.livrablee &&
                            isEditing
                        )
                      }
                      inputProps={{ autoComplete: "off" }}
                      required
                    />
                    <Stack flexDirection="row">
                      <InfoIcon />
                      <Typography variant="subtitle2">
                        Voici la liste des{" "}
                        <Lien>livrables pendant la prévision</Lien>, vous pouvez
                        les réutiliser pour les rapports
                      </Typography>
                    </Stack>
                    <FormContainer sx={{ height: 200, overflow: "auto" }}>
                      <Table sx={{ minWidth: 500 }} aria-label="simple table">
                        {deliverableList
                          .filter((f: any) => f.missionId == id)
                          .map((item: DeliverableItem, index: any) => (
                            <TableRow
                              key={item.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {item.description}
                              </TableCell>
                              <TableCell align="right">
                                <Button
                                  color="primary"
                                  startIcon={<ContentCopyIcon />}
                                  onClick={() => ClikUtiliser(item.description)}
                                  disabled={isEditing}
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
                  >
                    Annuler
                  </Button>
                  <Button
                    variant="contained"
                    type="button"
                    onClick={formikProps.submitForm}
                    disabled={
                      !!deliverableList.find(
                        (e: any) =>
                          e.description === formikProps.values.livrablee &&
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

export default AddlivrableRapport;

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
