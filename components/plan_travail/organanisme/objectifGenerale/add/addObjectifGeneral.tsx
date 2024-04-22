import React, { useEffect } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/reduxHooks";
import useFetchObjectifGeneral from "../hooks/useFetchObjectifGeneral";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { createObejectifGeneral, updateObjectifGeneral } from "../../../../../redux/features/objectifGeneral";
import OSTextField from "../../../../shared/input/OSTextField";
import { Form, Formik } from "formik";
import { Check } from "@mui/icons-material";

const ObjectifsGeneralForm = ({ handleClose }: any) => {
  const dispatch = useAppDispatch();
  const fetchObjectifGeneral = useFetchObjectifGeneral();
  const router = useRouter();
  const { id } = router.query;
  const { isEditing, objectifGeneral } = useAppSelector((state) => state.objectifGeneral);


  React.useEffect(() => {
    fetchObjectifGeneral();
  }, [router.query])

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateObjectifGeneral({
            id: objectifGeneral.id!,
            objectifGeneral: values,
          })
        );
        handleClose()
      } else {
        await dispatch(createObejectifGeneral(values));
        handleClose();
        fetchObjectifGeneral();
      }
      router.push(`/plan_travail/${id}/objectifGenerale`);
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
            ? objectifGeneral
            : {
              objectif: isEditing ? objectifGeneral?.objectif : "",
              planTravaileId: isEditing ? objectifGeneral?.planTravaileId: id,
            }
        }
        validationSchema={Yup.object({
          objectif: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <SectionNavigation width={{ xs: "100%", sm: "560px" }}>
                <DialogTitle> Créer/Modifier Objectif Générale </DialogTitle>
                <DialogContent>
                  <FormContainer spacing={2} mt={2}>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Saisisser l'objectif Generale"
                      variant="standard"
                      name="objectif"
                    />
                  </FormContainer>
                </DialogContent>
                <DialogActions>
                  <Button color="warning" onClick={handleClose}>Annuler</Button>
                  <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<Check />}
                      sx={{ marginInline: 3 }}
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

export default ObjectifsGeneralForm;

const FormContainer = styled(Stack)(({ theme }) => ({
  background: "#fff",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({
}));
