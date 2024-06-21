import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Box,
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { useRouter } from "next/router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import useFetchContactListe from "../hooks/useFetchContactList";
import {
  createContact,
  updateContact,
} from "../../../../../../redux/features/contact";
import { Form, Formik } from "formik";
import OSTextField from "../../../../../shared/input/OSTextField";
import { cancelEdit } from "../../../../../../redux/features/contact/contactSlice";

const AddContactPendantMission = ({ handleClose }: any) => {
  const router = useRouter();
  const { id }: any = router.query;
  const dispatch = useAppDispatch();

  const { contact, isEditing } = useAppSelector((state) => state.contact);
  const fetchContactList = useFetchContactListe();

  useEffect(() => {
    fetchContactList();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateContact({
            id: contact.id!,
            contact: values,
          })
        );
      } else {
        await dispatch(createContact(values));
      }
      fetchContactList();
      handleClose();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Box>
      <Formik
        enableReinitialize
        initialValues={
          isEditing
            ? contact
            : {
                lastNameContact: isEditing ? contact?.lastNameContact : "",
                firstNameContact: isEditing ? contact?.firstNameContact : "",
                locationContact: isEditing ? contact?.locationContact : "",
                numberContact: isEditing ? contact?.numberContact : "",
                noteContact: isEditing ? contact?.noteContact : "",
                missionId: isEditing ? contact?.missionId : id,
              }
        }
        validationSchema={Yup.object({})}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
                <SectionNavigation>
                  <DialogTitle>
                    {isEditing ? "Modifier" : "Formulaire"} contact pendant la
                    mission
                  </DialogTitle>
                  <DialogContent>
                    <FormContainer spacing={2} mt={2}>
                      <CustomStack
                        direction={{ xs: "column", sm: "column", md: "row" }}
                        spacing={{ xs: 2, sm: 2, md: 1 }}
                      >
                        <OSTextField
                          id="outlined-basic"
                          label="Nom"
                          name="lastNameContact"
                          inputProps={{ autoComplete: "off" }}
                        />
                        <OSTextField
                          id="outlined-basic"
                          label="Prénom"
                          name="firstNameContact"
                          inputProps={{ autoComplete: "off" }}
                        />
                      </CustomStack>
                      <OSTextField
                        id="outlined-basic"
                        label="Lieu et institution"
                        name="locationContact"
                        inputProps={{ autoComplete: "off" }}
                      />
                      <OSTextField
                        id="outlined-basic"
                        label="Numéro"
                        name="numberContact"
                        inputProps={{ autoComplete: "off" }}
                      />
                      <OSTextField
                        id="outlined-basic"
                        label="Remarques"
                        name="noteContact"
                        inputProps={{ autoComplete: "off" }}
                      />
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
                    <Button variant="contained" type="submit">
                      Enregistrer
                    </Button>
                  </DialogActions>
                </SectionNavigation>
              </Container>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AddContactPendantMission;

const FormContainer = styled(Stack)(({ theme }) => ({
  // padding: 10,
  background: "#fff",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({}));

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  // marginLeft: "100",
}));
// export const CustomStack = styled(Stack)(({ theme }) => ({
//   [theme.breakpoints.down("sm")]: {
//     flexWrap: "wrap",
//   },
// }));
