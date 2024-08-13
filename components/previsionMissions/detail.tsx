import React from "react";
import { FormLabel, styled, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import KeyValue from "../shared/keyValue";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { MissionItem } from "../../redux/features/mission/mission.interface";
import { EmployeItem } from "../../redux/features/employe/employeSlice.interface";

const Detail = () => {
  const router = useRouter();
  const { missionListe } = useAppSelector((state: any) => state.mission);
  const { id }: any = router.query;
  const { employees } = useAppSelector((state) => state.employe);

  return (
    <FormContainer spacing={2}>
      {missionListe
        .filter((e: any) => e.id == id)
        .map((item: MissionItem, index: any) => (
          <Grid container key={index}>
            <Grid item xs={12} md={4}>
              <KeyValue
                keyName="Référence mission"
                value={`${
                  item.reference != null ? "Référence : " + item.reference : ""
                }`}
              />
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <span>Description : </span>
                <Typography
                  color="GrayText"
                  mb={1}
                  aria-label="Description"
                  title={item?.descriptionMission}
                  sx={{
                    cursor:
                      item?.descriptionMission!.length > 4
                        ? "pointer"
                        : "default",
                    "&:hover": {
                      color:
                        item?.descriptionMission!.length > 4
                          ? "info.main"
                          : "GrayText",
                    },
                  }}
                >
                  {item?.descriptionMission?.slice(0, 20) + "..."}
                </Typography>
              </Stack>
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
                      de budget :{" "}
                    </span>
                    <FormLabel>
                      {mission
                        .budgetManagerId!.map((managerId) => {
                          const manager = employees.find(
                            (employee) => employee.id === managerId
                          );
                          return manager
                            ? `${manager.name} ${manager.surname}`
                            : "";
                        })
                        .filter((manager) => manager)
                        .join(", ")}
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
  // marginBottom: theme.spacing(3),
  padding: 20,
  borderRadius: 20,
  background: "#fff",
  border: `1px solid ${theme.palette.grey[100]}`,
  height: "calc(100vh - 550px)",
  overflow: "auto",
}));
