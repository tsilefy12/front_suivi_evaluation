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
} from "@mui/material";
import OSTextField from "../../../../../shared/input/OSTextField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import useFetchlivrableRapport from "../../tableActivitésPrévues/hooks/useFetchActivityRapport";
import { createLivrableRapport, updateLivrableRapport } from "../../../../../../redux/features/LivrableRapport";
import { cancelEdit } from "../../../../../../redux/features/LivrableRapport/livrableRapportSlice";

const AddlivrableRapport = ({ handleClose }: any) => {
  const { isEditing, livrableRapport } = useAppSelector((state: any) => state.livrableRapport);
  const dispatch: any = useAppDispatch();
  const router = useRouter();
  const fetchlivrableRapport = useFetchlivrableRapport();
  const { id }: any = router.query;
  React.useEffect(() => {
    fetchlivrableRapport()
  }, [router.query])


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
        console.log("mandalo ato", values)
        if (values) {
           dispatch(createLivrableRapport(values));
        }
      }
      fetchlivrableRapport(),
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
            ? livrableRapport
            : {
              livrablee: isEditing ? livrableRapport?.livrablee : "",
              // missiomId: id!
            }
        }
        validationSchema={Yup.object({
          livrablee: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >{(formikProps) => {
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
                  />
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
