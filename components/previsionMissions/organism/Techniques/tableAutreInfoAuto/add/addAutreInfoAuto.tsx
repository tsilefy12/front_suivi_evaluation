import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Box,
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Radio,
  RadioGroup,
  styled,
  TextField,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";
import OSTextField from "../../../../../shared/input/OSTextField";
import { cancelEdit } from "../../../../../../redux/features/vehicle/vehicleSlice";
import { useRouter } from "next/router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import * as Yup from "yup";
import useFetchVehicleList from "../hooks/useFetchVehicleList";
import {
  createVehicle,
  updateVehicle,
} from "../../../../../../redux/features/vehicle";
import { Field, Form, Formik } from "formik";

const AddAutreInfoAuto = ({ handleClose }: any) => {
  const router = useRouter();
  const idfile: any = router.query.id;
  const dispatch = useAppDispatch();

  const { vehicle, isEditing } = useAppSelector((state) => state.vehicle);
  const fetchVehicleList = useFetchVehicleList();

  useEffect(() => {
    fetchVehicleList();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateVehicle({
            id: vehicle.id!,
            vehicle: values,
          })
        );
      } else {
        await dispatch(createVehicle(values));
      }
      fetchVehicleList();
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
            ? vehicle
            : {
                insuranceVehicle: isEditing ? vehicle?.insuranceVehicle : "",
                technicalVisitVehicle: isEditing
                  ? vehicle?.technicalVisitVehicle
                  : "",
                vehicleType: isEditing ? vehicle?.vehicleType : "OTHER",
                safetyBeltVehicle: isEditing
                  ? vehicle?.safetyBeltVehicle
                  : true,
                missionId: idfile,
              }
        }
        validationSchema={Yup.object({
          OperationType: Yup.string()
            .oneOf(
              ["OTHER", "RENTAL", "PRIVATE"],
              "Veuillez choisier type d'operation"
            )
            .required("Veuillez choisir type d'operation "),
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
                    {isEditing ? "Modifier" : "Formulaire"} Information
                    importante ( vehicule )
                  </DialogTitle>
                  <DialogContent>
                    <FormContainer spacing={2} mt={2}>
                      <OSTextField
                        fullWidth
                        id="outlined-basic"
                        label="Assurance"
                        name="insuranceVehicle"
                      />
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Visite technique"
                        name="technicalVisitVehicle"
                      />
                      <FormControl>
                        <Field as={RadioGroup} row name="OperationType">
                          <FormControlLabel
                            value="OTHER"
                            control={<Radio />}
                            label="Autre de location"
                            name="vehicleType"
                          />
                          <FormControlLabel
                            value="RENTAL"
                            control={<Radio />}
                            label="Voiture de location"
                            name="vehicleType"
                          />
                          <FormControlLabel
                            value="PRIVATE"
                            control={<Radio />}
                            label="Voiture privé"
                            name="vehicleType"
                          />
                        </Field>
                      </FormControl>
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Ceinture de sécurité"
                        name="safetyBeltVehicle"
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
export default AddAutreInfoAuto;

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
