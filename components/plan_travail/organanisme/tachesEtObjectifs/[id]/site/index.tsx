import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Container, Dialog, DialogActions, DialogContentText, DialogTitle, FormLabel, MenuItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { BodySection, SectionNavigation } from "../../ListTacheEtObjectifs";
import { useRouter } from "next/router";
import useFetchObjectifsAnnuel from "./hooks/useFetchObjectifAnnuel";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks";
import React, { useState } from "react";
import useFetchSite from "../../../../../configurations/site/hooks/useFetchSite";
import OSTextField from "../../../../../shared/input/OSTextField";
import { updateSite } from "../../../../../../redux/features/site";
import { Form, Formik } from "formik";
import { position } from "polished";
import useFetchPlanTravaile from "../../../../hooks/useFetchPlanTravail";
import useFetchTacheEtObjectifs from "../../hooks/useFetchTacheEtObjectifs";
import { TacheEtObjectifItem } from "../../../../../../redux/features/tachesEtObjectifs/tacheETObjectifs.interface";
import { PlanTravailItem } from "../../../../../../redux/features/planTravail/planTravail.interface";


const ListSite = () => {
  const router = useRouter()
  const { id }: any = router.query;
  const { idT }: any = router.query;
  const fetchObjectifAnnuel = useFetchObjectifsAnnuel();
  const { objectifsAnnuelList } = useAppSelector((state: any) => state.objectifsAnnuels)
  const fetchSite = useFetchSite();
  const { sitelist, isEditing, site } = useAppSelector((state) => state.site);
  const dispatch: any = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const fetchObjectStrategique = useFetchPlanTravaile();
  const { planTravaillist } = useAppSelector((state) => state.planTravail);
  const fetchTacheCle: any = useFetchTacheEtObjectifs()
  const { tacheEtObjectifList } = useAppSelector((state) => state.tacheEtObjectifs)

  React.useEffect(() => {
    fetchObjectifAnnuel();
    fetchSite();
    fetchObjectStrategique();
    fetchTacheCle();
  }, [router.query])

  const tempObjectifAnnuel = objectifsAnnuelList.filter((e: any) => e.taskAndObjectiveId === idT);
  //    console.log("tempObjectif :", tempObjectifAnnuel)
  const Choix = [
    { id: 1, name: 1 },
    { id: 0, name: 0 }
  ]

  const [test, setTest]: any = React.useState("");
  const [valeur, setValeur]: any = React.useState("");
  console.log("val :", test)
  const click = () => {
    if (test == 1 || test == 0) {
      console.log("OK")
      setOpen(true)
    }
  }
  const handleSubmit = async (values: any) => {
    try {
      await dispatch(
        updateSite({
          id: valeur!,
          site: {
            ...site,
            but: (test).toString(),
            objectifAnnuelId: idT!
          }
        })
      );
      setOpen(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <Container maxWidth="xl">
        <SectionNavigation direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent="space-between"
          sx={{ mb: 2 }}>
          <Stack flexDirection={"row"}>
            <Link href={`/plan_travail/${id}/tachesEtObjectifs`}>
              <Button color="info" variant="text" startIcon={<ArrowBack />}>
                Retour
              </Button>
            </Link>
          </Stack>
          <Typography variant="h4" color="GrayText">
            Liste des sites
          </Typography>

        </SectionNavigation>
        <BodySection>
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <TableContainer>
                <Table sx={{ padding: 2 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        Goals
                      </TableCell>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ minWidth: 100, maxWidth: 100, paddingLeft: 4 }}>
                              S/N
                            </TableCell>
                            <TableCell sx={{ minWidth: 250, maxWidth: 250, paddingLeft: 1 }}>
                              Key Tasks
                            </TableCell>
                                    <TableCell sx={{minWidth: 250, maxWidth: 250, paddingLeft: 1}}>
                                      Goals
                                    </TableCell>
                                    {sitelist.map(s=>(
                                      <TableCell key={s.id} sx={{minWidth: 150, maxWidth: 150, paddingLeft: 1}}>{s.lieu}</TableCell>
                                    ))}
                                  
                          </TableRow>
                        </TableHead>
                      </Table>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {planTravaillist.map((plan: PlanTravailItem, yearIndex: any) => (
                      <TableRow key={yearIndex}>
                        <TableCell align="center">
                          {plan.description}
                        </TableCell>
                        <TableCell>
                          <Table>
                            <TableBody>
                              {plan.TacheCle?.map(t => (
                                <TableRow key={t.id}>
                                  <TableCell sx={{ minWidth: 70, maxWidth: 70 }}>
                                    {t.sn}
                                  </TableCell>
                                  <TableCell sx={{ minWidth: 250, maxWidth: 250 }}>
                                    {t.keyTasks}
                                  </TableCell>
                                  <TableCell>
                                    <Table>
                                      <TableBody>
                                    {t.objectifAnnuel?.map(o => (
                                      <TableRow>
                                        <TableCell sx={{minWidth: 250, maxWidth: 250}}>{o.objectiveTitle}</TableCell>
                                        {sitelist.map(s=>(
                                          <TableCell key={s.id} sx={{minWidth: 150, maxWidth: 150}}>
                                            <TextField select sx={{width: 140}}>
                                              <MenuItem value={0}>0</MenuItem>
                                              <MenuItem value={1}>1</MenuItem>
                                            </TextField>
                                          </TableCell>
                                        ))}
                                      </TableRow>
                                    ))}
                                    </TableBody>
                                    </Table>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </BodySection >
        <Formik
          enableReinitialize
          initialValues={
            isEditing
              ? site
              : {
                but: isEditing ? site?.but : "",
                objectifAnnuelId: isEditing ? site?.objectifAnnuelId : "",
              }
          }
          onSubmit={(value: any, action: any) => {
            handleSubmit(value);
            action.resetForm();
          }}
        >
          {(formikProps) => {
            return (
              <Form>
                <Dialog
                  open={open}
                  sx={styleDialog}
                >
                  <DialogContentText>{test}</DialogContentText>
                  <DialogActions>
                    <Stack direction={"row"} spacing={2}>
                      <Button onClick={() => setOpen(false)}>Annuler</Button>
                      <Button type="button" onClick={formikProps.submitForm}>Enregistrer</Button>
                    </Stack>
                  </DialogActions>
                </Dialog>
              </Form>
            )
          }}
        </Formik>
      </Container >

    </>
  );
};

export default ListSite;

// export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
// export const SectionNavigation = styled(Stack)(({ theme }) => ({}));

// export const BodySection = styled(Box)(({ }) => ({
//     borderRadius: 20,
//     backgroundColor: "white",
//     marginBlock: 16,
// }));
// const FormContainer = styled(Stack)(({ theme }) => ({
//     width: "100%",
//     marginBottom: theme.spacing(3),
//     padding: 30,
//     borderRadius: 20,
//     background: "#fff",
//     border: `1px solid ${theme.palette.grey[100]}`,
//     marginTop: 14,
// }));

// const NavigationContainer = styled(Stack)(({ theme }) => ({
//     flexDirection: "column",
//     marginBottom: theme.spacing(2),
//     flex: 1,
//     width: "100%",
// }));
const styleDialog = {
  position: "fixed",
  left: 50,
  top: 0
}

