import { Stack, styled, Typography, TextField, Button, Link } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import OSTextField from "../../shared/input/OSTextField";
import { createStatus, updateStatus } from "../../../redux/features/status";
import { cancelEdit } from "../../../redux/features/status/statusSlice";
import { Check, Close } from "@mui/icons-material";

const StatusForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter()
  const { isEditing, statut } = useAppSelector((state) => state.status)
  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateStatus({
            id: statut.id!.toString(),
            statut: values,
          })
        );
      } else {

        await dispatch(createStatus(values));
      }
      router.push("/configurations/status");
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
            ? statut
            : {
              status: isEditing ? statut?.status : "",
            }
        }
        validationSchema={Yup.object({
          status: Yup.string().required("Champ obligatoire"),
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
                label="Status"
                variant="outlined"
                name="status"
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

export default StatusForm;
