import { Stack, styled, Typography, TextField, Button, Link } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import OSTextField from "../../shared/input/OSTextField";
import { Check, Close } from "@mui/icons-material";
import { createSite, updateSite } from "../../../redux/features/site";
import { cancelEdit } from "../../../redux/features/site/siteSlice";
import useFetchSite from "./hooks/useFetchSite";

const SiteForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isEditing, site, sitelist } = useAppSelector((state: any) => state.site);
  const fetchSite = useFetchSite();

  React.useEffect(() =>{
    fetchSite();
  }, [router.query])

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateSite({
            id: site.id!.toString(),
            site: values,
          })
        );
      } else {

        await dispatch(createSite(values));
      }
      router.push("/configurations/site");
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
            ? site
            : {
              lieu: isEditing ? site?.lieu : "",
              objectifAnnuelId: isEditing ? site?.objectifAnnuelId: null,
              but: isEditing ? site?.but : null,
            }
        }
        validationSchema={Yup.object({
          lieu: Yup.string().required("Champ obligatoire"),
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
                label="Site"
                variant="outlined"
                name="lieu"
              />
              <BtnContainer direction="row" spacing={2} justifyContent="flex-end">
                 <Link href={'/suivi-evaluation/configurations/site'}>
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
                 </Link>
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

export default SiteForm;
