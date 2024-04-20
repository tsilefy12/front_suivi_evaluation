import { Stack, styled, Typography, TextField, Button, Link } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { createPostAnalytic, updatePostAnalytic } from "../../../redux/features/postAnalytique";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import { ArrowBack, Check, Close } from "@mui/icons-material";
import { cancelEdit } from "../../../redux/features/postAnalytique/postAnalytiqueSlice";
import OSTextField from "../../shared/input/OSTextField";

const PostAnalyticForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter()
  const { isEditing, postAnalytique } = useAppSelector((state) => state.postAnalytique)
  const handleSubmit = async (values: any) => {
    values.bailleur = "";
    try {
      if (isEditing) {
        await dispatch(
          updatePostAnalytic({
            id: postAnalytique.id!.toString(),
            postAnalytic: values,
          })
        );
      } else {

        await dispatch(createPostAnalytic(values));
      }
      router.push("/configurations/postAnalytic");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <FormContainer>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? postAnalytique
            : {
              name: isEditing ? postAnalytique?.name : "",
              bailleur: isEditing ? postAnalytique?.bailleur: ""
            }
        }
        validationSchema={Yup.object({
          name: Yup.string().required("Champ obligatoire"),
          bailleur: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            <Stack spacing={4}>
              <Typography variant="h5" color="initial">
                Formulaire (Créer/Modifier)
              </Typography>
              <OSTextField
                id="outlined-basic"
                label="Poste analytique"
                variant="outlined"
                name="name"
              />
              <OSTextField
                id="outlined-basic"
                label="Bailleur"
                variant="outlined"
                name="bailleur"
              />
              <BtnContainer direction="row" spacing={2} justifyContent="flex-end">
                  <Button
                    color="info"
                    variant="text"
                    startIcon={<Close />}
                    onClick={() => {
                      formikProps.resetForm();
                      dispatch(cancelEdit());
                    }}
                  >
                    Annuler
                  </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<Check />}
                  sx={{ marginInline: 3 }}
                  type="button" // Modifier le type à "button"
                  onClick={formikProps.submitForm}
                >
                  Enregistrer
                </Button>
              </BtnContainer>
            </Stack>
          )
        }}
      </Formik>
    </FormContainer>
  );
};

const BtnContainer = styled(Stack)(({ theme }) => ({}));

const FormContainer = styled("div")(({ theme }) => ({
  // border: "1px solid #E0E0E0",
  borderRadius: 20,
  padding: theme.spacing(2),
  marginBlock: theme.spacing(2),
  background: "#fff",
}));

export default PostAnalyticForm;
