import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  styled,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks";
import OSTextField from "../../../../../shared/input/OSTextField";
import { useRouter } from "next/router";
import { createObjectifRapport, updateObjectifRapport } from "../../../../../../redux/features/objectifRapport";
import useFetchObjectifRapport from "../hooks/useFetchObjectifRapport";
import { cancelEdit } from "../../../../../../redux/features/objectifRapport/objectifRapportSlice";


const AddObjectif = ({ handleClose }: any) => {
  const router = useRouter();
  const dispatch: any = useAppDispatch();
  const { isEditing, objectifRapport, objectifRapportlist } = useAppSelector((state: any) => state.objectifRapport);
  const fetchObjectifRapport = useFetchObjectifRapport();
  const { id }: any = router.query;
  const [getUtiliser, setGetUtiliser]: any = React.useState("");

  React.useEffect(() => {
    fetchObjectifRapport()
  }, [router.query])

  const handleSubmit = async (values: any) => {
    values.missionId = id!;
    try {
      if (isEditing) {
        await dispatch(
          updateObjectifRapport({
            id: objectifRapport.id!,
            objectifRapport: values,
          })
        );
      } else {
        if (getUtiliser !== "") {
          values.objectif = getUtiliser;
          return (await dispatch(createObjectifRapport(values)),
            handleClose()
          );
        } else if (values.objectif != "") {
          return (await dispatch(createObjectifRapport(values)),
            handleClose()
          );
        }
      }
      fetchObjectifRapport(),
      handleClose();
    } catch (error) {
      console.log("error", error);
    }
  };
  const ClikUtiliser = (id: any) => {
    if (!isEditing) {
      setGetUtiliser(id);
    }
  }
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? objectifRapport
            : {
              objectif: isEditing ? objectifRapport?.objectif : "",
              missiomId: id!
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
                <DialogTitle>Créer/modifier objectif</DialogTitle>
                <DialogContent>
                  <FormContainer spacing={2} mt={2}>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Objectif"
                      variant="outlined"
                      name="objectif"
                      value={getUtiliser != "" ? getUtiliser : formikProps.values.objectif}
                    />
                    <Stack flexDirection="row">
                      <InfoIcon />
                      <Typography variant="subtitle2">
                        Voici la liste des <Lien>objectifs pendant la prévision</Lien>,
                        vous pouvez les réutiliser pour les rapports
                      </Typography>
                    </Stack>
                    <FormContainer sx={{height: 200, overflow: "auto"}}>
                    <Table sx={{ minWidth: 500}} aria-label="simple table">
                      {objectifRapportlist.map((item: any) => (
                  
                        <TableRow
                          key={item.id}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 }}}
                        >
                          <TableCell component="th" scope="row">
                            {item.objectif}
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              color="primary"
                              startIcon={<ContentCopyIcon />}
                              onClick={() => ClikUtiliser(item.objectif)}
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
                  <Button color="warning" onClick={() => {
                    formikProps.resetForm();
                    dispatch(cancelEdit());
                    handleClose();
                  }}>
                    Annuler
                  </Button>
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
    </Container>
  );
};

export default AddObjectif;

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
