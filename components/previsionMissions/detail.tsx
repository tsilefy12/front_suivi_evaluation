import React from "react";
import { FormLabel, styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import KeyValue from "../shared/keyValue";
import useFetchMissionListe from "../home/Missions/hooks/useFetchMissionListe";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { MissionItem } from "../../redux/features/mission/mission.interface";

const Detail = () => {
  const router = useRouter();
  const fetchMission = useFetchMissionListe();
  const { missionListe } = useAppSelector((state: any) => state.mission);
  const { id }: any = router.query;

  React.useEffect(() => {
    fetchMission();
  }, [router.query]);

  // console.log("list mission :", missionListe)
  return (
    <FormContainer spacing={2}>
      {missionListe
        .filter((e: any) => e.id == id)
        .map((item: MissionItem, index: any) => (
          <Grid container key={index}>
            <Grid item xs={12} md={4}>
              <KeyValue
                keyName="Ref mission"
                value={"MISSION_" + item.reference!}
              />
              <KeyValue
                keyName="Description"
                value={item.descriptionMission!}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              Responsable : <span> </span>
              <FormLabel>
                {[item.missionManager].map(
                  (mm: any) => mm.name + " " + mm.surname
                )}
              </FormLabel>
            </Grid>
            <Grid item xs={12} md={4}>
              Gestionnaire de budget : <span> </span>
              <FormLabel>
                {[item.budgetManager!].map(
                  (bm: any) => bm.name + " " + bm.surname
                )}
              </FormLabel>
            </Grid>
          </Grid>
        ))}
    </FormContainer>
  );
};

export default Detail;

const FormContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(3),
  padding: 30,
  borderRadius: 20,
  background: "#fff",
  border: `1px solid ${theme.palette.grey[100]}`,
  marginTop: -80,
}));
