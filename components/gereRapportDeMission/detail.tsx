import React from "react";
import { styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import KeyValue from "../shared/keyValue";
import useFetchMissionListe from "../home/Missions/hooks/useFetchMissionListe";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useRouter } from "next/router";

const Detail = () => {
  const router = useRouter();
  const fetchMission = useFetchMissionListe();
  const { missionListe } = useAppSelector((state: any) => state.mission);
  const { id }: any = router.query;

  React.useEffect(() => {
    fetchMission();
  }, [router.query])

  // console.log("list mission :", missionListe)
  const listMission: { id: string, ref: string, desc: string, respo: any, gestionaire: any }[] = [];
  missionListe.forEach((m: any) => {
    if (id === m.id) {
      console.log("ref :", m.reference)
      listMission.push({
        id: m.id,
        ref: m.reference,
        desc: m.descriptionMission,
        respo: [m.missionManager].map(mm => (mm.name + " " + mm.surname)),
        gestionaire: [m.budgetManager].map(bm => (bm.name + " " + bm.surname))
      })
    }
  })
// console.log("list mission :", missionListe)
  return (
    <FormContainer spacing={2}>
      {
        listMission.map((item: any) => (
          <Grid container key={item.id}>
            <Grid item xs={12} md={4}>
              <KeyValue keyName="Ref mission" value={item.ref} />
              <KeyValue keyName="Description" value={item.desc} />
            </Grid>
            <Grid item xs={12} md={4}>
              <KeyValue keyName="Responsable" value={item.respo} />
            </Grid>
            <Grid item xs={12} md={4}>
              <KeyValue keyName="Gestionnaire de budget" value={item.gestionaire} />
            </Grid>
          </Grid>
        ))
      }
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
}));
