import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import useFetchObjectifsAnnuel from "../organanisme/site/hooks/useFetchObjectifAnnuel";
import useFetchSite from "../../configurations/site/hooks/useFetchSite";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useFetchPlanTravaile from "../hooks/useFetchPlanTravail";
import useFetchTacheEtObjectifs from "../organanisme/tachesEtObjectifs/hooks/useFetchTacheEtObjectifs";
import { axios } from "../../../axios";
import { enqueueSnackbar } from "../../../redux/features/notification/notificationSlice";
import { SectionNavigation } from "../objectifStrategique";
import { BodySection } from "../../gereRapportDeMission/GereRapportDeMission";
import { PlanTravailItem } from "../../../redux/features/planTravail/planTravail.interface";

const ListResume = () => {
  const router = useRouter();
  const { id }: any = router.query;
  const fetchObjectifAnnuel = useFetchObjectifsAnnuel();
  const fetchSite = useFetchSite();
  const { sitelist, isEditing, site } = useAppSelector((state) => state.site);
  const dispatch: any = useAppDispatch();
  const fetchObjectStrategique = useFetchPlanTravaile();
  const { planTravaillist } = useAppSelector((state) => state.planTravail);
  const fetchTacheCle: any = useFetchTacheEtObjectifs();
  const [filtre, setFiltre] = useState<number | "">("");

  React.useEffect(() => {
    fetchObjectifAnnuel();
    fetchSite();
    fetchObjectStrategique();
    fetchTacheCle();
  }, [router.query]);

  const handleChange = async (
    siteId: string,
    objectifAnnuelId: string,
    note: number
  ) => {
    try {
      await axios.post("/suivi-evaluation/note", {
        siteId,
        objectifAnnuelId,
        note,
      });
      dispatch(
        enqueueSnackbar({
          message: "Note créé avec succès",
          options: { variant: "success" },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container maxWidth="xl">
        <SectionNavigation
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Link href={`/plan_travail`}>
              <Button color="info" variant="text" startIcon={<ArrowBack />}>
                Retour
              </Button>
            </Link>
            <TextField
              label="Année"
              size="small"
              sx={{ width: 100 }}
              select
              onChange={(e) =>
                setFiltre(e.target.value === "" ? "" : parseInt(e.target.value))
              }
            >
              <MenuItem value="">Tous</MenuItem>
              {Array.from(
                new Set(
                  planTravaillist.flatMap((p) =>
                    p.TacheCle!.flatMap((t) =>
                      t.objectifAnnuel!.map((o) => o.year)
                    )
                  )
                )
              ).map((y) => (
                <MenuItem value={y}>{y}</MenuItem>
              ))}
            </TextField>
            {/* <Link href={`/plan_travail/${id}/resume`}>
            <Button color="info" variant="text" startIcon={<Add />}>
                Résumé des sites
              </Button>
            </Link> */}
          </Stack>
          <Typography variant="h4" color="GrayText">
            Liste résumé des sites
          </Typography>
        </SectionNavigation>
        <BodySection
          sx={{
            height: "calc(100vh - 230px)",
            overflow: "auto",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <TableContainer>
                <Table sx={{ padding: 2 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ minWidth: 200, minHeight: 200 }}>
                        Goals
                      </TableCell>
                      <Table>
                        <TableHead>
                          <TableRow>
                            {/* <TableCell
                              sx={{
                                minWidth: 100,
                                maxWidth: 100,
                                paddingLeft: 4,
                              }}
                            >
                              S/N
                            </TableCell>
                            <TableCell
                              sx={{
                                minWidth: 250,
                                maxWidth: 250,
                                paddingLeft: 1,
                              }}
                            >
                              Key Tasks
                            </TableCell>
                            <TableCell
                              sx={{ minWidth: 250, maxWidth: 250 }}
                              align="center"
                            >
                              {filtre} Targets
                            </TableCell> */}
                            {sitelist.map((s) => (
                              <TableCell
                                key={s.id}
                                sx={{
                                  minWidth: 150,
                                  maxWidth: 150,
                                  paddingLeft: 8,
                                }}
                              >
                                {s.lieu}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                      </Table>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {planTravaillist.map(
                      (plan: PlanTravailItem, yearIndex: any) => (
                        <Fragment key={yearIndex}>
                          <TableRow>
                            <TableCell sx={{ minWidth: 200, minHeight: 200 }}>
                              {plan.description}
                            </TableCell>
                            <TableCell>
                              <Table>
                                <TableBody>
                                  {plan.TacheCle?.map((t) => (
                                    <TableRow key={t.id}>
                                      {/* <TableCell
                                        sx={{ minWidth: 70, maxWidth: 70 }}
                                      >
                                        {t.sn}
                                      </TableCell>
                                      <TableCell
                                        sx={{ minWidth: 250, maxWidth: 250 }}
                                      >
                                        {t.keyTasks}
                                      </TableCell> */}
                                      <TableCell>
                                        <Table>
                                          <TableBody>
                                            {t.objectifAnnuel
                                              ?.filter((o) =>
                                                typeof filtre === "number"
                                                  ? o.year === filtre
                                                  : o
                                              )
                                              .map((o) => (
                                                <TableRow key={o.id}>
                                                  {/* <TableCell
                                                    sx={{
                                                      minWidth: 250,
                                                      maxWidth: 250,
                                                    }}
                                                    align="center"
                                                  >
                                                    {o.objectiveTitle}
                                                  </TableCell> */}
                                                  {sitelist.map((s) => (
                                                    <TableCell
                                                      key={s.id}
                                                      sx={{
                                                        minWidth: 150,
                                                        maxWidth: 150,
                                                      }}
                                                      align="center"
                                                    >
                                                      {o.notes?.find(
                                                        (n) => n.siteId === s.id
                                                      )
                                                        ? o.notes!.find(
                                                            (n) =>
                                                              n.siteId === s.id
                                                          )!.note
                                                        : ""}
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
                          <TableRow>
                            <TableCell align="left">Sous-total</TableCell>
                            <TableCell>
                              <Table>
                                <TableBody>
                                  <TableRow>
                                    {/* <TableCell
                                      sx={{ minWidth: 70, maxWidth: 70 }}
                                    ></TableCell>
                                    <TableCell
                                      sx={{ minWidth: 250, maxWidth: 250 }}
                                    ></TableCell> */}
                                    <TableCell>
                                      <Table>
                                        <TableBody>
                                          <TableRow>
                                            {/* <TableCell
                                              sx={{
                                                minWidth: 250,
                                                maxWidth: 250,
                                              }}
                                            ></TableCell> */}
                                            {sitelist.map((s) => (
                                              <TableCell
                                                key={s.id}
                                                sx={{
                                                  minWidth: 150,
                                                  maxWidth: 150,
                                                }}
                                                align="center"
                                              >
                                                {plan.TacheCle?.reduce(
                                                  (acc, curr) =>
                                                    acc +
                                                    curr
                                                      .objectifAnnuel!.filter(
                                                        (o) =>
                                                          typeof filtre ===
                                                          "number"
                                                            ? o.year === filtre
                                                            : o
                                                      )
                                                      .reduce(
                                                        (ac, cur) =>
                                                          ac +
                                                          cur
                                                            .notes!.filter(
                                                              (n) =>
                                                                n.siteId ===
                                                                s.id
                                                            )
                                                            .reduce(
                                                              (a, c) =>
                                                                a + c.note!,
                                                              0
                                                            ),
                                                        0
                                                      ),
                                                  0
                                                )}
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
                          </TableRow>
                        </Fragment>
                      )
                    )}
                  </TableBody>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">TOTAUX</TableCell>
                      <TableCell>
                        <Table>
                          <TableBody>
                            <TableRow>
                              {/* <TableCell
                                sx={{ minWidth: 70, maxWidth: 70 }}
                              ></TableCell>
                              <TableCell
                                sx={{ minWidth: 250, maxWidth: 250 }}
                              ></TableCell> */}
                              <TableCell>
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      {/* <TableCell
                                        sx={{ minWidth: 250, maxWidth: 250 }}
                                      ></TableCell> */}
                                      {sitelist.map((s) => (
                                        <TableCell
                                          key={s.id}
                                          sx={{ minWidth: 150, maxWidth: 150 }}
                                          align="center"
                                        >
                                          {planTravaillist.reduce(
                                            (accc, plan) =>
                                              accc +
                                              plan.TacheCle!.reduce(
                                                (acc, curr) =>
                                                  acc +
                                                  curr
                                                    .objectifAnnuel!.filter(
                                                      (o) =>
                                                        typeof filtre ===
                                                        "number"
                                                          ? o.year === filtre
                                                          : o
                                                    )
                                                    .reduce(
                                                      (ac, cur) =>
                                                        ac +
                                                        cur
                                                          .notes!.filter(
                                                            (n) =>
                                                              n.siteId === s.id
                                                          )
                                                          .reduce(
                                                            (a, c) =>
                                                              a + c.note!,
                                                            0
                                                          ),
                                                      0
                                                    ),
                                                0
                                              ),
                                            0
                                          )}
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
                  </TableHead>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </BodySection>
      </Container>
    </>
  );
};

export default ListResume;
const styleDialog = {
  position: "fixed",
  left: 50,
  top: 0,
};
