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
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import * as Yup from "yup";
import useFetchLieuxRapport from "../hooks/useFetchLieuxRapport";
import { createLieuxRapport, updateLieuxRapport } from "../../../../../../redux/features/lieuxRapport";
import { Form, Formik } from "formik";
import OSTextField from "../../../../../shared/input/OSTextField";
import { cancelEdit } from "../../../../../../redux/features/lieuxRapport/lieuxSlice";

const AddLieux = ({ handleClose }: any) => {
  const { isEditing, lieuxRapport } = useAppSelector((state: any) => state.lieuxRapport);
  const dispatch: any = useAppDispatch();
  const router = useRouter();
  const fetchLieuxRapport = useFetchLieuxRapport();
  const { id }: any = router.query;
  React.useEffect(() => {
    fetchLieuxRapport()
  }, [router.query])


  const handleSubmit = async (values: any) => {
    values.missionId = id!;
    try {
      if (isEditing) {
        await dispatch(
          updateLieuxRapport({
            id: lieuxRapport.id!,
            lieuxRapport: values,
          })
        );
      } else {
        await dispatch(createLieuxRapport(values));
      }
      fetchLieuxRapport(),
        handleClose();
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
            ? lieuxRapport
            : {
              fonkotany: isEditing ? lieuxRapport?.fonkotany : "",
              commune: isEditing ? lieuxRapport?.commune : "",
              district: isEditing ? lieuxRapport?.district : "",
              // missiomId: id!
            }
        }
        validationSchema={Yup.object({
          fonkotany: Yup.string().required("Champ obligatoire"),
          commune: Yup.string().required("Champ obligatoire"),
          district: Yup.string().required("Champ obligatoire"),
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
                <DialogTitle>Créer/modifier lieux</DialogTitle>
                <DialogContent>
                  <FormContainer spacing={2} mt={2}>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Fokontany"
                      variant="outlined"
                      name="fonkotany"
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Commune"
                      variant="outlined"
                      name="commune"
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Disctrict"
                      variant="outlined"
                      name="district"
                    />
                    <Stack flexDirection="row">
                      <InfoIcon />
                      <Typography variant="subtitle2">
                        Voici la liste des <Lien>Lieux pendant la prévision</Lien>, vous
                        pouvez les réutiliser pour les rapports
                      </Typography>
                    </Stack>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      {[1, 2].map((item) => (
                        <TableRow
                          key={item}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            Résultat numéro 1
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
                  <Button
                    color="warning"
                    onClick={() => {
                      formikProps.resetForm();
                      dispatch(cancelEdit())
                    }}
                  >Annuler</Button>
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
