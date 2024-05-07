import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Box, FormLabel } from "@mui/material";
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
  const router = useRouter()
  //objectif
  const { missionGoalList } = useAppSelector((state: any) => state.missionGoal);
  const fetchMissionGoalList = useFetchMissionGoalListe();
  const fetchObjectifRapport = useFetchObjectifRapport();
  const { objectifRapportlist } = useAppSelector((state: any) => state.objectifRapport);

  //resultat
  const { exceptedResultList } = useAppSelector((state) => state.exceptedResult);
  const fetchExceptedResultListe = useFetchExceptedResultList();
  const fetchResultatRapport = useFetchResultatRapport();
  const { resultatRapportlist } = useAppSelector((state) => state.resultatRapport);

  //activity
  const { plannedActivityList } = useAppSelector((state) => state.plannedActivity);
  const fetchPlannedActivityListe = useFetchPlannedActivityList();
  const fetchActivityRapport = useFetchActiviteRapport();
  const { activiteRapportlist } = useAppSelector((state: any) => state.activiteRapport);

  //livrable
  const { deliverableList } = useAppSelector((state) => state.deliverable);
  const fetchDeliverableListe = useFetchDeliverableList();
  const fetchLivrableRapport = useFetchLivrableRapport();
  const { livrableRapportlist } = useAppSelector((state: any) => state.livrableRapport);

  //lieux
  const { missionLocationList } = useAppSelector((state: any) => state.missionLocation);
  const fetchMissionLocationListe = useFetchMissionLocationListe();
  const fetchLieuxRapport = useFetchLieuxRapport();
  const { lieuxRapportlist } = useAppSelector((state: any) => state.lieuxRapport);

  //missionaire
  const { missionaryList } = useAppSelector((state) => state.missionary);
  const fetchMissionaryList = useFetchMissionaryList();
  const fetchMissionaryRapportList = useFetchMissionaryRapportList();
  const { missionaireslist } = useAppSelector((state: any) => state.missionaires);

  //autre information importante
  const { vehicleList } = useAppSelector((state) => state.vehicle);
  const fetchVehicleListe = useFetchVehicleList();
  const fetchAutreInfoRapport = useFetchAutreInfoRapport();
  const { autreInfoRapportList } = useAppSelector((state: any) => state.autreInfoRapport);

  //contact pendant la mission
  const { contactList } = useAppSelector((state) => state.contact);
  const fetchContactList = useFetchContactListe();
  const fetchContactMissionRapport = useFetchContactMissionRapport();
  const { missionRapportList } = useAppSelector((state: any) => state.missionRapport);

  //programme
  const fetchProgrammePrevision = useFetchProgrammePrevisionList();
  const { programmePrevisionList } = useAppSelector((state: any) => state.programmePrevision);
  const { programmeRapportList } = useAppSelector((state: any) => state.programmeRapport);
  const fetchProgrammeRapport = useFetchProgrammeRapport();

 React.useEffect(() =>{
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
  fetchMissionaryList()
  fetchMissionaryRapportList();
  fetchAutreInfoRapport();
  fetchVehicleListe();
  fetchContactList();
  fetchContactMissionRapport();
  fetchProgrammePrevision();
  fetchProgrammeRapport();
 }, [router.query])
 const percentageObjectif = (objectifRapportlist.length * 100) / missionGoalList.length;
 const percentageExceptedResult = (resultatRapportlist.length * 100) / exceptedResultList.length;
 const percentageActivity = (activiteRapportlist.length * 100) / plannedActivityList.length;
 const percentageLivrable = (livrableRapportlist.length * 100) / deliverableList.length;
 const percentageLocation = (lieuxRapportlist.length * 100) / missionLocationList.length;
 const percentageMissionary = (missionaireslist.length * 100) / missionaryList.length;
 const percentageAutreInfo = (autreInfoRapportList.length * 100) / vehicleList.length;
 const percentageContactPendantMission = (missionRapportList.length * 100) / contactList.length;
 const percentageProgramme = (programmeRapportList.length * 100) / programmePrevisionList.length;

  const rows = [
    createData("Objectifs : "+percentageObjectif),
    createData("Resultats attendus : "+percentageExceptedResult),
    createData("Activités prévues : "+percentageActivity),
    createData("Livrables : "+percentageLivrable),
    createData("Lieux : "+percentageLocation),
    createData("Missionnaires : "+percentageMissionary),
    createData("Autres informations importantes : "+percentageAutreInfo),
    createData("Contacts pendant la mission : "+percentageContactPendantMission),
    createData("Programmes : "+percentageProgramme),
  ];

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
            {rows.map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.technique}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value} %
                      </TableCell>
                      
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Techniques;
