import React, { useMemo } from "react";
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
  const fetchMissionGoalList = useFetchMissionGoalListe();
  const fetchObjectifRapport = useFetchObjectifRapport();

  //resultat
  const fetchExceptedResultListe = useFetchExceptedResultList();
  const fetchResultatRapport = useFetchResultatRapport();

  //activity
  const fetchPlannedActivityListe = useFetchPlannedActivityList();
  const fetchActivityRapport = useFetchActiviteRapport();

  //livrable
  const fetchDeliverableListe = useFetchDeliverableList();
  const fetchLivrableRapport = useFetchLivrableRapport();

  //lieux
  const fetchMissionLocationListe = useFetchMissionLocationListe();
  const fetchLieuxRapport = useFetchLieuxRapport();

  //missionaire
  const fetchMissionaryList = useFetchMissionaryList();
  const fetchMissionaryRapportList = useFetchMissionaryRapportList();

  //autre information importante
  const fetchVehicleListe = useFetchVehicleList();
  const fetchAutreInfoRapport = useFetchAutreInfoRapport();

  //contact pendant la mission
  const fetchContactList = useFetchContactListe();
  const fetchContactMissionRapport = useFetchContactMissionRapport();

  //programme
  const fetchProgrammePrevision = useFetchProgrammePrevisionList();
  const fetchProgrammeRapport = useFetchProgrammeRapport();

  const {
    percentageObjectif, percentageActivity, 
    percentageAutreInfo, percentageContactPendantMission,
    percentageExceptedResult, percentageLivrable,
    percentageLocation, percentageMissionary,
    percentageTechnique, percentageProgramme,
  }: any = PourcentageTechnique()

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

export const PourcentageTechnique = () =>{
  const { missionGoalList } = useAppSelector((state: any) => state.missionGoal);
  const { objectifRapportlist } = useAppSelector((state: any) => state.objectifRapport);

  //resultat
  const { exceptedResultList } = useAppSelector((state) => state.exceptedResult);
  const { resultatRapportlist } = useAppSelector((state) => state.resultatRapport);

  //activity
  const { plannedActivityList } = useAppSelector((state) => state.plannedActivity);
  const { activiteRapportlist } = useAppSelector((state: any) => state.activiteRapport);

  //livrable
  const { deliverableList } = useAppSelector((state) => state.deliverable);
  const { livrableRapportlist } = useAppSelector((state: any) => state.livrableRapport);

  //lieux
  const { missionLocationList } = useAppSelector((state: any) => state.missionLocation);
  const { lieuxRapportlist } = useAppSelector((state: any) => state.lieuxRapport);

  //missionaire
  const { missionaryList } = useAppSelector((state) => state.missionary);
  const { missionaireslist } = useAppSelector((state: any) => state.missionaires);

  //autre information importante
  const { vehicleList } = useAppSelector((state) => state.vehicle);
  const { autreInfoRapportList } = useAppSelector((state: any) => state.autreInfoRapport);

  //contact pendant la mission
  const { contactList } = useAppSelector((state) => state.contact);
  const { missionRapportList } = useAppSelector((state: any) => state.missionRapport);

  //programme
  const { programmePrevisionList } = useAppSelector((state: any) => state.programmePrevision);
  const { programmeRapportList } = useAppSelector((state: any) => state.programmeRapport);
 
  let percentageObjectif = (objectifRapportlist.length * 100) / missionGoalList.length;
  let percentageExceptedResult = (resultatRapportlist.length * 100) / exceptedResultList.length;
  let percentageActivity = (activiteRapportlist.length * 100) / plannedActivityList.length;
  let percentageLivrable = (livrableRapportlist.length * 100) / deliverableList.length;
  let percentageLocation = (lieuxRapportlist.length * 100) / missionLocationList.length;
  let percentageMissionary = (missionaireslist.length * 100) / missionaryList.length;
  let percentageAutreInfo = (autreInfoRapportList.length * 100) / vehicleList.length;
  let percentageContactPendantMission = (missionRapportList.length * 100) / contactList.length;
  let percentageProgramme = (programmeRapportList.length * 100) / programmePrevisionList.length;
 
  let percentageTechnique = useMemo(() =>{
      let calculPourcentage =( (objectifRapportlist.length + resultatRapportlist.length + activiteRapportlist.length + 
        livrableRapportlist.length + lieuxRapportlist.length + missionaireslist.length + autreInfoRapportList.length +
        missionRapportList.length + programmeRapportList.length) * 100 / (missionGoalList.length + exceptedResultList.length + 
          plannedActivityList.length + deliverableList.length + missionLocationList.length + missionaryList.length + vehicleList.length + 
          contactList.length +  programmePrevisionList.length)).toFixed(2);

          return calculPourcentage;
  }, [
    percentageObjectif, percentageActivity, 
    percentageAutreInfo, percentageContactPendantMission,
    percentageExceptedResult, percentageLivrable,
    percentageLocation, percentageMissionary, percentageProgramme,
  ])
//  console.log("PT :", percentageTechnique)
  return {
    percentageObjectif, percentageActivity, 
    percentageAutreInfo, percentageContactPendantMission,
    percentageExceptedResult, percentageLivrable,
    percentageLocation, percentageMissionary,
    percentageTechnique, percentageProgramme,
  }
}