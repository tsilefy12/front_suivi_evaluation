import { ArrowBack, Add, Download } from "@mui/icons-material";
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
import React, { Fragment, useState, useEffect } from "react";
import useFetchSite from "../../../configurations/site/hooks/useFetchSite";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import useFetchPlanTravail from "../../hooks/useFetchPlanTravail";
import useFetchTacheEtObjectifs from "../tachesEtObjectifs/hooks/useFetchTacheEtObjectifs";
import { enqueueSnackbar } from "../../../../redux/features/notification/notificationSlice";
import styled from "@emotion/styled";
import { SectionNavigation as OriginalSectionNavigation } from "../../objectifStrategique";
import { BodySection as OriginalBodySection } from "../tachesEtObjectifs/ListTacheEtObjectifs";
import { PlanTravailItem } from "../../../../redux/features/planTravail/planTravail.interface";
import useFetchObjectifsAnnuel from "./hooks/useFetchObjectifAnnuel";
import { axios } from "../../../../axios";
import * as XLSX from "xlsx";

const ListSite = () => {
  const router = useRouter();
  const { id }: any = router.query;
  const fetchObjectifAnnuel = useFetchObjectifsAnnuel();
  const fetchSite = useFetchSite();
  const { sitelist, isEditing, site } = useAppSelector((state) => state.site);
  const dispatch: any = useAppDispatch();
  const fetchObjectStrategique = useFetchPlanTravail();
  const { planTravaillist } = useAppSelector((state) => state.planTravail);
  const fetchTacheCle: any = useFetchTacheEtObjectifs();
  const [filtre, setFiltre] = useState<number | "">("");

  useEffect(() => {
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
  const prepareExportData = () => {
    const data: any[] = [];
    planTravaillist
      .filter((f) => f.id == id)
      .forEach((plan: PlanTravailItem) => {
        const planData =
          plan.TacheCle?.flatMap((t) =>
            t.objectifAnnuel
              ?.filter((o) =>
                typeof filtre === "number" ? o.year === filtre : o
              )
              .map((o) => {
                return {
                  Goals: plan.description!,
                  SN: t.sn,
                  KeyTasks: t.keyTasks,
                  Targets: o.objectiveTitle,
                  Indicateur: o.indicateur,
                  Prévision: o.prevision,
                  Réalisation: o.realisation,
                  ...sitelist.reduce((acc: any, s: any) => {
                    acc[s.lieu] =
                      o.notes?.find((n) => n.siteId === s.id)?.note || 0;
                    return acc;
                  }, {} as Record<string, number>),
                };
              })
          ) || [];

        data.push(...planData);
        const subTotal = sitelist.reduce((acc: any, s: any) => {
          acc[s.lieu] = planData.reduce(
            (sum, item) =>
              sum + (typeof item[s.lieu] === "number" ? item[s.lieu] : 0),
            0
          );
          return acc;
        }, {} as Record<string, number>);

        data.push({
          Goals: "Sous-total",
          SN: "",
          KeyTasks: "",
          Targets: "",
          Indicateur: "",
          Prévision: "",
          Réalisation: "",
          ...subTotal,
        });
      });
    data.push({
      Goals: "",
      SN: "",
      KeyTasks: "",
      Targets: "",
      Indicateur: "",
      Prévision: "",
      Réalisation: "",
      ...sitelist.reduce((acc: any, s: any) => {
        acc[s.lieu] = "";
        return acc;
      }, {} as Record<string, number>),
    });

    return data;
  };

  const exportToExcel = (data: any[], fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(data, {
      header: [
        "Goals",
        "SN",
        "KeyTasks",
        "Targets",
        "Indicateur",
        "Prévision",
        "Réalisation",
        ...sitelist.map((s) => s.lieu || ""),
      ],
    });
    const headerRow = [
      "Goals",
      "SN",
      "KeyTasks",
      "Targets",
      "Indicateur",
      "Prévision",
      "Réalisation",
      ...sitelist.map((s) => s.lieu),
    ];
    ws["!rows"] = headerRow.map((_, index) => ({ hpt: 30, wpx: 100 }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, fileName);
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
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Link href={`/plan_travail`}>
                <Button color="info" variant="text" startIcon={<ArrowBack />}>
                  Retour
                </Button>
              </Link>
            </Stack>
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
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </TextField>
            <Button
              color="primary"
              variant="contained"
              onClick={() =>
                exportToExcel(
                  prepareExportData(),
                  `Sites_${filtre || "tous"}.xlsx`
                )
              }
              startIcon={<Download />}
            >
              Excel
            </Button>
          </Stack>
          <Typography variant="h4" color="GrayText">
            Liste des sites
          </Typography>
        </SectionNavigation>
        <BodySection
          sx={{
            overflow: "auto",
            height: "calc(100vh - 250px)",
            width: "calc(100%)",
          }}
        >
          <Box>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <TableContainer sx={{ overflow: "auto" }}>
                <Table sx={{ padding: 2, overflow: "auto", height: "50%" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ minWidth: 300, maxWidth: 300 }}>
                        Goals
                      </TableCell>
                      <TableCell
                        sx={{ minWidth: 100, maxWidth: 100, paddingLeft: 4 }}
                      >
                        S/N
                      </TableCell>
                      <TableCell
                        sx={{ minWidth: 250, maxWidth: 250, paddingLeft: 1 }}
                      >
                        Key Tasks
                      </TableCell>
                      <TableCell>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell
                                sx={{ minWidth: 150, maxWidth: 150 }}
                                align="left"
                              >
                                Targets
                              </TableCell>
                              <TableCell
                                sx={{ minWidth: 150, maxWidth: 150 }}
                                align="left"
                              >
                                Indicateur
                              </TableCell>
                              <TableCell
                                sx={{ minWidth: 150, maxWidth: 150 }}
                                align="left"
                              >
                                Prévision
                              </TableCell>
                              <TableCell
                                sx={{ minWidth: 150, maxWidth: 150 }}
                                align="left"
                              >
                                Réalisation
                              </TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                      </TableCell>
                      {sitelist.map((s) => (
                        <TableCell
                          key={s.id}
                          sx={{ minWidth: 150, maxWidth: 150 }}
                          align="left"
                        >
                          {s.lieu}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {planTravaillist
                      .filter((f) => f.id == id)
                      .map((plan: PlanTravailItem, yearIndex: any) => (
                        <Fragment key={yearIndex}>
                          <TableRow>
                            <TableCell
                              align="left"
                              sx={{ minWidth: 300, maxWidth: 300 }}
                            >
                              {plan.description}
                            </TableCell>
                            <TableCell colSpan={sitelist.length + 3}>
                              <Table>
                                <TableBody>
                                  {plan.TacheCle?.map((t) => (
                                    <TableRow key={t.id}>
                                      <TableCell
                                        sx={{ minWidth: 70, maxWidth: 70 }}
                                      >
                                        {t.sn}
                                      </TableCell>
                                      <TableCell
                                        sx={{ minWidth: 250, maxWidth: 250 }}
                                      >
                                        {t.keyTasks}
                                      </TableCell>
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
                                                  <TableCell
                                                    sx={{
                                                      minWidth: 150,
                                                      maxWidth: 150,
                                                      paddingLeft: 2,
                                                    }}
                                                  >
                                                    {o.objectiveTitle}
                                                  </TableCell>
                                                  <TableCell
                                                    sx={{
                                                      minWidth: 150,
                                                      maxWidth: 150,
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    {o.indicateur || ""}
                                                  </TableCell>
                                                  <TableCell
                                                    sx={{
                                                      minWidth: 150,
                                                      maxWidth: 150,
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    {o.prevision || ""}
                                                  </TableCell>
                                                  <TableCell
                                                    sx={{
                                                      minWidth: 150,
                                                      maxWidth: 150,
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    {o.realisation || ""}
                                                  </TableCell>
                                                  {sitelist.map((s) => (
                                                    <TableCell
                                                      key={s.id}
                                                      sx={{
                                                        minWidth: 150,
                                                        maxWidth: 150,
                                                        paddingLeft: 4,
                                                      }}
                                                    >
                                                      <TextField
                                                        defaultValue={
                                                          o.notes?.find(
                                                            (n) =>
                                                              n.siteId === s.id
                                                          )
                                                            ? o.notes!.find(
                                                                (n) =>
                                                                  n.siteId ===
                                                                  s.id
                                                              )!.note
                                                            : ""
                                                        }
                                                        select
                                                        sx={{
                                                          width: 140,
                                                          textAlign: "center",
                                                        }}
                                                        onChange={(e) =>
                                                          handleChange(
                                                            s.id!,
                                                            o.id!,
                                                            parseInt(
                                                              e.target.value
                                                            )
                                                          )
                                                        }
                                                        disabled={
                                                          plan.clotures &&
                                                          plan.clotures
                                                            .map(
                                                              (c) =>
                                                                c.planTravaileId
                                                            )
                                                            .includes(plan.id)
                                                        }
                                                      >
                                                        <MenuItem value={0}>
                                                          0
                                                        </MenuItem>
                                                        <MenuItem value={1}>
                                                          1
                                                        </MenuItem>
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
                          <TableRow>
                            <TableCell
                              align="left"
                              sx={{ minWidth: 300, maxWidth: 300 }}
                            >
                              Sous-total
                            </TableCell>
                            <TableCell colSpan={sitelist.length + 3}>
                              <Table>
                                <TableBody>
                                  <TableRow>
                                    <TableCell
                                      sx={{ minWidth: 70, maxWidth: 70 }}
                                    ></TableCell>
                                    <TableCell
                                      sx={{ minWidth: 250, maxWidth: 250 }}
                                    ></TableCell>
                                    <TableCell
                                      sx={{ minWidth: 250, maxWidth: 250 }}
                                    ></TableCell>
                                    <TableCell>
                                      <Table>
                                        <TableBody>
                                          <TableRow>
                                            <TableCell
                                              sx={{
                                                minWidth: 250,
                                                maxWidth: 250,
                                              }}
                                            ></TableCell>
                                            <TableCell
                                              sx={{
                                                minWidth: 150,
                                                maxWidth: 150,
                                              }}
                                            ></TableCell>
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
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </BodySection>
      </Container>
    </>
  );
};

export default ListSite;
const SectionNavigation = styled(OriginalSectionNavigation)(
  ({ theme }) => ({})
);
const BodySection = styled(OriginalBodySection)(({}) => ({
  borderRadius: 20,
  backgroundColor: "white",
  marginBlock: 16,
}));

const FormContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  marginBottom: 3,
  padding: 30,
  borderRadius: 20,
  background: "#fff",
  border: "1px solid gray",
  marginTop: 14,
}));

const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: 2,
  flex: 1,
  width: "100%",
}));

const styleDialog = {
  position: "fixed",
  left: 50,
  top: 0,
};
