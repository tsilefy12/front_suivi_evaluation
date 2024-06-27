import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { format, isWithinInterval } from "date-fns";
import React, { useEffect } from "react";
import {useAppSelector } from "../../hooks/reduxHooks";
import useFetchEmploys from "../GrantsEnCours/hooks/getResponsable";
import useFetchMissionListe from "../home/Missions/hooks/useFetchMissionListe";
import { EmployeItem } from "../../redux/features/employe/employeSlice.interface";
import { MissionLocationItem } from "../../redux/features/missionLocation/missionLocationSlice.interface";
import { MissionItem } from "../../redux/features/mission/mission.interface";
import Moment from "react-moment";


export default function Rapport() {
  const { missionListe } = useAppSelector((state) => state.mission);
  const fetchMissionListe = useFetchMissionListe();
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state) => state.employe);

  React.useEffect(() => {
    fetchMissionListe();
    fetchEmployes();
  }, []);
  return (
    <Stack
      padding={1}
      sx={{ border: "1px solid #efefef", borderRadius: 1, minHeight: 200 }}
    >
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <img src="/images/icons/bourse-detudes.png" />
        <Typography variant="h5" sx={{ whiteSpace: "nowrap" }}>
          Rapport
        </Typography>
      </Stack>
      <Stack direction={"column"} gap={2} padding={2}>
        <Table>
          <TableHead>
            <TableCell padding="none">
              Titre
            </TableCell>
            <TableCell padding="none">Ref budget</TableCell>
            <TableCell padding="none">Date RF</TableCell>
            <TableCell padding="none">Status</TableCell>
          </TableHead>
          <TableBody>
          {missionListe.map((row: MissionItem, index: any) => (
              <TableRow >
                <TableCell padding="none" sx={{ paddingY: 1 }}>
                  {"MISSION_" + row?.reference}
                </TableCell>
                <TableCell padding="none">
                  {row.RefBudget}
                </TableCell>
                <TableCell padding="none">
                    {row.uncompleteTbbs!.map((m) => (
                      <Moment format="DD/MM/yyyy" key={m.id}>
                        {m.dateRF}
                      </Moment>
                    ))}
                  </TableCell>
                <TableCell padding="none">
                  {row.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
    </Stack>
  );
}

function KeyValue({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) {
  return (
    <Stack direction={"row"} gap={1}>
      <Typography variant={"body2"} color={"GrayText"}>
        {label}
      </Typography>
      <Typography variant={"body2"} fontWeight={"bolder"}>
        {value ? value : "-"}
      </Typography>
    </Stack>
  );
}
