import React from "react";
import { FormLabel, styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import KeyValue from "../shared/keyValue";
import useFetchMissionListe from "../home/Missions/hooks/useFetchMissionListe";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { MissionItem } from "../../redux/features/mission/mission.interface";
import { EmployeItem } from "../../redux/features/employe/employeSlice.interface";
import useFetchEmploys from "../GrantsEnCours/hooks/getResponsable";

const Detail = () => {
  const router = useRouter();
  const { missionListe } = useAppSelector((state: any) => state.mission);
  const { id }: any = router.query;
  const { employees } = useAppSelector((state) => state.employe);

  // console.log("list mission :", missionListe)
  return (
    <FormContainer spacing={2}>
      {missionListe
        .filter((e: any) => e.id == id)
        .map((item: MissionItem, index: any) => (
          <Grid container key={index}>
            <Grid item xs={12} md={4}>
              <KeyValue
                keyName="Référence mission"
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
                {missionListe
                  .filter((f: MissionItem) => f.id === id)
                  .map((row: MissionItem) => {
                    const manager = employees.find(
                      (e: EmployeItem) => e.id === row.missionManagerId
                    );

                    return (
                      <span key={row.id}>
                        {manager
                          ? `${manager.name} ${manager.surname}`
                          : "Manager not found"}
                      </span>
                    );
                  })}
              </FormLabel>
            </Grid>
            <Grid item xs={12} md={4}>
              {missionListe
                .filter((mission: MissionItem) => mission.id === id)
                .map((mission: MissionItem) => (
                  <div key={mission.id}>
                    <span>
                      {mission.budgetManagerId &&
                      mission.budgetManagerId.length > 1
                        ? "Gestionnaires"
                        : "Gestionnaire"}{" "}
                      de budget :
                    </span>
                    <FormLabel>
                      {employees
                        .filter((e: EmployeItem) =>
                          mission.budgetManagerId?.includes(e.id as string)
                        )
                        .map((m: EmployeItem) => (
                          <Stack key={m.id} direction={"column"}>
                            <Stack direction={"row"} gap={1}>
                              <span>
                                {m.name} {m.surname}
                              </span>
                            </Stack>
                          </Stack>
                        ))}
                    </FormLabel>
                  </div>
                ))}
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
}));
