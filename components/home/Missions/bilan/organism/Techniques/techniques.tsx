import React, { useMemo, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import { createData } from "./table/techniques.function";
import { columns } from "./table/techniques.constant";
import { useRouter } from "next/router";
import useFetchMissionGoalListe from "../../../../../previsionMissions/organism/Techniques/tableObjectif/hooks/useFetchObjectifList";
import { useAppSelector } from "../../../../../../hooks/reduxHooks";
import useFetchObjectifRapport from "../../../../../gereRapportDeMission/organism/Techniques/tableObjectif/hooks/useFetchObjectifRapport";
import useFetchExceptedResultList from "../../../../../previsionMissions/organism/Techniques/tableResultatAttendu/hooks/useFetchExceptedResultList";
import useFetchResultatRapport from "../../../../../gereRapportDeMission/organism/Techniques/tableResultatAttendu/hooks/useFetchResultatRapport";
import useFetchPlannedActivityList from "../../../../../previsionMissions/organism/Techniques/tableActivitésPrévues/hooks/useFetchPlannedActivityList";
import useFetchActiviteRapport from "../../../../../gereRapportDeMission/organism/Techniques/tableActivitésPrévues/hooks/useFetchActivityRapport";
import useFetchDeliverableList from "../../../../../previsionMissions/organism/Techniques/tableLivrables/hooks/useFetchDeliverableList";
import useFetchLivrableRapport from "../../../../../gereRapportDeMission/organism/Techniques/tableLivrables/hooks/useFetchLivrableRapport";
import useFetchMissionaryList from "../../../../../previsionMissions/organism/Techniques/tableMissionnaires/hooks/useFetchMissionaryList";
import useFetchMissionaryRapportList from "../../../../../gereRapportDeMission/organism/Techniques/tableMissionnaires/hooks/useFetchMissionaryList";
import useFetchProgrammePrevisionList from "../../../../../previsionMissions/organism/Techniques/tableProgramme/hooks/useFetchProgrammePrevision";
import useFetchProgrammeRapport from "../../../../../gereRapportDeMission/organism/Techniques/tableProgramme/hooks/useFetchProgrammeRapport";

const Techniques = () => {
  const router = useRouter();
  const { id } = router.query;

  // Fetch functions
  const fetchMissionGoalList = useFetchMissionGoalListe();
  const fetchObjectifRapport = useFetchObjectifRapport();
  const fetchExceptedResultListe = useFetchExceptedResultList();
  const fetchResultatRapport = useFetchResultatRapport();
  const fetchPlannedActivityListe = useFetchPlannedActivityList();
  const fetchActivityRapport = useFetchActiviteRapport();
  const fetchDeliverableListe = useFetchDeliverableList();
  const fetchLivrableRapport = useFetchLivrableRapport();
  const fetchMissionaryList = useFetchMissionaryList();
  const fetchMissionaryRapportList = useFetchMissionaryRapportList();
  const fetchProgrammePrevision = useFetchProgrammePrevisionList();
  const fetchProgrammeRapport = useFetchProgrammeRapport();

  useEffect(() => {
    fetchMissionGoalList();
    fetchObjectifRapport();
    fetchExceptedResultListe();
    fetchResultatRapport();
    fetchActivityRapport();
    fetchPlannedActivityListe();
    fetchLivrableRapport();
    fetchDeliverableListe();
    fetchMissionaryList();
    fetchMissionaryRapportList();
    fetchProgrammePrevision();
    fetchProgrammeRapport();
  }, [id]);

  const {
    percentageObjectif,
    percentageActivity,
    percentageExceptedResult,
    percentageLivrable,
    percentageMissionary,
    percentageTechnique,
    percentageProgramme,
  } = PourcentageTechnique();

  const rows = useMemo(
    () => [
      createData("Objectifs : " + percentageObjectif),
      createData("Resultats attendus : " + percentageExceptedResult),
      createData("Activités prévues : " + percentageActivity),
      createData("Livrables : " + percentageLivrable),
      createData("Missionnaires : " + percentageMissionary),
      createData("Programmes : " + percentageProgramme),
    ],
    [
      percentageObjectif,
      percentageActivity,
      percentageExceptedResult,
      percentageLivrable,
      percentageMissionary,
      percentageProgramme,
    ]
  );

  return (
    <Box paddingBottom={8}>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow hover tabIndex={-1}>
              <TableCell colSpan={3}>
                Comparaison des prévisions techniques par rapport aux rapport de
                mission
              </TableCell>
            </TableRow>
            {rows.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.technique}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === "number"
                        ? column.format(value)
                        : value}{" "}
                      %
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Techniques;

export const PourcentageTechnique = () => {
  const fetchObjectifRapport = useFetchObjectifRapport();
  useEffect(() => {
    fetchObjectifRapport();
  }, []);

  const router = useRouter();
  const { id } = router.query;

  const { missionGoalList } = useAppSelector((state) => state.missionGoal);
  const { objectifRapportlist } = useAppSelector(
    (state) => state.objectifRapport
  );
  const { exceptedResultList } = useAppSelector(
    (state) => state.exceptedResult
  );
  const { resultatRapportlist } = useAppSelector(
    (state) => state.resultatRapport
  );
  const { plannedActivityList } = useAppSelector(
    (state) => state.plannedActivity
  );
  const { activiteRapportlist } = useAppSelector(
    (state) => state.activiteRapport
  );
  const { deliverableList } = useAppSelector((state) => state.deliverable);
  const { livrableRapportlist } = useAppSelector(
    (state) => state.livrableRapport
  );

  const { missionaryList } = useAppSelector((state) => state.missionary);
  const { missionaireslist } = useAppSelector((state) => state.missionaires);
  const { missionRapportList } = useAppSelector(
    (state) => state.missionRapport
  );
  const { programmePrevisionList } = useAppSelector(
    (state) => state.programmePrevision
  );
  const { programmeRapportList } = useAppSelector(
    (state) => state.programmeRapport
  );

  // Filtrer les listes par ID
  const filteredMissionGoalList = missionGoalList.filter(
    (item) => item.missionId === id
  );
  const filteredObjectifRapportlist = objectifRapportlist.filter(
    (item) => item.missionId === id
  );
  const filteredExceptedResultList = exceptedResultList.filter(
    (item) => item.missionId === id
  );
  const filteredResultatRapportlist = resultatRapportlist.filter(
    (item) => item.missionId === id
  );
  const filteredPlannedActivityList = plannedActivityList.filter(
    (item) => item.missionId === id
  );
  const filteredActiviteRapportlist = activiteRapportlist.filter(
    (item) => item.missionId === id
  );
  const filteredDeliverableList = deliverableList.filter(
    (item) => item.missionId === id
  );
  const filteredLivrableRapportlist = livrableRapportlist.filter(
    (item) => item.missionId === id
  );

  const filteredMissionaryList = missionaryList.filter(
    (item) => item.missionId === id
  );
  const filteredMissionaireslist = missionaireslist.filter(
    (item) => item.missionId === id
  );
  const filteredMissionRapportList = missionRapportList.filter(
    (item) => item.missionId === id
  );
  const filteredProgrammePrevisionList = programmePrevisionList.filter(
    (item) => item.missionId === id
  );
  const filteredProgrammeRapportList = programmeRapportList.filter(
    (item) => item.missionId === id
  );

  // Calculer les pourcentages
  const percentageObjectif =
    filteredMissionGoalList.length !== 0
      ? (filteredObjectifRapportlist.length * 100) /
        filteredMissionGoalList.length
      : 0;

  const percentageExceptedResult =
    filteredExceptedResultList.length !== 0
      ? (filteredResultatRapportlist.length * 100) /
        filteredExceptedResultList.length
      : 0;

  const percentageActivity =
    filteredPlannedActivityList.length !== 0
      ? (filteredActiviteRapportlist.length * 100) /
        filteredPlannedActivityList.length
      : 0;

  const percentageLivrable =
    filteredDeliverableList.length !== 0
      ? (filteredLivrableRapportlist.length * 100) /
        filteredDeliverableList.length
      : 0;

  const percentageMissionary =
    filteredMissionaryList.length !== 0
      ? (filteredMissionaireslist.length * 100) / filteredMissionaryList.length
      : 0;

  const percentageProgramme =
    filteredProgrammePrevisionList.length !== 0
      ? (filteredProgrammeRapportList.length * 100) /
        filteredProgrammePrevisionList.length
      : 0;

  const percentageTechnique = useMemo(() => {
    const totalPrevisionList =
      filteredMissionGoalList.length +
      filteredExceptedResultList.length +
      filteredPlannedActivityList.length +
      filteredDeliverableList.length +
      filteredMissionaryList.length +
      filteredProgrammePrevisionList.length;

    const totalRapportList =
      filteredObjectifRapportlist.length +
      filteredResultatRapportlist.length +
      filteredActiviteRapportlist.length +
      filteredLivrableRapportlist.length +
      filteredMissionaireslist.length +
      filteredMissionRapportList.length +
      filteredProgrammeRapportList.length;

    return totalPrevisionList !== 0
      ? ((totalRapportList * 100) / totalPrevisionList).toFixed(2)
      : 0;
  }, [
    filteredObjectifRapportlist.length,
    filteredResultatRapportlist.length,
    filteredActiviteRapportlist.length,
    filteredLivrableRapportlist.length,
    filteredMissionaireslist.length,
    filteredMissionRapportList.length,
    filteredProgrammeRapportList.length,
    filteredMissionGoalList.length,
    filteredExceptedResultList.length,
    filteredPlannedActivityList.length,
    filteredDeliverableList.length,
    filteredMissionaryList.length,
    filteredProgrammePrevisionList.length,
  ]);

  return {
    percentageObjectif,
    percentageActivity,
    percentageExceptedResult,
    percentageLivrable,
    percentageMissionary,
    percentageTechnique,
    percentageProgramme,
  };
};
