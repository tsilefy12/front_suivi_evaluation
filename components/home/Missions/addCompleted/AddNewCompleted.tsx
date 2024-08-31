import {
  Button,
  Container,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { SectionNavigation } from "../../../plan_travail/objectifStrategique";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import OSTextField from "../../../shared/input/OSTextField";
import OSDatePicker from "../../../shared/date/OSDatePicker";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  createUnCompleteTbb,
  updateUncompleteTbb,
} from "../../../../redux/features/unCompleteTbb";
import OSSelectField from "../../../shared/select/OSSelectField";
import useFetchUncompleteTbbListe from "../hooks/useFetchUncompleteTbb";
import useFetchCurrencyListe from "../../../configurations/currency/hooks/useFetchCurrency";

const AddNewCompleted = ({ fermerDialog, getMissionId }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isEditing, uncompleteTbb } = useAppSelector(
    (state) => state.uncompleteTbb
  );
  const fetchUncompleteTbb = useFetchUncompleteTbbListe();
  const fetchCurrencyListe = useFetchCurrencyListe();
  const { currencyListe } = useAppSelector((state) => state.currency);
  React.useEffect(() => {
    fetchUncompleteTbb();
    fetchCurrencyListe();
  }, [router.query]);

  const handleSubmit = async (values: any) => {
    values.missionId = getMissionId;
    try {
      if (isEditing) {
        await dispatch(
          updateUncompleteTbb({
            id: uncompleteTbb.id!,
            uncompleteTbb: values,
          })
        );
      } else {
        await dispatch(createUnCompleteTbb(values));
      }
      fermerDialog();
    } catch (error) {
      console.log("error", error);
    }
  };
  const listType = [
    { id: "Mission", name: "Mission" },
    { id: "Administration", name: "Administration" },
  ];
  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <Formik
        enableReinitialize
        initialValues={
          isEditing
            ? uncompleteTbb
            : {
                ordreDeMission: isEditing ? uncompleteTbb?.ordreDeMission : "",
                piecesClassees: isEditing ? uncompleteTbb?.piecesClassees : "",
                remarqueAttente: isEditing
                  ? uncompleteTbb?.remarqueAttente
                  : "",
                explicationImprevu: isEditing
                  ? uncompleteTbb?.explicationImprevu
                  : "",
                type: isEditing ? uncompleteTbb?.type : "",
                devise: isEditing ? uncompleteTbb?.devise : "",
                coursDevise: isEditing ? uncompleteTbb?.coursDevise : 0,
                retenuAdmin: isEditing ? uncompleteTbb?.retenuAdmin : 0,
                moyenRemise: isEditing ? uncompleteTbb?.moyenRemise : "",
                depenseAdmin: isEditing ? uncompleteTbb?.depenseAdmin : 0,
                depensesResp: isEditing ? uncompleteTbb?.depensesResp : 0,
              }
        }
        validationSchema={Yup.object({
          ordreDeMission: Yup.string().required("Champ obligatoire"),
          piecesClassees: Yup.string().required("Champ obligatoire"),
          remarqueAttente: Yup.string().required("Champ obligatoire"),
          explicationImprevu: Yup.string().required("Champ obligatoire"),
          type: Yup.string().required("Champ obligatoire"),
          devise: Yup.string().required("Champ obligatoire"),
          coursDevise: Yup.number().required("Champ obligatoire"),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <DialogTitle>
                <Stack flexDirection={"row"}>
                  <Button
                    color="info"
                    variant="text"
                    startIcon={<ArrowBack />}
                    onClick={() => fermerDialog()}
                  >
                    Retour
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
                  <Link href="/uncompleteTbbs/ListuncompleteTbb">
                    <Button
                      variant="text"
                      color="warning"
                      size="small"
                      startIcon={<Close />}
                      sx={{ marginInline: 3 }}
                      type="submit"
                      onClick={() => fermerDialog()}
                    >
                      Annuler
                    </Button>
                  </Link>
                </Stack>
              </DialogTitle>
              <DialogContent sx={{ width: "100%" }}>
                <Divider />
                <div style={{ marginTop: 15 }}>
                  <Stack direction={"row"} gap={2} paddingBottom={2}>
                    <OSTextField
                      id="outlined-basic"
                      label="Retenu admin"
                      name="retenuAdmin"
                      type="number"
                      inputProps={{ autoComplete: "off", min: 0 }}
                    />
                    <OSTextField
                      id="outlined-basic"
                      label="Moyen remise"
                      name="moyenRemise"
                      inputProps={{ autoComplete: "off" }}
                    />
                    <OSTextField
                      id="outlined-basic"
                      label="Dépense admin"
                      name="depenseAdmin"
                      type="number"
                      inputProps={{ autoComplete: "off", min: 0 }}
                    />
                    <OSTextField
                      id="outlined-basic"
                      label="Dépense responsable"
                      name="depensesResp"
                      type="number"
                      inputProps={{ autoComplete: "off", min: 0 }}
                    />
                  </Stack>
                  <Stack direction={"row"} gap={2} paddingBottom={2}>
                    <OSSelectField
                      id="outlined-basic"
                      label="Type"
                      name="type"
                      options={listType}
                      dataKey={"name"}
                      valueKey="id"
                    />
                    <OSTextField
                      id="outlined-basic"
                      label="Ordre de mission"
                      name="ordreDeMission"
                      inputProps={{ autoComplete: "off" }}
                    />
                    <OSTextField
                      id="outlined-basic"
                      label="Pièces classées"
                      name="piecesClassees"
                      inputProps={{ autoComplete: "off" }}
                    />
                    <OSTextField
                      id="outlined-basic"
                      label="Remarque attente"
                      name="remarqueAttente"
                      inputProps={{ autoComplete: "off" }}
                    />
                  </Stack>
                  <Stack direction={"row"} gap={2} paddingBottom={2}>
                    <OSSelectField
                      id="outlined-basic"
                      label="Devise"
                      name="devise"
                      options={currencyListe}
                      dataKey={"name"}
                      valueKey="id"
                    />
                    <OSTextField
                      id="outlined-basic"
                      label="Cours devise"
                      name="coursDevise"
                      inputProps={{ autoComplete: "off", type: "number" }}
                    />
                  </Stack>
                  <OSTextField
                    id="outlined-basic"
                    label="Explication imprevue"
                    name="explicationImprevu"
                    inputProps={{ autoComplete: "off" }}
                    multiline
                    rows={3}
                  />
                </div>
              </DialogContent>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default AddNewCompleted;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));
