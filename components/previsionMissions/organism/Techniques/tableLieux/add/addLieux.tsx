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
import OSTextField from "../../../../../shared/input/OSTextField";
import { cancelEdit } from "../../../../../../redux/features/missionLocation/missionLocationSlice";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import useFetchMissionLocationListe from "../hooks/useFetchMissionLocationList";
import {
  createMissionLocation,
  updateMissionLocation,
} from "../../../../../../redux/features/missionLocation";

const AddLieux = ({ handleClose }: any) => {
  const router = useRouter();
  const idfile: any = router.query.id;
  const dispatch = useAppDispatch();

  const { missionLocation, isEditing } = useAppSelector(
    (state) => state.missionLocation
  );
  const fetchMissionLocationList = useFetchMissionLocationListe();

  useEffect(() => {
    fetchMissionLocationList();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateMissionLocation({
            id: missionLocation.id!,
            missionLocation: values,
          })
        );
      } else {
        await dispatch(createMissionLocation(values));
      }
      fetchMissionLocationList();
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
            ? missionLocation
            : {
                village: isEditing ? missionLocation?.village : "",
                commune: isEditing ? missionLocation?.commune : "",
                district: isEditing ? missionLocation?.district : "",
                missionId: idfile,
              }
        }
        validationSchema={Yup.object({
          village: Yup.string().required("Champ obligatoire"),
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
              <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
                <SectionNavigation>
                  <DialogTitle>
                    {isEditing ? "Modifier" : "Formulaire"} lieux
                  </DialogTitle>
                  <DialogContent>
                    <FormContainer spacing={2} mt={2}>
                      <OSTextField
                        id="outlined-basic"
                        label="Fokontany"
                        name="village"
                      />
                      <OSTextField
                        id="outlined-basic"
                        label="Commune"
                        name="commune"
                      />
                      <OSTextField
                        id="outlined-basic"
                        label="Disctrict"
                        name="district"
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

export default AddLieux;

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
