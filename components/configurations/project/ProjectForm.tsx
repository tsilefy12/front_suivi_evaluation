import {
  Stack,
  styled,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  createPostAnalytic,
  updatePostAnalytic,
} from "../../../redux/features/postAnalytique";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import { ArrowBack, Check, Close } from "@mui/icons-material";
import { cancelEdit } from "../../../redux/features/postAnalytique/postAnalytiqueSlice";
import OSTextField from "../../shared/input/OSTextField";
import { createProject, updateProject } from "../../../redux/features/project";

const ProjectForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isEditing, project } = useAppSelector((state) => state.project);
  const handleSubmit = async (values: any) => {
    values.descriptionFr = values.descriptionEn;
    try {
      if (isEditing) {
        await dispatch(
          updateProject({
            id: project.id!.toString(),
            project: values,
          })
        );
      } else {
        await dispatch(createProject(values));
      }
      router.push("/configurations/project");
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
            ? project
            : {
                title: isEditing ? project?.title : "",
                descriptionEn: isEditing ? project?.descriptionEn : "",
                // descriptionFr: isEditing ? project?.descriptionFr : formikProps.values.descriptionEn
              }
        }
        validationSchema={Yup.object({
          title: Yup.string().required("Champ obligatoire"),
          descriptionEn: Yup.string().required("Champ obligatoire"),
          // descriptionFr: Yup.string().required("Champ obligatoire"),
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
                label="Titre du projet"
                variant="outlined"
                name="title"
              />
              <OSTextField
                id="outlined-basic"
                label="Titre en Anglais"
                variant="outlined"
                name="descriptionEn"
              />
              {/* <OSTextField
                id="outlined-basic"
                label="Titre en Français"
                variant="outlined"
                name="descriptionFr"
              /> */}
              <BtnContainer
                direction="row"
                spacing={2}
                justifyContent="flex-end"
              >
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
          );
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

export default ProjectForm;
