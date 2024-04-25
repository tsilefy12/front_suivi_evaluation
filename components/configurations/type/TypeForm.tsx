import { Button, Stack, Typography, styled } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { createType, updateType } from "../../../redux/features/type";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import { ArrowBack, Check, Close } from "@mui/icons-material";
import { cancelEdit } from "../../../redux/features/type/typeSlice";
import OSTextField from "../../shared/input/OSTextField";

const TypeForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter()
  const { isEditing, type } = useAppSelector((state) => state.types)
  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateType({
            id: type.id!.toString(),
            type: values,
          })
        );
      } else {

        await dispatch(createType(values));
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
            ? type
              : {
                name: isEditing ? type?.name : ""
              }
        }
        validationSchema={Yup.object({
          name: Yup.string().required("Champ obligatoire"),
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
                label="Type"
                variant="outlined"
                name="name"
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
                  type="button" 
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

export default TypeForm;
