import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Container, MenuItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import useFetchObjectifsAnnuel from "./hooks/useFetchObjectifAnnuel";
import React, { Fragment, useState } from "react";
import useFetchSite from "../../../configurations/site/hooks/useFetchSite";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import useFetchPlanTravaile from "../../hooks/useFetchPlanTravail";
import useFetchTacheEtObjectifs from "../tachesEtObjectifs/hooks/useFetchTacheEtObjectifs";
import { enqueueSnackbar } from "../../../../redux/features/notification/notificationSlice";
import { axios } from "../../../../axios";
import { SectionNavigation } from "../../objectifStrategique";
import { BodySection } from "../tachesEtObjectifs/ListTacheEtObjectifs";
import { PlanTravailItem } from "../../../../redux/features/planTravail/planTravail.interface";
import Add from "@mui/icons-material/Add";

const ListSite = () => {
  const router = useRouter()
  const { id }: any = router.query;
  const fetchObjectifAnnuel = useFetchObjectifsAnnuel();
  const fetchSite = useFetchSite();
  const { sitelist, isEditing, site } = useAppSelector((state) => state.site);
  const dispatch: any = useAppDispatch();
  const fetchObjectStrategique = useFetchPlanTravaile();
  const { planTravaillist } = useAppSelector((state) => state.planTravail);
  const fetchTacheCle: any = useFetchTacheEtObjectifs()
  const [filtre, setFiltre] = useState<number | "">("")

  React.useEffect(() => {
    fetchObjectifAnnuel();
    fetchSite();
    fetchObjectStrategique();
    fetchTacheCle();
  }, [router.query])


  const handleChange = async (siteId: string, objectifAnnuelId: string, note: number) => {
    try {
      await axios.post("/suivi-evaluation/note", {
        siteId, objectifAnnuelId, note
      })
      dispatch(
        enqueueSnackbar({
          message: "Note created successfully",
          options: { variant: "success" },
        })
      )

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Container maxWidth="xl">
        <SectionNavigation direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent="space-between"
          sx={{ mb: 2 }}>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Link href={`/plan_travail/${id}/tachesEtObjectifs`}>
              <Button color="info" variant="text" startIcon={<ArrowBack />}>
                Retour
              </Button>
            </Link>
            <Link href={`/plan_travail/${id}/resume`}>
              <Button color="primary" variant="text" startIcon={<Add />}>
                Résumé des sites
              </Button>
            </Link>
            <TextField label="Année" size="small" sx={{ width: 100 }} select onChange={(e) => setFiltre(e.target.value === "" ? "" : parseInt(e.target.value))}>
              <MenuItem value="">Tous</MenuItem>
              {Array.from(new Set(planTravaillist.flatMap(p => p.TacheCle!.flatMap(t => t.objectifAnnuel!.map(o => o.year))))).map(y => (
                <MenuItem value={y}>
                  {y}
                </MenuItem>
              ))}
            </TextField>
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
                            <TableCell sx={{ minWidth: 250, maxWidth: 250, paddingLeft: 1 }}>
                              {filtre} Targets
                            </TableCell>
                            {sitelist.map(s => (
                              <TableCell key={s.id} sx={{ minWidth: 150, maxWidth: 150 }} align="center">{s.lieu}</TableCell>
                            ))}

                          </TableRow>
                        </TableHead>
                      </Table>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {planTravaillist.map((plan: PlanTravailItem, yearIndex: any) => (
                      <Fragment key={yearIndex}>
                        <TableRow >
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
                                          {t.objectifAnnuel?.filter(o => typeof filtre === "number" ? o.year === filtre : o).map(o => (
                                            <TableRow key={o.id}>
                                              <TableCell sx={{ minWidth: 250, maxWidth: 250 }}>{o.objectiveTitle}</TableCell>
                                              {sitelist.map(s => (
                                                <TableCell key={s.id} sx={{ minWidth: 150, maxWidth: 150 }}>
                                                  <TextField
                                                    defaultValue={o.notes?.find(n => n.siteId === s.id) ? o.notes!.find(n => n.siteId === s.id)!.note : ""}
                                                    select
                                                    sx={{ width: 140, textAlign: "center" }}
                                                    onChange={(e) => handleChange(s.id!, o.id!, parseInt(e.target.value))}
                                                  >
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
                        {/* <TableRow>
                      <TableCell align="center">
                        Sous-total 
                      </TableCell>
                      <TableCell>
                        <Table>
                          <TableBody>
                              <TableRow>
                                <TableCell sx={{ minWidth: 70, maxWidth: 70 }}>
                                  
                                </TableCell>
                                <TableCell sx={{ minWidth: 250, maxWidth: 250 }}>
                                  
                                </TableCell>
                                <TableCell>
                                  <Table>
                                    <TableBody>
                                        <TableRow>
                                          <TableCell sx={{ minWidth: 250, maxWidth: 250 }}></TableCell>
                                          {sitelist.map(s => (
                                            <TableCell key={s.id} sx={{ minWidth: 150, maxWidth: 150}} align="center">
                                              {plan.TacheCle?.reduce(
                                                (acc, curr)=> acc + curr.objectifAnnuel!.filter(o=>typeof filtre === "number" ? o.year === filtre : o).reduce(
                                                  (ac, cur)=> ac + cur.notes!.filter(n=>n.siteId === s.id).reduce(
                                                    (a, c)=> a + c.note!, 0), 0), 0)}
                                            </TableCell>
                                          ))}
                                        </TableRow>
                                    </TableBody>
                                  </Table>
                                </TableCell>
                              </TableRow>
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow> */}
                      </Fragment>
                    ))}

                  </TableBody>
                  {/* <TableHead>
                  <TableRow>
                      <TableCell align="center">
                        Total
                      </TableCell>
                      <TableCell>
                        <Table>
                          <TableBody>
                              <TableRow>
                                <TableCell sx={{ minWidth: 70, maxWidth: 70 }}>
                                  
                                </TableCell>
                                <TableCell sx={{ minWidth: 250, maxWidth: 250 }}>
                                  
                                </TableCell>
                                <TableCell>
                                  <Table>
                                    <TableHead>
                                        <TableRow>
                                          <TableCell sx={{ minWidth: 250, maxWidth: 250 }}></TableCell>
                                          {sitelist.map(s => (
                                            <TableCell key={s.id} sx={{ minWidth: 150, maxWidth: 150}} align="center">
                                             {
                                               planTravaillist.reduce((accc, plan) =>accc + plan.TacheCle!.reduce(
                                                (acc, curr)=> acc + curr.objectifAnnuel!.filter(o=>typeof filtre === "number" ? o.year === filtre : o).reduce(
                                                  (ac, cur)=> ac + cur.notes!.filter(n=>n.siteId === s.id).reduce(
                                                    (a, c)=> a + c.note!, 0), 0), 0), 0)
                                             }
                                            </TableCell>
                                          ))}
                                        </TableRow>
                                    </TableHead>
                                  </Table>
                                </TableCell>
                              </TableRow>
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                  </TableHead> */}
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </BodySection>
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

