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
import useFetchMissionLocationListe from "../../../../../previsionMissions/organism/Techniques/tableLieux/hooks/useFetchMissionLocationList";
import useFetchLieuxRapport from "../../../../../gereRapportDeMission/organism/Techniques/tableLieux/hooks/useFetchLieuxRapport";
import useFetchMissionaryList from "../../../../../previsionMissions/organism/Techniques/tableMissionnaires/hooks/useFetchMissionaryList";
import useFetchMissionaryRapportList from "../../../../../gereRapportDeMission/organism/Techniques/tableMissionnaires/hooks/useFetchMissionaryList";
import useFetchVehicleList from "../../../../../previsionMissions/organism/Techniques/tableAutreInfoAuto/hooks/useFetchVehicleList";
import useFetchAutreInfoRapport from "../../../../../gereRapportDeMission/organism/Techniques/tableAutreInfoAuto/hooks/useFetchAutreInfoRaport";
import useFetchContactListe from "../../../../../previsionMissions/organism/Techniques/tableContactPendantMission/hooks/useFetchContactList";
import useFetchContactMissionRapport from "../../../../../gereRapportDeMission/organism/Techniques/tableContactPendantMission/hooks/useFetchContactMissionRapport";
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
  const fetchMissionLocationListe = useFetchMissionLocationListe();
  const fetchLieuxRapport = useFetchLieuxRapport();
  const fetchMissionaryList = useFetchMissionaryList();
  const fetchMissionaryRapportList = useFetchMissionaryRapportList();
  const fetchVehicleListe = useFetchVehicleList();
  const fetchAutreInfoRapport = useFetchAutreInfoRapport();
  const fetchContactList = useFetchContactListe();
  const fetchContactMissionRapport = useFetchContactMissionRapport();
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
    fetchMissionLocationListe();
    fetchLieuxRapport();
    fetchMissionaryList();
    fetchMissionaryRapportList();
    fetchAutreInfoRapport();
    fetchVehicleListe();
    fetchContactList();
    fetchContactMissionRapport();
    fetchProgrammePrevision();
    fetchProgrammeRapport();
  }, [id]);

  const {
    percentageObjectif,
    percentageActivity,
    percentageAutreInfo,
    percentageContactPendantMission,
    percentageExceptedResult,
    percentageLivrable,
    percentageLocation,
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
      createData("Lieux : " + percentageLocation),
      createData("Missionnaires : " + percentageMissionary),
      createData("Autres informations importantes : " + percentageAutreInfo),
      createData(
        "Contacts pendant la mission : " + percentageContactPendantMission
      ),
      createData("Programmes : " + percentageProgramme),
    ],
    [
      percentageObjectif,
      percentageActivity,
      percentageAutreInfo,
      percentageContactPendantMission,
      percentageExceptedResult,
      percentageLivrable,
      percentageLocation,
      percentageMissionary,
      percentageProgramme,
    ]
  );

  return (
    <Box>
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
  const { missionLocationList } = useAppSelector(
    (state) => state.missionLocation
  );
  const { lieuxRapportlist } = useAppSelector((state) => state.lieuxRapport);
  const { missionaryList } = useAppSelector((state) => state.missionary);
  const { missionaireslist } = useAppSelector((state) => state.missionaires);
  const { vehicleList } = useAppSelector((state) => state.vehicle);
  const { autreInfoRapportList } = useAppSelector(
    (state) => state.autreInfoRapport
  );
  const { contactList } = useAppSelector((state) => state.contact);
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
    (item) => item.id === id
  );
  const filteredObjectifRapportlist = objectifRapportlist.filter(
    (item) => item.id === id
  );
  const filteredExceptedResultList = exceptedResultList.filter(
    (item) => item.id === id
  );
  const filteredResultatRapportlist = resultatRapportlist.filter(
    (item) => item.id === id
  );
  const filteredPlannedActivityList = plannedActivityList.filter(
    (item) => item.id === id
  );
  const filteredActiviteRapportlist = activiteRapportlist.filter(
    (item) => item.id === id
  );
  const filteredDeliverableList = deliverableList.filter(
    (item) => item.id === id
  );
  const filteredLivrableRapportlist = livrableRapportlist.filter(
    (item) => item.id === id
  );
  const filteredMissionLocationList = missionLocationList.filter(
    (item) => item.id === id
  );
  const filteredLieuxRapportlist = lieuxRapportlist.filter(
    (item) => item.id === id
  );
  const filteredMissionaryList = missionaryList.filter(
    (item) => item.id === id
  );
  const filteredMissionaireslist = missionaireslist.filter(
    (item) => item.id === id
  );
  const filteredVehicleList = vehicleList.filter((item) => item.id === id);
  const filteredAutreInfoRapportList = autreInfoRapportList.filter(
    (item) => item.id === id
  );
  const filteredContactList = contactList.filter((item) => item.id === id);
  const filteredMissionRapportList = missionRapportList.filter(
    (item) => item.id === id
  );
  const filteredProgrammePrevisionList = programmePrevisionList.filter(
    (item) => item.id === id
  );
  const filteredProgrammeRapportList = programmeRapportList.filter(
    (item) => item.id === id
  );

  // Calculer les pourcentages
  const percentageObjectif =
    (filteredObjectifRapportlist.length * 100) /
      filteredMissionGoalList.length || 0;
  const percentageExceptedResult =
    (filteredResultatRapportlist.length * 100) /
      filteredExceptedResultList.length || 0;
  const percentageActivity =
    (filteredActiviteRapportlist.length * 100) /
      filteredPlannedActivityList.length || 0;
  const percentageLivrable =
    (filteredLivrableRapportlist.length * 100) /
      filteredDeliverableList.length || 0;
  const percentageLocation =
    (filteredLieuxRapportlist.length * 100) /
      filteredMissionLocationList.length || 0;
  const percentageMissionary =
    (filteredMissionaireslist.length * 100) / filteredMissionaryList.length ||
    0;
  const percentageAutreInfo =
    (filteredAutreInfoRapportList.length * 100) / filteredVehicleList.length ||
    0;
  const percentageContactPendantMission =
    (filteredMissionRapportList.length * 100) / filteredContactList.length || 0;
  const percentageProgramme =
    (filteredProgrammeRapportList.length * 100) /
      filteredProgrammePrevisionList.length || 0;

  const percentageTechnique = useMemo(() => {
    const totalRapportList =
      filteredObjectifRapportlist.length +
      filteredResultatRapportlist.length +
      filteredActiviteRapportlist.length +
      filteredLivrableRapportlist.length +
      filteredLieuxRapportlist.length +
      filteredMissionaireslist.length +
      filteredAutreInfoRapportList.length +
      filteredMissionRapportList.length +
      filteredProgrammeRapportList.length;

    const totalPrevisionList =
      filteredMissionGoalList.length +
      filteredExceptedResultList.length +
      filteredPlannedActivityList.length +
      filteredDeliverableList.length +
      filteredMissionLocationList.length +
      filteredMissionaryList.length +
      filteredVehicleList.length +
      filteredContactList.length +
      filteredProgrammePrevisionList.length;

    return ((totalRapportList * 100) / totalPrevisionList).toFixed(2) || 0;
  }, [
    filteredObjectifRapportlist.length,
    filteredResultatRapportlist.length,
    filteredActiviteRapportlist.length,
    filteredLivrableRapportlist.length,
    filteredLieuxRapportlist.length,
    filteredMissionaireslist.length,
    filteredAutreInfoRapportList.length,
    filteredMissionRapportList.length,
    filteredProgrammeRapportList.length,
    filteredMissionGoalList.length,
    filteredExceptedResultList.length,
    filteredPlannedActivityList.length,
    filteredDeliverableList.length,
    filteredMissionLocationList.length,
    filteredMissionaryList.length,
    filteredVehicleList.length,
    filteredContactList.length,
    filteredProgrammePrevisionList.length,
  ]);

  return {
    percentageObjectif,
    percentageActivity,
    percentageAutreInfo,
    percentageContactPendantMission,
    percentageExceptedResult,
    percentageLivrable,
    percentageLocation,
    percentageMissionary,
    percentageTechnique,
    percentageProgramme,
  };
};
